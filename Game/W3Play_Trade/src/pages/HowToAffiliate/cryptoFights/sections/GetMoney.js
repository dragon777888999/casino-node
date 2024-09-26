import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const GetMoney = () => {

    return (

        <section className="get-money">

            <div className="main-flex">

                <div className="left">
                    <div className="caption">
                        <span>HOW DO I GET<br/>MY MONEY<br/>AND WHEN?</span><br/>
                    </div>
                </div>

                <div className="middle">

                    <div className="big">
                        <span className="green">AUTOMATICALLY<br/>TO YOUR CRYPTO<br/>WALLET</span>
                        <span className="white"> EVERY DAY<br/>12 GMT</span>
                    </div>

                    <div className="play-now-box web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="right">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="play-now-box mobile-only flex">
                    <StartNowButton />
                </div>

            </div>

        </section>

    );

};

export default GetMoney;