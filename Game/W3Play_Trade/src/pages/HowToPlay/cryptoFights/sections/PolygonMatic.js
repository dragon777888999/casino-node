import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";
import HowToPlayButton from "../HowToPlayButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const PolygonMatic = () => {

    return (

        <section className="polygon-matic">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>POLYGON<br/>MATIC</span>
                    </div>

                    <div className="play-now-box web-only flex">
                        <PlayNowButton />
                    </div>

                </div>

                <div className="box right">

                    <p className="the-game"><span>THE OFFICIAL TOKEN TO PLAY THE GAME</span></p>

                    <div className="rows-box">
                        <div className="row"><div className="num"><span>01</span></div><div className="text"><span className="big">TOP 10</span><span> Crypto token!</span></div></div>
                        <div className="row"><div className="num"><span>02</span></div><div className="text"><span>#1 WEB3 </span><span className="big">BLOCKCHAIN!</span></div></div>
                        <div className="row"><div className="num"><span>03</span></div><div className="text"><span>Trusted by </span><span className="big">INSTAGRAM AND META!</span></div></div>
                    </div>

                    <div className="play-now-box mobile-only flex">
                        <PlayNowButton />
                    </div>

                </div>

            </div>

        </section>

    );

};

export default PolygonMatic;