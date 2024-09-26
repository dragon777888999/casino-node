
import React, { useState, useEffect, useRef } from 'react';
import APP from "../../app";

const touchPrimary = window.matchMedia("(pointer: coarse)").matches;

const Advantages = () => {

    const [advClassName, setAdvClassName] = useState('advantages');
    const advantagesRef = useRef();
    const isDemo = APP.state.get('currentToken') === 'demo';
    const descTxt = isDemo ? 'bubbles_entry_blockchain_desc_demo' : 'bubbles_entry_blockchain_desc';
    const descTxt2 = isDemo ? 'bubbles_entry_blockchain_header_demo' : 'bubbles_entry_blockchain_header';

    // For devices where primary input is touch (otherwise: CSS hover)
    const onTouchStartAdvantage = (e) => {
        if(!touchPrimary) return;
        const id = e.currentTarget.getAttribute('data-id');
        const alreadyOpen = advantagesRef.current.classList.contains(id);
        if(alreadyOpen) {setAdvClassName('advantages');}
        else {setAdvClassName(`advantages active-item ${id}`);}
        // show/hide overlay
    };

    const onMouseOverAdvantage = (e) => {
        if(touchPrimary) return;
        const id = e.currentTarget.getAttribute('data-id');
        setAdvClassName(`advantages active-item ${id}`);
        // show overlay
    };

    const onMouseOutAdvantage = (e) => {
        if(touchPrimary) return;
        setAdvClassName('advantages');
        // hide overlay
    };

    return (

        <div className={advClassName} ref={advantagesRef}>

            <div className="item-overlay item-overlay-top"></div>
            <div className="item-overlay item-overlay-bottom"></div>

            <div onTouchStartCapture={onTouchStartAdvantage} onMouseOver={onMouseOverAdvantage} onMouseOut={onMouseOutAdvantage} className="item dapp" data-id="dapp">

                <div className="icon-image"></div>
                
                <div className="text">
                    <div className="top"><span>{APP.term("bubbles_entry_web3_header")}</span></div>
                    <div className="bottom"><span>{APP.term("home_no_reg")}</span></div>
                </div>

                <div className="item-content-wrap">
                    <div className="item-content">
                        <div className="content-icon"></div>
                        <div className="content-title"><span>{APP.term("bubbles_entry_web3_header")}</span></div>
                        <ol className="content-list">
                            <li><span>{APP.term("home_simple_access_dot")}</span></li>
                            <li><span>{APP.term("home_no_reg_dot")}</span></li>
                            <li><span>{APP.term("home_protects_privacy_dot")}</span></li>
                        </ol>
                        {/* <div className="item-arrow-button"></div> */}
                    </div>
                </div>

            </div>

            <div onTouchStartCapture={onTouchStartAdvantage} onMouseOver={onMouseOverAdvantage} onMouseOut={onMouseOutAdvantage} className="item secure" data-id="secure">
                <div className="icon-image"></div>
                <div className="text">
                    <div className="top"><span>{APP.term("home_secure")}</span></div>
                    <div className="bottom"><span>{APP.term("home_no_deposit")}</span></div>
                </div>
                <div className="item-content-wrap">
                    <div className="item-content">
                        <div className="content-icon"></div>
                        <div className="content-title"><span>{APP.term("home_secure")}</span></div>
                        <ol className="content-list">
                            <li><span>{APP.term("home_deposit_no_need_dot")}</span></li>
                            <li><span>{APP.term("home_control_crypto_dot")}</span></li>
                            <li><span>{APP.term("home_proof_security_dot")}</span></li>
                        </ol>
                        {/* <div className="item-arrow-button"></div> */}
                    </div>
                </div>
            </div>

            <div onTouchStartCapture={onTouchStartAdvantage} onMouseOver={onMouseOverAdvantage} onMouseOut={onMouseOutAdvantage} className="item decentralized" data-id="decentralized">
                <div className="icon-image"></div>
                <div className="text">
                    <div className="top"><span>{APP.term("home_decentralized")}</span></div>
                    <div className="bottom"><span>{APP.term("home_transparent_pc")}</span></div>
                </div>
                <div className="item-content-wrap">
                    <div className="item-content">
                        <div className="content-icon"></div>
                        <div className="content-title"><span>{APP.term("home_decen_pc")}</span></div>
                        <ol className="content-list">
                            <li><span>{APP.term("home_p2p_game_dot")}</span></li>
                            <li><span>{APP.term("home_trustless_dot")}</span></li>
                            <li><span>{APP.term("home_audited_dot")}</span></li>
                        </ol>
                        {/* <div className="item-arrow-button"></div> */}
                    </div>
                </div>
            </div>

            <div onTouchStartCapture={onTouchStartAdvantage} onMouseOver={onMouseOverAdvantage} onMouseOut={onMouseOutAdvantage} className="item blockchain" data-id="blockchain">
                <div className="icon-image"></div>
                <div className="text">
                    <div className="top"><span>{APP.term("home_blockchain")}</span></div>
                    <div className="bottom"><span>{APP.term("home_poly_matic")}</span></div>
                </div>
                <div className="item-content-wrap">
                    <div className="item-content">
                        <div className="content-icon"></div>
                        <div className="content-title"><span>{APP.term(descTxt2)}</span></div>
                        <div className="content-text">
                            <p><span>{APP.term(descTxt)}</span></p>
                        </div>
                        {/* <div className="item-arrow-button"></div> */}
                    </div>
                </div>
            </div>

        </div>

    );

};

export default Advantages;