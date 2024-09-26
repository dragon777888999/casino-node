import React, { useRef, useEffect, useContext, useLayoutEffect } from 'react'
import useAppState from '../../hooks/useAppState';
import { PoolContext } from '../../utils/game';
import APP from '../../app';
import Streamer from '../../API/streamer';
import { relation_cases } from './../../utils/logic';
import StreamerSingleton from '../../API/StreamerSingleton';
import { waitForInitialization } from '../../utils/game/utilities/utils';
import state from '../../state';
import useWebSocket from '../../hooks/useWebSocket';
import { useSelector } from 'react-redux';
import clear_table from '../../utils/clearTable';
import isWallet from '../../utils/isWallet';

// holds reference between renders
const round_ref = {},
	// how close a round rate need to be to the timestamp of the end or start
	close_enough = 5000000; // 5 seconds
var currentPool_ref = null;

function is_close_enough(ms1, ms2) {
	return Math.abs(ms1 - ms2) <= close_enough;
}

function resolve_rate_identity(timeMs) {
	let { nextStart, nextEnd } = round_ref;
	let startClose = nextStart && is_close_enough(timeMs, nextStart),
		endClose = nextEnd && is_close_enough(timeMs, nextEnd);
	return startClose ? 'start' : (endClose ? 'end' : 'unknown');
}

function resolve_round_result(expiryRate) {
	var entryRate = APP.state.get('entryRate'),

		result = relation_cases(expiryRate, entryRate, 'up', 'tie', 'down');
	//console.log('resolve round', result)
	APP.state.set('last_result', result)

	console.log('resolve_round_result', { expiryRate, entryRate, result });
}

function RoundPhaseController() {

	const { isOpen, poolTimes, nextRound, lastRoundStartedEvent } = useContext(PoolContext);
	let switchedPool = useSelector(state => state.mainRememberReducer.currentPool);
	let isDemo = switchedPool?.uid?.includes('demo');
	let currentPool = APP.state.get(isDemo ? 'demo_tables' : 'tables').find(pool => pool.name === switchedPool.name);

	if (currentPool == undefined) {
		console.log('no pool');
		currentPool = APP.state.get('active_table');
	}


	//const currentPool = APP.state.get('active_table').pool_id;
	// console.log('ROUNDPHASE currentPool', currentPool);

	//currentPool = useAppState('active_table.pool_id'),

	const resetGraph = useAppState('resetGraph'),
		streamer = useRef(null);

	currentPool_ref = currentPool.pool_id;
	

	const { disconnect, message } = useWebSocket(isWallet(currentPool.round_streamer_url));


	useEffect(() => {
		// console.log('message2', message)
		if (!message) return;

		const params = JSON.parse(message).params;

		let { timeMs, rate, poolId, currentState, startTradesTime, endTradesTime, safetySeconds } = params;

		// console.log('Connecting to streamer and get current phase state: ', currentState, new Date());
		APP.state.set('round_current_state', currentState);
		// console.log('params: ', params)
		// resolve_round_result(rate / 10000)

		if (currentState === 'ExpirationPhase') {
			// APP.state.set('did_round_end_once', true);
			APP.play_sound('trade_started');
			APP.play_sound('voice_no_more_trades');

			// APP.state.set('isActivePosition', false);

			console.log('no trades are allowed: waiting for expiry', params)

			const lastRoundEndedEvent = {
				'poolId': poolId,
				'startPrice': parseInt(rate) / Math.pow(10, APP.state.get('asset').divisor),
				'timestamp': Number(timeMs)
			}

			APP.state.set('lastRoundEndedEvent', lastRoundEndedEvent);
		}
		else if (currentState === "PlaceTradePhase") {
			// APP.state.set('isActivePosition', false);
			// clear_table()
			// clear_table(poolId);
			console.log('trades can be placed: ', params, APP.state.get('switched_pool'))

			setTimeout(() => {
				APP.customer.update_balance();
			}, 1000);

			const lastRoundStartedEvent = {
				'poolId': poolId,
				'startPrice': parseInt(rate) / Math.pow(10, APP.state.get('asset').divisor),
				'timestamp': Number(timeMs)
			}

			APP.state.set('lastRoundStartedEvent', lastRoundStartedEvent);
		}


		(async () => {
			//Wait for initialization from ably
			// await waitForInitialization('lastRoundStartedEvent');
			// await waitForInitialization('lastRoundEndedEvent');

			let lastRoundStartedEvent = APP.state.get('lastRoundEndedEvent');
			let lastRoundEndedEvent = APP.state.get('lastRoundEndedEvent');


			let currentStateBool;
			if (currentState == 'PlaceTradePhase') {
				currentStateBool = true;
			} else {
				currentStateBool = false;
			}

			let now = new Date().getTime() * 1000;


			let start_timestamp, entry_timestamp, expiry_timestamp;
			if (now >= lastRoundStartedEvent?.timestamp) { }
			else { }


			if (currentState == 'PlaceTradePhase') {
				start_timestamp = startTradesTime - safetySeconds;
				entry_timestamp = startTradesTime + currentPool.downtime - safetySeconds;
				expiry_timestamp = entry_timestamp + currentPool.duration;
			}
			else {
				start_timestamp = startTradesTime - currentPool.downtime - currentPool.duration - safetySeconds;
				entry_timestamp = startTradesTime - currentPool.duration - safetySeconds; //  + safetySeconds;
				expiry_timestamp = startTradesTime - safetySeconds;
			}


			//TEMP REMOVE - get current round from the rounds streamer
			APP.state.set('current_round', {
				is_open: currentStateBool,
				start_timestamp: start_timestamp * 1000,
				entry_timestamp: entry_timestamp * 1000,
				expiry_timestamp: expiry_timestamp * 1000,
				poolId: poolId
			});

			let isOpen;
			if (currentState == 'PlaceTradePhase') {
				isOpen = true;
			} else {
				isOpen = false;
			}


			// console.log('XXXX ', poolId, currentPool_ref);

			if (poolId !== currentPool_ref) return;
			rate = rate / Math.pow(10, APP.state.get('asset')?.divisor);
			let identity = resolve_rate_identity(timeMs);
			// console.log('identity', identity);

			if (!isOpen) {
				//console.log('ROUNDPHASECONTROLLER:!isOpen');
				// found start rate from streamer
				// console.log('## found start rate', rate)
				APP.state.set('phase', 'pending');
				APP.state.set('phase_confirmed', false);
				APP.state.set('entryRate', rate);
				APP.state.set('expiryRate', null);
				// APP.play_sound('trade_started');
				// //console.log('play no more trades11');
				// APP.play_sound('voice_no_more_trades');
			}

			if (isOpen) {

				(async () => {

					await waitForInitialization('current_round');

					let currentRound = APP.state.get('current_round');

					//10.1
					var round_len = (round_ref.openLength + round_ref.closedLength) * 1000000;
					APP.state.set('nextRoundTimestamp', {
						start: currentRound.start_timestamp + currentPool.downtime * 1000,
						end: currentRound.start_timestamp + (currentPool.downtime + currentPool.duration) * 1000
					});

					//console.log('ROUNDPHASECONTROLLER::nextRoundTimestamp', APP.state.get('nextRoundTimestamp'));
					APP.state.set('phase', 'open')
					APP.state.set('phase_confirmed', false)
					APP.state.set('expiryRate', rate)
					// resolve_round_result(rate)
					//console.log('RoundPhaseController set entry rate to null 2');
					APP.state.set('entryRate', null)
					APP.play_sound('new_round');

					if (APP.state.get('last_result') === 'up') APP.play_sound('distributing_up_payouts');
					else if (APP.state.get('last_result') === 'down') APP.play_sound('distributing_down_payouts');
					else APP.play_sound('distributing_payouts');

					// * MOVED TO TABLE.JS *
					// setTimeout(() => {
					// 	APP.play_sound('voice_place_your_trade');
					// }, 3800);
				})();
			}


		})();
	}, [message])


	// useEffect(() => {
	// 	//console.log('before streamer stop', streamer, new Date());
	// 	//streamer.current && streamer.current.stop();
	// 	//console.log('after streamer stop', streamer, new Date());
	// 	//console.log('in round phase controller', APP.config.streamer_urls.rounds);
	// 	if (!currentPool?.uid) return;

	// 	const isDemo = currentPool?.uid?.includes('demo');
	// 	const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
	// 	const currentPool = tables.find(pool => pool.uid === currentPool?.uid);

	// 	console.log('ROUND PHASE CONTROLLER in use effect current pool 1', currentPool);
	// 	let roundStreamerUrl;

	// 	if (currentPool === undefined)
	// 		roundStreamerUrl = tables[0].round_streamer_url; //default contract is the first contract
	// 	else
	// 		roundStreamerUrl = currentPool.round_streamer_url;

	// 	console.log('ROUND PHASE CONTROLLER in use effect current pool 2', currentPool, roundStreamerUrl);

	// 	console.log(message, 'message...')
	// 	// streamer.current = StreamerSingleton.getInstance(
	// 	// 	'round_rates',
	// 	// 	roundStreamerUrl,
	// 	// 	{
	// 	// 		onUpdate: ({ params }) => {
	// 	// 			// alert('ON UPDATE')
	// 	// 			let { timeMs, rate, poolId, currentState, startTradesTime, endTradesTime, safetySeconds } = params;
	// 	// 			console.log('Connecting to streamer and get current phase state: ', currentState, new Date());
	// 	// 			APP.state.set('round_current_state', currentState);
	// 	// 			console.log('params: ', params)
	// 	// 			resolve_round_result(rate / 10000)

	// 	// 			// set flag to prevent initial mount result display
	// 	// 			if (currentState === 'ExpirationPhase') {
	// 	// 				APP.state.set('did_round_end_once', true);
	// 	// 				APP.play_sound('trade_started');
	// 	// 				APP.play_sound('voice_no_more_trades');
	// 	// 			}


	// 	// 			(async () => {
	// 	// 				//Wait for initialization from ably
	// 	// 				await waitForInitialization('lastRoundStartedEvent');
	// 	// 				await waitForInitialization('lastRoundEndedEvent');

	// 	// 				let lastRoundStartedEvent = APP.state.get('lastRoundEndedEvent');
	// 	// 				let lastRoundEndedEvent = APP.state.get('lastRoundEndedEvent');


	// 	// 				let currentStateBool;
	// 	// 				if (currentState == 'PlaceTradePhase') {
	// 	// 					currentStateBool = true;
	// 	// 				} else {
	// 	// 					currentStateBool = false;
	// 	// 				}

	// 	// 				let now = new Date().getTime() * 1000;


	// 	// 				let start_timestamp, entry_timestamp, expiry_timestamp;
	// 	// 				if (now >= lastRoundStartedEvent.timestamp) { }
	// 	// 				else { }


	// 	// 				if (currentState == 'PlaceTradePhase') {
	// 	// 					start_timestamp = startTradesTime - safetySeconds;
	// 	// 					entry_timestamp = startTradesTime + currentPool.downtime - safetySeconds;
	// 	// 					expiry_timestamp = entry_timestamp + currentPool.duration;
	// 	// 				}
	// 	// 				else {
	// 	// 					start_timestamp = startTradesTime - currentPool.downtime - currentPool.duration - safetySeconds;
	// 	// 					entry_timestamp = startTradesTime - currentPool.duration - safetySeconds; //  + safetySeconds;
	// 	// 					expiry_timestamp = startTradesTime - safetySeconds;
	// 	// 				}


	// 	// 				//TEMP REMOVE - get current round from the rounds streamer
	// 	// 				APP.state.set('current_round', {
	// 	// 					is_open: currentStateBool,
	// 	// 					start_timestamp: start_timestamp * 1000,
	// 	// 					entry_timestamp: entry_timestamp * 1000,
	// 	// 					expiry_timestamp: expiry_timestamp * 1000,
	// 	// 				});

	// 	// 				let isOpen;
	// 	// 				if (currentState == 'PlaceTradePhase') {
	// 	// 					isOpen = true;
	// 	// 				} else {
	// 	// 					isOpen = false;
	// 	// 				}


	// 	// 				console.log('XXXX ', poolId, currentPool_ref);

	// 	// 				if (poolId !== currentPool_ref) return;
	// 	// 				rate = rate / 10000;
	// 	// 				let identity = resolve_rate_identity(timeMs);
	// 	// 				console.log('identity', identity);

	// 	// 				if (!isOpen) {
	// 	// 					//console.log('ROUNDPHASECONTROLLER:!isOpen');
	// 	// 					// found start rate from streamer
	// 	// 					// console.log('## found start rate', rate)
	// 	// 					APP.state.set('phase', 'pending');
	// 	// 					APP.state.set('phase_confirmed', false);
	// 	// 					APP.state.set('entryRate', rate);
	// 	// 					APP.state.set('expiryRate', null);
	// 	// 					// APP.play_sound('trade_started');
	// 	// 					// //console.log('play no more trades11');
	// 	// 					// APP.play_sound('voice_no_more_trades');
	// 	// 				}

	// 	// 				if (isOpen) {

	// 	// 					(async () => {

	// 	// 						await waitForInitialization('current_round');

	// 	// 						let currentRound = APP.state.get('current_round');
	// 	// 						console.log('ROUNDPHASECONTROLLER::current_round,start_timestamp', currentRound, APP.state.get('current_round').start_timestamp);

	// 	// 						//10.1
	// 	// 						var round_len = (round_ref.openLength + round_ref.closedLength) * 1000000;
	// 	// 						APP.state.set('nextRoundTimestamp', {
	// 	// 							start: currentRound.start_timestamp + currentPool.downtime * 1000,
	// 	// 							end: currentRound.start_timestamp + (currentPool.downtime + currentPool.duration) * 1000
	// 	// 						});

	// 	// 						//console.log('ROUNDPHASECONTROLLER::nextRoundTimestamp', APP.state.get('nextRoundTimestamp'));
	// 	// 						APP.state.set('phase', 'open')
	// 	// 						APP.state.set('phase_confirmed', false)
	// 	// 						APP.state.set('expiryRate', rate)
	// 	// 						// resolve_round_result(rate)
	// 	// 						//console.log('RoundPhaseController set entry rate to null 2');
	// 	// 						APP.state.set('entryRate', null)
	// 	// 						APP.play_sound('new_round');

	// 	// 						if (APP.state.get('last_result') === 'up') APP.play_sound('distributing_up_payouts');
	// 	// 						else if (APP.state.get('last_result') === 'down') APP.play_sound('distributing_down_payouts');
	// 	// 						else APP.play_sound('distributing_payouts');

	// 	// 						// * MOVED TO TABLE.JS *
	// 	// 						// setTimeout(() => {
	// 	// 						// 	APP.play_sound('voice_place_your_trade');
	// 	// 						// }, 3800);
	// 	// 					})();
	// 	// 				}


	// 	// 			})();
	// 	// 		}
	// 	// 	}
	// 	// )


	// 	//streamer.current.start();
	// 	return () => {
	// 		console.log('STREAMER STOPPED...', roundStreamerUrl, streamer.current);
	// 		disconnect();
	// 		try {
	// 			streamer.current?.close('round_rates', roundStreamerUrl);
	// 		} catch (error) {
	// 			console.error('Error closing WebSocket connection:', error);
	// 		}
	// 		streamer.current = null;
	// 	}

	// 	// }, [resetGraph /*&& !APP.state.get('app-reload-in-progress')*/])
	// }, [currentPool?.uid /*&& !APP.state.get('app-reload-in-progress')*/])

	useEffect(() => {
		if (lastRoundStartedEvent && lastRoundStartedEvent.price) {
			// console.log('lastRoundStartedEvent', lastRoundStartedEvent)
			APP.state.set('entryRate', lastRoundStartedEvent.price)
		}
	}, [lastRoundStartedEvent])

	useEffect(() => {

		(async () => {
			await waitForInitialization('current_round');

			let isOpen1 = APP.state.get('current_round').is_open;

			if (isOpen1 && APP.state.get('round_current_state') == 'PlaceTradePhase' /*APP.state.get('phase') == 'pending'*/) {
				APP.state.set('phase', 'open')
			}
			if (!isOpen1 && APP.state.get('round_current_state') == 'ExpirationPhase' /*APP.state.get('phase') == 'open'*/) {
				APP.state.set('phase', 'pending')
			}

			//console.log('Set phase_confirmed to true');
			APP.state.set('phase_confirmed', true); //Change the message in PositionTimer component to countdown timer
			APP.state.unset('resetGraph');
			APP.state.unset('app-reload-in-progress');
		})();

	}, [isOpen, resetGraph]);

	return (<></>);
}

export default RoundPhaseController;