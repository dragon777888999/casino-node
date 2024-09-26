import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const BestChance = () => {

    return (

        <section className="entry-section best-chance">

            <div className="main-flex">

                <div className="play-now-box mobile-only flex">
                    <PlayNowButton />
                </div>

                <div className="box left">

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div>

                <div className="box right">


                    <div className="caption">
                        <span>TODAYS<br />BEST CHANCE</span>
                    </div>

                    <p><span>Best Web3 Game Play!</span></p>

                    <div className="play-now-box web-only flex">
                        <PlayNowButton />
                    </div>

                </div>

            </div>

        </section>

    );

};

export default BestChance;