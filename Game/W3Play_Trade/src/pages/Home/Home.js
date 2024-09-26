import React, { useEffect, useRef } from "react";
// import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import HelmetManager from "../../comp/HelmetManager";
import BrandLogo from "./BrandLogo";
import LanguageSelector from "./LanguageSelector";
import Socials from "./socials/Socials";
// import MenuButton from './MenuButton';
import Advantages from "./Advantages";
import AnimatedTiles from "./AnimatedTiles";
import Logos from "./Logos";
// import SideMenu from './SideMenu';
// import PlayNowButton from './PlayNowButton';
import useAppState from "../../hooks/useAppState";

import APP from "../../app";

// import ga4Event from '../../utils/ga4.event';
// import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { set_alert_msg, set_demo_mode } from "../../REDUX/actions/main.actions";
import state from "../../state";
import loadIntercom from "../../utils/loadIntercom";
import logoCfg from "../../utils/logoCfg";
import switch_pool_handler from "../../utils/pools/switchPool";

const containerClass = window.matchMedia("(pointer: coarse)").matches
  ? "entry-screen home touch"
  : "entry-screen home pointer";
const brandsWithSocials = [
  "localhost",
  "cryptofights.pro",
  "prod-latest-cryptofights.upvsdown.com",
  "btcbattles.com",
  "tradingbattle.io",
  "btcroyal.co",
  "polywin.co",
  "upvsdown.com",
  "btcduels.com",
  "bitstars.io",
  "btcblitz.com"
];

const brandHasSocials = () => brandsWithSocials.includes(window.location.hostname);

const Home = () => {
  // const [menuIsOpen, setMenuIsOpen] = useState(false);
  const vidOverlayRef = useRef();
  const navigate = useNavigate();
  const initial_query_params = useSelector(
    (state) => state.mainRememberReducer.initial_query_params
  );
  const dispatch = useDispatch();
  const vidElementRef = useRef();
  const skinIndex = useAppState("skin_idx");
  const skinId = typeof skinIndex === "number" ? skinIndex : 0;
  const isRealHomepage = location.pathname.includes('home-real');
  const isDemoHomepage = location.pathname.includes('home-demo');

    // Get the noDemoSwitchDomains array from state
    const noDemoSwitchDomains = APP.state.get('noDemoSwitchDomains');
    const currentDomain = window.location.hostname;
    const shouldShowDemoSwitch = !noDemoSwitchDomains.includes(currentDomain);
    
  // const onClickMenuButton = () => {
  //     setMenuIsOpen(prev => !prev);
  // };

  // switch platform work with demo mode
  const switchDemo = (e) => {

    // prevent launching same pool + same mode
    // if (currentPoolDetails?.uid?.includes('demo')) {
    // 	dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_info_demo_mode_switch' }));
    // 	return;
    // }

    e.stopPropagation();

    let navRoute = '/bitcoin-5-demo' + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');
    let demoActiveTable = APP.state.get('demo_active_table');

    APP.state.set('currentToken', 'demo');
    switch_pool_handler(dispatch, navigate, demoActiveTable, demoActiveTable.color, navRoute)

    dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_demo_mode_switch' }))
    dispatch(set_demo_mode({ active: true }))

    setTimeout(() => {
      APP.customer.update_balance();
    }, 50);
  };

  // switch platform work with real mode
  const switchReal = (e) => {

    // // prevent launching same pool + same mode
    // if (!currentPoolDetails?.uid?.includes('demo')) {
    //     dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_info_real_mode_switch' }));
    //     return;
    // }

    e.stopPropagation();

    let navRoute = '/trade' + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');
    let activeTable = APP.state.get('tables').find(itm => itm.selected);

    APP.state.set('currentToken', 'real');
    switch_pool_handler(dispatch, navigate, activeTable, activeTable.color, navRoute);

    dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_real_mode_switch' }))
    dispatch(set_demo_mode({ active: false }))

    setTimeout(() => {
      APP.customer.update_balance();
    }, 50);
  };

  const toggleVideo = (e) => {
    if (!vidOverlayRef.current.classList.contains("video-visible")) {
      vidOverlayRef.current.classList.add("video-visible");
      return vidElementRef.current.play();
    }

    // else
    vidOverlayRef.current.classList.remove("video-visible");
    vidElementRef.current.load();
  };

  return (
    <div className={containerClass}>
      {state.global_ui_intercom_domains_list.includes(
        window.location.hostname
      ) && <div id="support_btn_global" onClick={loadIntercom} />}

      <HelmetManager
        title={window.location.hostname}
        description="Best Crypto Trading Game. Predict Bitcoin movements and win. Provably fair gameplay. Exciting DeFi features & Web3 integration.  free USDB MemeCoin"
        keywords="Bitcoin predictions, best crypto gaming, p2p crypto , best crypto trading platform , social trading platform ,instant payout crypto, crypto gaming"
        canonical=""
        author="UpVsDown Team"
        publisher="UpVsDown Inc."
        lang="en"
        themeColor="#0c0d13"
        viewport="width=device-width, initial-scale=1.0"
      />

      <div className="main-flex-wrap">
        <div className="main-flex">
          <div className="content">
            {/* <SideMenu isOpen={menuIsOpen} /> */}

            <div className="top">
              <BrandLogo />
              <div className="right-bar">
                {brandHasSocials() && (
                  <>
                    <Socials isMobileView={false} />
                    <div className="sep"></div>
                  </>
                )}
                <LanguageSelector />
                {/* <MenuButton isOpen={menuIsOpen} clickHandler={onClickMenuButton} /> */}
              </div>
            </div>

            <div className="middle">
              <div className="bitcoin"></div>
              <div className="up-or-down">
                <span>{APP.term("home_up_down")}</span>
              </div>
              <div className="web3-pool">
                <span>{APP.term("home_web3_pool")}</span>
              </div>

              {/* (Hidden on web view) */}
              <AnimatedTiles isMobileView={true} />

              <div className="buttons">
                {/* real mode */}
                {!isDemoHomepage && <div className="home-button-wrap crypto-button-wrap">
                  <div className="home-button" onClick={switchReal}>
                    <Link to="/trade">
                      <span>{APP.term("home_play_crypto_btn")}</span>
                    </Link>
                  </div>

                  <div className="home-button-desc">
                    <span>{APP.term("home_play_crypto_desc")}</span>
                  </div>
                </div>}

                {/* demo mode */}
                {shouldShowDemoSwitch && !isRealHomepage && <div className="home-button-wrap fun-button-wrap">
                  <div className="home-button" onClick={switchDemo}>
                    <span>{APP.term("home_play_fun_btn")}</span>
                  </div>

                  <div className="home-button-desc">
                    <span>{APP.term("home_play_fun_desc")}</span>
                  </div>
                </div>}

                {/* video button */}
                <div className="home-video-button" onClick={toggleVideo}>
                  {/* <div class="triangle"></div> */}
                </div>
              </div>

              <div className="winnings-direct">
                <span>{APP.term("wins_to_wallet")}</span>
              </div>
              <Logos />
            </div>

            <div className="bottom">
              <Advantages />
            </div>
          </div>

          {/* (Hidden on mobile view) */}
          <AnimatedTiles isMobileView={false} />
        </div>
      </div>

      <div ref={vidOverlayRef} className="home-video-overlay">
        <div className="home-video">
          <video ref={vidElementRef} controls preload="metadata">
            <source
              src={`https://storage.googleapis.com/betcioproduction/playnance_videos/id_${skinId}.mp4`}
              type="video/mp4"
            />
          </video>
          <div className="close" onClick={toggleVideo}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;