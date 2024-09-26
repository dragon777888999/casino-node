import React, { useState } from "react";
// import { Link, useLocation } from 'react-router-dom';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async

// import state from '../../state';

import MeetProgram from "./sections/MeetProgram";
import MakeMoney from "./sections/MakeMoney";
import SoEasy from "./sections/SoEasy";
import Leaderboard from "./sections/Leaderboard";
import JoinMultiLevel from "./sections/JoinMultiLevel";
import GetProfits from "./sections/GetProfits";
import ConnectWallet from "./sections/ConnectWallet";
import CreateLinks from "./sections/CreateLinks";
import ShareLinks from "./sections/ShareLinks";
import GetRevshare from "./sections/GetRevshare";
import HowMuch from "./sections/HowMuch";
import GetMyMoney from "./sections/GetMyMoney";
import SeeStats from "./sections/SeeStats";
import SeeProfit from "./sections/SeeProfit";
import MakeMoreMoney from "./sections/MakeMoreMoney";
import WeeklyJackpot from "./sections/WeeklyJackpot";
import MonthlyJackpot from "./sections/MonthlyJackpot";
import PolygonMatic from "./sections/PolygonMatic";
import Faq from "./sections/Faq";
import SellSendWins from "./sections/SellSendWins";
import Footer from "./sections/Footer";

// import PlayNowButton from './PlayNowButton';

import "./HowToAffiliate.css";
import HelmetManager from "../../../comp/HelmetManager";
// import ga4Event from '../../../utils/ga4.event';

// const SideMenuItem = ({ path, activePath, text, onClick }) => {
//     return (
//         path == activePath
//             ? <div className="item active"><span>{text}</span></div>
//             : <Link to={{ pathname: path }} className="item"><span>{text}</span></Link>
//     );
// };

// const SideMenu = ({ isOpen }) => {

//     const ACTIVE_PATH = useLocation().pathname,
//         playEvtCat = 'how_play',
//         playEvtDescp = 'how to play button https://upvsdown.com/how_to_play',

//         affEvtCat = 'be_affiliate',
//         affEvtDescp = 'https://upvsdown.com/how_to_aff';

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

const HowToAffiliate = () => {
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const hostname = window.location.hostname;

  // const onClickMenuButton = () => {
  //     setMenuIsOpen(prev => !prev);
  // };

  return (
    <div className="how-to-aff">
      <HelmetManager
        title="Affiliate"
        description="Become an Affiliate: Earn Up to 35% Commission with Daily Payouts, the highest in the iGaming industry. Join now and start earning!"
        keywords="How to Affiliate, Crypto referral program ,Affiliate marketing for Bitcoin game, up vs down"
        canonical="/affiliate"
      />

      <div className="how-to-aff-main-flex">
        {/* <div onClick={onClickMenuButton} className={`menu-icon${menuIsOpen ? ' open' : ''}`}>
                    <div className="top"></div>
                    <div className="middle"></div>
                    <div className="bottom"></div>
                </div> */}

        {/* <SideMenu isOpen={menuIsOpen} /> */}

        <MeetProgram />
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
        <GetMyMoney />
        <SeeStats />
        <SeeProfit />
        <MakeMoreMoney />

        {hostname !== "btcblitz.com" && (
          <>
            <WeeklyJackpot />
            <MonthlyJackpot />
          </>
        )}

        <PolygonMatic />
        <Faq />
        <SellSendWins />
        <Footer />
      </div>
    </div>
  );
};

export default HowToAffiliate;
