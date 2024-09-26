import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const WeeklyJackpot = () => {

    return (

        <section className="weekly-jackpot white">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>WEEKLY</span>
                        <span> JACKPOT</span>
                    </div>

                    <p className="big"><span>10% OF THE PLATFORM'S INCOME WILL BE RAFFLED AMONG ALL THE PARTICIPANTS IN THE GAME.</span></p>

                    <p className="small"><span>Each transaction you take earns you a lottery ticket, the more you play, the more lottery tickets you will have and your chances of winning will increase, good luck!</span></p>

                    <div className="play-now-box web-only flex">
                        <PlayNowButton />
                    </div>

                </div>

                <div className="box right">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="play-now-box mobile-only flex">
                    <PlayNowButton />
                </div>

            </div>

        </section>

    );

};

export default WeeklyJackpot;