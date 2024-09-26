import React from "react";

let facebook = 'https://www.facebook.com/UpvsDownofficial',
    instagram = 'https://www.instagram.com/upvsdownofficial',
    twitter = 'https://twitter.com/UP_VS_DOWN_',
    telegram = 'https://t.me/+SIHsZPo7mGU2MTFk';

const UpVsDown = () => {

    const loadSupport = () => {

        const ic = (window as any)?.Intercom;
    
        ic('reattach_activator');
        ic('update', ic.intercomSettings);
    }
    
    return (

        <div className="socials add_support">

            <div>
                <a href={facebook} target="_blank">
                    <img src='media/images/entryscreen/facebook.png' alt="facebook" title="facebook"/>
                </a>
                <a href={instagram} target="_blank">
                    <img src='media/images/entryscreen/instagram.png' alt="instagram" title="instagram"/>
                </a>
                <a href={twitter} target="_blank">
                    <img src='media/images/entryscreen/twitter.png' alt="twitter" title="twitter"/>
                </a>
                <a href={telegram} target="_blank">
                    <img src='media/images/entryscreen/telegram.png' alt="telegram" title="telegram"/>
                </a>
            </div>

            <div id="support_btn_global" onClick={loadSupport}>
                <img src='media/images/entryscreen/support.png' alt="support" title="support"/>
            </div>
        </div>
    )
}

export default UpVsDown;