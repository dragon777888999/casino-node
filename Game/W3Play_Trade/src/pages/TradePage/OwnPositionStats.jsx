
import React, { useState, useEffect } from 'react'
import { EtherValue, EtherValueString } from '../../utils/web3';
import APP from '../../app';
import useAppState from './../../hooks/useAppState';
import { utils } from 'web3';
import state from '../../state';
import Symbol from '../../comp/shape/playblock_symbol';
import useIsDemoModeActive from '../../utils/demo/useIsDemoModeActive';

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function calc_payout(total, total_side, dir, total_other_side) {
    var fee_percent = Number(APP.state.get('game_fee_percent')),
        jackpot_fee_percent = Number(APP.state.get('game_jackpot_fee_percent'));

    const isDemoModeActive = useIsDemoModeActive();

    if (!total || !total_side || total == total_side) {
        //return (200 - fee_percent);
        return 200;
    }

    // let calc = (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })).toFixed(5) * 100 - fee_percent + 100;

    let calc = isDemoModeActive
        ? (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })) * (100 - fee_percent - jackpot_fee_percent) + 100 // demo mode
        : (EtherValue({ wei: total_other_side }) + EtherValue({ wei: total_side })) * ((100 - fee_percent - jackpot_fee_percent) / EtherValue({ wei: total_side })); // real mode

    // let calc = (EtherValue({ wei: total_other_side }) + EtherValue({ wei: total_side })) * ((100 - fee_percent - jackpot_fee_percent) / EtherValue({ wei: total_side }));
    // let calc = (EtherValue({ wei: total_other_side }) / EtherValue({ wei: total_side })) * (100 - fee_percent - jackpot_fee_percent) + 100;

    return parseInt(calc)
    // return round(calc, 2);
}

const findObjectWithKey = (obj, key) => {
    for (const [k, v] of Object.entries(obj)) {
        //  object that matches the key
        if (k === key) {
            return v;
        }
    }
    // null if no matching key is found
    return null;
};

function OwnPositionStats({ dir, total, totalSide, investment, totalOtherSide }) {
    const show_result = useAppState('show_result'),

        wallet_address = APP.state.get('wallet_address'),
        positions = useAppState(`pool.${dir}.positions`);
    // positionsDown = useAppState('pool.down.positions');

    // console.log(positionsDownwallet_address]?.amount / 3, 'down...', investment)

    // amount that is already inside the pool (taken amount)
    // calc will be based on clicked amount whenver trade isnt taken yet
    let active_amt = findObjectWithKey(positions, wallet_address);

    investment = active_amt ? active_amt?.amount / 100 : investment;

    // investment = investment / 10 ** 16;

    var [investClass, setInvestClass] = useState("invst_amount"),
        payout_percent = calc_payout(total, totalSide, dir, totalOtherSide),
        payout = investment ? (Number((investment * (payout_percent / 100)).toFixed(2)) + Number(investment)) : 0;

    if (isNaN(payout_percent)) payout_percent = 200; //200 - Number(APP.state.get('game_fee_percent'));


    // useEffect(() => {
    //     // if (!investment) return;
    //     // setInvestClass("amount updated");
    //     // let timeout = setTimeout(() => setInvestClass("amount"), 50);
    //     // return () => clearTimeout(timeout);
    // }, [investment]);

    let payoutMinusInvestment = 0;

    if (payout == Infinity) {
        payout = 0;
        payoutMinusInvestment = 0;
    } else {
        payoutMinusInvestment = payout - investment;
    }

    //If payout percent is 100 = no trades, set your investment and potential return to current trade amount
    if (payout_percent == 200)
        payoutMinusInvestment = investment;
    else {
        payoutMinusInvestment = payout - investment;
    }

    // useEffect to set payout percent in state
    useEffect(() => {
        if (!show_result) {
            if (dir === 'up') {
                APP.state.set('payout_percent_up', parseFloat(payout_percent).toFixed(0));
                // console.log('11- up :', parseFloat(payout_percent).toFixed(0));
            }
            else { // down
                APP.state.set('payout_percent_down', parseFloat(payout_percent).toFixed(0));
                // console.log('11- down :', parseFloat(payout_percent).toFixed(0));
            }
        }
        // console.log('11- ', APP.state.get('customer'));
    }, [payout_percent]);

    return (
        <div className={`side ${dir}`}>
            <div className="pool_payout">
                <div className="title">{APP.term('pool_payout_percent_' + dir)}</div>
                <div className={"amount " + dir}>
                    {(isNaN(payout_percent)) ? 0 : payout_percent.toFixed(0)}
                    <span className="sign">%</span>
                </div>
            </div>
            <div className="own_stats">
                <div className="investment">
                    <div className="title">{APP.term('your_investment')}</div>
                    <div className="invst_amount">
                        <Symbol />
                        {parseFloat(investment).toFixed(0)}
                    </div>
                </div>
                <div className="payout">
                    <div className="title">{APP.term('position_payout_amount')}</div>
                    <div className="amount">
                        <Symbol />
                        {parseFloat(payoutMinusInvestment).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnPositionStats;