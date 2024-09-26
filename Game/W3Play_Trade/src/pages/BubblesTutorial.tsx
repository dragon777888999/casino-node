import React, { useState } from 'react';
import { browserName } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import APP from '../app';
import useAppState from '../hooks/useAppState';
import { set_bg_music, set_bubbles_tutorial, set_completed_tutorial, set_connect_wallet_popup, set_first_load, set_sounds_popup, set_sound_effects, set_terms_popup, set_voiceover } from '../REDUX/actions/main.actions';
import state from '../state';

const BubblesTutorial = (): JSX.Element => {

    // const EnableSounds = ({ onClick, enableSounds }) => (
    //     <div className="bubbles_msg_sounds">
    //         <img src='/media/images/bubbles_tutorial/sounds.png' className="content_img" />
    //         <img src='/media/images/bubbles_tutorial/close.png' className="close_btn" onClick={onClick} />
    //         <p className="header">{APP.term('sound_popup_header')}</p>
    //         <p className="desc">{APP.term('sound_popup_desc')}</p>
    //         <div className="confirm_btn" onClick={enableSounds}>
    //             <p>{APP.term('sound_popup_btn')}</p>
    //         </div>
    //     </div>
    // );

    const Pools = ({ onClick, skipTutorial }) => (
        <div className="bubbles_msg_pools">
            <img src='/media/images/bubbles_tutorial/pools_img.png' className="content_img" />
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle2" />
            <div className="skip" onClick={skipTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClick}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const Investment = ({ onClick, skipTutorial }) => (
        <div className="bubbles_msg_investment">
            <img src='/media/images/bubbles_tutorial/investment.png' className="content_img" />
            <div className="sides">
                <p><span>{APP.term('bubbles_invst_header')}</span></p>
            </div>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={skipTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClick}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const BetUp = ({ onClick, skipTutorial }) => (
        <div className="bubbles_msg_bet_up">
            <img src='/media/images/bubbles_tutorial/pressUp.png' className="content_img" />
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <p className="header"><span>{APP.term('bubbles_bet_up_header')}</span></p>
            <div className="skip" onClick={skipTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClick}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const BetDown = ({ onClick, skipTutorial }) => (
        <div className="bubbles_msg_bet_down">
            <img src='/media/images/bubbles_tutorial/pressDown.png' className="content_img" />
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <p className="header"><span>{APP.term('bubbles_bet_down_header')}</span></p>
            <div className="skip" onClick={skipTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClick}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const Earnings = ({ onClick, skipTutorial }) => (
        <div className="bubbles_msg_earnings">
            <img src='/media/images/bubbles_tutorial/earnings.png' className="content_img" />
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <p className="header"><span>{APP.term('bubbles_earnings_header')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_earnings_desc')}</span></p>
            <div className="skip" onClick={skipTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClick}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const ConnectWallet = ({ onClick, skipTutorial }) => (
        <div className="bubbles_msg_connect_wallet">
            <img src='/media/images/bubbles_tutorial/connectWallet.png' className="content_img" />
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <p className="header"><span>{APP.term('bubbles_connect_header')}</span></p>
            <div className="skip" onClick={skipTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClick}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const Terms = ({ wallet_address, user_tutorial_gesture }) => {

        const dispatch = useDispatch(),
            [aggrement, setAgreement] = useState(false);

        // check if user aggred terms of use
        function terms(aggrement: boolean, wallet_address: string) {
            if (aggrement) {
                dispatch(set_bubbles_tutorial({ active: false, seen: true }))
                dispatch(set_completed_tutorial({ initial: true, bets: false }))

                if (!wallet_address && !user_tutorial_gesture) {
                    dispatch(set_connect_wallet_popup(true));
                }
                else if (user_tutorial_gesture) {
                    // list for labels that prevent showing sounds popup
                    // if (state.prevent_sound_popup_labels.includes(window.location.hostname)) return;
                    APP.state.set('user_betting_tutorial_gesture', true)
                }
            }
            else return;
        }

        return (
            <div className="bubbles_msg_terms">
                <p className="header"><span>{APP.term('bubbles_terms_header')}</span></p>
                <div className="row">
                    <div className="checkmark" onClick={() => setAgreement(!aggrement)}>
                        {aggrement && (<p>&#10003;</p>)}
                    </div>
                    <p className="desc">
                        <span>{APP.term('bubbles_terms_desc1')} </span><span onClick={() => dispatch(set_terms_popup(true))}> {APP.term('bubbles_terms_desc2')}</span>
                    </p>
                </div>
                <div className="next_btn" style={{ opacity: aggrement ? 1 : .5 }} onClick={() => terms(aggrement, wallet_address)}>
                    <p><span>{APP.term('bubbles_next')}</span></p>
                </div>
            </div>
        )
    };

    const steps = [
        /*EnableSounds,*/ Pools, Investment, BetUp, BetDown, Earnings, ConnectWallet, Terms
    ],
        [stepId, setStepId] = useState<number>(0),
        dispatch = useDispatch(),
        wallet_address = useAppState('wallet_address'),
        user_tutorial_gesture = useAppState('user_tutorial_gesture'),
        Step = steps[stepId];

    //enable all sounds effects bg/voiceover/sounds
    function enableSounds(dispatch: Function, stepId: number) {

        setStepId(stepId + 1)

        let mobile = (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i));

        const promise = new Promise((resolve, reject) => {
            dispatch(set_bg_music(true))
            dispatch(set_voiceover(true))
            dispatch(set_sound_effects(true))
            resolve('success')
        });


        promise.then(() => {

            if (mobile) {

                let arr = ['distributing_down_payouts', 'distributing_payouts', 'distributing_up_payouts',
                    'gained_profits', 'last_trade_chance', 'nearing_expiry', 'new_invest',
                    'new_round', 'trade_started', 'voice_no_more_trades',
                    'voice_place_your_trade', 'voice_you_won'];

                setTimeout(() => {
                    for (let sound of arr) {
                        APP.sounds[sound].play()
                        APP.sounds[sound].stop()
                    }
                }, 500);

                APP.sounds.ambience.play_forever();
            }
        });

        dispatch(set_first_load(true))
    }

    function skipTutorial(dispatch: Function, wallet_address: string, user_tutorial_gesture: boolean) {
        dispatch(set_bubbles_tutorial({ active: false, seen: true }))
        dispatch(set_completed_tutorial({ initial: true, bets: false }))
        if (!wallet_address && !user_tutorial_gesture) {
            dispatch(set_connect_wallet_popup(true));
        }
        else if (user_tutorial_gesture) {
            // list for labels that prevent showing sounds popup
            // if (state.prevent_sound_popup_labels.includes(window.location.hostname)) return;
            APP.state.set('user_betting_tutorial_gesture', true)
        }
    }

    // step on initial bubble (the bubble the user will see first)
    function stepNumNav() {
        let preventAllBubbles = state.disable_initial_tutorial_labels.includes(window.location.hostname),
            preventSoundsBubble = state.disable_sounds_popup_labels.includes(window.location.hostname);

        // skip to disclaimer bubble 
        if (preventAllBubbles && preventSoundsBubble) return 6;

        // skip the sounds popup bubble
        // else if (preventSoundsBubble) return 1;

        else return 0;
    }

    return (
        <div className="bubbles_wrap">
            <Step onClick={() => setStepId(stepId + 1)}
                wallet_address={wallet_address}
                user_tutorial_gesture={user_tutorial_gesture}
                // enableSounds={() => enableSounds(dispatch, stepId)}
                skipTutorial={() => skipTutorial(dispatch, wallet_address, user_tutorial_gesture)} />
        </div>
    )
}

export default React.memo(BubblesTutorial);