import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import APP from '../../../../app';
import ga4Event from '../../../../utils/ga4.event';

import StartNowButton from '../StartNowButton';

const TopMenuItem = ({ path, activePath, text }) => {
    return (
        path == activePath
            ? <div className="item active"><span>{text}</span></div>
            : <Link to={{ pathname: path }} className="item"><span>{text}</span></Link>
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
            <TopMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text={APP.term('entry_become_affiliate')} onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
        </div>
    );

};

const MeetProgram = () => {

    return (

        <section className="meet-program dark">

            <TopMenu />

            {/* <div className="back-button-flex-wrap">
                <Link to="/" className="back-button">
                    <span>Go back</span>
                </Link>
            </div> */}

            <div className="main-flex">

                <div className="top-caption">
                    <span>{APP.term('baa_meet_our')} </span>
                    <span className="green">{APP.term('baa_aff_program')}</span>
                </div>

                <div className="box text-area">

                    <div className="caption web-only block">
                        <span>{APP.term('baa_you_have_friends')}</span><br />
                        <span className="green">{APP.term('baa_if_yes')}</span><br />
                        <span>{APP.term('baa_make_money_now')}</span>
                    </div>

                    <div className="caption mobile-only block">
                        <span>{APP.term('baa_you_have_friends')} </span>
                        <span className="green">{APP.term('baa_if_yes')} </span>
                        <span>{APP.term('baa_make_money_now')}</span>
                    </div>

                    <div className="sub-caption web-only block">
                        <span className="red">{APP.term('baa_if_not')} </span>
                        <span>{APP.term('baa_go_find_friends')}</span>
                    </div>

                    <div className="button-flex-wrap web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="sub-caption mobile-only block">
                    <span className="red">{APP.term('baa_if_not')} </span>
                    <span>{APP.term('baa_go_find_friends')}</span>
                </div>

                <div className="button-flex-wrap mobile-only flex">
                    <StartNowButton />
                </div>

            </div>

        </section>

    );

};

export default MeetProgram;