import React from 'react';
import CryptoFights from '../EntryScreens/socials/labels/CryptoFights';
import BtcBattles from './socials/labels/BtcBattles';
import BitStars from './socials/labels/BitStars';
import BtcRoyal from './socials/labels/BtcRoyal';
import BtcUsdt from './socials/labels/BtcUsdt';
import PolyWin from './socials/labels/PolyWin';
import TradingBattle from './socials/labels/TradingBattle';
import UpVsDown from './socials/labels/UpVsDown';
import BtcDuels from './socials/labels/BtcDuels';
import _9wins from './socials/labels/9wins';
import BtcBlitz from './socials/labels/BtcBlitz';
import BitFight from './socials/labels/BitFight';

const Socials = () => {

    switch (window.location.hostname) {

        case 'cryptofights.pro':
            return (<CryptoFights />)

        case 'prod-latest-cryptofights.upvsdown.com':
            return (<CryptoFights />)

        case 'btcbattles.com':
            return (<BtcBattles />)

        case 'bitstars.io':
            return (<BitStars />)

        case 'tradingbattle.io':
            return (<TradingBattle />)

        case 'btcusdt.social':
            return (<BtcUsdt />)

        case 'btcroyal.co':
            return (<BtcRoyal />)

        case 'polywin.co':
            return (<PolyWin />)

        case 'upvsdown.com':
            return (<UpVsDown />)

        case 'localhost':
            return (<UpVsDown />)

        case 'btcduels.com':
            return (<BtcDuels />)

        case '9wins.com':
            return (<_9wins />)

        case 'btcblitz.com':
            return (<BtcBlitz />)

        case 'bitfight.com':
            return (<BitFight />)

        case 'game.bitfight.com':
            return (<BitFight />)

        default:
            return;
    }

}

export default Socials;