import React from "react";
import { Link } from "react-router-dom";
import APP from "../../../app";
import ga4Event from "../../../utils/ga4.event";

const PlayNowButton = () => {

    const evtCat = '1_play_now';
    const evtDescp = 'click on any first buttons leading to the trading page';

    return (
        <div className="play-now" onClick={() => ga4Event(evtDescp, evtCat)}>
            <Link to="/trade"><span>{APP.term('htp_play_earn_crypto')}</span></Link>
        </div>
    );
};

export default PlayNowButton;