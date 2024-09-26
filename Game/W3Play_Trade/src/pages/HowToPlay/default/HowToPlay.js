import React, { useState } from "react";
// import { Link, useLocation } from 'react-router-dom';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async

// import state from '../../state';

// import PlayNowButton from './PlayNowButton';

import RealWeb3 from "./sections/RealWeb3";
import ConnectYourWallet from "./sections/ConnectYourWallet";
import LiveBitcoinRate from "./sections/LiveBitcoinRate";
import JoinUpPool from "./sections/JoinUpPool";
import JoinDownPool from "./sections/JoinDownPool";
import SelectInvest from "./sections/SelectInvest";
import UpProfit from "./sections/UpProfit";
import DownProfit from "./sections/DownProfit";
import PoolRound from "./sections/PoolRound";
import StartRate from "./sections/StartRate";
import UpWins from "./sections/UpWins";
import DownWins from "./sections/DownWins";
import Profits from "./sections/Profits";
import WeeklyJackpot from "./sections/WeeklyJackpot";
import MonthlyJackpot from "./sections/MonthlyJackpot";
import PolygonMatic from "./sections/PolygonMatic";
import GetMaticToken from "./sections/GetMaticToken";
import SellSendWins from "./sections/SellSendWins";
import Footer from "./sections/Footer";

import "./HowToPlay.css";
import HelmetManager from "../../../comp/HelmetManager";
// import ga4Event from '../../../utils/ga4.event';

// const SideMenuItem = ({ path, activePath, text, onClick }) => {
//     return (
//         path == activePath
//             ? <div className="item active"><span>{text}</span></div>
//             : <Link to={{ pathname: path }} className="item" onClick={onClick}><span>{text}</span></Link>
//     );
// };

// const SideMenu = ({ isOpen }) => {

//     const ACTIVE_PATH = useLocation().pathname;
//     const playEvtCat = 'how_play';
//     const playEvtDescp = 'how to play button https://upvsdown.com/how_to_play';
//     const affEvtCat = 'be_affiliate';
//     const affEvtDescp = 'https://upvsdown.com/how_to_aff';

//     return (
//         <div className={`side-menu${isOpen ? ' open' : ''}`}>
//             <div className="menu-caption"><span>{APP.term('entry_menu')}</span></div>
//             <SideMenuItem path="/" activePath={ACTIVE_PATH} text={APP.term("home_page_new")} />
//             <SideMenuItem path="/about" activePath={ACTIVE_PATH} text={APP.term("entry_home_page")} />
//             <SideMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text={APP.term('entry_how_to_play')} onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
//             <SideMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text={APP.term('entry_become_affiliate')} onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
//             <PlayNowButton />
//         </div>
//     );

// };

const HowToPlay = () => {
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const hostname = window.location.hostname;

  // const onClickMenuButton = () => {
  //     setMenuIsOpen(prev => !prev);
  // };

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

  return (
    <div className="how-to-trade">
      <HelmetManager
        title="How to play"
        description="Learn How to Play: Where Crypto Trading Meets Gaming. Master Strategies for Real-Time Rewards and Navigate DeFi Features."
        keywords="how to play to earns , blockchain games, best play to earn crypto games, crypto trading strategies, DeFi features"
        canonical="/how_to_play"
      />

      <div className="how-to-trade-main-flex">
        {/* <div onClick={onClickMenuButton} className={`menu-icon${menuIsOpen ? ' open' : ''}`}>
                    <div className="top"></div>
                    <div className="middle"></div>
                    <div className="bottom"></div>
                </div> */}

        {/* <SideMenu isOpen={menuIsOpen} /> */}

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

        <RealWeb3 />
        <ConnectYourWallet />
        <LiveBitcoinRate />
        <JoinUpPool />
        <JoinDownPool />
        <SelectInvest />
        <UpProfit />
        <DownProfit />
        <PoolRound />
        <StartRate />
        <UpWins />
        <DownWins />
        <Profits />

        {hostname !== "btcblitz.com" && (
          <>
            <WeeklyJackpot />
            <MonthlyJackpot />
          </>
        )}

        <PolygonMatic />
        <GetMaticToken />
        <SellSendWins />
        <Footer />
      </div>
    </div>
  );
};

export default HowToPlay;
