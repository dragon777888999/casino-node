import React from "react";
import { Link } from "react-router-dom";
import ga4Event from "../../../utils/ga4.event";

const HowToPlayButton = () => {

    let evtCat = 'how_play',
        evtDescp = 'how to play button https://upvsdown.com/how_to_play';

    return (
        <div className="styled-button how-to-play" onClick={() => ga4Event(evtDescp, evtCat)}>
            <Link to="/how_to_play"><span>How to Play</span></Link>
        </div>
    );

};

export default HowToPlayButton;