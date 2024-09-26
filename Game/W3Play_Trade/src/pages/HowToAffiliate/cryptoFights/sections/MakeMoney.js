import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const MakeMoney = () => {

    return (

        <section className="make-money">

            <div className="main-flex">

                <div className="box left">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="box right">

                    <div className="caption web-only block">
                        <span>MAKE MONEY<br/>WHEN YOUR FRIENDS<br/>MAKE MONEY!</span>
                    </div>

                    <div className="caption mobile-only block">
                        <span>MAKE MONEY WHEN YOUR FRIENDS MAKE MONEY!</span>
                    </div>

                </div>

            </div>

        </section>

    );

};

export default MakeMoney;