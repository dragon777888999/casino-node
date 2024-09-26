import { GameClient, GameEvents } from './../API/GameClient';
import web3Singleton from './../API/Web3Singleton';
import UpVsDownGameV1 from './../API/contracts/UpVsDownGameV1.json';
import { convertHexToColonFormat } from '../utils/game/utilities/utils';
import { to_precision, round_down_to } from '../utils/number';
import { last, butlast } from "../utils/array";
import { relation_cases } from '../utils/logic'
import assetHistory from './../API/assetHistory';
import AblyClientSingleton from '../API/Ably/AblyClientSingleton';
// import make_graph_data_candles from '../simulation/make_graph_data_candles';
import state from '../state';
import candles from '../API/candles';
import linearGraphHistory from '../API/linearGraphHistory';
import clear_table from '../utils/clearTable';
import { sleep } from '../utils/async';
import ga4Event from '../utils/ga4.event';
import Web3 from 'web3';

const graph_total_points = 160;
const graph_round_points = 40;

export default class TableModel {
	/**
	* @param {{
	* 	contract_adderess: {String}
	* 	downtime: {Number}
	* 	duration: {Number}
	* 	id: {Number}
	* 	investments: {[{Number}]}
	* 	order: {Number}
	* 	name: {String}
	* 	pool_id: {String}
	* }} data 
	*/
	constructor(data, asset) {
		for (let key in data) this[key] = data[key];
		this.asset = asset;
		this.downtime_ms = data.downtime * 1000;
		this.duration_ms = data.duration * 1000;
		this.total_duration_ms = this.downtime_ms + this.duration_ms;

		this.bets = { up: {}, down: {} };
		this.total = 0;
		this.totals = { up: 0, down: 0 };
		this.graph_ready = false;
		this.round_started_channel;
	}

	async waitForRoundStartedEvent() {
		return new Promise((resolve, reject) => {
			const ablyClient = AblyClientSingleton.getClient();

			ablyClient.channels.get(this.round_started_channel, { params: { rewind: '1' } })
				.subscribe(roundStartedEvent => {
					console.log("RoundStarted last message from ably", roundStartedEvent)

					const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
					const abi = UpVsDownGameV1.abi;
					// alert(JSON.stringify({ oioi: APP.state.get('current_game_address') }))
					const contract = new web3.eth.Contract(abi, APP.state.get('current_game_address'));
					const event = abi.find(item => item.type === "event" && item.name === "RoundStarted");

					let data = roundStartedEvent.data[0].logs[0].data; //data that we should decode to get poolId,timestamp,startPrice,endPrice
					let topics = roundStartedEvent.data[0].logs[0].topics;

					const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

					let poolId = convertHexToColonFormat(decodedLog.poolId);
					let price = decodedLog.price;
					let timestamp = decodedLog.timestamp;

					const lastRoundStartedEvent = {
						'poolId': poolId,
						'startPrice': parseInt(price) / Math.pow(10, APP.state.get('asset')?.divisor),
						'timestamp': Number(timestamp)
					}

					//last_round_started = lastRoundStartedEvent;

					// Resolve the promise with the desired value
					console.log('before resolve');
					resolve(lastRoundStartedEvent);
				}, error => {
					// Handle any errors that occur during subscription
					console.log('Error in subscription:', error);
					reject(error || new Error("An unknown error occurred in the subscription"));
				});
		});
	}

	resolve_round_result(expiryRate) {
		var entryRate = APP.state.get('entryRate'),
			result = relation_cases(expiryRate, entryRate, 'up', 'tie', 'down');
		//console.log('resolve round', result)
		APP.state.set('last_result', result)

		console.log('resolve_round_result', { expiryRate, entryRate, result });
	}

	async init() {
		// this.destroy();
		if (!APP.state.get('loaded_table')) {
			APP.state.set('loaded_table', true);
		}
		else {
			return;
		}

		// this.destroy();
		const is_open = await GameClient.isPoolOpen(APP.state.get('switched_pool') || this.pool_id);
		// alert(JSON.stringify({ kl: this.pool_id }))

		let last_round_started;
		if (APP.state.get('round_started_streamer'))
			last_round_started = APP.state.get('lastRoundStartedEvent');
		else
			last_round_started = await GameClient.getLastRoundStartedEvent(APP.state.get('switched_pool') || this.pool_id);
		this.is_open = is_open;
		this.last_round_started = last_round_started;
		this.last_round_ended = null;
		// this.on_round_started(last_round_started);
		this.setup_round_events();
		this.get_graph_data();
		// await this.load_bets();
	}

	/**
	 * @param {Object} event 
	 */
	on_round_started(event) {
		if (!event) return;
		let { timestamp, price } = event,
			now = APP.controller.server_now();

		timestamp = to_precision(timestamp / 1000, 0);

		// last round from init load is sometimes an old round
		if (this.duration_ms < now - timestamp) {
			let start = timestamp + this.duration_ms,
				entry = start + this.downtime_ms,
				expiry = start + this.total_duration_ms,
				is_open = entry > now

			if (is_open) {
				if (entry - now >= 5000) {
					setTimeout(() => { APP.controller.publish('5_seconds_to_entry'); }, entry - now - 5000)
				}
			}
			else {
				if (expiry - now >= 5000) {
					setTimeout(() => { APP.controller.publish('5_seconds_to_expiry'); }, expiry - now - 5000)
				}
			}


			this.set_round_times(
				is_open,
				start,
				entry,
				expiry
			);
			return;
		}

		let expiry = timestamp + this.duration_ms
		if (expiry - now >= 5000) {
			setTimeout(() => { APP.controller.publish('5_seconds_to_expiry'); }, expiry - now - 5000)
		}

		this.set_round_times(
			false,
			timestamp - this.downtime_ms,
			timestamp,
			expiry
		);
	}

	/**
	 * @param {Object} event 
	 */
	on_round_ended(event) {
		// console.log('on round ended')

		// If wallet is not connected
		let customerWallet = -1;
		if (APP.customer.active_wallet !== undefined) {
			customerWallet = APP.customer.active_wallet.toLowerCase()
		}

		let { timestamp, endPrice, startPrice, indexedPoolId } = event,
			now = APP.controller.server_now();

		timestamp = to_precision(timestamp / 1000, 0);
		let entry = timestamp + this.downtime_ms,
			expiry = timestamp + this.total_duration_ms;

		if (entry - now >= 5000) {
			this.before_entry_timeout = setTimeout(() => { APP.controller.publish('5_seconds_to_entry'); }, entry - now - 5000);
		}
		if (expiry - now >= 5000) {
			this.before_expiry_timeout = setTimeout(() => { APP.controller.publish('5_seconds_to_expiry'); }, expiry - now - 5000);
		}

		for (let dir in this.bets) {
			if ((dir == 'up' && endPrice > startPrice) || (dir == 'down' && endPrice < startPrice)) {
				for (let bet of Object.values(this.bets[dir])) {
					if (bet.address == customerWallet) {
						console.log("bet won")
						APP.controller.publish('bet_won', bet, event);
					}
				}
			}
		}

		setTimeout(() => {
			APP.sounds.voice_place_your_trade.play();
		}, 5000);

		this.set_round_times(
			true,
			timestamp,
			entry,
			expiry
		);
	}

	/**
	 * @param {Number} start 
	 * @param {Number} entry 
	 * @param {Number} expiry 
	 */
	set_round_times(is_open, start, entry, expiry) {
		this.is_open = is_open;
		APP.state.set('current_round', {
			is_open,
			start_timestamp: start,
			entry_timestamp: entry,
			expiry_timestamp: expiry,
		});

		//console.log('XX Table::setting current_round',APP.state.get('current_round'));
		APP.state.set('phase_confirmed', true); //Change the message in PositionTimer component to countdown timer
	}

	clear_table() {
		// console.log('clear_table inside table.js');
		this.bets = { up: {}, down: {} };
		this.total = 0;
		this.totals = { up: 0, down: 0 };
		for (let dir in this.bets) {
			APP.state.set('pool.' + dir + '.total', this.totals[dir]);
			APP.state.set('pool.' + dir + '.positions', this.bets[dir]);
		}
		APP.state.set('pool.total', this.total);
		APP.state.set('total_pool_down', 0);
		APP.state.set('total_pool_up', 0);
	}

	async get_graph_data(type = APP.state.get('graph_mode')?.type) {
		// console.log('taken graph_data_history for: ', type)
		APP.state.set('asset_history', []);
		APP.state.set('candles_asset_history', []);
		let pools = [...APP.state.get('tables'), ...APP.state.get('demo_tables')],
			currentPoolObj = pools.find(itm => itm.pool_id === APP.state.get('switched_pool'))

		console.log('currentPoolObj:', currentPoolObj, APP.state.get('switched_pool'))
		let totalDurationTime = /*this.total_duration_ms ? this.total_duration_ms :*/ (currentPoolObj.downtime + currentPoolObj.duration) * 1000;


		APP.state.set('totalDurationTime', totalDurationTime)

		var point_len = this.graph_point_len = to_precision(totalDurationTime /*|| this.total_duration_ms*/ / graph_round_points, 0);
		// var data = await assetHistory(this.asset.remote_id, point_len * graph_total_points, point_len);
		// APP.state.set('asset_history', data);
		// let ablyClient = AblyClientSingleton.getClient(),
		// rates_channel = (type === 'candles') ? state.candle_rate_ably_channel : state.rate_ably_channel,
		// history_rates_amt = (type === 'candles') ? 60 : 400; //temp change for graph sanity & remove blocking from Ably

		// use candles dummy data
		// let candles_data = make_graph_data_candles(Date.now(), 42730.4210)
		// APP.state.set('candles_asset_history', candles_data)

		// if (type === 'candles') {
		// Fetch historical data first
		if (type !== 'candles') {
			// const linearArr = parsedDataArray.map(item => ([
			// 	item?.timestamp,
			// 	item?.price
			// ]));

			// convert to objects arr with specified keys (lastTimeMs, lastPrice)
			// const arrayOfObjects = linearArr.map(([lastTimeMs, lastPrice]) => ({
			// 	lastTimeMs,
			// 	lastPrice: lastPrice.toString(),
			// }));

			var data = await assetHistory(APP.state.get('asset').linear_asset_id/*this.asset.remote_id */, point_len * graph_total_points, point_len);

			APP.state.set('asset_history', data);
		}
		else {
			let res = await candles.getCandlesHistory(50, APP.state.get('asset').candle_asset_id);

			if (res.error || !res.data || !Object.values(res?.data)?.length) return;

			const candlesArr = Object.values(res.data).reverse()?.map(item => ({
				x: item.timestamp,
				open: parseFloat(item.openPrice),
				close: parseFloat(item.closePrice),
				high: parseFloat(item.highPrice),
				low: parseFloat(item.lowPrice)
			}));
			APP.state.set('candles_asset_history', candlesArr)
		}


		this.graph_ready = true;
	}

	on_rate_update({ rate, time }) {

		// do not add point if graph data is still empty 
		// console.log('this.graph_ready', this.graph_ready, rate, time)
		if (!this.graph_ready && !APP.state.get('asset_history')?.length) {
			return;
			// if (APP.state.get('asset_history')?.length) {
			// console.log('not returning')
			// this.graph_ready = true;
			// }
			// else {
			// console.log('return')
			// return;
			// }
		}
		// add or update the last point

		// handle trade state
		let entryRate = APP.state.get('entryRate'),
			tradePlace = (
				entryRate === null ? 'none'
					: relation_cases(rate, entryRate, 'up', 'tie', 'down')
			);

		APP.state.set('tradePlace', tradePlace);

		if (APP.state.get('graph_mode')?.type === 'candles') {

			APP.state.mutate('candles_asset_history', data => {

				if (!data?.length) return;
				let candle_len = 3000,
					{ min, max } = Math,
					last_candle = last(data),
					save_last = round_down_to(time, candle_len) > last_candle?.x;

				// return updated points array
				return (
					save_last
						? [...data.slice(1), { x: last_candle?.x + candle_len, open: rate, close: rate, low: rate, high: rate }]
						: [...butlast(data), { x: last_candle?.x, open: last_candle?.open, close: rate, low: min(last_candle?.low, rate), high: max(last_candle?.high, rate) }]
				)
			});
		}

		else {
			APP.state.mutate('asset_history', data => {
				// console.log(data, 'length 358')
				// console.log('length', time, this.graph_point_len, APP.state.get('totalDurationTime'), APP.state.get('totalDurationTime'), data[0])
				if (!data?.length) return;
				let totalDurationTime = this.graph_point_len || APP.state.get('totalDurationTime')

				let save_last = round_down_to(time, totalDurationTime) > last(data)[0];

				// console.log(save_last, 'save last length', round_down_to(time, totalDurationTime) > last(data)[0], totalDurationTime, time)

				// return updated points array
				return (
					save_last
						? [...data.slice(1), [time, rate]]
						: [...butlast(data), [time, rate]]
				)
			});
		}
	}

	async load_bets() {

		// Prevent initial bets loading once switching pool => can be not synced yet /unloaded pool
		// loading bets will be done a few secs later
		if (APP.state.get('preventInitialLoadingBets')) return;
		// APP.state.set('pool.poolId', this.pool_id)
		try {
			// load existing bets
			// alert(this.pool_id)

			return;
			let res_data = await GameClient.getPoolState(APP.state.get('switched_pool') || this.pool_id),
				{ downBetGroup, upBetGroup } = res_data,
				bets = { up: upBetGroup, down: downBetGroup };


			const groupBets = ({ bets, addresses, avatars, countries, }, poolId, dir) =>
				addresses.reduce((acc, address, i) => {
					console.log('_DOWN TEST_', bets[i])
					acc[address] = {
						poolId: poolId,
						dir,
						amount: Number(bets[i]),
						address,
						betTimestamp: new Date().getTime(),
						avatarUrl: avatars[i],
						countryCode: countries[i],
					};
					return acc;
				}, {});

			console.log('DOWN: ', downBetGroup, '\n UP: ', groupBets(downBetGroup), APP.state.get('switched_pool') || this.pool_id, '\n\n')

			APP.state.set('pool.up.positions', groupBets(upBetGroup, APP.state.get('switched_pool'), 'up'));
			APP.state.set('pool.down.positions', groupBets(downBetGroup, APP.state.get('switched_pool'), 'down'));



			// for (let dir in bets) {
			// 	var addresses = bets[dir].addresses,
			// 		amounts = bets[dir].bets,
			// 		avatars = bets[dir].avatars,
			// 		countries = bets[dir].countries,
			// 		group = {},
			// 		total = 0,
			// 		side_total = 0;
			// 	//console.info('load_bets')
			// 	//console.info('addresses',addresses)
			// 	for (let i = 0; i < addresses.length; i++) {
			// 		let address = addresses[i].toLowerCase(), amount = Number(amounts[i]), avatarUrl = avatars[i], countryCode = countries[i];
			// 		side_total += amount;
			// 		if (address in group) {
			// 			group[address].amount += amount;
			// 			group[address].amounts.push(amount);
			// 			group[address].avatarUrl = avatarUrl
			// 			group[address].countryCode = countryCode
			// 			group[address].poolId = this.pool_id
			// 		}
			// 		else group[address] = { dir, address, amount, amounts: [amount], avatarUrl: avatarUrl, countryCode: countryCode };
			// 	}
			// 	this.bets[dir] = group;
			// 	this.totals[dir] = side_total;
			// 	APP.state.set('pool.' + dir + '.total', side_total);
			// 	APP.state.set('pool.' + dir + '.positions', group);
			// 	total += side_total;
			// }
			// this.total = total;
			// APP.state.set('pool.total', total);

			// // listen for new bets
			// var _that = this;

			// Prevent merge of trades from same customer with same amount when there are duplicate TradePlaced events
			//var customerTrades = {}
		} catch (e) {
			console.log('load bets error', e)
		}
	}

	setup_round_events() {
		var _that = this;

		// Clear existing subscriptions if they exist
		if (this.placement_sub) {
			this.placement_sub.unsubscribe();
			delete this.placement_sub;
		}

		if (this.round_start_sub) {
			this.round_start_sub.unsubscribe();
			delete this.round_start_sub;
		}

		if (this.round_end_sub) {
			this.round_end_sub.unsubscribe();
			delete this.round_end_sub;
		}

		this.placement_sub = GameClient.on(
			//Fix bug with duplicated amount bet (after logoff and connect again in Incognito we see trade with duplicated amount because 2 trade placed event fired)
			GameEvents.TradePlaced,
			({ poolId, newTotal, sender: address, amount, prediction, avatarUrl, countryCode, roundStartTime, transactionHash }) => {

				// to check if amount exists under the same wallet address
				function checkAmountExists(data, address) {
					if (data.length) {
						return data?.some(item => {
							const key = Object.keys(item)[0];
							return key === address && item[key]?.betTimestamp === new Date().getTime();
						});
					}
					else return false;
				}

				const exists = checkAmountExists(APP.state.get('pool.' + prediction?.toLowerCase() + '.positions'), address.toLowerCase());


				if (exists) {
					return;
				}

				// if (APP.state.get('switched_pool') !== poolId) return;
				if (APP.state.get('switched_pool') !== poolId) {
					// this.placement_sub?.unsubscribe();
					// delete this.placement_sub;
					return;
				}
				// if (poolId !== _that.pool_id) {
				// 	// alert(JSON.stringify({ a: poolId, b: _that.pool_id }))
				// }
				// if (poolId !== _that.pool_id) return;

				APP.sounds.new_invest.play();
				amount = Number(amount);
				// address = address.toLowerCase();
				address = address
				//console.log(new Date().getMilliseconds(), ' amount=' + amount + ' , address: ' + address);

				var dir = prediction == 'UP' ? 'up' : 'down',
					bet = { poolId, dir, newTotal, amount, address, transactionHash, /*amounts: [amount],*/ avatarUrl: avatarUrl, countryCode: countryCode, betTimestamp: new Date().getTime() };
				// let group = this.bets[dir]; // CHECK IF NEEDED
				let group = APP.state.get('pool.' + dir + '.positions');
				// console.log('ABC this.bets[dir]', this.bets[dir])
				// console.log('ABC pool.+dir', APP.state.get('pool.' + dir)?.positions)

				//console.log('group')
				//console.log(group)

				let nowHash = Math.floor(Date.now() / 1000);

				// If wallet is not connected
				let customerWallet = -1;
				if (APP.customer.active_wallet !== undefined) {
					customerWallet = APP.customer.active_wallet.toLowerCase()
				}

				let isDemo = location?.pathname?.includes('demo'),
					placed_trade_event = isDemo ? '3_trade_demo' : '3_trade',
					down_button_event = isDemo ? 'down_button_demo' : 'down_button',
					up_button_event = isDemo ? 'up_button_demo' : 'up_button';

				if (APP.state.get('wallet_address') && (APP.state.get('wallet_address')?.toLowerCase() === address?.toLowerCase())) {
					ga4Event('placed trade', placed_trade_event)
					if (bet?.dir?.toLowerCase() == 'down') ga4Event('successfuly placed down bet', down_button_event)
					else if (bet?.dir?.toLowerCase() == 'up') ga4Event('successfuly placed up bet', up_button_event)
				}

				// if (address in group) {
				// 	//console.log('address in group')
				// 	// if the timestamp diff between trades of the same users is 1 second or higher then merge the trades
				// 	// otherwise do nothing because it will cause to display double trade sometime
				// 	// if (address == customerWallet) {
				// 	// 	if (Math.abs(nowHash - APP.customer.lastTrade) > 1) {
				// 	// 		//console.log('timestamp difference',nowHash - APP.customer.lastTrade)
				// 	// 		//console.log('merge trades')
				// 	// 		group[address].amount += amount;
				// 	// 		group[address].amounts.push(amount);
				// 	// 	} else {
				// 	// 		//console.log('prevent duplicate merge')
				// 	// 	}
				// 	// 	//console.log('set APP.customer.lastTrade to ', nowHash)
				// 	// 	APP.customer.lastTrade = nowHash;
				// 	// } 
				// 	// else {
				// 	if (bet?.betTimestamp === group[address]?.betTimestamp) return;
				// 	else group[address].amount += amount;
				// 	// group[address].amounts.push(amount);
				// 	// }

				// }
				// else {
				// 	group[address] = bet;
				// 	if (address == customerWallet) {
				// 		APP.customer.lastTrade = nowHash; //First trade of customer on current pool
				// 	}
				// }


				const positions = APP.state.get('pool.' + dir + '.positions') || {};

				if (positions[address]) {
					// Address exists in positions
					const existingBet = positions[address];
					// Check if the betTimestamp is different
					if ((existingBet.betTimestamp !== bet.betTimestamp) && (existingBet?.transactionHash !== bet?.transactionHash)) {
						// Add the amounts
						bet.amount += existingBet.amount;
					}
				}

				// Update the positions with the new bet
				const updatedPositions = {
					...positions,
					[address]: { ...bet }
				};

				// Set the updated positions back to the state
				APP.state.set('pool.' + dir + '.positions', updatedPositions);
				// APP.state.set('pool.' + dir + '.positions', { ...group, [address]: { ...bet } })

				this.totals[dir] += amount;
				this.total += amount;
				this.avatarUrl = avatarUrl;
				// APP.state.set('pool.' + dir + '.total', this.totals[dir]);

				APP.state.set('pool.total', this.total);
				APP.state.set('total_pool_' + dir, newTotal, group)
				// APP.state.set('pool.' + dir + '.positions.' + address, group[address]);
				// APP.state.set('pool.' + dir + '.positions.' + address, group[address]);
				APP.controller.publish('bet_entered_pool', bet);
				APP.state.publish('bet_entered_pool', bet);
			}
		)

		this.round_start_sub = GameClient.on(
			GameEvents.RoundStarted,

			event => {
				// alert(JSON.stringify({ oooooo: APP.state.get('switched_pool'), o2: event.poolId }))
				if (APP.state.get('switched_pool') !== event.poolId) {
					// this.round_start_sub?.unsubscribe();
					// delete this.round_start_sub;
					return;
				}
				// if (event.poolId !== _that.pool_id) return;
				APP.state.set('start_round_pool_id', event.poolId);
				_that.last_round_started = event;
				// _that.on_round_started(event); 
			}
		);

		this.round_end_sub = GameClient.on(
			GameEvents.RoundEnded,
			event => {
				if (APP.state.get('switched_pool') !== event.poolId) {
					// this.round_end_sub?.unsubscribe();
					// delete this.round_end_sub;
					// this.destroy();
					return;
				}
				APP.state.set('show_result', true);
				APP.state.set('end_round_pool_id', event.poolId);

				// APP.state.set('ended_round_pool_id', APP.state.get('switched_pool'));
				// if (event.poolId !== _that.pool_id) return;

				let prevHistory = APP.state.get('history_list');
				prevHistory = (Array.isArray(prevHistory) ? prevHistory : []);
				const alreadyExist = prevHistory.find(item => event.timestamp === item.timestamp);

				// console.log('\n\n\n EVENT2', event, '\n\n\n', history);
				const newValue = alreadyExist ? prevHistory : [event].concat(prevHistory.slice(0, 9));

				APP.state.set('history_list', newValue)

				APP.state.set('did_round_end_once', true);
				_that.last_round_ended = event;
				_that.last_round_started = null;
				_that.resolve_round_result(event.endPrice)
				// _that.on_round_ended(event);
				_that.clear_table();
			}
		);

		// APP.state.set('')
	}

	destroy() {
		if (this.placement_sub) {
			this.placement_sub.unsubscribe();
			delete this.placement_sub;
		}
		if (this.round_start_sub) {
			this.round_start_sub.unsubscribe();
			delete this.round_start_sub;
		}
		if (this.round_end_sub) {
			this.round_end_sub.unsubscribe();
			delete this.round_end_sub;
		}
		if (this.before_entry_timeout) {
			clearTimeout(this.before_entry_timeout);
			delete this.before_entry_timeout;
		}
		if (this.before_expiry_timeout) {
			clearTimeout(this.before_expiry_timeout);
			delete this.before_expiry_timeout;
		}
	}
}