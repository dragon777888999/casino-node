import React from "react";

let twitter = 'https://twitter.com/bitfightgaming',
    telegram = 'https://t.me/bitfightchannel',
    discord = 'https://discord.gg/bitfight';

const BitFight = () => {

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
                        <a href={telegram} target="_blank">
                            <img src='media/images/entryscreen/telegram.png' />
                        </a>
                        <a href={discord} target="_blank">
                            <img src='media/images/entryscreen/discord.png' />
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
                    <a href={telegram} target="_blank">
                        <img src='media/images/entryscreen/telegram.png' />
                    </a>
                    <a href={discord} target="_blank">
                        <img src='media/images/entryscreen/discord.png' />
                    </a>
                </div>}
        </>
    )
}

export default BitFight;