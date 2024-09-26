import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import APP from '../../../../app';
import ga4Event from '../../../../utils/ga4.event';

import PlayNowButton from '../PlayNowButton';

const TopMenuItem = ({ path, activePath, text }) => {
    return (
        path == activePath
            ? <div className="item active"><span>{text}</span></div>
            : <Link to={{ pathname: path }} className="item"><span>{text}</span></Link>
    );
};

const TopMenu = () => {

    const ACTIVE_PATH = useLocation().pathname,

        playEvtCat = 'how_play',
        playEvtDescp = 'how to play button https://upvsdown.com/how_to_play',

        affEvtCat = 'be_affiliate',
        affEvtDescp = 'https://upvsdown.com/how_to_aff';

    return (
        <div className="top-menu">
            <TopMenuItem path="/" activePath={ACTIVE_PATH} text={APP.term("home_page_new")} />
            <TopMenuItem path="/about" activePath={ACTIVE_PATH} text={APP.term("entry_home_page")} />
            <TopMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text={APP.term('entry_how_to_play')} onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
            <TopMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text={APP.term('entry_become_affiliate')} onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
        </div>
    );
};

const RealWeb3 = () => {

    return (

        <section className="real-web3 ttb dark">

            <TopMenu />

            {/* <div className="button-flex-wrap">
                <Link to="/" className="back-button">
                    <span>Go back</span>
                </Link>
            </div> */}

            <div className="main-flex">

                <div className="box text-area">
                    <div className="caption">
                        <span>{APP.term('htp_real_web3_pvp')}</span>
                    </div>
                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>

                    <div className="image-text-box">
                        <div className="image-text">
                            <span>{APP.term('htp_will_down_up')}</span>
                        </div>
                    </div>

                </div>

                <div className="button-flex-wrap">
                    <PlayNowButton />
                </div>

            </div>

        </section>

    );

};

export default RealWeb3;