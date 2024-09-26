import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

const KeyBenefits = () => {

    return (

        <section className="entry-section key-benefits">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>{APP.term('entry_key_benefits')}</span>
                    </div>

                    <div className="benefits">
                        <p className="benefit"><span>{APP.term('entry_best_ratio')}</span></p>
                        <p className="benefit"><span>{APP.term('entry_control_funds')}</span></p>
                        <p className="benefit"><span>{APP.term('entry_play_p2p')}</span></p>
                        <p className="benefit"><span>{APP.term('entry_win_and_go')}</span></p>
                        <p className="benefit"><span>{APP.term('entry_certik_verified')}</span></p>
                    </div>

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

export default KeyBenefits;