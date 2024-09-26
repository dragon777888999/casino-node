import { coin, die, choice, pow_die, change, change_factor } from "../utils/random";
import { to_precision, round_down_to } from '../utils/number';
import { samples, last, lastn, butlast, to_column_map, remove_each_once } from "../utils/array";
import { sleep } from "../utils/async";
import { relation_cases } from '../utils/logic'
import StreamerSingleton from '../API/StreamerSingleton';

import Streamer from "../API/streamer";

const { random, floor, log } = Math;
const { now } = Date;
const log_15 = log(15);

export default function sim_trade(APP, state) {

	let server_delta = 0;
	function server_now() {
		return now() + server_delta;
	}
	function server_sync(time) {
		server_delta = time - now();
	}

	// table state
	let phase = 'pending',
		phase_timout,
		sound_effect_timeout,
		downtime_length, trade_duation, investment_options,

		// position unique ID
		last_PUID = 12485,
		PUID = () => last_PUID++;

	function random_pos(dir, random_past = false) {
		return {
			own: false,
			id: PUID(),
			dir,
			// could have been made up to 10 seconds ago
			time: now() - (random_past ? die(0, 10000) : 0),
			amount: choice(investment_options),
			cid: die(1, 100000),
			avatar: `/media/images/test_users/${die(1, 40)}.jpg`
		}
	}

	// function asset_history(init_rate){
	// 	let time = Date.now(),
	// 		pointLen = 500,
	// 		numPoints = 160,
	// 		rate = init_rate;

	// 	return samples(numPoints, (_, i) => ([
	// 		time-(numPoints-1-i)*pointLen, Number((rate *= .9995 + random()*.001).toFixed(5))
	// 	]));
	// }
	// function movedot([x,y]){
	// 	return [Date.now(), y * (.9999 + .0002*random())]
	// }
	// function nextdot([x,y]){
	// 	return [Date.now(), y * (.9999 + .0002*random())]
	// }

	function results_history(len, baseRate) {
		let time = now(),
			entry, expiry;

		return samples(len, (_, i) => ({
			entryRate: entry = change(baseRate, .00001),
			expiryRate: expiry = change(baseRate, .00001),
			time: time - (len - i) * (downtime_length + trade_duation),
			result: relation_cases(expiry, entry, 'up', 'tie', 'down')
		}))
	}

	// update and make positions less frequently 
	// depending of the length of the investment phase
	// such that the total amount of positions & updates
	// at the end of the phase is equal to ln(seconds)/ln(15)
	// more positions then the shordests table (15 seconds)
	function chance_for_update() {
		let len = floor(downtime_length / 1000);
		return random() < (15 / len) * (log(len) / log_15)
	}

	function new_position(position) {
		// no new positions while trade is running
		if (phase == 'open') return;

		if (!position && !chance_for_update()) return;

		position = position || random_pos(coin('up', 'down'));
		state.mutate(
			`pool.${position.dir}.positions`,
			positions => ({
				[position.id]: position,
				...positions
			})
		)
	}

	function position_update() {
		// no new investments while trade is running
		if (phase == 'open') return;

		if (!chance_for_update()) return;

		let dir = coin('up', 'down'),
			amount = choice(investment_options),
			pids = Object.keys(state.get(`pool.${dir}.positions`)).map(Number),
			own_pids = [
				state.get('customer.positions.up'),
				state.get('customer.positions.down'),
			];
		remove_each_once(pids, ...own_pids); // dont auto update own positions
		if (!pids.length) return; // no positions to increase
		let pid = choice(pids);
		state.mutate(`pool.${dir}.positions.${pid}`, position => {
			if (!position) return position;
			return Object.assign({}, position, {
				amount: position.amount + amount
			})
		})
	}

	function handle_positions_payout(result) {
		let { up: upid, down: downid } = state.get('customer.positions'),
			payouts = {
				up: { tie: 1, down: 0, up: state.get('pool.up.payout_percent') / 100 }[result],
				down: { tie: 1, up: 0, down: state.get('pool.down.payout_percent') / 100 }[result],
			},
			invest = 0,
			payout = 0;
		if (upid !== -1) {
			let position = state.get('pool.up.positions.' + upid);
			if (position) {
				invest += position.amount
				payout += to_precision(position.amount * payouts.up, 2);
			}
		}
		if (downid !== -1) {
			let position = state.get('pool.down.positions.' + downid);
			if (position) {
				invest += position.amount
				payout += to_precision(position.amount * payouts.down, 2);
			}
		}
		state.set('customer.last_round_pnl', to_precision(payout - invest, 2));
		if (payout) state.mutate('customer.balance', balance => balance + payout);
	}

	function enter_trade() {
		phase_timout = setTimeout(conclude_cyle, trade_duation);
		if (trade_duation > 5000) {
			sound_effect_timeout = setTimeout(
				() => APP.sounds.nearing_expiry.play(),
				trade_duation - 5000
			);
		}
		state.set(
			'entryRate',
			last(state.get('asset_history'))[1]
		)
		pin_last_rate();
		state.set('phase', phase = 'open');
		state.set('phase_length', trade_duation);
		state.set('last_result', 'none');
		state.set('customer.last_round_pnl', 0);
		APP.sounds.trade_started.play();
		//console.log('play no more trades1');
		APP.sounds.voice_no_more_trades.play();
	}

	function clear_auto_trade() {
		let cfg = state.set('customer.auto_trade', {
			active: 'none',
			times_selected: 0,
			times_left: 0,
			trade_investment: 0
		});
	}

	function handle_auto_trade() {
		let cdata = state.get('customer'),
			cfg = cdata.auto_trade;
		if (cfg.active !== 'none') {
			if (cfg.trade_investment > cdata.balance) {
				// money run out, cancel auto trade
				clear_auto_trade();
				return;
			}
			APP.API.add_investment(
				cfg.trade_investment,
				cfg.active,
				() => {
					// remove auto trade command after last trade
					if (cfg.times_left === 1) clear_auto_trade();
					// decrease counter
					else state.mutate('customer.auto_trade.times_left', times => times - 1);
				}
			)
		}
	}

	function conclude_cyle() {
		phase_timout = setTimeout(enter_trade, downtime_length);

		let time = server_now(),
			entryRate = state.get('entryRate'),
			currRate = last(state.get('asset_history'))[1],
			result = relation_cases(currRate, entryRate, 'up', 'tie', 'down');

		pin_last_rate();
		handle_positions_payout(result);
		state.set('last_result', result);

		// close all positions
		for (let dir of ['up', 'down']) state.set(`pool.${dir}.positions`, {});

		// display result in last results
		state.mutate('last_results', results => [
			...lastn(results, 19),
			{ time, result, entryRate, expiryRate: currRate }
		]);

		enter_cyle();
	}

	function enter_cyle() {
		state.set('phase', phase = 'pending');
		state.set('phase_length', downtime_length);

		if (downtime_length > 5000) {
			sound_effect_timeout = setTimeout(
				() => APP.sounds.last_trade_chance.play(),
				downtime_length - 5000
			);
		}

		// reset trade letiables
		state.set('tradePlace', 'none');
		state.set('entryRate', null);

		// setup times of next trade
		let time = server_now(),
			start = time + downtime_length,
			end = start + trade_duation;
		state.set('tradeTimes', { start, end });

		// empty customer position
		state.set('customer.investment.up', 0);
		state.set('customer.investment.down', 0);
		state.set('customer.positions.down', -1);
		state.set('customer.positions.up', -1);

		if (APP.sounds) {
			// sounds setup complete
			if (state.get('customer.last_round_pnl') > 0) {
				// console.log('gained profits play')
				APP.sounds.gained_profits.play();
				// console.log('set timeout on you won play')
				APP.sounds.voice_you_won.play();
				setTimeout(() => {
					APP.sounds.voice_place_your_trade.play();
				}, 2000)
			}
			else {
				APP.sounds.voice_place_your_trade.play();
			}
			APP.sounds.new_round.play();
		}

		handle_auto_trade();
	}

	// let rate_cycle = 0;
	// function rate_update(){
	// 	state.mutate('asset_history', data => {
	// 		rate_cycle = rate_cycle == 5 ? 0 : rate_cycle+1;
	// 		data = (
	// 			rate_cycle == 0
	// 			? [ ...data.slice(1), nextdot(last(data)) ]
	// 			: [ ...butlast(data), movedot(last(data)) ]
	// 		)
	// 		let currRate = last(data)[1],
	// 		entryRate = state.get('entryRate'),
	// 		tradePlace = (
	// 			entryRate === null 
	// 			? 'none'
	// 			: (currRate > entryRate
	// 				? 'up'
	// 				: (currRate < entryRate
	// 					? 'down'
	// 					: 'tie'))
	// 		)
	// 		state.set('tradePlace', tradePlace);

	// 		return data;
	// 	})
	// }

	let did_graph_init = false,
		point_len,
		rate_streamer,
		num_points = 160;

	function rate_update_half_real(data) {
		// corrupt update data just ignore
		if (!data) return;
		// format input for JS
		const time = to_precision(data.lastTimeMs / 1000, 0),
			rate = Number(data.lastPrice);
		// sync server time
		server_sync(time);

		if (!did_graph_init) {
			do_graph_init(time, rate);
			did_graph_init = true;
		}
		else {
			state.mutate('asset_history', data => {

				if (!data || !data.length) return;
				
				let save_last = round_down_to(time, point_len) > last(data)[0],

					// handle trade state
					entryRate = state.get('entryRate'),
					tradePlace = (
						entryRate === null ? 'none'
							: relation_cases(rate, entryRate, 'up', 'tie', 'down')
					);
				state.set('tradePlace', tradePlace);

				// return updated points array
				return (
					save_last
						? [...data.slice(1), [time, rate]]
						: [...butlast(data), [time, rate]]
				)
			})
		}
	}

	function setup_streamer(remote_asset_id) {
		//rate_streamer && rate_streamer.stop();
		console.log('in setup streamer',APP.config.streamer_urls.asset_rates[remote_asset_id]);
		rate_streamer = StreamerSingleton.getInstance('rates',APP.config.streamer_urls.asset_rates[remote_asset_id],{ onUpdate: rate_update_half_real })
		//rate_streamer.start();
	}

	function reset_graph(remote_asset_id) {
		did_graph_init = false;
		point_len = to_precision((downtime_length + trade_duation) / 40, 0);
		state.set('asset_history', []);
		setup_streamer(remote_asset_id)
	}

	// make up random history based on the first streamed rate
	function do_graph_init(init_time, init_rate) {
		let rate = init_rate,
			data = samples(num_points, (_, i) => ([
				init_time - i * point_len,
				i == 0 ? init_rate : to_precision(rate *= change_factor(.00001), 5)
			]));
		data.reverse();
		state.set('asset_history', data);

		// results history
		state.set('last_results', results_history(10, init_rate));

		// setup trade timing
		let start = server_now() + downtime_length,
			end = start + trade_duation;
		state.set('tradeTimes', { start, end });
		state.set('entryRate', null);
	}

	// make a copy of the current rate as a permanent point
	function pin_last_rate() {
		state.mutate('asset_history', data => [...data.slice(1), [...last(data)]])
	}

	function update_position_amount(pid, dir, amount) {
		let position = state.get(`pool.${dir}.positions.${pid}`);
		if (position) {
			state.mutate(`pool.${dir}.positions.${pid}`, position => {
				return Object.assign({}, position, { amount: position.amount + amount })
			})
		}
	}

	function set_table(tableId) {

		console.log('trade.js set_table',tableId);

		let table = state.get('tables').find(t => t.id == tableId);
		if (!table) return;

		let asset = state.get('assets').find(a => a.id == table.asset);
		if (!asset) return;

		let { downtime, duration, investments } = table;

		// APP.API.cancel_auto_trade();

		// state.set('asset', asset);
		// state.set('active_table', table);
		// state.set('investment_amounts', investments);

		downtime_length = downtime * 1000;
		trade_duation = duration * 1000;
		// investment_options = investments;

		reset_graph(asset.remote_id);

		// call actual table change in control library
		APP.API.setCurrentPool && APP.API.setCurrentPool(table.pool_id);

		// turns simulation off
		return;

		clearTimeout(phase_timout);
		clearTimeout(sound_effect_timeout);
		state.set('customer.last_round_pnl', 0);

		// for (let dir of ['up', 'down']) {
		// 	// random initial positions
		// 	state.set(
		// 		`pool.${dir}.positions`,
		// 		samples(
		// 			die(0, 10),
		// 			() => random_pos(dir, true)
		// 		).reduce(to_column_map('id'), {})
		// 	)
		// }

		// set upcoming trade
		phase_timout = setTimeout(enter_trade, downtime_length);

		// start investment phase
		enter_cyle();
	}

	function initialize() {
		// random balance
		// state.set('customer.balance', die(100, 1000) * pow_die(0, 3));
		//state.set('customer.avatar', `/media/images/blank_avatar.png`);
		//let setNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1)
		//state.set('customer.avatar', `https://robohash.org/` + Math.floor(Math.random() * (999999 - 1 + 1) + 1) + '?set=set' + setNumber);

		// asset history (unused because its now based on streamer)
		// state.set('asset_history', asset_history(49693.90));

		set_table(state.get('active_table.id'));

		// start cyclic updates
		// setInterval(new_position, 250);
		// setInterval(position_update, 400);
		// setInterval(rate_update, 100)
	}

	// setup mock API
	APP.API.add_investment = async function (amount, dir, callback, onerror) {

		if (phase == 'open') {
			onerror && onerror({ error: 'TRADE_ALREADY_OPEN' });
			return;
		}
		let balance = state.get('customer.balance');
		if (balance < amount) {
			onerror && onerror({ error: 'INSUFFICIANT_BALANCE' });
			return;
		}
		let time = Date.now();
		await sleep(die(50, 1000)); // random simulated delay
		let pid = state.get('customer.positions.' + dir);
		// console.log('new investment, current position:', pid);
		if (pid !== -1) {
			update_position_amount(pid, dir, amount)
		}
		else {
			pid = PUID();
			new_position({
				cid: state.get('customer.id'),
				own: true,
				id: pid,
				dir, amount, time,
				avatar: state.get('customer.avatar')
			})
			// console.log('setting new position:', pid);
			state.set('customer.positions.' + dir, pid)
		}
		state.mutate('customer.investment.' + dir, curr_amount => curr_amount + amount)
		state.mutate('customer.balance', balance => balance - amount)
		APP.sounds.new_invest.play();

		callback();
	}

	APP.API.set_auto_trade = function (amount, dir, times) {
		state.set('customer.auto_trade', {
			active: dir,
			times_selected: times,
			times_left: times,
			trade_investment: amount
		});
		if (phase == 'pending' && state.get('customer.positions.' + dir) == -1) {
			// if auto trade is set while investment is possible and none is yet made for the direction 
			// try to use an auto trade instruction once immediately
			handle_auto_trade();
		}
	}

	APP.API.cancel_auto_trade = function () {
		state.set('customer.auto_trade', {
			active: 'none',
			times_selected: 0,
			times_left: 0,
			trade_investment: 0
		});
	}

	APP.API.change_table = set_table;

	APP.API.server_now = server_now

	// setTimeout(initialize, 100)
}