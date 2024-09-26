import React from "react";

const facebook = 'https://www.facebook.com/UpvsDownofficial';
const instagram = 'https://www.instagram.com/upvsdownofficial';
const twitter = 'https://twitter.com/UP_VS_DOWN_';
const telegram = 'https://t.me/+SIHsZPo7mGU2MTFk';

const UpVsDown = ({ isMobileView }) => {
    
    return (
        <div className={`socials ${isMobileView ? 'mobile-only' : 'web-only'} flex`}>
            <a href={facebook} target="_blank" className="facebook" alt="facebook"/>
            <a href={instagram} target="_blank" className="instagram" alt="instagram"/>
            <a href={twitter} target="_blank" className="x-twitter" alt="x-twitter"/>
            <a href={telegram} target="_blank" className="telegram" alt="telegram"/>
        </div>
    );

};

export default UpVsDown;