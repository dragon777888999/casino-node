
import React from "react";

let discord = 'https://discord.com/invite/UQvfugky',
    telegram = 'https://t.me/btcduels';

const BtcDuels = () => {

    const loadSupport = () => {

        const ic = (window as any)?.Intercom;

        ic('reattach_activator');
        ic('update', ic.intercomSettings);
    }

    return (
        <div className="socials add_support">

            <div>
                <a href={discord} target="_blank">
                    <img src='media/images/entryscreen/discord.png' />
                </a>
                <a href={telegram} target="_blank">
                    <img src='media/images/entryscreen/telegram.png' />
                </a>
            </div>

            <div id="support_btn_global" onClick={loadSupport}>
                <img src='media/images/entryscreen/support.png' />
            </div>
        </div>
    )
}

export default BtcDuels;