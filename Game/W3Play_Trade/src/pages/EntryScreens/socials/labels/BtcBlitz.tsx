import React from "react";

let twitter = 'https://twitter.com/btcblitzcom',
    telegram = 'https://t.me/community_btc_blitz',
    telegramChat = 'https://t.me/Btcblitz_support_bot';

const BtcBlitz = () => (

    <div className="socials">
        <a href={twitter} target="_blank">
            <img src='media/images/entryscreen/twitter.png' />
        </a>
        <a href={telegram} target="_blank">
            <img src='media/images/entryscreen/telegram.png' />
        </a>
        <a href={telegramChat} target="_blank">
            <img src='media/images/entryscreen/support.png' />
        </a>
    </div>
)

export default BtcBlitz;