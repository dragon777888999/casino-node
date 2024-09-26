import React, { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
// import PlayNowButton from "../PlayNowButton";
// import HowToPlayButton from "../HowToPlayButton";
// import BeAffiliateButton from "../BeAffiliateButton";
import ga4Event from "../../utils/ga4.event";
import state from "../../state";

import Footer from './Footer';

import './CryptoFightsDisclaimer.css';

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
            <TopMenuItem path="/" activePath={ACTIVE_PATH} text={APP.term('entry_home_page')} />
            <TopMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text={APP.term('entry_how_to_play')} onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
            <TopMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text={APP.term('entry_become_affiliate')} onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
        </div>
    );

};

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

const CryptoFightsDisclaimer = () => {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const onClickMenuButton = () => {
        setMenuIsOpen(prev => !prev);
    };

    return (

        <div className="cryptofights-disclaimer">

            <div className="cryptofights-disclaimer-main-flex">

                <div onClick={onClickMenuButton} className={`menu-icon${menuIsOpen ? ' open' : ''}`}>
                    <div className="top"></div>
                    <div className="bottom"></div>
                </div>

                <SideMenu isOpen={menuIsOpen} />
                
                <div className="sections">

                    <section className="disclaimer-main">

                        <div className="top-content">
                            <div className="logo"></div>
                            <TopMenu />
                        </div>

                        <div className="main-flex">

                            <div className="caption">
                                <span>DISCLAIMER :</span>
                            </div>

                            <div className="top-text">
                                <span>This game software is fully decentralized Web3 software that enable players around the world to play against each other by predicting the bitcoin next move.</span>
                            </div>

                            <div className="middle-text">

                                <div className="box">

                                    <div className="big">
                                        <span>The software do not hold customer funds and do not play directly against the players</span>
                                    </div>

                                    <div className="small">
                                        <span>Its enable players to play peer to peer in social pools, to play the game you need to connect your digital wallet or create new one and connect.</span>
                                    </div>

                                </div>

                                <div className="box">

                                    <div className="big">  
                                        <span>The software don't have any access to your digital wallet crypto</span>
                                    </div>

                                    <div className="small">
                                        <span>The software (smart contract) takes commission only from the winners ,to bet/trade you are signing a contract with the smart contract that menage the game , the software pay winners their winnings directly to the same wallet they sign the contract with.</span>
                                    </div>
                            
                                </div>

                                <div className="box">

                                    <div className="big">
                                        <span>The live stats that provided in this web site are original stats</span>
                                    </div>

                                    <div className="small">
                                        <span>And they are open to the public on the polygon network and can be easily checked by all community. By playing this game you understand there is a risk to lose all your bet/trade.</span>
                                    </div>
                                    
                                </div>

                                <div className="box">

                                    <div className="big">
                                        <span>The chart is live chart of the bitcoin price</span>
                                    </div>

                                    <div className="small">
                                        <span>And it's not manipulate the bitcoin price and its exact price the game gets from the data feed provider and there is no spread or pricing on this data feed. </span>
                                    </div>
                                
                                </div>

                                <div className="box">

                                    <div className="big">
                                        <span>The chart is not a Bet/Trade advice</span>
                                    </div>

                                    <div className="small">
                                        <span>When you use this software you are fully responsible regarding the rules and regulations in your country that its allow you to use this kind of software. </span>
                                    </div>
                                    
                                </div>

                                <div className="box">

                                    <div className="big">
                                        <span>The smart contract that menage the game</span>
                                    </div>

                                    <div className="small">
                                        <span>Is open source and can be find in this link , the smart contract is audited and verified by well-known top provider in the industry CERTIK.</span>
                                    </div>
                                    
                                </div>

                                <div className="box">

                                    <div className="big">
                                        <span>You can find here the scoring of the smart contract</span>
                                    </div>

                                    <div className="small">
                                        <span>The smart contract has passed all security checks regarding the factors that insure safe , secure and fair game play.</span>
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="bottom-text">
                                <span>We wish you to enjoy the software and please make sure you understand the game play and please make sure you are not spending more crypto the you can effort, thanks, enjoy, and please WIN!</span>
                            </div>

                        </div>

                    </section>

                    <Footer />    

                </div>

            </div>
            
        </div>

    );

};

export default CryptoFightsDisclaimer;