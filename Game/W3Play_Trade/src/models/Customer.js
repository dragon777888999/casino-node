import { GameClient } from './../API/GameClient';
import { remove_once } from "../utils/array";
import BetModel from './Bet';
import { sleep } from '../utils/async';
import Web3 from 'web3';
import ga4Event from '../utils/ga4.event';
import { getTokenBalance } from '../utils/game/utilities/utils';
import { set_alert_msg } from '../REDUX/actions/main.actions';

export default class CustomerModel {

	/**
	 * @param {Number} id 
	 * @param {Object} data 
	 * @param {Array} wallets 
	 */
	constructor(id, data, wallets) {
		this.id = id;
		for (let key of Object.keys(data)) this[key] = data[key];
		this.wallets = wallets;
		wallets.length && (this.active_wallet = wallets[0]);
		this.balance = 0;
		this.pending_bets = [];
	}

	init() {
		console.log('in customer init');
		var _that = this;

		setTimeout(() => {
			let provider = APP.wallets.walletProvider;

			if (provider) {

				GameClient.setWallet(APP.wallets);
				//alert(provider.selectedAddress)
				if (provider.selectedAddress && localStorage.getItem('wallet')) {
					_that.set_wallet_address(provider.selectedAddress);
				}
			}
		}, 500)

		APP.wallets.addEventListner('connect', () => {
			let address = APP.wallets.walletProvider.selectedAddress;
			address && _that.set_wallet_address(address);
		})
		APP.wallets.addEventListner('accountsChanged', accounts => {
			if (accounts.length === 0) _that.clear_wallets();
			else _that.set_wallet_address(APP.wallets.walletProvider.selectedAddress);
		})
	}

	/**
	 * @param {String} wallet_address 
	 */
	add_wallet_address(wallet_address) {
		if (this.wallets.includes(wallet_address)) return;
		this.wallets.push(wallet_address);
	}

	/**
	 * @param {String} wallet_address 
	 */
	remove_wallet_address(wallet_address) {
		remove_once(this.wallets, wallet_address)
	}

	clear_wallets() {
		this.wallets = [];
		this.active_wallet = null;
	}

	/**
	 * @param {String} wallet_address 
	 */
	set_wallet_address(wallet_address) {
		wallet_address = Web3.utils.toChecksumAddress(wallet_address);
		this.wallets = [wallet_address];
		this.active_wallet = wallet_address;
		this.update_balance();

		APP.state.set('wallet_address', wallet_address);
		APP.controller.publish('user_wallet_address_changed', wallet_address);
		GameClient.setFromAddress(wallet_address);
	}

	async update_balance() {
		//After disconnect there is no active_wallet
		if (!this.active_wallet || this.active_wallet === 'undefined') return;

		//Update balance for wallet
		if (typeof (APP.wallets.web3) !== 'undefined') {
			if (APP.wallets.web3) {
				//this.balance = await APP.wallets.web3.eth.getBalance(this.active_wallet, 'pending');

				this.balance = await getTokenBalance(this.active_wallet);
				APP.state.set('customer.balance', this.balance);

				// APP.state.set('customer.balance', await APP.wallets.web3.eth.getBalance(this.active_wallet, 'pending'));
			}
		}
	}

	/**
	 * @param {String} name 
	 */

	async set_wallet_provider(name) {
		let address = await APP.wallets.authenticate(name);
		GameClient.setWallet(APP.wallets);
		if (address) this.set_wallet_address(address);
		else this.clear_wallets();
	}

	/**
	 * @param {String} poolId 
	 * @param {Number} amount 
	 * @param {"up"|"down"} direction 
	 */
	async place_bet(direction, pool_id, amount, dispatch, demo_mode) {
		var
			//  pool_id = APP.state.get('active_table.pool_id'),
			// amount = APP.state.get('selected_investment'),

			new_bet = new BetModel(pool_id, amount, direction, demo_mode);
		console.log("bet", amount)
		// set bet as active bet for the add bet button
		APP.state.set('button_bet.' + direction, new_bet.local_id);

		// await sleep(5);

		this.pending_bets.push(new_bet);
		var _that = this;
		function listener(bet, phase) {
			console.log('in bet placement listener');
			console.log(bet, phase);

			//Check if user place trade when wallet connect session times out
			// if (bet.error.includes('Please call connect() before request()') ){
			// 	dispatch(set_alert_msg({ type: 'error', content: 'Connect your wallet to continue' }));
			// }

			if (bet.local_id == new_bet.local_id) {
				if (phase == 'hash_recieved') {
					// unset the bet from the button to allow new bets to be made
					// setTimeout(() => APP.state.set('button_bet.' + direction, null), 50);
					APP.state.set('button_bet.' + direction, null);

					//Disable update balance after make trade
					// console.log('Customer.js call customer update_balance')
					//console.log('balance after make trade');
					//setTimeout(() => {_that.update_balance()}, 200);//4000
					console.log(bet, 'bet..')
					if (!bet?.error) {
						// ga4Event('placed trade', '3_trade')
						// if (bet?.direction?.toLowerCase() == 'down') ga4Event('successfuly placed down bet', 'down_button')
						// else if (bet?.direction?.toLowerCase() == 'up') ga4Event('successfuly placed up bet', 'up_button')

						// setTimeout(() => {
						// 	dispatch(set_alert_msg({ type: 'tickets', content: parseInt(new_bet?.amount / APP.state.get('ticketWorth')) }))
						// }, 1500);
					}
				}
				if (phase == 'done') {
					// ticket alert msg
					if (!new_bet?.error) {
					}

					let ix = _that.pending_bets.indexOf(bet);
					if (ix > -1) _that.pending_bets.splice(ix, 1);
					APP.controller.unsub('bet_placement', listener);
					APP.state.set('button_bet.' + direction, null);
				}
			}
		}

		APP.controller.sub('bet_placement', listener);
		// send the actual bet
		await new_bet.make(); //Open Metamask/Coinbase with the trade setup for confirmation
	}

	/**
	 * @param {Number} id 
	 */
	get_pending_bet(id) {
		return this.pending_bets.find(({ local_id }) => local_id == id);
	}
}