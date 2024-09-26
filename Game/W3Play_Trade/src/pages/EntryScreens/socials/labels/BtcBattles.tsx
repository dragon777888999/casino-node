import React from "react";

let twitter = 'https://twitter.com/BTC_Battles',
    instagram = 'https://instagram.com/btcbattles?igshid=MjEwN2IyYWYwYw==',
    telegram = 'https://t.me/BTCBattles',
    discord = 'https://discord.gg/AXmpEqyPhp';

const BtcBattles = () => (

    <div className="socials">
        <a href={twitter} target="_blank">
            <img src='media/images/entryscreen/twitter.png' />
        </a>
        <a href={instagram} target="_blank">
            <img src='media/images/entryscreen/instagram.png' />
        </a>
        <a href={telegram} target="_blank">
            <img src='media/images/entryscreen/telegram.png' />
        </a>
        <a href={discord} target="_blank">
            <img src='media/images/entryscreen/discord.png' />
        </a>
    </div>
)

export default BtcBattles;