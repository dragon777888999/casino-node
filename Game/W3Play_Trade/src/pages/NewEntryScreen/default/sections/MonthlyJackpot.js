import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

const MonthlyJackpot = () => {

    return (

        <section className="entry-section monthly-jackpot">

            <div className="main-flex">

                <div className="box left">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="box right">

                    <div className="caption">
                        <span>{APP.term('entry_monthly_jack')}</span>
                    </div>

                    <p className="big"><span>{APP.term('entry_income_raffled')}</span></p>

                    <p className="small"><span>{APP.term('entry_lottery_ticket')}</span></p>

                    <PlayNowButton />

                </div>

            </div>

        </section>

    );

};

export default MonthlyJackpot;