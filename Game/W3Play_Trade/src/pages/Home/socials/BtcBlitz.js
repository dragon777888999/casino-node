import React from "react";

const twitter = 'https://twitter.com/btcblitzcom';
const telegram = 'https://t.me/community_btc_blitz';
const telegramChat = 'https://t.me/Btcblitz_support_bot';

const BtcBlitz = ({ isMobileView }) => {

    //     <a href={telegramChat} target="_blank">
    //         <img src='media/images/entryscreen/support.png' />
    //     </a>

    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={twitter} target="_blank" className="x-twitter" alt="x-twitter"></a>
            <a href={telegram} target="_blank" className="telegram" alt="telegram"></a>
            <a href={telegramChat} target="_blank" className="telegram" alt="telegram"></a>
        </div>
    );

};

export default BtcBlitz;