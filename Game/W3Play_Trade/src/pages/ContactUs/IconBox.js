import React from 'react';
import APP from '../../app';

const IconBox = () => {

    return (
        <div className="icons-box">
            <div className="icon-box web3">
                <div className="icon-image"></div>
                <div className="icon-top-text"><span>{APP.term('sap_web3')}</span></div>
            </div>
            <div className="icon-box decentralized">
                <div className="icon-image"></div>
                <div className="icon-top-text"><span>{APP.term('sap_transparency')}</span></div>
            </div>
            <div className="icon-box secure">
                <div className="icon-image"></div>
                <div className="icon-top-text"><span>{APP.term('sap_secure')}</span></div>
            </div>
            <div className="icon-box blockchain">
                <div className="icon-image"></div>
                <div className="icon-top-text"><span>{APP.term('sap_polygon_chain')}</span></div>
            </div>
        </div>
    );
};

export default IconBox;