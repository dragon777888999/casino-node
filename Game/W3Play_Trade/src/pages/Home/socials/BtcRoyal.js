
import React from "react";

const twitter = 'https://twitter.com/BTC__Royal';
const instagram = 'https://www.instagram.com/btcroyal.io/';
const facebook = 'https://www.facebook.com/profile.php?id=61551055876369';
const tiktok = 'https://www.tiktok.com/@btc_royal?_t=8foLj9h0zuk';

const BtcRoyal = ({ isMobileView }) => {

    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={twitter} target="_blank" className="x-twitter" alt="x-twitter"/>
            <a href={instagram} target="_blank" className="instagram" alt="instagram"/>
            <a href={facebook} target="_blank" className="facebook" alt="facebook"/>
            <a href={tiktok} target="_blank" className="tiktok" alt="tiktok"/>
        </div>
    );
    
};

export default BtcRoyal;