import React, { useRef } from "react";
import HelmetManager from "../../comp/HelmetManager";
import BrandLogo from "./BrandLogo";
import LanguageSelector from "./LanguageSelector";
import Socials from "../Home/socials/Socials";
import Advantages from "./Advantages";
import Logos from "./Logos";
import useAppState from "../../hooks/useAppState";
import APP from "../../app";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { set_demo_mode } from "../../REDUX/actions/main.actions";
import state from "../../state";
import loadIntercom from "../../utils/loadIntercom";
import switch_pool_handler from "../../utils/pools/switchPool";

const containerClass = window.matchMedia("(pointer: coarse)").matches
  ? "entry-screen home-bitfight touch"
  : "entry-screen home-bitfight pointer";

const brandsWithSocials = [
"localhost",
// "bitfight.com"
];

const brandHasSocials = () => brandsWithSocials.includes(window.location.hostname);

const HomeBitFight = () => {

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

    const noDemoSwitchDomains = APP.state.get('noDemoSwitchDomains');
    const currentDomain = window.location.hostname;
    const shouldShowDemoSwitch = !noDemoSwitchDomains.includes(currentDomain);

    const switchDemo = (e) => {

        e.stopPropagation();
        
        let navRoute = '/bitcoin-15-demo' + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');
        let demoActiveTable = APP.state.get('demo_active_table');
        
        APP.state.set('currentToken', 'demo');
        switch_pool_handler(dispatch, navigate, demoActiveTable, demoActiveTable.color, navRoute)
        
        dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_demo_mode_switch' }))
        dispatch(set_demo_mode({ active: true }))
        
        setTimeout(() => {
            APP.customer.update_balance();
        }, 50);

    };

    const switchReal = (e) => {

        e.stopPropagation();

        let navRoute = '/trade' + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');
        let activeTable = APP.state.get('tables').find(itm => itm.selected);
        
        APP.state.set('currentToken', 'real');
        switch_pool_handler(dispatch, navigate, activeTable, activeTable.color, navRoute);
        
        dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_real_mode_switch' }));
        dispatch(set_demo_mode({ active: false }));

        setTimeout(() => {
            APP.customer.update_balance()
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

            {state.global_ui_intercom_domains_list.includes(window.location.hostname)
            && <div id="support_btn_global" onClick={loadIntercom} />}

            <HelmetManager
                title={window.location.hostname}
                description="Best Crypto Trading Game. Predict Bitcoin movements and win. Provably fair gameplay. Exciting DeFi features & Web3 integration.  free USDB MemeCoin"
                keywords="DeFi, Bitcoin predictions, crypto gaming, USDP, smart contracts, cryptocurrency, blockchain"
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
                        <div className='image-area mobile-only flex'></div>

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
                            <div className="home-video-button" onClick={toggleVideo}></div>

                        </div>

                    </div>

                    <div className="middle-two">
                        <Logos />
                        <div className="winnings-direct">
                            <span>{APP.term("wins_to_wallet")}</span>
                        </div>
                    </div>

                    <div className="bottom">
                        <Advantages />
                    </div>
                    </div>

                    {/* (Hidden on mobile view) */}
                    <div className='image-area web-only flex'></div>

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

export default HomeBitFight;