import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

const BestChance = () => {

    return (

        <section className="entry-section best-chance">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>{APP.term('entry_todays_best_chance')}</span>
                    </div>

                    <p><span>{APP.term('entry_best_game_play')}</span></p>

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

export default BestChance;