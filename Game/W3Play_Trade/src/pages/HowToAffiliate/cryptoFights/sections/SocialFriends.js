import React, { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import StartNowButton from "../StartNowButton";
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

const SocialFriends = () => {

    return (

        <>

            {/* <section className="entry-section meet-program web-only flex"> */}
            <section className="entry-section social-friends">

                <div className="main-flex">

                    <div className="top-content">
                        <div className="logo"></div>
                        <TopMenu />
                    </div>

                    <div className="middle-content">
                    
                        <div className="caption-area web-only flex">

                            <div className="caption">
                                <span>YOU HAVE SOCIAL FRIENDS?</span>
                            </div>

                            <div className="play-btns">
                                <StartNowButton />
                                {/* <HowToPlayButton /> */}
                            </div>

                        </div>

                        <div className="small-text-area">

                            <div className="meet-web3">
                                <span>MEET OUR WEB3<br/>MULTI LEVEL AFFILIATE<br/>PROGRAM</span>
                            </div>

                            <div className="caption mobile-only block">
                                <span>YOU HAVE SOCIAL FRIENDS?</span>
                            </div>

                            <div className="if-yes">
                                <span>IF YES,<br/>MAKE MONEY NOW!</span>
                            </div>

                            <div className="if-no">
                                <span className="white">IF NOT</span><span>, GO FIND NEW<br/>FRIENDS & COME BACK<br/>TO US!</span>
                            </div>

                        </div>

                        <div className="middle-right">

                        </div>

                    </div>

                    <div className="play-btns mobile-only flex">
                        <StartNowButton />
                        {/* <HowToPlayButton /> */}
                    </div>

                    {/* <div className="play-btns">
                        <StartNowButton />
                        <HowToPlayButton />
                    </div> */}

                </div>

            </section>

        </>

    );

};

export default SocialFriends;