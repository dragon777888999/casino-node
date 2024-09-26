import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const WeeklyJackpot = () => {

    return (

        <section className="entry-section weekly-jackpot">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>WEEKLY </span>
                        <span>JACKPOT</span>
                    </div>

                    <p className="big"><span>10% OF THE PLATFORM'S INCOME WILL BE RAFFLED AMONG ALL THE PARTICIPANTS IN THE GAME.</span></p>

                    <p className="small"><span>You have 5 prize pools that gives you the best chance to win, if you are a heavy gainer you will have a big chance, if you are a small fish you can still win, as many trades you do, your chances will be higher!</span></p>

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