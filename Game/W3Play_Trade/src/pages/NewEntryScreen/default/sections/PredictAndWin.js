import React from "react";
import { Link, useLocation } from 'react-router-dom';
import PlayNowButton from "../PlayNowButton";
import HowToPlayButton from "../HowToPlayButton";
import BeAffiliateButton from "../BeAffiliateButton";
import ga4Event from "../../../../utils/ga4.event";
import APP from "../../../../app";
import state from "../../../../state";

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
            <TopMenuItem path="/" activePath={ACTIVE_PATH} text={APP.term("home_page_new")} />
            <TopMenuItem path="/about" activePath={ACTIVE_PATH} text={APP.term("entry_home_page")} />
            <TopMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text={APP.term('entry_how_to_play')} onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
            {!state.prevent_referral_program_labels.includes(window.location.hostname) &&
            (<TopMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text={APP.term('entry_become_affiliate')} onClick={() => ga4Event(affEvtDescp, affEvtCat)} />)}
        </div>
    );
};

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

const PredictAndWin = () => {

    return (

        <>

            <section className="entry-section up-or-down web-only flex">

                <TopMenu />

                <div className="main-flex">

                    <div className="top-title-and-big-caption">

                        <div className="top-title">
                            <span>{APP.term('entry_pool_trading_game')}</span>
                        </div>

                        <div className="big-caption">

                            <div className="side-image-box up"></div>

                            <div className="main-text-box">

                                <div className="bitcoin-image">
                                    <img src={`${IMAGE_DIR}orange-bitcoin.svg`} loading="lazy" />
                                </div>

                                <span>{APP.term('entry_predict_win')}</span>

                            </div>

                            <div className="side-image-box down"></div>

                        </div>

                    </div>

                    <div className="play-btns">
                        <PlayNowButton />
                        <HowToPlayButton />
                        {!state.prevent_referral_program_labels.includes(window.location.hostname) && (<BeAffiliateButton />)}
                    </div>

                    <div className="certik-flex">
                        <span>{APP.term('entry_verified_by')}</span>
                        <div className="certik-logo">
                            <img src={`${IMAGE_DIR}certik-logo.svg`} loading="lazy" />
                        </div>
                    </div>

                </div>

            </section>

            <section className="entry-section up-or-down mobile-only flex">

                {/* ADD LATER: LANG SELECTOR */}

                <div className="main-flex">

                    {/* <div className="top-title-and-big-caption"> */}

                    <div className="up-down-image-box">
                        <div></div>
                    </div>

                    <div className="big-caption">

                        {/* <div className="side-image-box up"></div> */}

                        <div className="main-text-box">

                            <div className="bitcoin-image">
                                <img src={`${IMAGE_DIR}orange-bitcoin.svg`} loading="lazy" />
                            </div>

                            <span>{APP.term('entry_predict_win')}</span>

                        </div>

                        {/* <div className="side-image-box down"></div> */}

                    </div>

                    <div className="top-title">
                        <span>{APP.term('entry_pool_trading_game')}</span>
                    </div>

                    {/* </div> */}

                    <div className="play-btns">
                        <PlayNowButton />
                        <HowToPlayButton />
                        {!state.prevent_referral_program_labels.includes(window.location.hostname) && (<BeAffiliateButton />)}
                    </div>

                    <div className="certik-flex">
                        <span>{APP.term('entry_verified_by')}</span>
                        <div className="certik-logo">
                            <img src={`${IMAGE_DIR}certik-logo.svg`} loading="lazy" />
                        </div>
                    </div>

                </div>

            </section>

        </>

    );

};

export default PredictAndWin;