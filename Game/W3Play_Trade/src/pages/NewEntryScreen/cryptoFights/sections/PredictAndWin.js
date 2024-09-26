import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PlayNowButton from "../PlayNowButton";
import HowToPlayButton from "../HowToPlayButton";
// import BeAffiliateButton from "../BeAffiliateButton";
import ga4Event from "../../../../utils/ga4.event";
import { useDispatch, useSelector } from "react-redux";
import APP from "../../../../app";
import { set_demo_mode } from "../../../../REDUX/actions/main.actions";

const TopMenuItem = ({ path, activePath, text, onClick }) => {

    return (
        path == activePath
            ? <div className="item active"><span>{text}</span></div>
            : <Link to={{ pathname: path }} className="item" onClick={onClick}><span>{text}</span></Link>
    );

};

const TopMenu = () => {

    const ACTIVE_PATH = useLocation().pathname;
    const playEvtCat = 'how_play';
    const playEvtDescp = 'how to play button https://upvsdown.com/how_to_play';
    const affEvtCat = 'be_affiliate';
    const affEvtDescp = 'https://upvsdown.com/how_to_aff';

    return (
        <div className="top-menu">
            <TopMenuItem path="/" activePath={ACTIVE_PATH} text="Home" />
            <TopMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text={APP.term('entry_how_to_play')} onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
            <TopMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text={APP.term('entry_become_affiliate')} onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
        </div>
    );

};

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const PredictAndWin = () => {

    const [visibleOpt, setVisibleOpt] = useState('first');
    const bottomContentRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initial_query_params = useSelector(state => state.mainRememberReducer.initial_query_params);

    const onOptionMouseEnter = (e) => {
        const optionId = e.target.getAttribute('data-option-id');
        if (bottomContentRef.current.classList.contains(optionId)) return;
        setVisibleOpt(optionId);
    };

    const switchDemo = () => {
        ga4Event('click on any first buttons leading to the trading page', '1_play_now')
        dispatch(set_demo_mode({ active: true }))
        APP.state.set('currentToken', 'demo');

        APP.state.set('table', APP.state.get('demo_tables'))
        APP.state.set('active_table', APP.state.get('demo_active_table'))
        let navRoute = '/bitcoin-5-demo' + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');

        setTimeout(() => {
            if (APP.state.get('currentToken') === 'demo') {
                navigate(navRoute);
                window.location.reload();
            }
            APP.customer.update_balance();
        }, 50);
    };

    return (

        <>

            {/* <section className="entry-section up-or-down web-only flex"> */}
            <section className="entry-section predict-and-win">

                <div className="main-flex">

                    <div className="top-content">
                        <div className="logo"></div>
                        <TopMenu />
                    </div>

                    <div className="middle-content">

                        <div className="middle-left">

                            <div className="caption-area-top">
                                <div className="caption-top">
                                    <span>PREDICT</span>
                                </div>
                                <div className="certik-verified">
                                    <span>AUDITED<br />AND VERIFIED BY</span>
                                    <div></div>
                                </div>
                            </div>

                            <div className="caption-area-bottom">
                                <div className="web3-game">
                                    <span>WEB3 POOL TRADING GAME</span>
                                </div>
                                <div className="caption-bottom">
                                    <span>& WIN</span>
                                </div>
                            </div>

                            <div className="play-btns">
                                <PlayNowButton />
                                {/* <HowToPlayButton /> */}
                                <div className="styled-button how-to-play" onClick={switchDemo}>
                                    <Link><span>Play Fun Mode</span></Link>
                                </div>
                            </div>

                        </div>

                        <div className="middle-right">

                        </div>

                    </div>

                    <div className={`bottom-content ${visibleOpt}`} ref={bottomContentRef}>

                        <div className="options-wrap">

                            <div className="options">

                                <div onMouseEnter={onOptionMouseEnter} className="option first" data-option-id="first">
                                    <span>WEB3 DAPP<br />NO REGISTRATION</span>
                                </div>

                                <div onMouseEnter={onOptionMouseEnter} className="option second" data-option-id="second">
                                    <span>BLOCKCHAIN<br />POLYGON MATIC</span>
                                </div>

                                <div onMouseEnter={onOptionMouseEnter} className="option third" data-option-id="third">
                                    <span>SECURE NO DEPOSIT</span>
                                </div>

                                <div onMouseEnter={onOptionMouseEnter} className="option fourth" data-option-id="fourth">
                                    <span>DECENTRALIZED<br />100% TRANSPARENCY</span>
                                </div>

                            </div>

                        </div>

                        <div className="option-text first">
                            <div className="align-center-wrap">
                                <div className="align-left-wrap">
                                    <span>WEB3</span>
                                    <span>DAPP</span>
                                </div>
                            </div>
                            <div className="rows-box">
                                <div className="row"><div className="num"><span>01</span></div><div className="text"><span>Simple</span><span className="big"> ACCESS</span></div></div>
                                <div className="row"><div className="num"><span>02</span></div><div className="text"><span className="big">NO </span><span>registration</span></div></div>
                                <div className="row"><div className="num"><span>03</span></div><div className="text"><span>Protects</span><span className="big"> PRIVACY, </span><span>enhances</span><span className="big"> SECURITY</span><span></span></div></div>
                            </div>
                        </div>

                        <div className="option-text second">
                            <div className="align-center-wrap">
                                <div className="align-left-wrap">
                                    <span>BLOCKCHAIN</span>
                                    <span>POLYGON</span>
                                    <span>MATIC</span>
                                </div>
                            </div>
                            <div className="rows-box">
                                <div className="row">
                                    <div className="text">
                                        <span>Polygon (MATIC) is a Faster<br />
                                        Blockchain That Makes Transactions<br />
                                        and Applications Run Smoothly.<br />
                                        You Must Have Polygon Matic<br />
                                        Token to Play The Game.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="option-text third">
                            <div className="align-center-wrap">
                                <div className="align-left-wrap">
                                    <span>SECURE</span>
                                </div>
                            </div>
                            <div className="rows-box">
                                <div className="row"><div className="num"><span>01</span></div><div className="text"><span className="big">NO DEPOSITS </span><span>needed</span></div></div>
                                <div className="row"><div className="num"><span>02</span></div><div className="text"><span className="big">COMPLETE CONTROL </span><span>over your Crypto</span></div></div>
                                <div className="row"><div className="num"><span>03</span></div><div className="text"><span>100% proof</span><span className="big"> SECURITY</span></div></div>
                            </div>
                        </div>

                        <div className="option-text fourth">
                            <div className="align-center-wrap">
                                <div className="align-left-wrap">
                                    <span>DECENTRALIZED</span><span>100%</span>
                                </div>
                            </div>
                            <div className="rows-box">
                                <div className="row"><div className="num"><span>01</span></div><div className="text"><span className="big">PEER TO PEER </span><span>game</span></div></div>
                                <div className="row"><div className="num"><span>02</span></div><div className="text"><span>Trustless transactions,</span><span className="big"> NO INTERMEDIARIES</span></div></div>
                                <div className="row"><div className="num"><span>03</span></div><div className="text"><span>Audited</span><span className="big"> SMART CONTRACT </span><span>by Certik 100% security</span></div></div>
                            </div>
                        </div>

                    </div>

                    {/* <div className="play-btns">
                        <PlayNowButton />
                        <HowToPlayButton />
                    </div> */}

                </div>

            </section>

        </>

    );

};

export default PredictAndWin;