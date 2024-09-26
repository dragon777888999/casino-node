import React from 'react';

import CryptoFights from './CryptoFights';
import BtcBattles from './BtcBattles';
import BitStars from './BitStars';
import BtcRoyal from './BtcRoyal';
import PolyWin from './PolyWin';
import TradingBattle from './TradingBattle';
import UpVsDown from './UpVsDown';
import BtcDuels from './BtcDuels';
// import _9wins from './9wins';
import BtcBlitz from './BtcBlitz';

const Socials = ({ isMobileView }) => {

    switch (window.location.hostname) {

        case 'cryptofights.pro':
            return (<CryptoFights isMobileView={isMobileView} />)

        case 'prod-latest-cryptofights.upvsdown.com':
            return (<CryptoFights isMobileView={isMobileView} />)

        case 'btcbattles.com':
            return (<BtcBattles isMobileView={isMobileView} />)

        case 'bitstars.io':
            return (<BitStars isMobileView={isMobileView} />)

        case 'tradingbattle.io':
            return (<TradingBattle isMobileView={isMobileView} />)

        case 'btcroyal.co':
            return (<BtcRoyal isMobileView={isMobileView} />)

        case 'polywin.co':
            return (<PolyWin isMobileView={isMobileView} />)

        case 'upvsdown.com':
            return (<UpVsDown isMobileView={isMobileView} />)

        case 'localhost':
            return (<UpVsDown isMobileView={isMobileView} />)

        case 'btcduels.com':
            return (<BtcDuels isMobileView={isMobileView} />)

        case 'btcblitz.com':
            return (<BtcBlitz isMobileView={isMobileView} />)

        default:
            return;
            
    }

};

export default Socials;