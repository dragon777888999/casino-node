import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const HowMuch = () => {

    return (

        <section className="how-much white">

            <div className="main-flex">

                {/* <div className="box left"> */}

                    <div className="caption">
                        <span>HOW MUCH DO I GET?</span><br/>
                    </div>

                    <div className="tiers-flex">
                        <div className="tier tier-1"></div>
                        <div className="tier tier-2"></div>
                        <div className="tier tier-3"></div>
                    </div>

                    <StartNowButton />

                {/* </div> */}

                {/* <div className="box right">

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div> */}

            </div>

        </section>

    );

};

export default HowMuch;