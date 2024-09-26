import React, { useEffect, useState } from "react";
import APP from "../../../app";
import state from "../../../state";
import Symbol from '../../../comp/shape/playblock_symbol';

const WinnerBoxMobile = ({ type, rank, month, winners, monthly }) => {

    const [stats, setStats] = useState({}),
        network = state.active_network === 'testnet' ? state.mumbai_url : state.polygonscan_url;

    // find pool stats by poolNumber
    function searchStats(poolArr, poolNum) {
        return poolArr?.find(pool => pool?.poolNumber == poolNum);
    }
    useEffect(() => {
        setStats(searchStats(winners, rank))
    }, [winners?.length])

    // if (!type || (type !== "weekly" && type !== "monthly") || !rank || !prize || !wallet) return null;
    // if (!stats?.wallet) return;

    //abbreviation for wallet address
    function cutWallet(wallet) {
        if (!wallet) return;
        return wallet.substring(0, 9) + '...' + wallet.substring(wallet.length, wallet.length - 8)
    }

    return (
        <div className={`winnerbox_${rank}`}>
            <img src={`/media/images/jackpot/${monthly ? 'mobilebrownbg.png' : 'mobilebg.png'}`} className="winnerbox_bg" />

            <div className={`winnerbox_content_${rank}`}>

                {/* User's Avatar */}
                <div className={`winnerbox_frame_avatar_${rank}`}>
                    <img src={`/media/images/jackpot/weekly-winner-${rank}-frame-bg.svg`} className={`winnerbox_frame_${rank}`} />
                    <img src={stats?.avatarUrl} className={`winnerbox_avatar_${rank}`} />
                </div>

                {/* Prize Details */}
                <div className={`winnerbox_desc_${rank}`}>
                    <p className="winnerbox_prize_header"><span>{APP.term('jackpot_weekly_winner_prize')}</span></p>
                    <div className="winnerbox_amount">
                        <Symbol/>
                        <span>{parseFloat(stats?.prize || 0).toFixed(2)}</span>
                    </div>
                    <a href={network + stats?.wallet} target='_blank' className="winnerbox_wallet">
                        <span>{cutWallet(stats?.wallet)}</span>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default WinnerBoxMobile;