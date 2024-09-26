
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import { set_app_lang } from '../../REDUX/actions/main.actions';

import state from '../../../state';

import PlayNowButton from './PlayNowButton';

import PredictAndWin from './sections/PredictAndWin';
import GeneralStats from './sections/GeneralStats';
import VideoClip from './sections/VideoClip';
import ComparisonTable from './sections/ComparisonTable';
import TopWinners from './sections/TopWinners';
import WeeklyJackpot from './sections/WeeklyJackpot';
import MonthlyJackpot from './sections/MonthlyJackpot';
import KeyBenefits from './sections/KeyBenefits';
import DailyIncome from './sections/DailyIncome';
import Faq from './sections/Faq';
import BestChance from './sections/BestChance';
import PolygonBlockchain from './sections/PolygonBlockchain';
import Footer from './sections/Footer';

import './NewEntryScreen.css';
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

const entryPage = () => {
    let entryPageLoaded = false;
    useEffect(() => {
        console.log('entry page');
        APP.controller.unsubscribeFromRates();
        entryPageLoaded = true;
    }, [entryPageLoaded])

    // const dispatch = useDispatch();
    const generalStatsRef = useRef();

    // const lang = useSelector(state => state.mainRememberReducer.app_lang);
    // const [langSelector, setLangSelect] = useState(false);

    // const updateLang = (itm) => {
    //     dispatch(set_app_lang({ ...itm, changed_by_user: true }));
    //     APP.state.set('customer.flag', itm?.src);
    //     APP.state.set('customer.lang', { code: itm?.code, lang: itm?.lang });
    //     APP.state.set('lang_open', false);
    //     window.location.reload();
    //     setLangSelect(false);
    // };

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const hostname = window.location.hostname;

    const onClickMenuButton = () => {
        setMenuIsOpen(prev => !prev);
    };

    const onScrollEntryScreen = () => {
        generalStatsRef.current.checkUpdateStats('scroll');
    };

    return (

        <div className="cryptofights-entry-screen" onScroll={onScrollEntryScreen}>

            <div className="entry-main-flex">

                <div onClick={onClickMenuButton} className={`menu-icon${menuIsOpen ? ' open' : ''}`}>
                    <div className="top"></div>
                    {/* <div className="middle"></div> */}
                    <div className="bottom"></div>
                </div>

                <SideMenu isOpen={menuIsOpen} />

                {/* <div className={"entry_screen_langs "}>

                    <div className="entry_screen_active_lang" onClick={() => setLangSelect(!langSelector)}>
                        <img className="entry_screen_active_lang_flag" src={`/media/images/flags/${lang?.src || 'usa'}.svg`} alt="flag" />
                        <img className="entry_screen_down_arr" src='/media/images/entry_screens/downArr.png' alt="chevron" />
                    </div>

                    {langSelector &&
                    <div className="entry_screen_lang_selector">
                        <img src='/media/images/entry_screens/entryLangBg.png' className="entry_screen_langs_bg" />
                        <div className="entry_screen_langs_list">
                            {state.langCfg.map((itm, i) => (
                                <div key={i} className="entry_screen_lang_btn" onClick={() => updateLang(itm)}>
                                    <img src={`/media/images/flags/${itm?.src}.svg`} className="entry_screen_lang_flag" />
                                    <p className="entry_screen_lang_desc"><span>{itm?.lang}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>}

                </div> */}

                <div className="sections">

                    <PredictAndWin />
                    <GeneralStats ref={generalStatsRef} />
                    <VideoClip />
                    <ComparisonTable />
                    <TopWinners />

                    {(hostname !== 'btcblitz.com') &&
                        <><WeeklyJackpot />
                            <MonthlyJackpot /></>}

                    <KeyBenefits />
                    <DailyIncome />
                    <Faq />
                    <BestChance />
                    <PolygonBlockchain />
                    <Footer />

                </div>

            </div>

        </div>

    );

};

export default function EntryScreen({ onContinue }) {
    return (
        <div className="page trade_page">
            {entryPage(onContinue)}
        </div>
    );
};