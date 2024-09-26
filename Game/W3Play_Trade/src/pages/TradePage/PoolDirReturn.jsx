import React, { useState } from 'react';
import APP from '../../app';
import useAppState from '../../hooks/useAppState';
import state from '../../state';
import { EtherValue } from '../../utils/web3';
import { utils } from 'web3';
import Bets from './Bets';
import Symbol from '../../comp/shape/playblock_symbol';
import ErrorBoundary from '../../comp/ErrorBoundary';

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function calc_payout(total, total_side, dir, total_other_side) {
    var fee_percent = Number(APP.state.get('game_fee_percent')),
        jackpot_fee_percent = Number(APP.state.get('game_jackpot_fee_percent'));

    if (!total || !total_side || total == total_side) {
        //return (200 - fee_percent);
        return 200;
    }

    // let calc = (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })).toFixed(5) * 100 - fee_percent + 100;
    let calc = (EtherValue({ wei: total_other_side }) + EtherValue({ wei: total_side })) * ((100 - fee_percent - jackpot_fee_percent) / EtherValue({ wei: total_side }));
    // let calc = (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })) * (100 - fee_percent - jackpot_fee_percent) + 100;

    return parseInt(calc)
    // return round(calc, 2);
}


// return (
// <div className="stats">
//     <OwnPositionStats dir="up"
//         total={total_up + total_down} totalSide={total_up} totalOtherSide={total_down}
//         investment={(bets_up[lowerCaseAddress] !== undefined) ? bets_up[lowerCaseAddress].amount : utils.toWei(investment.toString())} />
//     <OwnPositionStats dir="down"
//         total={total_up + total_down} totalSide={total_down} totalOtherSide={total_up}
//         investment={(bets_down[lowerCaseAddress] !== undefined) ? bets_down[lowerCaseAddress].amount : utils.toWei(investment.toString())} />
// </div>


const PoolDirReturn = ({ dir, returnedPercent }) => {

    let lowerCaseAddress = '',
        address = useAppState('wallet_address'),
        totalSideUp = useAppState('total_pool_up'), //totalSide
        totalSideDown = useAppState('total_pool_down'),
        selected_investment = useAppState('selected_investment'),
        {
            total,
            up: { total: total_up, positions: bets_up },
            down: { total: total_down, positions: bets_down }
        } = useAppState('pool'),

        _total_down = totalSideDown || total_down,
        _total_up = totalSideUp || total_up;

    // const totalSideUp = useAppState('total_pool_up'); //totalSide
    // const totalSideDown = useAppState('total_pool_down');

    if (address !== '')
        lowerCaseAddress = String(address).toLowerCase();

    let up_investment = (bets_up[lowerCaseAddress] !== undefined) ? bets_up[lowerCaseAddress].amount : utils.toWei(selected_investment.toString()),
        down_investment = (bets_down[lowerCaseAddress] !== undefined) ? bets_down[lowerCaseAddress].amount : utils.toWei(selected_investment.toString()),
        investment = (dir == 'up') ? up_investment : down_investment,

        // totalOtherSide = (dir === 'up') ? total_down : total_up,
        // totalSide = (dir === 'up') ? total_up : total_down,

        payout_percent_up = calc_payout(_total_up + _total_down, _total_up, 'up', _total_down),
        payout_percent_down = calc_payout(_total_up + _total_down, _total_down, 'down', _total_up),
        payout_percent = calc_payout(_total_up + _total_down, _total_up, dir, _total_down);

    // payout = investment ? (Number((investment * (payout_percent / 100)).toFixed(2)) + Number(investment)) : 0;

    if (isNaN(payout_percent)) payout_percent = 200; //200 - Number(APP.state.get('game_fee_percent'));

    // console.log(payout_percent, 'payout_percent')

    function percentByDir(dir, down_percent, up_percent) {
        let _up_ = (isNaN(up_percent)) ? 0 : up_percent.toFixed(0);
        let _down_ = (isNaN(down_percent)) ? 0 : down_percent.toFixed(0);

        if (dir === 'up') return _up_;
        else if (dir === 'down') return _down_;
    }

    function totalDirPlayers(dir) {
        if (dir === 'down') return Object.entries(bets_down)?.length || 0;
        else if (dir === 'up') return Object.entries(bets_up)?.length || 0;
    }

    function calc_payout_min_invst(dir) {
        if (dir === 'down') return APP.state.get('total_pool_' + dir) || Object.entries(bets_down).reduce((acc, curVal) => acc + curVal[1]?.amount, 0);
        else if (dir === 'up') return APP.state.get('total_pool_' + dir) || Object.entries(bets_up).reduce((acc, curVal) => acc + curVal[1]?.amount, 0);
    }

    return (

        !returnedPercent
            ?
            <div className={"pools_side " + ('mobile_' + dir)}>

                <div className={"pool_top_" + dir}>

                    <p className={"pool_return_amt_" + dir}>
                        <Symbol />
                        <span><EtherValue wei={calc_payout_min_invst(dir)} /></span>
                        {/* <EtherValue wei={payoutMinusInvestment} network={state.active_network === 'testnet' ? 5 : 2} /> */}
                    </p>

                    <div className="pool_players">
                        <p className="pool_players_amt"><span>{totalDirPlayers(dir)}</span></p>
                        <p className="players"><span>{APP.term('header_players')}</span></p>
                    </div>

                </div>

                {/* <div> */}
                <ErrorBoundary>
                    <Bets dir={dir} />
                </ErrorBoundary>
                {/* </div> */}
                {/* <p className={"pool_return_desc " + (dir === 'down' ? 'pool_dir_down' : '')}>
                    {dir === 'up' ? APP.term('up_return') : APP.term('down_return')}
                </p> */}

            </div>
            :
            percentByDir(dir, payout_percent_down, payout_percent_up)

    );

};

export default React.memo(PoolDirReturn);