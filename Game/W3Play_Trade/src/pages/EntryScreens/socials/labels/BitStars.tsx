
import React from "react";

let facebook = 'https://www.facebook.com/profile.php?id=61550246213973',
    instagram = 'https://www.instagram.com/bitstars.io',
    twitter = 'https://x.com/Bitstars_io',
    telegram = 'https://web.telegram.org/k/#@cryptoktraders';

const BitStars = () => {

    const pathname = window.location.pathname,

        loadSupport = () => {
            const ic = (window as any)?.Intercom;

            ic('reattach_activator');
            ic('update', ic.intercomSettings);
        }

    return (
        <>
            {pathname !== '/' ?
                // menu
                <div className={"socials add_support"}>
                    <div>
                        <a href={twitter} target="_blank">
                            <img src='media/images/entryscreen/twitter.png' />
                        </a>
                        <a href={instagram} target="_blank">
                            <img src='media/images/entryscreen/instagram.png' />
                        </a>
                        <a href={telegram} target="_blank">
                            <img src='media/images/entryscreen/telegram.png' />
                        </a>
                        <a href={facebook} target="_blank">
                            <img src='media/images/entryscreen/facebook.png' />
                        </a>
                    </div>
                    <div id="support_btn_global" onClick={loadSupport}>
                        <img src='media/images/entryscreen/support.png' />
                    </div>
                </div>
                :
                // entry screen
                <div className="socials">
                    <a href={twitter} target="_blank">
                        <img src='media/images/entryscreen/twitter.png' />
                    </a>
                    <a href={instagram} target="_blank">
                        <img src='media/images/entryscreen/instagram.png' />
                    </a>
                    <a href={telegram} target="_blank">
                        <img src='media/images/entryscreen/telegram.png' />
                    </a>
                    <a href={facebook} target="_blank">
                        <img src='media/images/entryscreen/facebook.png' />
                    </a>
                </div>}
        </>
    )
}

export default BitStars;