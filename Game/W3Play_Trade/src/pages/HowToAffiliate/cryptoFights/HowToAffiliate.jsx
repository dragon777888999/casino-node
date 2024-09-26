
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import state from '../../../state';

import SocialFriends from './sections/SocialFriends';
import MakeMoney from './sections/MakeMoney';
import SoEasy from './sections/SoEasy';
import Leaderboard from './sections/Leaderboard';
import JoinMultiLevel from './sections/JoinMultiLevel';
import GetProfits from './sections/GetProfits';
import ConnectWallet from './sections/ConnectWallet';
import CreateLinks from './sections/CreateLinks';
import ShareLinks from './sections/ShareLinks';
import GetRevshare from './sections/GetRevshare';
import HowMuch from './sections/HowMuch';
import GetMoney from './sections/GetMoney';
import HowSeeStats from './sections/HowSeeStats';
import HowSeeProfit from './sections/HowSeeProfit';
import Faq from './sections/Faq';
import MakeMoreMoney from './sections/MakeMoreMoney';
import WeeklyJackpot from './sections/WeeklyJackpot';
import MonthlyJackpot from './sections/MonthlyJackpot';
import PolygonMatic from './sections/PolygonMatic';
import SellSendWins from './sections/SellSendWins';
import Footer from './sections/Footer';

import './HowToAffiliate.css';
import ga4Event from '../../../utils/ga4.event';

const SideMenuItem = ({ path, activePath, text, onClick }) => {
    return (
        path == activePath
            ? <div className="item active"><span>{text}</span></div>
            : <Link to={{ pathname: path }} className="item" onClick={onClick}><span>{text}</span></Link>
    );
};

const SideMenu = ({ isOpen }) => {

    const ACTIVE_PATH = useLocation().pathname;
    const playEvtCat = 'how_play';
    const playEvtDescp = 'how to play button https://upvsdown.com/how_to_play';
    const affEvtCat = 'be_affiliate';
    const affEvtDescp = 'https://upvsdown.com/how_to_aff';

    return (
        <div className={`side-menu${isOpen ? ' open' : ''}`}>
            {/* <div className="menu-caption"><span>MENU</span></div> */}
            <SideMenuItem path="/" activePath={ACTIVE_PATH} text="Home page" />
            <SideMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text="How to play" onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
            {!state.prevent_referral_program_labels.includes(window.location.hostname) &&
                (<SideMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text="Become an affiliate" onClick={() => ga4Event(affEvtDescp, affEvtCat)} />)}
            {/* <PlayNowButton /> */}
        </div>
    );

};

const HowToAffiliate = () => {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const onClickMenuButton = () => {
        setMenuIsOpen(prev => !prev);
    };

    return (

        <div className="cryptofights-how-to-aff">

            <div className="entry-main-flex">

                <div onClick={onClickMenuButton} className={`menu-icon${menuIsOpen ? ' open' : ''}`}>
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>

                <SideMenu isOpen={menuIsOpen} />

                <div className="sections">
                    <SocialFriends />
                    <MakeMoney />
                    <SoEasy />
                    <Leaderboard />
                    <JoinMultiLevel />
                    <GetProfits />
                    <ConnectWallet />
                    <CreateLinks />
                    <ShareLinks />
                    <GetRevshare />
                    <HowMuch />
                    <GetMoney />
                    <HowSeeStats />
                    <HowSeeProfit />
                    <MakeMoreMoney />
                    <WeeklyJackpot />
                    <MonthlyJackpot />
                    <PolygonMatic />
                    <Faq />
                    <SellSendWins />                
                    <Footer />
                </div>

            </div>

        </div>

    );

};

export default HowToAffiliate;