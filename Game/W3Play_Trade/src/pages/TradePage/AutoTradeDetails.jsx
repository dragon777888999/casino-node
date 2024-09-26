import React from 'react';
import useAppState from '../../hooks/useAppState';
import { add_commas } from '../../utils/number';

// the auto-trade details on the trade button
function AutoTradeDetails({ dir }) {
    const { active, times_left: times, trade_investment: invest } = useAppState('customer.auto_trade', {});
    // no auto trade command active for this direction
    if (active !== dir || times < 1) return (<></>);
    return (
        <div className={`auto_trade_details ${dir}`}>
            <div className="times">{times}<span className="sign">x</span></div>
            <div className="invest">${add_commas(invest, 0)}</div>
        </div>
    )
}


export default AutoTradeDetails
