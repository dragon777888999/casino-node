import React, { useState } from 'react';
import APP from '../../../../../app';

const Step4 = ({ goBack }) => {

    const [currentStep, setStep] = useState(0);
    const isDemo = APP.state.get('currentToken') === 'demo';
    const desc1_txt = isDemo ? 'topup_step4_desc1_demo' : 'topup_step4_desc1';
    const header_txt = isDemo ? 'topup_step4_header_demo' : 'topup_step4_header';
    const subtitle1_txt = isDemo ? 'topup_step4_subtitle1_demo' : 'topup_step4_subtitle1';
    const steps = [
        { idx: 1, subtitle: APP.term(subtitle1_txt), img: 'step1', desc: APP.term(desc1_txt) },
        { idx: 2, subtitle: APP.term('topup_step4_subtitle2'), img: 'step2', desc: APP.term('topup_step4_desc2') },
        { idx: 3, subtitle: APP.term('topup_step4_subtitle3'), img: 'step3', desc: APP.term('topup_step4_desc3') },
        { idx: 4, subtitle: APP.term('topup_step4_subtitle4'), img: 'step4', desc: APP.term('topup_step4_desc4') },
        { idx: 5, subtitle: APP.term('topup_step4_subtitle5'), img: 'step5', desc: APP.term('topup_step4_desc5') },
    ];

    // steps by dir (prev,next)
    function goToStep(currentStep, dir, goBack) {
        if (dir === 'next') {
            if (currentStep + 1 === steps.length) goBack();
            setStep(currentStep + 1)
        }
        else if (dir === 'prev') {
            if (currentStep + 1 === 1) goBack();
            setStep(currentStep - 1)
        }
    }

    return (
        <div className="topup_step4_wrap" device={navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ? 'ios' : ''}>
            <p className="header">{APP.term(header_txt)}</p>

            <div className="content">
                <img className="left" src='media/images/topup/steps/arr.png' onClick={() => goToStep(currentStep, 'prev', goBack)} />
                <p className="title">{APP.term('topup_step4_step_idx')} {steps[currentStep]['idx']}</p>
                <p className="subheader">{steps[currentStep]['subtitle']}</p>
                <img className="contentImg" idx={steps[currentStep]['idx']} src={`media/images/topup/steps/${steps[currentStep]['img']}.png`} />
                <img className="right" src='media/images/topup/steps/arr.png' /*idx={currentStep + 1}*/ onClick={() => goToStep(currentStep, 'next', goBack)} />
                <p className="desc">{steps[currentStep]['desc']}</p>
            </div>

            <div className="bottom">
                <div className="steps_circles">
                    {steps.map((itm, idx) => (
                        <div key={idx} className={"circle " + (currentStep + 1 == itm['idx'] ? "active" : "")} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Step4;