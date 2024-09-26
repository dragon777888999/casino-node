import React from 'react'
import { add_commas } from '../../utils/number';

const sliceWalletAddress = (wallet) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-5, wallet.length)}`
};

function LeaderboardWinsPaidTableRow({ partnerRef, avatarUrl, countryCode, winsPaid, rank, returned, trades,
    tradesCount, turnover, wallet, winnings, winningsCount, bgPercent, winRate }) {

    return (

        <div className="tr user_row">

            <div className="bg" style={{ width: `${bgPercent}%` }}></div>
            <div className="rank">{rank}</div>

            <div className="user">
                <div className="user-flex">
                    <div className="image_bubble">
                        <img className="user_avatar" src={avatarUrl} />
                        <div className="country"><img src={`/media/images/flags/${countryCode.toLowerCase()}.svg`} /></div>
                        {/* <div className="country"><img src="/media/images/USA_flag.svg" /></div> */}
                    </div>
                    <a className="wallet-address" /* href={`https://explorer.playblock.io/address/${wallet}`} target="_blank" */>
                        {sliceWalletAddress(wallet)}
                    </a>
                </div>
            </div>

            <div className="trades">{add_commas(tradesCount, 0)}</div>
            <div className="wins">{add_commas(winningsCount, 0)}</div>
            <div className="winrate">{winRate}%</div>
            <div className="winsPaids">{add_commas(winsPaid, 2)}</div>

        </div>

    );

};

export default React.memo(LeaderboardWinsPaidTableRow);