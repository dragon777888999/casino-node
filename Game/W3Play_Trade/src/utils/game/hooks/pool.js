import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Web3 from 'web3'
import { GameContext } from '..'
import useAppState from '../../../hooks/useAppState'
import { GameEvents } from '../clients/GameClient'
import { getPoolTimes } from '../utilities';
import { waitForInitialization } from '../utilities/utils';
import web3Singleton from '../../../API/Web3Singleton';
import { set_alert_msg } from '../../../REDUX/actions/main.actions'
import { useDispatch, useSelector } from 'react-redux';
import clear_table from '../../clearTable';
import ga4Event from '../../ga4.event'

/**
 *
 * @module Hooks
 */

/**
 *
 * @typedef usePoolParams
 * @property {string} poolId
 */

/**
 *
 * @typedef usePoolReturn
 * @property {Array} history
 * @property {bool} isOpen - Is the pool open for bets (true) or not (false)
 * @property {Array} betsDown - Addresses and amount of users that bet down
 * @property {Array} betsUp - Addresses and amounts for bets up
 * @property {number} totalDown - Total amount of bets down
 * @property {number} totalUp - Total amount of bets up
 * @property {bool} isLoading - Is the pool state ready to be used or not
 * @property {Object} lastRoundStartedEvent
 * @property {Object} poolTimes - Open and closed times for this pool
 * @property {callback} nextRound - Calculates timestamp for the next round start and end
 * @property {callback} onBetPlaced -Triggered whenever a bet is placed
 * @property {callback} onRoundStarted - Triggered when a round starts
 * @property {callback} onRoundEnded - Triggered when a round ends
 * @property {callback} onBetWinningsSent - Triggered when winnings are distributed
 */

// const groupBets = ({ bets, addresses, avatars, countries }, poolId, dir) => addresses.map((address, i) => ({ address, amount: Number(bets[i]), avatarUrl: avatars[i], countryCode: countries[i], poolId: poolId, dir }));
const groupBets = ({ bets, addresses, avatars, countries }, poolId, dir) =>
    addresses.reduce((acc, address, i) => {
        if (!acc[address]) {
            acc[address] = {
                poolId: poolId,
                dir,
                amount: Number(bets[i]),
                address,
                betTimestamp: new Date().getTime(),
                avatarUrl: avatars[i],
                countryCode: countries[i],
            };
        } else {
            acc[address].amount += Number(bets[i]);
        }
        return acc;
    }, {});


/**
 *
 * @param {usePoolParams} param0
 * @returns {usePoolReturn}
 */

export function usePool({ poolId, uid }) {

    // console.log('ROUND HAS NEW POOLID: ', poolId)

    const { gameClient } = useContext(GameContext);
    const [history, setHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [betsUp, setBetsUp] = useState([]);
    const [betsDown, setBetsDown] = useState([]);
    const [totalUp, setTotalUp] = useState(0);
    const [totalDown, setTotalDown] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [lastRoundStartedEvent, setLastRoundStartedEvent] = useState();
    const [poolTimes, setPoolTimes] = useState();
    const onBetPlacedRef = useRef();
    const onRoundStartedRef = useRef();
    const onRoundEndedRef = useRef();
    const onBetWinningsSentRef = useRef();
    const onRoundDistributedRef = useRef();
    const dispatch = useDispatch();
    const currentPool = useSelector(state => state.mainRememberReducer.currentPool);
    // console.log(gameClient, 'gameClient')

    // async function updatePoolBets() {

    //     let res_data = await gameClient.getPoolState(poolId);
    //     let { downBetGroup, upBetGroup } = res_data;
    //     let bets = { up: upBetGroup, down: downBetGroup };

    //     for (let dir in bets) {

    //         var addresses = bets[dir].addresses;
    //         var amounts = bets[dir].bets;
    //         var avatars = bets[dir].avatars;
    //         var countries = bets[dir].countries;
    //         var group = {};
    //         var total = 0;
    //         var totals = { up: 0, down: 0 };
    //         var side_total = 0;

    //         for (let i = 0; i < addresses.length; i++) {

    //             let address = addresses[i].toLowerCase();
    //             let amount = Number(amounts[i]);
    //             let avatarUrl = avatars[i];
    //             let countryCode = countries[i];

    //             side_total += amount;

    //             if (address in group) {
    //                 group[address].amount += amount;
    //                 group[address].amounts.push(amount);
    //                 group[address].avatarUrl = avatarUrl;
    //                 group[address].countryCode = countryCode;
    //             }

    //             else group[address] = {
    //                 dir,
    //                 address,
    //                 amount,
    //                 amounts: [amount],
    //                 avatarUrl: avatarUrl,
    //                 countryCode: countryCode
    //             }

    //         };

    //         bets[dir] = group;
    //         totals[dir] = side_total;
    //         APP.state.set('pool.' + dir + '.total', side_total);
    //         APP.state.set('pool.' + dir + '.positions', group);
    //         total += side_total;

    //     };

    //     // total = total;
    //     APP.state.set('pool.total', total);

    // };

    useEffect(() => {
        if (!currentPool.uid) return;

        // alert(JSON.stringify({ ps: poolId }))
        // console.log('inside useLayoutEffect pool.js....', poolId, uid, currentPool, APP.state.get('currentPoolId'))
        if (currentPool?.uid !== APP.state.get('currentPoolId')) return;

        APP.state.sub('bet_entered_pool', function (bet) {

            if (typeof (bet) == 'undefined') return;

            //Get data from TradePlaced event
            const prediction = bet.dir.toUpperCase();
            const sender = bet.address;
            const eventPoolId = bet.poolId;
            const newTotal = bet.newTotal;
            const amount = bet.amount;
            const avatarUrl = bet.avatarUrl;

            //Perform some logic
            if (APP.state.get('wallet_address') && (Web3.utils.toChecksumAddress(sender) === Web3.utils.toChecksumAddress(APP.state.get('wallet_address')))) {
                //     console.log('XX here', bet, APP.state.get('ticketWorth'));

                //     setTimeout(() => {
                //         dispatch(set_alert_msg({ type: 'tickets', content: parseInt((amount / 100) / APP.state.get('ticketWorth')) }))
                //     }, 2500);

                APP.state.set('contract_signed_' + prediction.toLowerCase(), true);
            }

            if (poolId !== eventPoolId) return;

            // let bets = APP.state.get('poolbets');
            // APP.state.set('poolbets', [bet, ...(bets ? bets : [])]);

            if (prediction === 'UP') {
                // setTotalUp(newTotal);
                // setBetsUp(betsUp => betsUp.concat({ address: sender, bet: amount, prediction, avatarUrl }));
            }

            else if (prediction === 'DOWN') {
                // setTotalDown(newTotal);
                // setBetsDown(betsDown => betsDown.concat({ address: sender, bet: amount, prediction, avatarUrl }));
            }

            //onBetPlacedRef.current && onBetPlacedRef.current(event);
        });

        let roundEndedSubs, roundStartedSubs, betPlacedSubs, betWinningsSentSub, roundDistributedSubs;
        (async () => {
            // await waitForInitialization('round_current_state');
            // APP.state.set('pool.poolId', poolId)

            const poolState = async () => {

                APP.state.set('poolsStateUpdate', currentPool.uid)

                setIsLoading(true);
                // alert(JSON.stringify({ cd: poolId }))
                const [round, isOpen, history] = await Promise.all([
                    gameClient.getPoolState(poolId),
                    gameClient.isPoolOpen(poolId),
                    gameClient.getPoolHistory(poolId, 10, uid),
                ]);

                // console.log('DOWN:2 ', round, 'UP:2 ', groupBets(round.upBetGroup, poolId, 'up'))
                // console.log(groupBets(round.upBetGroup, poolId), 'round....UP POOL..', poolId, Number(round.upBetGroup.total))
                // console.log(groupBets(round.downBetGroup, poolId), 'round... DOWN POOL...', Number(round.downBetGroup.total))
                if (!APP.state.get('round_started_streamer')) {
                    var lastRoundStartedEvent = await gameClient.getLastRoundStartedEvent(poolId);
                }

                // setBetsUp(groupBets(round.upBetGroup));
                // setBetsDown(groupBets(round.downBetGroup));
                // setTotalUp(Number(round.upBetGroup.total));
                // setTotalDown(Number(round.downBetGroup.total));
                // console.log('positions up', APP.state.get('pool.up.positions'), groupBets(round.upBetGroup, poolId, 'up'))
                // console.log('positions down', APP.state.get('pool.down.positions'), groupBets(round.downBetGroup, poolId, 'down'))
                // if (!APP.state.get('pool.up.total')) {
                APP.state.set('pool.up.total', Number(round.upBetGroup.total));
                APP.state.set('pool.up.positions', groupBets(round.upBetGroup, poolId, 'up'));
                // }
                // APP.state.set('pool.total', this.total);
                // if (!APP.state.get('pool.down.total')) {
                APP.state.set('pool.down.total', Number(round.downBetGroup.total));
                APP.state.set('pool.down.positions', groupBets(round.downBetGroup, poolId, 'down'));
                // }

                setIsOpen(isOpen);
                setHistory(history);
                APP.state.set('history_list', history)
                setLastRoundStartedEvent();

                if (!isOpen) {
                    if (APP.state.get('round_started_streamer'))
                        setLastRoundStartedEvent(APP.state.get('lastRoundStartedEvent'));
                    else
                        setLastRoundStartedEvent(await gameClient.getLastRoundStartedEvent(poolId));
                }

                setPoolTimes(getPoolTimes(poolId));
                setIsLoading(false);

                roundDistributedSubs = gameClient.on(GameEvents.RoundDistributed, event => {
                    // console.log('on round distributed...');
                    APP.customer.update_balance();

                    //APP.state.set('phase_confirmed', true);
                    // let web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'))

                    // web3.eth.getBalance(APP.state.get('jackpot_address'), 'pending').then(result => {
                    //     APP.state.set('jackpot_balance',result)   
                    // });

                    // let currentRound = APP.state.get('current_round');
                    // if (currentRound.start_timestamp != 0) {
                    //     console.log('ZZ set next round timestamp to fix the graph and reset the lines/flags');
                    //     APP.state.set('nextRoundTimestamp', {
                    //         start: currentRound.start_timestamp + 1,
                    //         end: currentRound.start_timestamp + 10
                    //     });
                    // }

                    onRoundDistributed.current && onRoundDistributed.current(event);
                });

                // roundEndedSubs = gameClient.on(GameEvents.RoundEnded, event => {
                //     // console.log('on round ended...', event);
                //     return;
                //     const { poolId } = event;
                //     console.log(poolId, event?.poolId, 'ROUND ENDED..')
                //     if (poolId) return;
                //     if (APP.state.get('switched_pool') !== poolId) return;

                //     // setBetsUp([]);
                //     // setBetsDown([]);
                //     // setTotalUp(0);
                //     // setTotalDown(0);

                //     console.log("\n\n\n\n\n\n\n\n\n\",'POOLS CLEAR", '\n\n\n')

                //     let prevHistory = APP.state.get('history_list');
                //     prevHistory = (Array.isArray(prevHistory) ? prevHistory : []);
                //     const alreadyExist = prevHistory.find(item => event.timestamp === item.timestamp);

                //     // console.log('\n\n\n EVENT', event, '\n\n\n', history);
                //     const newValue = alreadyExist ? prevHistory : [event].concat(prevHistory.slice(0, 9));

                //     APP.state.set('history_list', newValue)

                //     setHistory(prevHistory => {
                //         // When round ends add the result of current round to the round history (arrows).
                //         // This prevents one item to show up twice in history and mess up last trades
                //         // TODO: find out if the item should be there (when it's there) from the first place
                //         prevHistory = (Array.isArray(prevHistory) ? prevHistory : []);
                //         const alreadyExist = prevHistory.find(item => event.timestamp === item.timestamp);
                //         const newValue = alreadyExist ? prevHistory : [event].concat(prevHistory.slice(0, 8));
                //         return newValue;
                //     });

                //     setLastRoundStartedEvent();
                //     setIsOpen(true);
                //     //APP.customer.update_balance();
                //     onRoundEndedRef.current && onRoundEndedRef.current(event);

                //     //console.log('set refreshRoundHistory');
                //     APP.state.set('refreshRoundHistory', true);

                // });

                //Logic moved to work with subscription to 
                betPlacedSubs = gameClient.on(GameEvents.TradePlaced, event => {
                    // return;

                    console.log('Bet placed subs ', new Date());

                    const { poolId: eventPoolId, sender, amount, prediction, newTotal, avatarUrl, transactionHash } = event;

                    var dir = prediction == 'UP' ? 'up' : 'down',
                        bet = { poolId, dir, newTotal, amount, address, transactionHash, /*amounts: [amount],*/ avatarUrl: avatarUrl, countryCode: countryCode, betTimestamp: new Date().getTime() };
                    let group = APP.state.get('pool.' + dir + '.positions');
                    // if (APP.state.get('wallet_address') && (event?.sender === Web3.utils.toChecksumAddress(APP.state.get('wallet_address')))) {
                    // APP.state.set('contract_signed_' + prediction.toLowerCase(), true);
                    // }

                    if (poolId !== eventPoolId) return;

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
                    APP.state.set('total_pool_' + dir, newTotal, group)

                    // let bets = APP.state.get('poolbets');
                    // APP.state.set('poolbets', [event, ...(bets ? bets : [])]);

                    //updatePoolBets();

                    // if (prediction === 'UP') {
                    //     setTotalUp(newTotal);
                    //     setBetsUp(betsUp => betsUp.concat({ address: sender, bet: amount, prediction, avatarUrl }));
                    // }

                    // else if (prediction === 'DOWN') {
                    //     setTotalDown(newTotal);
                    //     setBetsDown(betsDown => betsDown.concat({ address: sender, bet: amount, prediction, avatarUrl }));
                    // }

                    // onBetPlacedRef.current && onBetPlacedRef.current(event);

                });

                // roundStartedSubs = gameClient.on(GameEvents.RoundStarted, event => {
                //     return;
                //     console.log(poolId, event, 'ROUND STARTED..')

                //     console.log(gameClient, 'gameClient')
                //     const { poolId: eventPoolId } = event;
                //     if (APP.state.get('switched_pool') !== poolId) return;
                //     if (poolId !== eventPoolId) return;
                //     setLastRoundStartedEvent(event);
                //     setIsOpen(false);
                //     APP.customer.update_balance();
                //     onRoundStartedRef.current && onRoundStartedRef.current(event);
                // });

                betWinningsSentSub = gameClient.on(GameEvents.TradeWinningsSent, event => {
                    onBetWinningsSentRef.current && onBetWinningsSentRef.current(event)
                });

            };

            if (APP.state.get('poolsStateUpdate') === currentPool.uid) return;
            gameClient && currentPool?.uid && poolState();

        })();

        return () => {
            // roundEndedSubs && roundEndedSubs.unsubscribe()
            roundDistributedSubs && roundDistributedSubs.unsubscribe()
            // roundStartedSubs && roundStartedSubs.unsubscribe()
            betPlacedSubs && betPlacedSubs.unsubscribe()
            betWinningsSentSub && betWinningsSentSub.unsubscribe()
        };
    }, [gameClient/*, currentPool*/]);

    const onBetPlaced = callback => { onBetPlacedRef.current = callback };
    const onBetWinningsSent = callback => { onBetWinningsSentRef.current = callback };
    const onRoundStarted = callback => { onRoundStartedRef.current = callback };
    const onRoundEnded = callback => { onRoundEndedRef.current = callback };
    const onRoundDistributed = callback => { onRoundDistributedRef.current = callback };

    const nextRound = () => {

        const { open, closed } = poolTimes;
        const factor = 1000 ** 2;

        if (history[0]) {
            const lastRoundEnd = history[0];
            return {
                start: lastRoundEnd.timestamp + (open * factor),
                end: lastRoundEnd.timestamp + ((closed + open) * factor)
            };
        }

        else if (lastRoundStartedEvent) {
            return {
                start: lastRoundStartedEvent.timestamp,
                end: lastRoundStartedEvent.timestamp + (open * factor)
            };
        }

    };

    return {
        history,
        isOpen,
        betsDown,
        betsUp,
        totalDown,
        totalUp,
        isLoading,
        lastRoundStartedEvent,
        poolTimes,
        nextRound,
        onBetPlaced,
        onRoundStarted,
        onRoundEnded,
        onBetWinningsSent,
        onRoundDistributed
    };

};
