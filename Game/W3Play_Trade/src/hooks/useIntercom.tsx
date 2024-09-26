import { useState, useEffect } from 'react';

interface IntercomWindow {
    Intercom: any;
    intercomSettings: any;
}

const useIntercom = () => {

    const [intercomWindow, setIntercomWindow] = useState<IntercomWindow | null>(null);

    const checkIntercomClient = () => {
        const host = window.location.hostname;
        const appIds = {
            'localhost': 'sx13tr8l',
            'upvsdown.com': 'sx13tr8l',
            'upvsdown.io': 'sx13tr8l',
            'sharker.com': 'sx13tr8l',
            'moonxp.com': 'sx13tr8l',
            'turbobit.io': 'sx13tr8l',
            'callvsput.io': 'sx13tr8l',
            'poolzwin.com': 'sx13tr8l',
            'integration-app2.upvsdown.com': 'lf499ize',
            'prod-latest.upvsdown.com': 'sx13tr8l',
            'cryptofights.pro': 'ul1lcje8',
            '9wins.com': 'n3h8as9n',
            'btcduels.com': 'a6e13sbn',
            'bitfight.com': 'mb7helwv',
            'game.bitfight.com': 'mb7helwv',
            'btcrollercoaster': 'p4stajzp',
            'bitcoin.playblock.io': 'sx13tr8l',
            'bitstars.io': 'sx13tr8l',
        };

        return appIds[host];
    };

    const initializeIntercom = () => {
        console.log('intercom load');
        const appId = checkIntercomClient(); // Assuming you're using the same app ID for all hosts

        // Set Intercom settings
        (window as any).intercomSettings = {
            app_id: appId,
            custom_domain: location.origin,
            hide_default_launcher: true,
            custom_launcher_selector: '#support_btn_global',
        };

        const w: any = window;
        const d: Document = document;

        const i = function () {
            i.c(arguments);
        };
        i.q = [];
        i.c = function (args: any) {
            i.q.push(args);
        };
        w.Intercom = i;

        const loadIntercomScript = function () {
            const s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/' + appId;
            const x = d.getElementsByTagName('script')[0];
            if (x) {
                x.parentNode?.insertBefore(s, x);
            }
        };

        if (document.readyState === 'complete') {
            loadIntercomScript();
        } else if (w.attachEvent) {
            w.attachEvent('onload', loadIntercomScript);
        } else {
            w.addEventListener('load', loadIntercomScript, false);
        }

        // Save Intercom instance in state
        setIntercomWindow(w);
    };


    const unloadSupport = () => {
        const ic = intercomWindow?.Intercom;
        ic?.('shutdown');
    };

    return { unloadSupport, initializeIntercom };
};

export default useIntercom;
