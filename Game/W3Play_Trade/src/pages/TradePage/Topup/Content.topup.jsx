import React, { useRef } from 'react';
import { Magic } from 'magic-sdk';
import { useDispatch } from 'react-redux';
import APP from '../../../app';
import { set_p2p_popup, set_private_key_popup, set_topup_wallet_popup, set_utorg_popup } from '../../../REDUX/actions/main.actions';
import state from '../../../state';
import deSwap from '../../../utils/topup/deSwap';
import deSwapMobile from '../../../utils/topup/deSwap.mobile';
import magicWidgetUI from '../../../utils/topup/magicWidgetUI';
import useAppState from '../../../hooks/useAppState';

const Divider = ({ text }) => (
    <div className="top_label_header">
        <div />
        <p className="divider">{APP.term(text)}</p>
        <div />
    </div>
);

const Content = ({ goToPaybis }) => {

    const isMagicConnect = localStorage.getItem('wallet') === 'magicauth';
    const isWeb5 = localStorage.getItem("wallet") === 'web5';
    const dispatch = useDispatch();
    const walletAddress = useAppState('wallet_address');
    const email = APP.state.get('user_email');
    const iframeRef = useRef(null);
    const isDemo = APP.state.get('currentToken') === 'demo';
    const sell_txt = isDemo ? 'topup_sell_my_matic_demo' : 'topup_sell_my_matic';

    const openP2P = () => {
        dispatch(set_topup_wallet_popup(false));
        APP.state.set('topup_wallet_popup', false);
        dispatch(set_p2p_popup(true));
    };

    //deswap mobile/web detect functionality
    const deSwapByDevice = (APP, dispatch) => {
        const mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        if (mobile) deSwapMobile(APP, dispatch);
        else deSwap(APP, dispatch);
    };

    // send email to user's mail
    const sendEmail = async (email) => {
        dispatch(set_private_key_popup(true));
        try { // initiate login flow
            const otpObj = APP.magic.auth.loginWithEmailOTP({ email: email, showUI: false, deviceCheckUI: false });
            APP.state.set('otpObj', otpObj);
        }
        catch (err) { console.log(err, 'err') }
    };

    function getIframeURL() {
        return "https://bridge.margin-tech.com/pay.php?checkout_id=custom-1&currency=matic&iframe=1&default-price=30&dark=1&address=" + walletAddress
    }

    return (

        <div className="topup_content">

            {isMagicConnect && (<>
                <Divider text={'topup_magic_label'} />
                <div className="magic_btn" onClick={() => magicWidgetUI(APP)}>
                    <img src='/media/images/topup/magic.svg' />
                </div>
                <a href={state.magic_private_key} className="magic_private_key" target="_blank">
                    <p>{APP.term('topup_magic_key_link')}</p>
                </a></>)}

            <iframe
                ref={iframeRef}
                src={getIframeURL()}
                frameBorder="0"
                // className="iframe_wrap"
                // p2p={p2p_pay ? "true" : "false"}
                allow="clipboard-read; clipboard-write" />

            <div style={{ width: 20, height: 20, background: 'red' }} onClick={goToPaybis} />

            {/* <Divider text={'topup_label_utorg'} />
            <div className="buy_utorg_btn" onClick={() => dispatch(set_utorg_popup(true))}>
                <img src='/media/images/topup/visaviautorg.svg' btn="utorg" />
            </div> */}

            {/* <div className="support">
                <p><span>{APP.term('topup_service_provided_by')}</span> <span className="provider utorg">UTORG</span></p>
                <p><span>{APP.term('topup_for_support')}</span> <a href="https://utorg.pro/contacts" target="_blank"><span className="click-here">{APP.term('topup_click_here')}</span></a></p>
            </div> */}

            {/* <Divider text={'topup_label_deswap'} />
            <div className="deswap_btn" onClick={() => deSwapByDevice(APP, dispatch)}>
                <img src='/media/images/topup/deswap.svg' btn="deswap" />
            </div> */}

            {/* <div className="support">
                <p><span>{APP.term('topup_service_provided_by')}</span> <span className="provider deSwap">deSwap</span></p>
                <p><span>{APP.term('topup_for_support')}</span> <a href="https://discord.com/invite/debridge" target="_blank"><span className="click-here">{APP.term('topup_click_here')}</span></a></p>
            </div> */}

            {/* {state.p2p_labels.includes(window.location.hostname) && ( */}
            <>
                <Divider text={'topup_label_fiat'} />
                <div className="p2p_btn" onClick={openP2P}>
                    <p>{APP.term('topup_p2p_btn')}</p>
                </div>
            </>
            {/* )} */}

            {email && isWeb5 && (<>
                <Divider text={'My Private Key'} />
                <div className="private_key_btn" onClick={() => sendEmail(email)}>
                    <p>{APP.term('Click here to get your private key')}</p>
                </div>
            </>)}

            <Divider text={'topup_sell_my_crypto'} />
            <div className="sell_my_matic">
                <a href="https://paybis.com/sell-polygon/" target="_blank"><span>{APP.term(sell_txt)}</span></a>
            </div>

        </div>

    );

};

export default Content;