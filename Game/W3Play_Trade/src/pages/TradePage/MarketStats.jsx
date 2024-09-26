
import React from 'react';
import OwnPositionStats from './OwnPositionStats';
import useAppState from '../../hooks/useAppState';
import { utils } from 'web3';

function MarketStats() {

    let lowerCaseAddress = '',
        address = useAppState('wallet_address'),
        investment = useAppState('selected_investment'),

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

    if (address !== '')
        lowerCaseAddress = String(address).toLowerCase();

    return (
        <div className="stats">
            <OwnPositionStats dir="up"
                total={total_up + total_down} totalSide={total_up} totalOtherSide={total_down}
                investment={(positionsUp[lowerCaseAddress] !== undefined) ? positionsUp[lowerCaseAddress].amount / 100 : (utils.toWei(investment.toString()) / 10 ** 18)} />
            <OwnPositionStats dir="down"
                total={total_up + total_down} totalSide={total_down} totalOtherSide={total_up}
                investment={(positionsDown[lowerCaseAddress] !== undefined) ? positionsDown[lowerCaseAddress].amount / 100 : (utils.toWei(investment.toString()) / 10 ** 18)} />
        </div>
    );

};

export default MarketStats;