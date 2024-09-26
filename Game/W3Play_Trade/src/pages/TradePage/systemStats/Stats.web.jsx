import React from 'react';
import APP from '../../../app';
import handleNum from '../../../utils/systemStats/handleNum';
import AnimatedNumber from 'react-animated-number';
import state from '../../../state';
import numFormat from '../../../utils/systemStats/numFormat';
import Symbol from '../../../comp/shape/playblock_symbol';

const Stats = ({ ratio24H, activePlayers24H, distributedAmount24H, distributedAmountAllTime }) => {

    return (
        <div className="web_system_stats">
            {/* <span className="main_header_title">{APP.term('last_results')}</span> */}

            {/* 24H WIN RATIO */}
            <span className="main_title">{APP.term('gen_stats_24_win_ratio')}</span>
            <span className="sys_sub_title">
                <AnimatedNumber value={Number(handleNum(ratio24H, false))}
                    style={{ transition: '.8s ease-out' }}
                    duration={3000}
                    formatValue={(value) => value.toFixed(2)}
                />%
            </span>

            {/* PLAYERS */}
            <span className="sys_title">{APP.term('gen_stats_players')} </span>
            <span className="sys_sub_title">
                <AnimatedNumber component="text" value={Number(handleNum(activePlayers24H, true))}
                    style={{ transition: '.8s ease-out' }}
                    duration={3000}
                    formatValue={(value) => parseInt(value.toFixed(0))}
                />
            </span>

            {/* WINS PAID */}
            <span className="sys_title">{APP.term('gen_stats_wins_paid')}</span>
            <span className="sys_sub_title">
                <Symbol />
                <AnimatedNumber component="text" value={Number(handleNum(distributedAmount24H, true))}
                    style={{ transition: '.8s ease-out' }}
                    duration={3000}
                    formatValue={val => numFormat(val, 2)}
                />
            </span>

            {/* ALL TIME WINS */}
            <span className="sys_title_gold">{APP.term('gen_stats_wins')}</span>
            <span className="sys_sub_title">
                <Symbol />
                <AnimatedNumber component="text" value={Number(handleNum(distributedAmountAllTime, true))}
                    style={{ transition: '.8s ease-out' }}
                    duration={3000}
                    formatValue={val => numFormat(val, 2)}
                />
            </span>
        </div>
    )
}
export default React.memo(Stats, ({ prev, ratio24H }) => prev === ratio24H);