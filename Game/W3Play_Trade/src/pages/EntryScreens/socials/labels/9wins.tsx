import React, { useEffect, useState } from "react";

const _9wins = () => {

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

                    </div>
                    <div id="support_btn_global" onClick={loadSupport}>
                        <img src='media/images/entryscreen/support.png' />
                    </div>
                </div> : null}
        </>
    )
}

export default _9wins;