import React from 'react'
import APP from '../../app';
import useAppState from '../../hooks/useAppState';

export default function TutorialStep1({ setStep }) {
    var percents = useAppState('affiliate_payouts')
    return (
        <div className="page affiliate_tutorial step1">
            <div className="step_counter_wrap">
                <img className="step_counter" src="/media/images/step_coin_1.png" />
            </div>
            <div className="page_title"><span>{APP.term('affiliate_tutorial_step1_title')}</span></div>
            <div className="tiers">
                <div className="tier tier0">
                    <img className="icon" src="/media/images/one_person.png" />
                    <div className="name"><span>{APP.term('affiliate_tier_name_0')}</span></div>
                </div>
                <div className="tier tier1">
                    <img className="arrow" src="/media/images/thick_arrow.png" />
                    <img className="icon" src="/media/images/group_tier_1.png" />
                    <div className="percent"><span>{percents.tier1}%</span></div>
                    <div className="name"><span>{APP.term('affiliate_tier_name_1')}</span></div>
                </div>
                <div className="tier tier2">
                    <img className="arrow" src="/media/images/thick_arrow.png" />
                    <img className="icon" src="/media/images/group_tier_2.png" />
                    <div className="percent"><span>{percents.tier2}%</span></div>
                    <div className="name"><span>{APP.term('affiliate_tier_name_2')}</span></div>
                </div>
                <div className="tier tier3">
                    <img className="arrow" src="/media/images/thick_arrow.png" />
                    <img className="icon" src="/media/images/group_tier_3.png" />
                    <div className="percent"><span>{percents.tier3}%</span></div>
                    <div className="name"><span>{APP.term('affiliate_tier_name_3')}</span></div>
                </div>
            </div>
            <div className="general_desc">
                <span>{APP.term('affiliate_step1_desc')}</span>
            </div>
            <div className="next_btn_wrap">
                <div className="next_btn" onClick={e => setStep(2)}>
                    <span>{APP.term('next_step')}</span>
                </div>
            </div>
        </div>
    );
}