import React from 'react'
import APP from '../../app';

function proc_wallet_connect(setStep, e) {
    console.log('connect to wallet here');
    setStep(3); // continue to next page
}

export default function TutorialStep2({ setStep }) {
    return (
        <div className="page affiliate_tutorial step2">
            <div className="step_counter_wrap"><img className="step_counter" src="/media/images/step_coin_2.png" /></div>
            <div className="wallet_image_wrap"><img className="page_icon wallet" src="/media/images/crypto_wallet.png" /></div>
            <div className="page_title"><span>{APP.term('affiliate_tutorial_step2_title')}</span></div>
            <div className="general_desc"><span>{APP.term('affiliate_step2_desc')}</span></div>
            <div className="next_btn_wrap">
                <div className="next_btn" onClick={proc_wallet_connect.bind(null, setStep)}>
                    <span>{APP.term('next_step')}</span>
                </div>
            </div>
        </div>
    )
}