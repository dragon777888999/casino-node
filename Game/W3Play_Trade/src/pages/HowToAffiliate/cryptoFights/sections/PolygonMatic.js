import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";
import HowToPlayButton from "../HowToPlayButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const PolygonMatic = () => {

    return (

        <section className="polygon-matic">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>YOUR EARNINGS<br/>ARE IN POLYGON<br/>MATIC</span>
                    </div>

                    <div className="play-now-box web-only flex">
                            <StartNowButton />
                        </div>

                </div>

                <div className="box right">

                    <p className="the-game"><span>THE OFFICIAL TOKEN TO PLAY THE GAME</span></p>

                    <div className="rows-box">
                        <div className="row"><div className="num"><span>01</span></div><div className="text"><span className="big">TOP 10</span><span> Crypto token!</span></div></div>
                        <div className="row"><div className="num"><span>02</span></div><div className="text"><span className="big">#1 WEB3 </span><span>BLOCKCHAIN!</span></div></div>
                        <div className="row"><div className="num"><span>03</span></div><div className="text"><span>Trusted by </span><span className="big">INSTAGRAM AND META!</span></div></div>
                    </div>

                </div>

            </div>

        </section>

    );

};

export default PolygonMatic;