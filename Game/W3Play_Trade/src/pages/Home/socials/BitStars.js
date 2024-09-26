
import React from "react";

const facebook = 'https://www.facebook.com/profile.php?id=61550246213973';
const instagram = 'https://www.instagram.com/bitstars.io';
const twitter = 'https://twitter.com/Bitstars_io';
const telegram = 'https://t.me/BitstarsTeam';

const BitStars = ({ isMobileView }) => (
    <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
        <a href={twitter} target="_blank" className="x-twitter" alt="x-twitter"/>
        <a href={instagram} target="_blank" className="instagram" alt="instagram"/>
        <a href={telegram} target="_blank" className="telegram" alt="telegram"/>
        <a href={facebook} target="_blank" className="facebook" alt="facebook"/>
    </div>
);

export default BitStars;