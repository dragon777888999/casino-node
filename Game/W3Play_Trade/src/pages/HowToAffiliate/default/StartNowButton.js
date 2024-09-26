import React from "react";
import { Link } from "react-router-dom";

import APP from "../../../app";

const getHrefValue = () => {

    const locals = [
        'localhost',
        'integration-app2.upvsdown.com',
        'prod-latest.upvsdown.com'
    ];

    return (
        locals.includes(window.location.hostname)
            ? '/partner_program'
            : '/share'
    );

};

const StartNowButton = ({ text }) => {

    const buttonText = text || APP.term('baa_start_now');

    return (
        <div className="play-now">
            <Link to={getHrefValue()}><span>{buttonText}</span></Link>
        </div>
    );

};

export default StartNowButton;