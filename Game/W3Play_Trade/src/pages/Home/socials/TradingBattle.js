
import React from "react";

const instagram = 'https://www.instagram.com/tradingbattle.io';
const telegram = 'https://t.me/tradingbattle';
const tiktok = 'https://www.tiktok.com/@tradingexam';
const youtube = 'https://www.youtube.com/@tradingface_yt';

const TradingBattle = ({ isMobileView }) => {

    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={telegram} target="_blank" className="telegram" alt="telegram"/>
            <a href={instagram} target="_blank" className="instagram" alt="instagram"/>
            <a href={tiktok} target="_blank" className="tiktok" alt="tiktok"/>
            <a href={youtube} target="_blank" className="youtube" alt="youtube"/>
        </div>
    );

};

export default TradingBattle;