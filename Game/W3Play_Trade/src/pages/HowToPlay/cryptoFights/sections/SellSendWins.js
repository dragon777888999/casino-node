import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const SellSendWins = () => {

    return (

        <section className="sell-send-token">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption web-only block">
                        <span>HOW TO SELL<br/>OR SEND MY<br/>MATIC WINNINGS?</span>
                    </div>
                    <div className="caption mobile-only block">
                        <span>HOW TO SELL OR<br/>SEND MY<br/>MATIC WINNINGS?</span>
                    </div>

                    <div className="play-now-box web-only flex">
                        <PlayNowButton />
                    </div>

                </div>

                <div className="box middle">

                    <div className="">
                        <p className="big"><span>YOU CAN SELL YOUR MATIC WINNINGS</span></p>
                        <p className="small"><span>Easily from the link that appers on your WEB3 game wallet</span></p>
                    </div>

                    <div className="or"><span>OR</span></div>

                    <div className="">
                        <p className="big"><span>YOU CAN SEND YOUR MATIC WINNINGS</span></p>
                        <p className="small"><span>To other crypto wallet easly and safely!</span></p>
                    </div>

                    <div className="or"><span>OR</span></div>

                    <div className="">
                        <p className="big web-only block"><span>EXCHANGE<br/>YOUR MATIC</span></p>
                        <p className="big mobile-only block"><span>EXCHANGE YOUR MATIC</span></p>
                        <p className="small"><span>To other crypto token easily and safely with our best swap service!</span></p>
                    </div>

                    <div className="play-now-box mobile-only flex">
                        <PlayNowButton />
                    </div>

                </div>

                <div className="box right">

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div>

            </div>

        </section>

    );

};

export default SellSendWins;