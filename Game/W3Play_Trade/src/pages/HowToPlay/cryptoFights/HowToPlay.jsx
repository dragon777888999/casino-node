
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import state from '../../../state';

import RealWeb3 from './sections/RealWeb3';
import ConnectWallet from './sections/ConnectWallet';
import WeeklyJackpot from './sections/WeeklyJackpot';
import MonthlyJackpot from './sections/MonthlyJackpot';
import PolygonMatic from './sections/PolygonMatic';
import GetMaticToken from './sections/GetMaticToken';
import SellSendWins from './sections/SellSendWins';
import Footer from './sections/Footer';

import './HowToPlay.css';
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

const HowToPlay = () => {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const onClickMenuButton = () => {
        setMenuIsOpen(prev => !prev);
    };

    return (

        <div className="cryptofights-how-to-play">

            <div className="entry-main-flex">

                <div onClick={onClickMenuButton} className={`menu-icon${menuIsOpen ? ' open' : ''}`}>
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>

                <SideMenu isOpen={menuIsOpen} />

                <div className="sections">
                    <RealWeb3 />
                    <ConnectWallet />
                    <WeeklyJackpot />
                    <MonthlyJackpot />
                    <PolygonMatic />
                    <GetMaticToken />
                    <SellSendWins />                
                    <Footer />
                </div>

            </div>

        </div>

    );

};

export default HowToPlay;