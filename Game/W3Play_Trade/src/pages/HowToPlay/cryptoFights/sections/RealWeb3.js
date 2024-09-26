import React, { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import PlayNowButton from "../PlayNowButton";
import HowToPlayButton from "../HowToPlayButton";
// import BeAffiliateButton from "../BeAffiliateButton";
import ga4Event from "../../../../utils/ga4.event";

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
            <TopMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text="How to play" onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
            <TopMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text="Become an affiliate" onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
        </div>
    );

};

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const RealWeb3 = () => {

    return (

        <>

            <section className="real-web3">

                <div className="lights green-lights"></div>

                <div className="lights red-lights"></div>

                <div className="main-flex">

                    <div className="top-content">
                        <div className="logo"></div>
                        <TopMenu />
                    </div>

                    <div className="middle-content">
                    
                        <div className="middle-left">

                            <div className="caption-area">

                                <div className="caption">
                                    <span>REAL WEB3 PVP TRADING GAME</span>
                                </div>

                                <div className="small-caption">
                                    <span>WILL BITCOIN<br/>GO UP OR DOWN?</span>
                                </div>

                            </div>

                            <div className="play-btns">
                                <PlayNowButton />
                            </div>

                        </div>

                        <div className="middle-right">

                        </div>

                    </div>

                </div>

            </section>

        </>

    );

};

export default RealWeb3;