import React from "react";
import { Link, useLocation } from 'react-router-dom';
import ga4Event from "../../../../utils/ga4.event";

import APP from "../../../../app";

const BottomMenuItem = ({ path, activePath, text, onClick }) => {

    return (
        path == activePath
            ? <div className="item active"><span>{text}</span></div>
            : <Link to={{ pathname: path }} className="item" onClick={onClick}><span>{text}</span></Link>
    );

};

const Footer = () => {

    const onClickFooterArrow = () => {
        document.querySelector('section.predict-and-win').scrollIntoView({block: 'start', behavior: 'smooth'});
    };
    
    const BottomMenu = () => {
    
        const ACTIVE_PATH = useLocation().pathname;
        const playEvtCat = 'how_play';
        const playEvtDescp = 'how to play button https://upvsdown.com/how_to_play';
        const affEvtCat = 'be_affiliate';
        const affEvtDescp = 'https://upvsdown.com/how_to_aff';
    
        return (
            <div className="bottom-menu">
                <BottomMenuItem path="/" activePath={ACTIVE_PATH} text="Home" />
                <BottomMenuItem path="/how_to_play" activePath={ACTIVE_PATH} text="How to play" onClick={() => ga4Event(playEvtDescp, playEvtCat)} />
                <BottomMenuItem path="/how_to_aff" activePath={ACTIVE_PATH} text="Become an affiliate" onClick={() => ga4Event(affEvtDescp, affEvtCat)} />
            </div>
        );

    };

    return (

        <>

            <section className="entry-section footer web-only block">

                <div className="main-flex">

                    <div className="area logo-area">
                        <div className="bottom-logo"><div></div></div>
                        <div className="grey-text"><span>2023 CRYPTOFIGHTS</span></div>
                    </div>

                    <div className="area links-area">
                        <BottomMenu />
                        <div className="grey-text"><Link to="/cf_disclaimer"><span>DISCLAIMER</span></Link></div>
                    </div>

                    <div className="area socials-area">
                        <a href="https://twitter.com/cryptofightspro" target="_blank" className="x-twitter"></a>
                        <a href="https://instagram.com/cryptofights.pro" target="_blank" className="instagram"></a>
                        <a href="https://t.me/cryptofightspro" target="_blank" className="telegram"></a>
                        <a href="https://discord.gg/cryptofights" target="_blank" className="discord"></a>
                    </div>

                    <div className="area arrow-area">
                        <div className="white-arrow" onClick={onClickFooterArrow}></div>
                        <div className="rezart-logo"><div></div></div>
                    </div>

                </div>

            </section>

            <section className="entry-section footer mobile-only block">

                <div className="main-flex">

                    <div className="area logo-area">
                        <div className="bottom-logo"><div></div></div>
                    </div>

                    <div className="area links-area">
                        <BottomMenu />
                    </div>

                    <div className="area socials-area">
                        <a href="https://twitter.com/cryptofightspro" target="_blank" className="x-twitter"></a>
                        <a href="https://instagram.com/cryptofights.pro" target="_blank" className="instagram"></a>
                        <a href="https://t.me/cryptofightspro" target="_blank" className="telegram"></a>
                        <a href="https://discord.gg/cryptofights" target="_blank" className="discord"></a>
                    </div>

                    <div className="area grey-text-area">
                        <div className="grey-text"><Link to="/cf_disclaimer"><span>DISCLAIMER</span></Link></div>
                        <div className="grey-text"><span>2023 CRYPTOFIGHTS</span></div>
                    </div>

                    <div className="area arrow-area">
                        <div className="white-arrow" onClick={onClickFooterArrow}></div>
                        <div className="rezart-logo"><div></div></div>
                    </div>

                </div>

            </section>

        </>

    );

};

export default Footer;