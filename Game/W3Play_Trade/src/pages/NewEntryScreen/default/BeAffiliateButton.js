import React from "react";
import { Link } from "react-router-dom";

import APP from "../../../app";
import ga4Event from "../../../utils/ga4.event";

const BeAffiliateButton = () => {

    const evtCat = 'be_affiliate';
    const evtDescp = 'https://upvsdown.com/how_to_aff';

    return (
        <div className="styled-button be-an-affiliate" onClick={() => ga4Event(evtDescp, evtCat)}>
            <Link to="/how_to_aff"><span>{APP.term('entry_be_an_aff')}</span></Link>
        </div>
    );

};

export default BeAffiliateButton;