import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const HowSeeStats = () => {

    return (

        <section className="how-see-stats">

            <div className="main-flex">

                <div className="box left">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="box right">

                    <div className="caption">
                        <span>HOW DO I SEE<br/>MY EARNING<br/>STATS</span>
                    </div>

                    <div className="big">
                        <span className="green">UPDATES DAILY</span><br/>
                        <span className="white">AT 12 GMT</span>
                    </div>

                </div>

            </div>

        </section>

    );

};

export default HowSeeStats;