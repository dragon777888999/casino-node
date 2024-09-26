import { BLOCK_DURATION, decodeString, encodeString, getRoundDuration, eventParsers } from './../utils/game_';
import UpVsDownGameV1 from './contracts/UpVsDownGameV1.json';
import WalletContract from './WalletContract';
import Web3 from 'web3';
import web3Singleton from './Web3Singleton';
// import APP from '../app';

/**
 * Wrapper to interact with the game smart contract
 */
export const GameClient = {
	/**
	 * @typedef {Object} GameStatus
	 * @property {bool} isRunning
	 * @property {string} notRunningReason
	*/

	/**
	 * @typedef {Object} BetGroup
	 * @property {Array<string>} bets
	 * @property {Array<string>} addresses
	 * @property {string} total
	 */

	/**
	 * @typedef {Object} Round
	 * @property {web3.BN} startPrice
	 * @property {web3.BN} endPrice
	 * @property {BetGroup} upBetGroup
	 * @property {BetGroup} downBetGroup
	 */

	listeners: {},

	tradePlacedEventExists: false,
	roundStartedEventExists: false,
	roundEndedEventExists: false,
	roundDistributedEventExists: false,

	init: async function (address) {

		// alert(JSON.stringify({ m: address }))

		const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri'));
		const web3Free = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));

		// var web3 = false;
		// if (!APP.state.set('web3ProviderConnected')){        
		// 	console.log('creating new web3')                                                                               
		// 	//Paid provider. Like Alchemy
		// 	web3 = new Web3(new Web3.providers.WebsocketProvider(
		// 		APP.state.get('eth_ws_uri'), {
		// 		reconnect: {
		// 			auto: true,
		// 			delay: 1000, // ms
		// 			maxAttempts: 10,
		// 			onTimeout: false
		// 		}
		// 	}
		// 	));
		// }

		//Free provider. Like https://polygon-rpc.com , https://rpc.ankr.com/polygon_mumbai
		// const web3Free = new Web3(new Web3.providers.HttpProvider(
		// 	APP.state.get('eth_ws_uri_free'), {
		// 	reconnect: {
		// 		auto: true,
		// 		delay: 1000, // ms
		// 		maxAttempts: 10,
		// 		onTimeout: false
		// 	}
		// }
		// ));

		// if (APP.state.get('web3'))
		// 	this.web3 = APP.state.get('web3')
		// else	
		// 	this.web3 = web3;

		this.aternativeProviderWeb3 = new Web3(new Web3.providers.HttpProvider(
			APP.state.get('eth_ws_web3AlternativeProvider'), {
			reconnect: {
				auto: true,
				delay: 1000, // ms
				maxAttempts: 10,
				onTimeout: false
			}
		}
		));

		this.aternativeProvider1Web3 = new Web3(new Web3.providers.HttpProvider(
			APP.state.get('eth_ws_web3AlternativeProvider1'), {
			reconnect: {
				auto: true,
				delay: 1000, // ms
				maxAttempts: 10,
				onTimeout: false
			}
		}
		));

		this.web3 = web3;
		this.web3Free = web3Free;
		this.gameContract = new WalletContract(web3);
		this.gameContractFree = new WalletContract(web3Free);
		this.gameContractAlternative = new WalletContract(this.aternativeProviderWeb3);
		this.gameContractAlternative1 = new WalletContract(this.aternativeProvider1Web3);

		// alert(JSON.stringify({ before_p: address }))
		// alert(1212)

		// if (address) {
		// 	APP.state.set('current_game_address', address)
		// }
		// alert(JSON.stringify({ p: address || APP.state.get('current_game_address') }))

		await this.gameContract.load(UpVsDownGameV1.abi, address || APP.state.get('current_game_address'));
		await this.gameContractFree.load(UpVsDownGameV1.abi, address || APP.state.get('current_game_address'));
		await this.gameContractAlternative.load(UpVsDownGameV1.abi, address || APP.state.get('current_game_address'));
		await this.gameContractAlternative1.load(UpVsDownGameV1.abi, address || APP.state.get('current_game_address'));


		//We will use alternative provider for demanded RPC calls like pool history
		APP.state.set('web3AlternativeProvider', this.aternativeProvider);
		//console.log('setting alternative providers', new Date());
		APP.state.set('web3AlternativeProviderGameContract', this.gameContractAlternative);
		APP.state.set('web3AlternativeProviderGameContract1', this.gameContractAlternative1);

		//Update jackpot balance
		// this.web3Free.eth.getBalance(APP.state.get('jackpot_address'), 'pending').then(result=>{

		// 	//console.log('save jackpot balance',result)
		//   });

		// this.web3.eth.net.isListening(function(error, result) {
		// 	if(error) {
		// 		console.error(error);
		// 	} else {
		// 		console.log("Websocket Provider connection is listening. Status: " + result);
		// 		APP.state.set('web3ProviderConnected',true);   
		// 		APP.state.set('web3',this.web3)                                                                                    
		// 	}
		// });


		//APP.state.set('web3FreeProviderConnected',true);
	},

	/**
	 *
	 * @param {String} address
	 */
	setGameAddress: async function (address) {
		// alert(JSON.stringify({ dd: address }))
		// APP.state.set('current_game_address', address);
		// alert(JSON.stringify({ lmlml: address }))
		await this.gameContract.load(UpVsDownGameV1.abi, address);
		this.gameContract.setFrom(this.from_address);
		if (this.walletGameContract) {
			console.log(this.walletGameContract, address, 'address')
			await this.walletGameContract.load(UpVsDownGameV1.abi, address);
			this.walletGameContract.setFrom(this.from_address);
		}
		this.rebindEvents();
	},

	/**
	 *
	 * @param {MetaMask} wallet
	 */
	setWallet: async function (wallet) {
		APP.state.set('current_client_wallet', wallet);
		this.walletGameContract = new WalletContract(wallet.web3);
		// alert(JSON.stringify({ eee: APP.state.get('current_game_address') }))
		await this.walletGameContract.load(UpVsDownGameV1.abi, APP.state.get('current_game_address'));
		this.from_address && this.walletGameContract.setFrom(this.from_address);
	},

	/**
	 * @param {String} address 
	 */
	setFromAddress: function (address) {
		this.from_address = address;
		if (!address) return;
		this.gameContract && this.gameContract.setFrom(address);
		this.walletGameContract && this.walletGameContract.setFrom(address);
	},

	/**
	 * Change the game fee percentage
	 * @param {number} fee
	 * @returns {Web3PromiEvent}
	 */
	// changeGameFeePercentage: function (fee) {
	// 	return this.gameContract.send('changeGameFeePercentage', [fee])
	// },

	/**
	 * Change the address were collected fees are sent to
	 * @param {string} address
	 * @returns {Web3PromiEvent}
	 */
	// changeGameFeeAddress: function (address) {
	// 	return this.gameContract.send('changeGameFeeAddress', [address])
	// },

	/**
	 * Change the adddress that is allowed to start/stop rounds
	 * @param {string} address
	 * @returns {Web3PromiEvent}
	 */
	// changeGameControllerAddress: function (address) {
	// 	return this.gameContract.send('changeGameControllerAddress', [address])
	// },

	/**
	 * Enable the game to receive bets and start rounds
	 * @returns {Web3PromiEvent}
	 */
	// startGame: function () {
	// 	return this.gameContract.send('startGame', [])
	// },

	/**
	 * Stop the game, returning bets, and triggering a game stopped event
	 * @param {string} reason
	 * @returns {Web3PromiEvent}
	 */
	// stopGame: function (reason) {
	// 	return this.gameContract.send('stopGame', [encodeString(reason)])
	// },

	/**
	 * Get current fee percentage
	 * @returns {number}
	 */
	getFeePercentage: function () {
		return APP.state.get('active_table').fee_percentage;
		//return this.gameContractFree.call('feePercentage')
	},

	getFeeJackpotPercentage: function () {
		return APP.state.get('active_table').jackpot_fee_percentage;
		//return this.gameContractFree.call('feeJackpotPercentage')
	},

	/**
	 * Get current address that receives fees
	 * @returns {string}
	 */
	// getFeeAddress: function () {
	// 	return this.gameContract.call('feeAddress')
	// },

	/**
	 * Get current address that is allowed to start/stop rounds
	 * @returns {string}
	 */
	// getGameControllerAddress: function () {
	// 	return this.gameContract.call('gameController')
	// },

	/**
	 * Gets is the game is running or not and the reason
	 *
	 * @returns {GameStatus}
	 */
	getStatus: async function () {
		const [isRunning, notRunningReason] = await Promise.all([
			this.gameContract.call('isRunning'),
			this.gameContract.call('notRunningReason')
		])

		return {
			isRunning,
			notRunningReason: decodeString(notRunningReason || '')
		}
	},

	/**
	 * Gets the current state for a pool
	 *
	 * @param {string} poolId
	 * @returns {Round}
	 */
	getPoolState: async function (poolId) {
		return this.gameContractFree.call('pools', [encodeString(poolId)])
	},

	/**
	 * Gets if the pool is open for bets
	 * @param {string} poolId
	 * @returns {bool}
	 */
	isPoolOpen: function (poolId) {
		return this.gameContractFree.call('isPoolOpen', [encodeString(poolId)])
	},

	//We will wait for initialization of web3AlternativeProviderGameContract
	//Because it may initalize later then calling getPoolHistory function
	async waitForInitialization() {
		let attempts = 0;
		const maxAttempts = 10; // For example, we try 10 times.
		const delay = 300;     // Check every 300 ms

		while (attempts < maxAttempts) {
			//const web3Connector = APP.state.get('web3AlternativeProviderGameContract');

			let web3Connector = APP.state.get('web3AlternativeProviderGameContract1');

			if (window.location.hostname == 'cryptofights.pro') {
				web3Connector = APP.state.get('web3AlternativeProviderGameContract'); //Alchemy endpoint
			}

			if (web3Connector) {
				return web3Connector; // Return the initialized connector.
			}
			await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay.
			attempts++;
		}

		throw new Error('web3Connector failed to initialize within the expected time.');
	},

	/**
	 * Returns a list of RoundEnded events for a pool
	 * @param {string} poolId
	 * @param {number} limit
	 * @returns {Array}
	 */
	getPoolHistory: async function (poolId, limit = 10) {
		// console.log('GameClient::getPoolHistory::API', new Date(), poolId);
		const blocksPassed = getRoundDuration(poolId) * BLOCK_DURATION * limit
		const lastBlock = await this.gameContractFree.web3.eth.getBlockNumber()
		const history = await this.gameContractFree.contract.getPastEvents('RoundEnded', {
			filter: { 4: this.gameContractFree.web3.utils.sha3(encodeString(poolId)) },
			fromBlock: lastBlock - blocksPassed || 0
		})
		return history
			.reverse()
			.map(eventParsers.RoundEnded)
			.filter(round => round.poolId === poolId) // TODO: even with index, never got the filter working
	},

	/**
	 * Returns last RoundStarted event for a pool
	 * @param {string} poolId
	 * @returns {Object}
	 */
	getLastRoundStartedEvent: async function (poolId) {

		// console.log('GameClient::getLastRoundStartedEvent::API', new Date());
		return;




		const web3Connector = await this.waitForInitialization();

		const blocksPassed = getRoundDuration(poolId); // * BLOCK_DURATION
		const lastBlock = await web3Connector.web3.eth.getBlockNumber()

		const history = await web3Connector.contract.getPastEvents('RoundStarted', {
			filter: { 3: web3Connector.web3.utils.sha3(encodeString(poolId)) },
			fromBlock: (lastBlock - blocksPassed) < 0 ? 0 : (lastBlock - blocksPassed)
		});
		var events_data = history.map(eventParsers.RoundStarted);

		let lastRoundStarted = events_data
			.filter(round => round.poolId === poolId) // TODO: even with index, never got the filter working
			.pop();

		return lastRoundStarted;
	},

	/**
	 *
	 * @param {string} poolId
	 * @param {string} amount
	 * @param {bool} prediction - true (UP) or false (DOWN)
	 * @returns {Web3PromiEvent}
	 */
	makeBet: function (poolId, amount, prediction, avatarUrl, countryCode, maxFeePerGas, maxPriorityFeePerGas, whiteLabelId, demoMode) {
		//const params = [encodeString(poolId), prediction, avatarUrl, countryCode]
		const params = [{
			poolId: encodeString(poolId),
			avatarUrl: avatarUrl,
			countryCode: countryCode,
			upOrDown: prediction,
			whiteLabelId: whiteLabelId
		}]

		let result = this.walletGameContract.send('makeTrade', params, amount, maxFeePerGas, maxPriorityFeePerGas, demoMode);

		return result;
	},

	/**
	 * Subscribes to a game event
	 *
	 * @param {GameEvents} eventName
	 * @param {callback} callback
	 * @returns {EventEmitter}
	 */
	on: function (eventName, callback) {


		if (!GameEvents[eventName]) {
			throw new Error(`Event ${eventName} is not valid`)
		}

		//Prevent TradePlaced event double subscription
		if (eventName == 'TradePlaced' && this.tradePlacedEventExists) {
			// alert(JSON.stringify({ bbbb: APP.state.get('switched_pool') }))
			//Check if listener already exists
			//console.log('listener to TradePlaced already exists')
			// return;s
		} else if (eventName == 'TradePlaced' && !this.tradePlacedEventExists) {
			this.tradePlacedEventExists = true;
		}

		//Prevent RoundStarted event double subscription
		if (eventName == 'RoundStarted' && this.roundStartedEventExists) {
			// return;
		} else if (eventName == 'RoundStarted' && !this.roundStartedEventExists) {
			this.roundStartedEventExists = true;
		}

		//Prevent RoundEnded event double subscription
		if (eventName == 'RoundEnded' && this.roundEndedEventExists) {
			// return;
		} else if (eventName == 'RoundEnded' && !this.roundEndedEventExists) {
			this.roundEndedEventExists = true;
		}

		//Prevent RoundDistributed event double subscription
		if (eventName == 'RoundDistributed' && this.roundDistributedEventExists) {
			// return;
		} else if (eventName == 'RoundDistributed' && !this.roundDistributedEventExists) {
			this.roundDistributedEventExists = true;
		}

		const poolsSubState = /*APP.state.get('currentToken') === 'demo' ? 'pools_subs_demo' :*/ 'pools_subs';
		const subscribedPoolIds = APP.state.get(poolsSubState) ? APP.state.get(poolsSubState)[eventName] : {};
		const currentPoolId = APP.state.get('currentPoolId');
		const isDemo = currentPoolId?.includes('demo');
		const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
		const pool = tables.find(itm => itm.uid === currentPoolId);

		// if (location.pathname !== pool.route) return;

		if (subscribedPoolIds && subscribedPoolIds[currentPoolId]) {
			// alert(currentPoolId)
			// If the currentPoolId already has an event subscription for this eventName, return
			// console.log(`Already subscribed to ${eventName} for poolId ${currentPoolId}`);
			return;
		}

		// Mark the currentPoolId as subscribed for this eventName
		APP.state.set(poolsSubState, { ...APP.state.get(poolsSubState), [eventName]: { ...subscribedPoolIds, [currentPoolId]: true } });

		// console.log('subscribe to ' + eventName + ' from utils/gameClient.js');


		const parser = eventParsers[eventName];
		// console.log('STATUS: ', APP.state.get(poolsSubState), '....', currentPoolId)
		return this.gameContract.addContractListener(eventName, event => callback(parser(event)))
	},

	rebindEvents: function () {

	}
};

/**
 * Events thrown by the gamean
 *
 * @enum
 * @readonly
 * @property {string} RoundStarted - The round has started, no more bets allowed
 * @property {string} RoundEnded - The round has ended, winnings are given
 * @property {string} TradePlaced - A user has made a new bet
 * @property {string} GameStarted - The game has been started
 * @property {string} GameStopped - The game has been stopped
 * @property {string} TradeWinningsSent - Winnings has been sent for a bet
 */
export const GameEvents = {
	RoundStarted: 'RoundStarted',
	RoundEnded: 'RoundEnded',
	RoundDistributed: 'RoundDistributed',
	TradePlaced: 'TradePlaced',
	GameStarted: 'GameStarted',
	GameStopped: 'GameStopped',
	TradeWinningsSent: 'TradeWinningsSent'
}
