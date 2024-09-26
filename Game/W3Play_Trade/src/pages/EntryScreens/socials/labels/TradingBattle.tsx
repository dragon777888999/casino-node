
import React from "react";

let instagram = 'https://www.instagram.com/tradingbattle.io',
    telegram = 'https://t.me/tradingbattle',
    tiktok = 'https://www.tiktok.com/@tradingexam',
    youtube = 'https://www.youtube.com/@tradingface_yt';

const TradingBattle = () => (

    <div className="socials">
        <a href={instagram} target="_blank">
            <img src='media/images/entryscreen/instagram.png' />
        </a>
        <a href={telegram} target="_blank">
            <img src='media/images/entryscreen/telegram.png' />
        </a>
        <a href={tiktok} target="_blank">
            <img src='media/images/entryscreen/tiktok.png' />
        </a>
        <a href={youtube} target="_blank">
            <img src='media/images/entryscreen/youtube.png' />
        </a>
    </div>
)

export default TradingBattle;