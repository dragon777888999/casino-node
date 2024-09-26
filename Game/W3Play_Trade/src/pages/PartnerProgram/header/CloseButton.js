import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CloseButton = ({ buttonText, hidden }) => {

    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
    const route = currentPoolDetails?.route;

    return (
        <div className="close-button">
            <Link className={`close-button-inner ${hidden ? 'v-hidden' : ''}`} to={route}>
                <span>{buttonText || 'Close'}</span>
            </Link>
        </div>
    );
};

export default CloseButton;