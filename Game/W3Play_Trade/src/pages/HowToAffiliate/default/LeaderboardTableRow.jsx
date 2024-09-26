import React from 'react'

// import { add_commas } from '../../utils/number';
import state from '../../../state';
import num from '../../../utils/numberFormat';

const sliceWalletAddress = (wallet) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-5, wallet.length)}`;
};

function LeaderboardTableRow({ rank, wallet, perTiers, totalAmount, avatarUrl, countryCode }) {

    return (

        <div className="tr user_row">

            <div className="data rank"><span>{rank}</span></div>

            <div className="data user">
                <div className="user-flex">
                    <div className="image_bubble">
                        <img className="user_avatar" src={avatarUrl} />
                        <div className="country"><img src={`/media/images/flags/${countryCode.toLowerCase()}.svg`} /></div>
                    </div>
                    <a className="data wallet-address" href={`https://polygonscan.com/address/${wallet}`} target="_blank">
                        <span>{sliceWalletAddress(wallet)}</span>
                    </a>
                </div>
            </div>

            <div className="data tier-1"><span>{num.addCommas(parseFloat(perTiers[1]).toFixed(state.aff_leaderboard_decimal)) || 0}</span></div>
            <div className="data tier-2"><span>{num.addCommas(parseFloat(perTiers[2]).toFixed(state.aff_leaderboard_decimal)) || 0}</span></div>
            <div className="data tier-3"><span>{num.addCommas(parseFloat(perTiers[3]).toFixed(state.aff_leaderboard_decimal)) || 0}</span></div>
            <div className="data paid"><span>{num.addCommas(parseFloat(totalAmount).toFixed(state.aff_leaderboard_decimal)) || 0}</span></div>

        </div>

    );

};

export default React.memo(LeaderboardTableRow);