import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const ShareLinks = () => {

    return (

        <section className="share-links">

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

                    <div className="caption">
                        <span>SHARE THE LINKS<br/>THROUGH YOUR SOCIAL<br/>NETWORK CHANNELS</span>
                    </div>

                    <div className="very-easy green">
                        <span>TIKTOK, INSTAGRAM,<br/>FACEBOOK, TELEGRAM,<br/>AND MORE</span>
                    </div>

                    <div className="play-now-box web-only flex">
                        <StartNowButton />
                    </div>

                </div>

            </div>

        </section>

    );

};

export default ShareLinks;