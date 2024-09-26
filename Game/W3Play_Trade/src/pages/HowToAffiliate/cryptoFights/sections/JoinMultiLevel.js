import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const JoinMultiLevel = () => {

    return (

        <section className="join-multi-level">

            <div className="main-flex">

                <div className="play-now-box mobile-only flex">
                    <StartNowButton />
                </div>

                <div className="box left">

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div>

                <div className="box right">

                    <div className="caption web-only block">
                        <span>JOIN THE MULTI<br/>LEVEL AFFILIATE PARTNER<br/>PROGRAM!</span>
                    </div>

                    <div className="caption mobile-only block">
                        <span>JOIN THE MULTI LEVEL AFFILIATE PARTNER PROGRAM!</span>
                    </div>

                    <div className="very-easy green">
                        <span>IT'S VERY EASY!<br/>AND FREE!</span>
                    </div>

                    <div className="play-now-box web-only flex">
                        <StartNowButton />
                    </div>

                </div>

            </div>

        </section>

    );

};

export default JoinMultiLevel;