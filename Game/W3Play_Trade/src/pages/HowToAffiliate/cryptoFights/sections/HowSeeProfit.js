import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const HowSeeProfit = () => {

    return (

        <>

            <section className="how-see-profit">

                <div className="main-flex">

                    <div className="box right">

                        <div className="caption">
                            <span>HOW DO<br/>I SEE MY<br/>PROFIT?</span>
                        </div>

                        <div className="play-now-box web-only flex">
                            <StartNowButton />
                        </div>

                    </div>

                    <div className="box left">
                        <div className="image-wrap"><div></div></div>
                    </div>

                    <div className="play-now-box mobile-only flex">
                        <StartNowButton />
                    </div>

                </div>

            </section>

        </>

    );

};

export default HowSeeProfit;