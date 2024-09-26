import React from 'react'
import APP from './../../app';
import { useDispatch } from 'react-redux';
import { set_affiliate_tutorial } from './../../REDUX/actions/main.actions';

export default function TutorialStep3 ({setStep}){
    const dispatch = useDispatch();
    function finish_tutorial(){
        dispatch(set_affiliate_tutorial(true))
    }
    return (
        <div className="page affiliate_tutorial step3">
            <div className="step_counter_wrap"><img className="step_counter" src="/media/images/step_coin_3.png"/></div>
            <div className="share_image_wrap"><img className="page_icon share_link" src="/media/images/share_link.png"/></div>
            <div className="page_title"><span>{APP.term('affiliate_tutorial_step3_title')}</span></div>
            <div className="general_desc"><span>{APP.term('affiliate_step3_desc')}</span></div>
            <div className="next_btn_wrap">
                <div className="next_btn" onClick={finish_tutorial}>
                    <span>{APP.term('next_step')}</span>
                </div>
            </div>
        </div>
    )
}