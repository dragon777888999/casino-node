import React from 'react';
import APP from '../../app';
import { utils } from 'web3';
import useAppState from '../../hooks/useAppState';
import { EtherValue, EtherValueString } from '../../utils/web3';
import PoolDirReturn from './PoolDirReturn';
import state from '../../state';
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

    // (Total UP Bet Amount + Total DOWN Bet Amount) * (100 - Platform Fee - Jackpot Fee) / Total UP Bet Amount
    
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

const Pool = ({ dir }) => {

    let lowerCaseAddress = '',
        address = useAppState('wallet_address'),
        selected_investment = useAppState('selected_investment'),
        positionsUp = useAppState('pool.up.positions'),
        positionsDown = useAppState('pool.down.positions'),

        total_up = Object.values(positionsUp).reduce(
            (acc, curVal) => acc + curVal.amount,
            0,
        ),

        total_down = Object.values(positionsDown).reduce(
            (acc, curVal) => acc + curVal.amount,
            0,
        );

    let active_amt = findObjectWithKey(dir === 'up' ? positionsUp : positionsDown, address);

    selected_investment = active_amt ? active_amt?.amount / 100 : selected_investment;

    if (address !== '')
        lowerCaseAddress = String(address).toLowerCase();

    let up_investment = (positionsUp[lowerCaseAddress] !== undefined) ? positionsUp[lowerCaseAddress].amount / 100 : (utils.toWei(selected_investment.toString()) / 10 ** 18),
        down_investment = (positionsDown[lowerCaseAddress] !== undefined) ? positionsDown[lowerCaseAddress].amount / 100 : (utils.toWei(selected_investment.toString()) / 10 ** 18),

        investment = ((dir == 'up') ? up_investment : down_investment),

        totalOtherSide = (dir === 'up') ? total_down : total_up,
        totalSide = (dir === 'up') ? total_up : total_down,

        // payout_percent_up = calc_payout(total_up + total_down, total_up, 'up', total_down),
        // payout_percent_down = calc_payout(total_up + total_down, total_down, 'down', total_up),
        payout_percent = calc_payout(total_up + total_down, totalSide, dir, totalOtherSide);


    if (isNaN(payout_percent)) payout_percent = 200; //200 - Number(APP.state.get('game_fee_percent'));

    let payout = investment ? (Number((investment * (payout_percent / 100)).toFixed(2)) + Number(investment)) : 0;

    // console.log(payout_percent, 'payout_percent')

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

    //search for own bets
    function searchBets(dir, positionsUp, positionsDown, address) {

        // make sure all wallet address are in lowercase
        const toLowerCaseKeys = (obj) =>
            Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
            );

        const lowerCasePositionsUp = toLowerCaseKeys(positionsUp);
        const lowerCasePositionsDown = toLowerCaseKeys(positionsDown);

        if (dir === 'up' && lowerCasePositionsUp[address]) return lowerCasePositionsUp[address].amount;

        else if (dir === 'down' && lowerCasePositionsDown[address]) return lowerCasePositionsDown[address].amount;

        else return 0;
    }

    return (
        <div className={dir + '_pool'}>
            <p>{APP.term(dir + '_dir_mobile')} {APP.term('POOL')}</p>
            <p>
                {parseFloat(payoutMinusInvestment).toFixed(2)}
                {/* <EtherValue wei={parseFloat(payoutMinusInvestment} network={state.active_network === 'testnet' ? 2 : 1} /> */}
                <span>(<EtherValue wei={searchBets(dir, positionsUp, positionsDown, address?.toLowerCase())} />)</span>
            </p>
            <p><PoolDirReturn returnedPercent={true} dir={dir === 'down' ? 'down' : 'up'} />%</p>
        </div>
    )
}

export default Pool;