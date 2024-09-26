import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";
import HowToPlayButton from "../HowToPlayButton";

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

const PolygonBlockchain = () => {

    const isDemo = APP.state.get('currentToken') === 'demo',
        descTxt = isDemo ? 'entry_game_running_demo' : 'entry_game_running',
        descTxt2 = isDemo ? 'entry_our_game_demo' : 'entry_our_game';

    return (

        <section className="entry-section polygon-blockchain">

            <div className="main-flex">

                <div className="polygon-image">
                    <img src={`${IMAGE_DIR}polygon-image.svg`} loading="lazy" />
                </div>

                <div className="caption">
                    <span>{APP.term('entry_poly_network')}</span>
                </div>

                <p className="the-game"><span>{APP.term(descTxt)}</span></p>

                <p className="our-game"><span>{APP.term(descTxt2)}</span></p>

                <div className="play-btns">
                    <PlayNowButton />
                    <HowToPlayButton />
                </div>

            </div>

        </section>

    );

};

export default PolygonBlockchain;