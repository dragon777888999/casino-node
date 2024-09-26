import React from 'react'
import { add_commas } from '../../../utils/number';

const sliceWalletAddress = (wallet) => {
    return `${wallet.slice(0, 5)}...${wallet.slice(-5, wallet.length)}`
};

function LeaderboardTableRow({ partnerRef, avatarUrl, countryCode, profit, rank, returned, trades,
    tradesCount, turnover, wallet, winnings, winningsCount, bgPercent, winRate }) {

    //console.log('bgPercent', bgPercent);

    return (

        <div className="tr user_row">

            <div className="bg" style={{ width: `${bgPercent}%` }}></div>
            <div className="data rank"><span>{rank}</span></div>

            <div className="data user">
                <div className="user-flex">
                    <div className="image_bubble">
                        <img className="user_avatar" src={avatarUrl} />
                        <div className="country"><img src={`/media/images/flags/${countryCode.toLowerCase()}.svg`} /></div>
                        {/* <div className="country"><img src="/media/images/USA_flag.svg" /></div> */}
                    </div>
                    <a className="data wallet-address" href={`https://polygonscan.com/address/${wallet}`} target="_blank">
                        <span>{sliceWalletAddress(wallet)}</span>
                    </a>
                </div>
            </div>

            <div className="data trades"><span>{add_commas(tradesCount, 0)}</span></div>
            <div className="data wins"><span>{add_commas(winningsCount, 0)}</span></div>
            <div className="data winrate"><span>{winRate}%</span></div>
            <div className="data profits"><span>{add_commas(profit, 2)}</span></div>

        </div>

    );

};

export default React.memo(LeaderboardTableRow);