import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

const WeeklyJackpot = () => {

    return (

        <section className="entry-section weekly-jackpot">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>{APP.term('entry_weekly_jack')}</span>
                    </div>

                    <p className="big"><span>{APP.term('entry_income_raffled')}</span></p>

                    <p className="small"><span>{APP.term('entry_five_pools')}</span></p>

                    <PlayNowButton />

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

export default WeeklyJackpot;