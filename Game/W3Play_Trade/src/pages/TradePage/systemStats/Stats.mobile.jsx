import React, { useEffect, useState } from 'react';
import APP from '../../../app';
import handleNum from '../../../utils/systemStats/handleNum';

const Stats = ({ ratio24H, activePlayers24H, distributedAmount24H, distributedAmountAllTime }) => {

    const [showComponentA, setShowComponentA] = useState(true);

    // activePlayers24H = activePlayers24H;

    useEffect(() => {
        const interval = setInterval(() => {
            setShowComponentA((prevShowComponentA) => !prevShowComponentA);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mobile_system_stats">

            <div className={`anim_box ${showComponentA ? 'componentB' : 'componentA'}`}>
                {/* <span className="main_header_title">{APP.term('last_results')}</span> */}
                <span className="sys_title_gold">
                    <p>{APP.term('gen_stats_wins_mobile')}</p>
                    {/* <div className="icon-matic" /> */}
                    <p amt="true">{handleNum(distributedAmountAllTime, false, true)}</p>
                </span>
                <span className="sys_title">{APP.term('gen_stats_live_stats_mobile')}</span>
                <span className="sys_sub_title">{handleNum(activePlayers24H, true)}</span>
                {/* <span className="sys_sub_title_gold"><div className="icon-matic" />{handleNum(distributedAmountAllTime, false)}</span> */}
            </div>

            <div className={`anim_box ${showComponentA ? 'componentA' : 'componentB'}`}>
                {/* <span className="main_header_title">{APP.term('last_results')}</span> */}
                <span className="main_title">{APP.term('gen_stats_win_ratio_mobile')}</span>
                <span className="sys_sub_title">{`${handleNum(ratio24H, false)}%`}</span>
                <span className="main_title">{APP.term('gen_stats_wins_paid_mobile')}</span>
                <span className="sys_sub_title">{handleNum(distributedAmount24H, false)}</span>
            </div>
        </div>
    )
}
export default React.memo(Stats);