import React, { useEffect, useState } from "react";
import APP from "../../../app";
import state from "../../../state";
import Symbol from '../../../comp/shape/playblock_symbol';

const WinnerBox = ({ type, rank, month, winners, monthly }) => {

    const [stats, setStats] = useState({}),
        network = state.active_network === 'testnet' ? state.mumbai_url : state.polygonscan_url;

    // find pool stats by poolNumber
    function searchStats(poolArr, poolNum) {
        return poolArr?.find(pool => pool?.poolNumber == poolNum);
    }
    useEffect(() => {
        setStats(searchStats(winners, rank))
    }, [winners])

    // if (!type || (type !== "weekly" && type !== "monthly") || !rank || !prize || !wallet) return null;
    // if (!stats?.wallet) return;

    //abbreviation for wallet address
    function cutWallet(wallet) {
        if (!wallet) return;
        return wallet.substring(0, 9) + '...' + wallet.substring(wallet.length, wallet.length - 8)
    }

    return (
        <div className={`winner ${type}-winner winner-${rank} ${monthly ? 'monthly' : ''}`}>

            {(type === "monthly" && month) && <div className="month"><span>{month}</span></div>}
            <div className="pic">
                <img src={stats?.avatarUrl} />
            </div>
            <div className="frame"></div>

            <div className="caption">
                <span>{type === "weekly" ? APP.term('jackpot_weekly_winner_prize') : APP.term('jackpot_monthly_winner_prize')}</span>
            </div>

            <div className="amount">
                <Symbol/>
                <span>{parseFloat(stats?.prize || 0).toFixed(2)}</span>
            </div>

            <div className="wallet">
                <span>
                    <a href={network + stats?.wallet} target='_blank'>
                        {cutWallet(stats?.wallet)}
                    </a>
                </span>
            </div>

        </div>
    );
};

export default WinnerBox;