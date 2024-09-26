import React from 'react';
import { Link } from 'react-router-dom';

const NavButton = ({ text, href, to, callback, addClass }) => {

    const className = `step-nav-button${addClass ? ` ${addClass}` : ''}`;

    return (
        <>
            {href && <div className={className}><a href={href}><span>{text}</span></a></div>}
            {to && <Link to={to}><div className={className}><span>{text}</span></div></Link>}
            {callback && <div className={className} onClick={callback}><span>{text}</span></div>}
        </>
    );

};

export default NavButton;