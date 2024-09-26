import React from 'react';

const BackButton = ({ buttonText, handler, hidden }) => {

    return (

        <div className="back-button" onClick={handler || (() => {})}>
            <p className={`back-button-inner ${hidden ? 'v-hidden' : ''}`}>
                <span>{buttonText || 'Back'}</span>
            </p>
        </div>

    );

};

export default BackButton;