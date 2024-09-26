import { GameClient } from './../API/GameClient';
import { GameError } from './../utils/errors';
import { sleep } from './../utils/async';
import { rand_text } from './../utils/random';
import { Web3, utils } from 'web3';
import state from "../state";
import { parseUnits } from '@ethersproject/units';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import { estimateGasFee } from './../utils/game/utilities/utils';

var _uid = 1;
function UID() { return _uid++; }

export default class BetModel {

	/**
	 * @param {String} pool_id 
	 * @param {Number} amount 
	 * @param {"up"|"down"} direction 
	 */
	constructor(pool_id, amount, direction, demo_mode) {
		this.local_id = UID();
		this.pool_id = pool_id;
		this.amount = amount;
		this.direction = direction;
		this.demo_mode = demo_mode;
		this.error = null;
		this.is_placing = false;
		this.transaction_hash = null;
		this.phase = 'unsent';
		this.avatarUrl = APP.state.get("customer.avatar") || localStorage.getItem('avatar') || 'https://robohash.org/747621?set=set3';
		this.countryCode = APP.state.get("customer.countryCode");
		//Set whitelabelId as playnance for default traffic and whitelabel hash for other whitelabels. The whitelabel hash is saved in local storage on /verify endpoint
		this.whiteLabelId = APP.state.get('partnerRef') ? APP.state.get('partnerRef') : 'playnance';
	}

	//Place actual bet
	async make() {
		const gasFeeEstimation = await estimateGasFee();

		//		console.log('make bet');
		if (APP.play_for_fun) return this.make_simulated();
		this.is_placing = true;
		this.phase = 'sent';

		//		console.log('bet_placement -> sent ', new Date())
		// setTimeout(() => APP.controller.publish('bet_placement', this, 'sent'), 5);
		APP.controller.publish('bet_placement', this, 'sent');

		// await sleep(1);
		try {
			//Estimate gas price
			//https://wiki.polygon.technology/docs/develop/tools/polygon-gas-station/
			//https://github.com/neznein9/gas-estimation
			//TODO: add timeout for 3 seconds
			// let gasEstimationObj = false;
			// let gasEstimationUrl = false;
			// let gasEstimation = false;
			// if (state.active_network == 'mainnet') {
			// 	gasEstimationUrl = APP.state.get('polygon_gas_station_mainnet');
			// } else {
			// 	gasEstimationUrl = APP.state.get('polygon_gas_station_testnet');
			// }

			// var maxPriorityFee = 0;
			// var maxFeePerGas = 0;
			// let maxPriorityFeePerGas = 0;
			// let baseFee = 0;

			// const controller = new AbortController();
			// const signal = controller.signal;

			// setTimeout(() => controller.abort(), 3000);
			// gasEstimationObj = await fetch(gasEstimationUrl, { signal })
			// 	.then(response => response.json())
			// 	.then((json) => {
			// 		gasEstimation = json;
			// 		baseFee = parseFloat(gasEstimation['estimatedBaseFee']);
			// 		maxPriorityFee = parseFloat(gasEstimation['fast']['maxPriorityFee']);
			// 		//maxFeePerGas = gasEstimation['fast']['maxFee'];
			// 		maxFeePerGas = gasEstimation['fast']['maxFee'];

			// 		maxFeePerGas = maxFeePerGas * 2;

			// 		//Take fast estimations and add 20% to gas fee
			// 		// maxFeePerGas = maxFeePerGas * 1.5; //add 20% to the max fee per gas
			// 		// console.log(maxFeePerGas)
			// 		// maxFeePerGas = parseUnits(maxFeePerGas.toFixed(4), 'gwei');
			// 		// maxPriorityFee = maxPriorityFee * 1.5;
			// 		// maxPriorityFeePerGas = parseUnits(maxPriorityFee.toFixed(4), 'gwei');
			// 		// maxPriorityFee = parseUnits(maxPriorityFee.toFixed(4), 'gwei');

			// 		if (APP.state.get('timeToCloseRound') <= APP.state.get('higher_gas_fee_seconds')) {
			// 			//console.log('higher fee zone');
			// 			maxFeePerGas = maxFeePerGas * 2;
			// 			maxPriorityFee = maxPriorityFee * 3;
			// 		}


			// 		maxFeePerGas = parseUnits(maxFeePerGas.toFixed(4), 'gwei')
			// 		maxPriorityFeePerGas = parseUnits(maxPriorityFee.toFixed(4), 'gwei')

			// 		//maxFeePerGas = maxPriorityFeePerGas; //test
			// 	}
			// 	)
			// 	.catch((error) => {
			// 		console.log('Cannot fetch gas estimations, fallback to default')
			// 		console.log("Timeout: It took more than 3 seconds to get the result!");

			// 		//default values for gas
			// 		if (state.active_network == 'mainnet') {
			// 			maxPriorityFee = APP.state.get('polygon_gas_default_maxPriorityFee_mainnet');
			// 			maxFeePerGas = APP.state.get('polygon_gas_default_maxFeePerGas_mainnet');
			// 		} else {
			// 			maxPriorityFee = APP.state.get('polygon_gas_default_maxPriorityFee_testnet');
			// 			maxFeePerGas = APP.state.get('polygon_gas_default_maxFeePerGas_testnet');
			// 		}

			// 		//Take fast estimations and add 40% to gas fee
			// 		maxFeePerGas = maxFeePerGas * 2; //add 20% to the max fee per gas
			// 		maxFeePerGas = parseUnits(maxFeePerGas.toFixed(4), 'gwei');
			// 		maxPriorityFee = maxPriorityFee * 2;
			// 		maxPriorityFeePerGas = parseUnits(maxPriorityFee.toFixed(4), 'gwei');
			// 	});

			var that = this;

			//Web3.js 			

			let makeBetPromise = GameClient.makeBet(
				this.pool_id,
				utils.toWei(this.amount.toString(), 'ether'),
				this.direction == 'up',
				this.avatarUrl,
				this.countryCode,
				gasFeeEstimation, //Fee per gas
				gasFeeEstimation, //Priority fee
				this.whiteLabelId,
				this.demo_mode
			);


			// if (typeof (APP.state.get('web5signer')) == 'undefined') {

			// 	makeBetPromise.on('transactionHash', hash => {
			// 		//Web3.js listener
			// 		console.log('transaction hash received ', new Date());
			// 		this.transaction_hash = hash;
			// 		this.phase = 'hash_recieved';
			// 		// setTimeout(() => APP.controller.publish('bet_placement', this, 'hash_recieved'), 5);
			// 		APP.controller.publish('bet_placement', this, 'hash_recieved');
			// 		//Call update balance after bet was made in order to update the displayed user balance
			// 		//setTimeout(() => /*console.log('call customer update_balance'),*/ APP.customer.update_balance(), 500);
			// 	}).on('confirmation', (confirmationNumber, receipt) => {
			// 		//Web3.js listener
			// 		console.log('confirmation received ' + confirmationNumber, new Date());
			// 		if (confirmationNumber === 1) {
			// 			//console.log('Bet Transaction has received its first confirmation,update balance');
			// 			APP.customer.update_balance();
			// 		}
			// 	})
			// }
			// else {

			//Ethers.js specific listeners
			APP.controller.sub('transactionHash', function (txHash) {
				console.log('ether.js -> transaction hash received event listener fired ', new Date());
				that.transaction_hash = txHash;
				console.log(txHash);
				that.phase = 'hash_recieved';
				console.log('after setting phase');
				console.log('that', that);
				// setTimeout(() => APP.controller.publish('bet_placement', that, 'hash_recieved'), 5);
				APP.controller.publish('bet_placement', that, 'hash_recieved');
				console.log('publish hash_received bet_placement', new Date());
			});

			APP.controller.sub('confirmation', function (receipt) {
				console.log('ether.js -> confirmationevent listener fired ', new Date());
				console.log('confirmation received ', new Date());
				APP.customer.update_balance();
			});

			//}
			console.log(1111, await makeBetPromise)
			await makeBetPromise;

		} catch (err) {
			console.log('ERROR xx', err);

			// await sleep(50)

			if (err instanceof GameError) {

				console.log('ERROR-1');
				console.log('Game error...');
				console.log(err, '12122132');
				// set error for taken bet but failed due to unsigned before round started
				APP.state.set('round_closing_bet_fail', true)
				APP.state.set('bet_error', JSON.stringify(err.stack))

				this.error = err.message;
				this.phase = 'error';
				APP.controller.publish('bet_placement', this, 'error');
				APP.controller.publish('bet_error', this);
				// await sleep(5); // gives the view time to perform some logic
			} else {

				console.log('ERROR-2', err);

				APP.state.set('bet_error', JSON.stringify(err.stack))
				this.is_placing = false;
				this.error = err.message;
				if (err.message) {
					APP.state.set('bet_error', JSON.stringify(err.message))
				}

				this.phase = 'error';
				// this.phase = 'done';

				// setTimeout(() => APP.state.set('button_bet.' + this.direction, null), 50);
				APP.state.set('button_bet.' + this.direction, null);
				// await sleep(5); // gives the view time to preform some logic
				APP.controller.publish('bet_placement', this, 'error');
				APP.controller.publish('bet_error', this);
				// APP.controller.publish('bet_placement', this, 'done');
				return;
				// throw err;
			}
		}

		this.is_placing = false;
		this.phase = 'done';
		APP.controller.publish('bet_placement', this, 'done');
	}

	/**
	 * this simulates making a bet
	 * it waits a little, gives random text as hash,
	 * then waits a bit more and finish the placement proccess
	 */
	async make_simulated() {
		this.is_placing = true;
		APP.controller.publish('bet_placement', this, 'sent');
		await sleep(100);
		this.transaction_hash = rand_text(15);
		APP.controller.publish('bet_placement', this, 'hash_recieved');
		APP.simulation.add_own_bet(this);
		await sleep(1000);
		this.is_placing = false;
		APP.controller.publish('bet_placement', this, 'done');
	}
}