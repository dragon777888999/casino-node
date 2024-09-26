import React from "react";

const twitter = 'https://twitter.com/BTC_Battles';
const instagram = 'https://instagram.com/btcbattles?igshid=MjEwN2IyYWYwYw==';
const telegram = 'https://t.me/BTCBattles';
const discord = 'https://discord.gg/AXmpEqyPhp';

const BtcBattles = ({ isMobileView }) => {

    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={twitter} target="_blank" className="x-twitter" alt="x-twitter"/>
            <a href={instagram} target="_blank" className="instagram" alt="instagram"/>
            <a href={telegram} target="_blank" className="telegram" alt="telegram"/>
            <a href={discord} target="_blank" className="discord" alt="discord"/>
        </div>
    );
    
};

export default BtcBattles;