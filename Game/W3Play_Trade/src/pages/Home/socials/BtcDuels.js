
import React from "react";

const discord = 'https://discord.com/invite/UQvfugky';
const telegram = 'https://t.me/btcduels';

const BtcDuels = ({ isMobileView }) => {

    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={telegram} target="_blank" className="telegram" alt="telegram"/>
            <a href={discord} target="_blank" className="discord" alt="discord"/>
        </div>
    );

};

export default BtcDuels;