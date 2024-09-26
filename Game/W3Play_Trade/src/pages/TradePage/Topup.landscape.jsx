import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEditHandler } from 'stream-chat-react';
import { set_topup_wallet_popup } from '../../REDUX/actions/main.actions';
import Step1 from './Topup/Steps/Landscape/Step1';
import Step2 from './Topup/Steps/Landscape/Step2';
import Step3 from './Topup/Steps/Landscape/Step3';
import Step4 from './Topup/Steps/Landscape/Step4';

const TopupLandscape = ({ send, closePopup }) => {

    const steps = { 1: Step1, 2: Step2, 3: Step3, 4: Step4 };
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const CurrentStep = steps[step];
    const isIosClass = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ? 'ios' : '';

    // CSS vh/percent alternative for IOS
    const setVhUnit = () => {
        const vhUnit = window.innerHeight / 100;
        document.documentElement.style.setProperty('--vhUnit', `${vhUnit}px`);
    }

    useEffect(() => {
        window.addEventListener('resize', setVhUnit);
        setVhUnit();
        return () => window.removeEventListener('resize', setVhUnit);
    }, []);

    return (

        <div className={`topup_container ${isIosClass}`}>

            <div className="topup-box-wrap">

                <div className="topup-close-btn" onClick={() => dispatch(set_topup_wallet_popup(false))} />

                <div className="topup-overflow-hidden">

                    <div className="topup-box" device={isIosClass}>

                        <div className="topup-content">
                            <CurrentStep
                                send={send}
                                closePopup={closePopup}
                                goBackMain={() => setStep(step - 2)}
                                goForward={() => setStep(step + 1)}
                                goToPaybis={() => setStep(step + 2)}
                                goBack={() => setStep(step - 1)} />
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>

    );

};

export default TopupLandscape;