import React from 'react';
import { Link } from 'react-router-dom';

const LogoButton = ({ isEmpty, logoUrl }) => {

    return (

        <Link to="/" className="logo-box">
            <img src={logoUrl} />
        </Link>

    );

};

export default LogoButton;