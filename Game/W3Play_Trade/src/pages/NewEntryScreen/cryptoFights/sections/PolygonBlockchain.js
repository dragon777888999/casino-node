import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";
import HowToPlayButton from "../HowToPlayButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const PolygonBlockchain = () => {

    return (

        <section className="entry-section polygon-blockchain">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>POLYGON<br/>BLOCKCHAIN<br/>NETWORK</span>
                    </div>

                    <div className="play-btns web-only flex">
                        <PlayNowButton />
                        <HowToPlayButton />
                    </div>

                </div>

                <div className="box right">

                    <p className="the-game"><span>The game is running on #1 Web3 polygon blockchain network, to play the game you need to have polygon Matic tokens.</span></p>

                    <p className="our-game"><span>Our game is #1 Web3 game in the polygon network and Top 10 in sending Matic tokens!</span></p>

                </div>

                <div className="play-btns mobile-only flex">
                    <PlayNowButton />
                    <HowToPlayButton />
                </div>

            </div>

        </section>

    );

};

export default PolygonBlockchain;