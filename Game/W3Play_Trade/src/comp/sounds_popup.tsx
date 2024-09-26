import React, { useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import APP from '../app';
import { set_bg_music, set_first_load, set_sounds_popup, set_sound_effects, set_voiceover } from '../REDUX/actions/main.actions';
import '../styles/pages/sounds_popup.scss';

type ScreenDimensions = {
    width: Number,
    height: Number,
}

function SoundsPopup() {

    const dispatch = useDispatch(),
        androidDevice = navigator.userAgent.match(/Android/i),
        [windowDimensions, setWindowDimensions] = useState<ScreenDimensions>(getWindowDimensions()),
        metamask = (navigator.userAgent.includes("MetaMaskMobile")),
        coinbase = (browserName.toLowerCase() === 'webkit'),
        largeDevice = window.innerHeight > 700,
        coinbaseAndroid = (browserName.toLowerCase() === 'chrome webview');

    // function to enable full screen
    function openFullScreen() {
        const elem = document.documentElement as any;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    //enable all sounds effects bg/voiceover/sounds
    function enableSounds() {

        // enable full screen
        openFullScreen();

        let mobile = (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i));

        const promise = new Promise((resolve, reject) => {
            dispatch(set_bg_music(true))
            dispatch(set_voiceover(true))
            dispatch(set_sound_effects(true))

            APP.state.set('temp_bg', true);
            APP.state.set('temp_voiceover', true);
            APP.state.set('temp_sounds', true);

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
        })
            .then(() => {
                dispatch(set_sounds_popup(false))
                dispatch(set_first_load(true))
            })
    }

    //disable and reset all sounds effects bg/voiceover/sounds
    function resetSounds() {
        dispatch(set_bg_music(false))
        dispatch(set_voiceover(false))
        dispatch(set_sound_effects(false))
    }

    //disable and reset all sounds effects bg/voiceover/sounds
    function closePopup() {
        dispatch(set_sounds_popup(false))
        dispatch(set_first_load(true))
    }

    useEffect(() => {
        resetSounds();

        window.addEventListener('orientationchange', handleResize);
        return () => {
            window.removeEventListener('orientationchange', handleResize);
            APP.state.unset('activate_sounds_popup')
        }
    }, [])


    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return { width: width, height: height };
    }

    // useEffect(() => {
    function handleResize() {
        setTimeout(() => {
            setWindowDimensions(getWindowDimensions());
        }, 50);
    }

    return (
        <div className="sounds_popup_wrap">
            {/* {((!metamask && !coinbase && !coinbaseAndroid) && windowDimensions?.height > windowDimensions?.width) ? */}
            {/* <div className="content_mobile">
                    <div className="close" onClick={() => closePopup()}></div>
                    <div className={"dialog_box " + (largeDevice ? 'dialog_box_mobile' : '')}>
                    <p className="desc">{APP.term('sounds_popup_desc1')}<br /> {APP.term('sounds_popup_desc2')}<br /> {APP.term('sounds_popup_desc3')}</p>
                    <div className="confirm"
                    onClick={() => enableSounds()}><p>{APP.term('sounds_popup_confirm')}</p></div>
                    </div>
                </div> */}
            {/* : */}
            <div className="bubbles_msg_sounds">
                <img src='/media/images/bubbles_tutorial/sounds.png' className="content_img" />
                <img src='/media/images/bubbles_tutorial/close.png' className="close_btn" onClick={() => closePopup()} />
                <p className="header"><span>{APP.term('sound_popup_header')}</span></p>
                <p className="desc"><span>{APP.term('sound_popup_desc')}</span></p>
                <div className="confirm_btn" onClick={() => enableSounds()}>
                    <p><span>{APP.term('sound_popup_btn')}</span></p>
                </div>
            </div>
            {/* <div className="content">
                <div className="close" onClick={() => closePopup()}></div>
                <div className="dialog_box">
                    <img src="/media/images/tutorial_mobile/maximize_exp.png" className="header_mobile" />
                    <img src="/media/images/text/maximizeExp.png" className="header" />
                    <p className="desc">{APP.term('sounds_popup_desc1')}<br /> {APP.term('sounds_popup_desc2')}<br /> {APP.term('sounds_popup_desc3')}</p>
                    <div className="confirm" onClick={() => enableSounds()}><p>{APP.term('sounds_popup_confirm')}</p></div>
                </div>
            </div> */}
            {/* } */}
        </div >
    )
}


export default SoundsPopup;