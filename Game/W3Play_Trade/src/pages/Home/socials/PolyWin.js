
import React from "react";

const twitter = 'https://twitter.com/Polywin8';
const instagram = 'https://www.instagram.com/polywin8';
const telegram = 'https://t.me/polywin8';

const PolyWin = ({ isMobileView }) => {

    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={twitter} target="_blank" className="x-twitter" alt="x-twitter"/>
            <a href={instagram} target="_blank" className="instagram" alt="instagram"/>
            <a href={telegram} target="_blank" className="telegram" alt="telegram"/>
        </div>
    );
    
};

export default PolyWin;