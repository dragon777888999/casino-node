import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import useAppState from '../../hooks/useAppState';
import APP from '../../app';
import PlayerPosition from './PlayerPosition';
import GroupResultsDisplay from './GroupResultsDisplay';
import AutoTradeSelect from './AutoTradeSelect';
import TradeButton from './TradeButton';
import { EtherValue, EtherValueString } from '../../utils/web3';
import { browserName } from 'react-device-detect';
import state from '../../state';
import Symbol from '../../comp/shape/playblock_symbol';
// import scientificToInteger from '../../utils/bigIntToInteger';

// const positions_sorter = multi_column(['own', 'desc', Number], ['amount', 'desc']);

const calc_payout = (total, total_side, total_other_side) => {
    const fee_percent = Number(APP.state.get('game_fee_percent')),
        jackpot_fee_percent = Number(APP.state.get('game_jackpot_fee_percent'));

    if (!total || !total_side || total == total_side) return 1;
    //return (200 - fee_percent) / 100;
    // const calc = (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })) * 100 - fee_percent + 100;

    let calc = (EtherValue({ wei: total_other_side }) + EtherValue({ wei: total_side })) * ((100 - fee_percent - jackpot_fee_percent) / EtherValue({ wei: total_side }));
    // let calc = (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })) * (100 - fee_percent - jackpot_fee_percent) + 100;


    // return Number(calc / 100).toFixed(2);
    return parseInt(calc);
}

function newRoundVal(currentRoundPhaseFromGameController) {
    if (currentRoundPhaseFromGameController === "ExpirationPhase") return 'pending';
    else return 'open';
}

function PoolSide({ dir, isMobile, disabled }) {

    const positions = useAppState('pool.' + dir + '.positions');
    const otherDirection = (dir == 'down') ? 'up' : 'down';
    const otherPositions = useAppState('pool.' + otherDirection + '.positions');

    const _totalSide = Object.values(positions).reduce(
        (acc, curVal) => acc + curVal.amount,
        0,
    );

    const _totalOtherSide = Object.values(otherPositions).reduce(
        (acc, curVal) => acc + curVal.amount,
        0,
    );
    const totalSide = useAppState('total_pool_' + dir) || _totalSide;
    const totalOtherSide = useAppState('total_pool_' + otherDirection) || _totalOtherSide;

    // console.log(dir, Object.keys(positions), Object.keys(otherPositions), 'POOL LENGTH')

    // var sidesPoolId = useAppState('pool.poolId');
    const show_result = useAppState('show_result');

    const currentRoundPhaseFromGameController = useAppState('round_current_state');
    const end_round_pool_id = useAppState('end_round_pool_id');
    let phase = newRoundVal(currentRoundPhaseFromGameController);

    const chat_open = useAppState('chat_open');
    // const phase_confirmed = useAppState('phase_confirmed');
    // const bets = useAppState('pool.' + dir + '.positions');
    // FOR HIDING LAST ROUNDS BETS WHEN UI IS WAITING FOR NEXT ROUND
    // let bets_to_show = /*(phase == 'open' && phase_confirmed == false) ? false :*/ positions; // RETURN BACK
    // var sorted = positions ? Object.values(positions).sort(positions_sorter) : [];
    const num_players = positions ? Object.entries(positions).length : 0;
    const players_count = Object.entries(positions)?.length || 0;
    const myWalletAddress = useAppState('wallet_address');
    const myWalletLowerCase = String('myWalletAddress').toLowerCase();
    const smallDevice = window.innerWidth < 380;
    const metamask = navigator.userAgent.includes("MetaMaskMobile");
    const coinbase = browserName.toLowerCase() === 'webkit';
    const coinbaseAndroid = browserName.toLowerCase() === 'chrome webview';
    const walletBrowser = metamask || coinbase || coinbaseAndroid;

    // set new user trade at first of the list
    let newBetsObj = [];
    let myElementIndex = -1;

    const betsKeys = Object.keys(positions);

    const updateResults = useCallback(() => {
        let currentPoolId = APP.state.get('currentPoolId');
        if (phase === 'pending' && !(APP.state.get('pools_result_mounted_' + dir))) {
            APP.state.set('round_result_' + dir + currentPoolId, { totalSide, players_count, totalOtherSide })
            APP.state.set('pools_result_mounted_' + dir + currentPoolId, true)
        }
    }, [phase, num_players])

    useEffect(() => {
        updateResults();
    }, [phase, num_players])

    if (betsKeys.length) {

        for (let i = 0; i < betsKeys.length; i++) {
            if (betsKeys[i] !== myWalletLowerCase) continue;
            newBetsObj[betsKeys[i]] = Object.values(positions)[i];
            myElementIndex = i;
        }

        for (let i = 0; i < betsKeys.length; i++) {
            if (i === myElementIndex) continue;
            newBetsObj[betsKeys[i]] = Object.values(positions)[i];
        }
    }

    const renderGroupResultsDisplay = () => {
        // console.log(end_round_pool_id, APP.state.get('switched_pool'), 'PPP')
        if (/*phase == 'open' &&*/ APP.state.get('did_round_end_once') && (end_round_pool_id === APP.state.get('switched_pool'))) {
            return <GroupResultsDisplay dir={dir} />;
        }
    }

    // make sure own trade is will seen at 1st position
    function ensureFirst(array, key, value) {

        // new arr without my own avatar
        const filteredArray = array.filter(innerArray => innerArray[1][key]?.toLowerCase() !== value),

            // find my own avatar inside the specific array its exist in
            targetArray = array.find(innerArray => innerArray[1][key]?.toLowerCase() === value);

        // add my avatar to the beginning of the filtered array, if it exists
        if (targetArray) {
            filteredArray.push(targetArray);
        }
      
        return filteredArray.reverse();
    }

    // make own bets be first in the list
    function sortingList(arr) {

        if (!arr?.length) return [];

        const flatArray = arr.flat(Infinity),
            exists = flatArray.includes(myWalletAddress?.toLowerCase());

        let newArray = arr.sort((a, b) => {
            const aValue = a.flat().includes(myWalletAddress?.toLowerCase());
            const bValue = b.flat().includes(myWalletAddress?.toLowerCase());

            if (aValue && !bValue) {
                return -1;
            } else if (!aValue && bValue) {
                return 1;
            } else {
                return 0;
            }
        });

        let reversedArr = newArray.slice(1).reverse(),
            array = arr.slice(0, 1).concat(reversedArr),

            keyToCheck = 'address',
            valueToEnsure = myWalletAddress?.toLowerCase();

        // in case of diff array format is recieved
        const myTradePlaced = array.filter(innerArray => innerArray[1][keyToCheck]?.toLowerCase() === valueToEnsure);

        if (exists || myTradePlaced?.length) {
            return ensureFirst(arr, keyToCheck, valueToEnsure);
        }
        else return arr.reverse();
    }

    return (

        <div className={"pool_side " + dir + (isMobile ? ('mobile_' + dir) : '')} disabled={disabled}>
            <div className="pool">

                <div className="pool_header">

                    <div className="title">
                        {APP.term(dir + '_pool_title')} {APP.term('pool_title_treasury')}
                    </div>

                    <div className="player_num">
                        <div className="det_title">{APP.term('players')}</div>
                        {/* {num_players} */}
                        <div className='det_num'>{num_players}</div>
                    </div>

                    <div className={"pool_size " + dir + ' ' + (smallDevice ? dir + '_small_device' : '')} style={{ width: walletBrowser ? '24vw' : '' }}>
                        <div className={`amount ${dir}`} style={{ width: chat_open ? '12vw' : '' }}>
                            <Symbol />
                            <EtherValue wei={totalSide} />
                        </div>
                    </div>

                </div>
        
                <div className="players" side={dir}>
                    <div className="scroll" side={dir}>
                        {sortingList(positions && Object.entries(positions)
                            .slice(0, state.poolBetAmount))
                            .map(([address, bet]) =>
                                <PlayerPosition
                                    key={/*address ||*/ bet?.address}
                                    bet={bet}
                                    id={/*address ||*/ bet?.address}
                                    dir={dir}
                                    amount={bet.amount}
                                    avatarUrl={bet.avatarUrl}
                                    countryCode={bet.countryCode} />)}
                    </div>
                </div>

                {show_result && (renderGroupResultsDisplay(totalSide, totalOtherSide, players_count))}
                <AutoTradeSelect dir={dir} />

            </div>
            <TradeButton dir={dir} isMobile={isMobile} />
        </div>

    );

};

export default PoolSide;