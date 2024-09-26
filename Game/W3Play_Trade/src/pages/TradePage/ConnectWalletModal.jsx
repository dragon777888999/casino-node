import React, { useEffect, useState } from 'react'
import GameController from '../../controllers/Game';
import CustomerModel from '../../models/Customer';
import Web3 from 'web3';
import ReactPixel from 'react-facebook-pixel';
import '../../styles/pages/tradePage/connectWalletModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { set_alert_msg, set_connect_wallet_popup, set_demo_popup_seen, set_loader, set_redirect_browser_popup, set_safari_web5_login } from '../../REDUX/actions/main.actions';
import useAppState from '../../hooks/useAppState';
import { browserName } from 'react-device-detect';
import APP from '../../app';
// import { pixelIdByWh } from '../../utils/pixel';
// import socialLogin from '../../utils/login/login.social';
import state from '../../state';
import trackingAPI from '../../API/tracking';
import ga4Event from '../../utils/ga4.event';
import SocialBtn from './SocialBtn';

/* Web3-onboard imports */
// import Onboard from '@web3-onboard/core';
// import injectedModule from '@web3-onboard/injected-wallets';
// import trustModule from '@web3-onboard/trust';
// import walletConnectModule from '@web3-onboard/walletconnect';
import { BrowserProvider } from 'ethers';
import Wallet from '../../utils/game/wallets/Wallet';
import '../../styles/pages/tradePage/connectWalletPopup.scss';
import socialConnect from '../../utils/connection/socialConnect';
import detectTelegramBrowser from '../../utils/detectTelegramBrowser';
// import initializeWeb3auth from '../../utils/connection/initializeWeb3auth';
// import initializeWeb3Auth from '../../utils/login/autoSocialConnect';
import TelegramLoginWidget from '../../comp/TelegramLoginWidget';

// sent google event by wallet name
function sendGA4Evnt(wallet) {
    if (wallet === 'coinbase') ga4Event('coinbase connection', 'coinbase_connection')
    else if (wallet === 'web5') ga4Event('web5 connection', 'social_connection')
    else if (wallet === 'metamask') ga4Event('metamask connection', 'metamask_connection')
    else ga4Event('not web5,coinbase,metamask connection', 'other_connection')
}
export default function ConnectWalletModal(props) {

    const aff_ref = useAppState('aff_ref'),
        [email, setEmail] = useState(''),
        initial_query_params = useSelector(state => state.mainRememberReducer),
        web3AuthObj = useSelector(state => state.mainRememberReducer.social_web3_obj?.obj),
        refParamObj = useSelector(state => state.mainReducer.ref_param),
        currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
        defaultRoute = currentPoolDetails?.route || "/trade",
        isTelegramBrowser = detectTelegramBrowser(),
        dispatch = useDispatch();

    useEffect(() => {

        const handleTouchStart = (event) => {
            const targetTagName = event.target.tagName.toLowerCase();

            // Check if the target is an input or textarea element
            const isInputOrTextarea = targetTagName === 'input' || targetTagName === 'textarea';

            // Check if the target is a form element
            const isFormElement = targetTagName === 'input' || targetTagName === 'textarea' || targetTagName === 'button' || targetTagName === 'select';

            // Check if the user is using pinch-to-zoom
            const isPinchZoom = event.touches.length > 1;

            // Prevent default behavior only if the target is an input or textarea, not a form element, and not pinch-zooming
            if (isInputOrTextarea && !isFormElement && !isPinchZoom) {
                event.preventDefault();
            }
        };

        // window.addEventListener('orientationchange', handleResize);
        document.addEventListener('touchstart', handleTouchStart, { passive: false });

        return () => {
            // window.removeEventListener('orientationchange', handleResize);
            document.removeEventListener('touchstart', handleTouchStart);
        }
    }, []);

    function handleBackgroundClick(event) {

        // click event from child components and elements, bubbling to this handler...
        if (event.target.className === "connect_wallet_popup_wrap" || event.target.className === 'close') {
            // false - means closing the modal
            // props.closeModal(false);
            dispatch(set_connect_wallet_popup(false))
        }
    }

    /*  
     * Redirect to Metamask browser if the user is browsing from the mobile
     * https://metamask.github.io/metamask-deeplinks/ -> open dapp
     */
    function openMetamaskWebBrowser(initial_query_params) {

        if ((navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && !navigator.userAgent.includes('MetaMaskMobile')) {
            let metamaskAppDeepLink = "https://metamask.app.link/dapp/"

            let hostname = window.location.hostname;
            let href = window.location.href;
            let gameUrl = '';

            //check if url has querystring
            if (href.indexOf('?') > -1) {
                //url has querystring
                gameUrl = hostname + '/' + href.slice(href.indexOf('?')).replace('https://', '')
            } else {
                //url without querystring
                gameUrl = hostname;
            }

            let uriParams = initial_query_params?.initialParams || APP.state.get('initialParams');

            window.open(metamaskAppDeepLink + window.location.hostname + window.location.pathname + '?' + (uriParams || ''))
        }
    }

    function openImTokenWebBrowser(initial_query_params) {
        //alert(1)

        if ((navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && !navigator.userAgent.includes('MetaMaskMobile')) {
            //alert(2)
            let imTokenAppDeepLink = "imtokenv2://navigate/DappView?url="


            let hostname = window.location.hostname;
            let href = window.location.href;
            let gameUrl = '';

            //check if url has querystring
            if (href.indexOf('?') > -1) {
                //url has querystring
                gameUrl = hostname + '/' + href.slice(href.indexOf('?')).replace('https://', '')
            } else {
                //url without querystring
                gameUrl = hostname;
            }

            let ref = localStorage.getItem("ref"),
                uriParams = initial_query_params?.initialParams || APP.state.get('initialParams');

            return imTokenAppDeepLink + ('https://' + window.location.hostname + defaultRoute + '?' + (uriParams || ''));
        }
    }

    function openTPwalletWebBrowser(initial_query_params) {
        if ((navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && !navigator.userAgent.includes('MetaMaskMobile')) {
            let tpWalletAppDeepLink = "tpdapp://open?params="
            //let tpWalletAppDeepLink = "https://tokenpocket.github.io/applink?dappUrl="
            let hostname = window.location.hostname;
            let href = window.location.href;
            let gameUrl = '';
            //check if url has querystring
            if (href.indexOf('?') > -1) {
                //url has querystring
                gameUrl = hostname + '/' + href.slice(href.indexOf('?')).replace('https://', '')
            } else {
                //url without querystring
                gameUrl = hostname;
            }
            let ref = localStorage.getItem("ref"),
                uriParams = initial_query_params?.initialParams || APP.state.get('initialParams');

            const url = 'https://' + window.location.hostname + defaultRoute + '?' + (uriParams || ''),
                params = JSON.stringify({ url, chain: "MATIC" });

            window.open(tpWalletAppDeepLink + encodeURIComponent(params))
            //window.open(tpWalletAppDeepLink + encodeURIComponent(url))
        }
    }

    function iOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    function openTrustWebBrowser(initial_query_params) {

        if (iOS()) return;
        else if ((navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) && !navigator.userAgent.includes('MetaMaskMobile')) {
            let trustAppDeepLink = "https://link.trustwallet.com/event=openURL&open_url?url="

            let hostname = window.location.hostname;
            let href = window.location.href;
            let gameUrl = '';

            //check if url has querystring
            if (href.indexOf('?') > -1) {
                //url has querystring
                gameUrl = hostname + '/' + href.slice(href.indexOf('?')).replace('https://', '')
            } else {
                //url without querystring
                gameUrl = hostname;
            }

            let ref = localStorage.getItem("ref"),
                uriParams = initial_query_params?.initialParams || APP.state.get('initialParams');
            const url = 'https://' + window.location.hostname + defaultRoute + '?' + (uriParams || '');

            //    `https://link.trustwallet.com/open_url?url=${dappLinkUrl}`

            if (iOS()) {
                // trustAppDeepLink = "trust://open_url?url="
                // alert("ios")
                // window.open('https://link.trustwallet.com')
            }


            window.open(trustAppDeepLink + encodeURIComponent(url))

        }
    }


    /*  
     * Redirect to Coinbase browser if the user is browsing from the mobile
     * https://docs.cloud.coinbase.com/wallet-sdk/docs/deep-link-into-dapp-browser
     */
    function openCoinbaseBrowser(initial_query_params) {
        console.log('open Coinbase')

        // document.body.classList.add('force_rotate');
        if ((navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))) {
            let coinbaseAppDeepLink = "https://go.cb-w.com/dapp?cb_url="

            let hostname = window.location.hostname;
            let href = window.location.href;
            let gameUrl = '';


            //check if url has querystring
            if (href.indexOf('?') > -1) {
                //url has querystring
                gameUrl = hostname + '/' + href.slice(href.indexOf('?')).replace('https://', '')
            } else {
                //url without querystring
                gameUrl = hostname;
            }

            let ref = localStorage.getItem("ref");

            if (browserName.toLowerCase() === 'webkit' || browserName.toLowerCase() === 'chrome webview') { }

            // // Set a timer to check if the app opens successfully
            // var timer = setTimeout(function () {
            //     // If the app didn't open, redirect to the app store
            //     window.location.href = "https://apps.apple.com/us/app/coinbase-wallet-nfts-crypto/id1278383455"; // iOS App Store URL
            // }, 2500);

            // // Listen for the page visibility change event
            // document.addEventListener("visibilitychange", function () {
            //     clearTimeout(timer);
            // });
            //}
            //else {
            let uriParams = initial_query_params?.initialParams || APP.state.get('initialParams');

            window.open(coinbaseAppDeepLink + encodeURIComponent('https://' + window.location.hostname + window.location.pathname + '?' + (uriParams || '')));
            // window.open(coinbaseAppDeepLink + (/*'https://' +*/ gameUrl + '?ref=' + ref))
            //}
        }
    }


    async function connectWallet(name, initial_query_params, aff_ref, action) {

        let socialsActions = ['web5', 'social', 'metaMask'];

        if (state.redirect_browsers.includes(browserName.toLowerCase()) && socialsActions.includes(name)) {
            dispatch(set_connect_wallet_popup(false))
            setTimeout(() => {
                dispatch(set_redirect_browser_popup(true))
            }, 250);
            return;
        }

        //Open walletconnect native dialog
        if (action == 'walletConnect') {
            closePopup(); //Close the login popup

            //Onboard-web3

            //Automatic click on wallet connect button
            let modal;
            const checkModal = setInterval(() => {
                modal = document.querySelector('onboard-v2');
                if (modal) {
                    clearInterval(checkModal);
                    // Modal is found
                    // Access the shadow root
                    const shadowRoot = modal.shadowRoot;

                    if (shadowRoot) {
                        const walletConnectButtonInner = shadowRoot.querySelector('button.wallet-button-styling');
                        console.log('walletConnectButtonInner', walletConnectButtonInner);
                        walletConnectButtonInner.click();
                        return;
                    } else {
                        console.log('Shadow root not found or shadow DOM is closed.');
                    }
                }
            }, 100); // Check every 100 milliseconds


            // UI modifications
            const checkModal2 = setInterval(() => {
                console.log('RR here');
                modal = document.querySelector('wcm-modal');
                console.log('RR here');


                if (modal) {
                    document.querySelector("body > wcm-modal").shadowRoot.querySelector("#wcm-modal > div > div > wcm-modal-router")
                        .shadowRoot.querySelector("div > div > wcm-connect-wallet-view").shadowRoot.querySelector("wcm-desktop-wallet-selection")
                        .shadowRoot.querySelector("wcm-modal-footer").style = "display:none";

                    clearInterval(checkModal2);
                }
            }, 100); // Check every 100 milliseconds


            (async () => {
                try {
                    const onboard = APP.state.get('web3Onboard');

                    const connectedWallets = await onboard.connectWallet();

                    // Assuming only wallet connect is connected, index 0
                    // `instance` will give insight into the WalletConnect info
                    // such as namespaces, methods, chains, etc per wallet connected
                    const { instance } = connectedWallets[0];

                    console.log('Connected wallets', connectedWallets);

                    const address = connectedWallets[0]['accounts'][0]['address'];

                    console.log('Connected wallets address', address);

                    if (address) {
                        // create an ethers provider with the last connected wallet provider
                        const ethersProvider = new BrowserProvider(connectedWallets[0].provider);

                        // if using ethers v6 this is:
                        // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')

                        const signer = await ethersProvider.getSigner();

                        APP.state.set('walletConnectSigner', signer);
                        APP.wallets = new Wallet(APP.state.get('default_game_network'), connectedWallets[0].provider, address)

                        //Wallet is connected let's send sign message command
                        let result;
                        try {
                            result = await APP.wallets.connectWithMoralis(Web3.utils.toChecksumAddress(address), "web5", APP.state.get('aff_ref'), dispatch, initial_query_params)
                        } catch (e) {
                            console.log('ERROR: ', e);
                        }
                        console.log('connect with moralis result', result);

                        if (result) {
                            console.log("login authenticate success");

                            APP.controller = new GameController();
                            APP.customer = new CustomerModel(1, {}, []);
                            dispatch(set_demo_popup_seen(true));
                            APP.controller.init();
                            APP.customer.init();
                            APP.state.set("success_wallet_connect", true);
                            APP.state.set('auto_log_in', true)
                            localStorage.setItem('wallet', "web5");
                            localStorage.setItem('isWeb5', true);
                            localStorage.setItem('walletConnectConnected', address);
                            localStorage.setItem('walletConnectConnectedWalletName', 'Wallet');

                            //Login successful - remove the connect wallet button    

                            APP.state.set('wallet_address', Web3.utils.toChecksumAddress(address));
                            APP.controller.publish('user_wallet_address_changed', address);
                            //APP.state.set('walletConnectModal', walletConnectModal);

                            localStorage.setItem('last_wallet_address', address); //For https://betcio.backlog.com/view/UPVSDOWN-1032

                        } else {
                            console.log("login authenticate failed")

                            localStorage.removeItem('wallet');
                            console.log('remove 2');
                            localStorage.removeItem('walletConnectConnected');
                            localStorage.removeItem('walletConnectConnectedWalletName');
                            //dispatch(set_loader(false))
                            dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
                            //await logout()
                            //walletConnectModal.disconnect();

                            let walletsToDisconnect = APP.state.get('web3Onboard').state.get().wallets;
                            for (let i = 0; i < walletsToDisconnect.length; i++) {
                                const w = APP.state.get('web3Onboard').state.get().wallets[i];
                                await APP.state.get('web3Onboard').disconnectWallet({ label: w.label })
                            }

                            APP.state.unset('walletConnectSigner');
                        }

                    }
                } catch (error) {
                    dispatch(set_loader(false))
                    console.log('wallet connect error:', error);
                }
            })();

            return; //don't process anymore logic here

        }

        function walletType(metamaskExt, isCoinbaseInstalled, name, mobile, isImTokenExtInstalled, isTPwalletExtInstalled, isTrustExtInstalled) {

            // set loader for social loading -> 1sec
            if (action === 'social') {
                dispatch(set_loader(true))
                let timeout = setTimeout(() => {
                    dispatch(set_loader(false))
                }, 1000);
            }

            if (name == "web5") {

                // save web5 login using safari to auto login after web3auth logic redirection
                if (browserName.toLowerCase().includes('safari')) {
                    dispatch(set_safari_web5_login({ login: true, wallet: 'web5' }))
                }

                return name;
            }
            if (mobile) {
                if (isImTokenExtInstalled) {
                    return 'imToken';
                }
                if (isTPwalletExtInstalled) {
                    return 'tpWallet';
                }
                if (isTrustExtInstalled) {
                    return 'trustWallet';
                }

                return name;
            }
            else {
                if (!metamaskExt && !isCoinbaseInstalled) return 'coinbase';
                else if (metamaskExt && name === 'metaMask') return 'metaMask';
                else if (!metamaskExt && name === 'metaMask') return 'metaMask';
                else return name;
            }
        }

        let mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
            isMetamaskExtInstalled = props.wallet['metaMask'].isInstaled,
            isImTokenExtInstalled = props.wallet['imToken'].isInstaled,
            isTPwalletExtInstalled = props.wallet['tpWallet'].isInstaled,
            isCoinbaseInstalled = props.wallet['coinbase'].isInstaled,
            isTrustExtInstalled = props.wallet['trustWallet'].isInstaled,
            walletName = walletType(isMetamaskExtInstalled, isCoinbaseInstalled, name, mobile, isImTokenExtInstalled, isTPwalletExtInstalled, isTrustExtInstalled);

        // mobile apps logic (in-app browser)
        //alert(mobile + "-" + walletName)
        closePopup();
        if (mobile) {

            try {
                if (window.ethereum.isImToken) {
                    //alert("isImToken")               
                    isImTokenExtInstalled = true
                }
                else if (window.ethereum.isTokenPocket) {
                    //alert("isTokenPocket")
                    isTPwalletExtInstalled = true
                }
                else if (window.ethereum.isTrust) {
                    //alert("isTrust")
                    isTrustExtInstalled = true
                }


            }
            catch (e) {
                console.log('e', e)
                //alert("error:"+walletName)
                //alert(walletName === 'tpWallet')
                if (walletName === 'metaMask') {
                    openMetamaskWebBrowser(initial_query_params);
                }
                else if (walletName === 'imToken') {
                    isImTokenExtInstalled = true
                    //alert(1)
                    openImTokenWebBrowser(initial_query_params);
                }
                else if (walletName === 'trustWallet') {
                    isTrustExtInstalled = true
                    //alert(1)
                    openTrustWebBrowser(initial_query_params);
                }
                else if (walletName === 'tpWallet') {
                    //alert(1)
                    isTPwalletExtInstalled = true
                    openTPwalletWebBrowser(initial_query_params);
                }
                else if (walletName === 'web5') {
                    // await login(action, aff_ref, APP.state.get('web5Object'), dispatch)
                }
                else openCoinbaseBrowser(initial_query_params);
            }
        }

        // web browser logic
        else {
            if (action === 'walletConnect') { console.log('walletConnect') }
            else if (isMetamaskExtInstalled || (!isMetamaskExtInstalled && isCoinbaseInstalled) && walletName === 'metaMask') {
                openMetamaskWebBrowser(initial_query_params);
            }

            // default => connection using coinbase
            else {
                openCoinbaseBrowser(initial_query_params);
            }
        }
        //
        //alert(12)
        // once any connect wallet btn was pressed replace by info/alert msg 
        //if (walletName != "web5") {
        console.log("walletName: " + walletName, props.wallet[walletName]?.isInstaled)

        if (props.wallet[walletName]?.isInstaled || walletName == "web5" || isImTokenExtInstalled || isImTokenExtInstalled || isTrustExtInstalled) {
            let walletAdress

            console.log('walletName:', walletName)
            try {
                if (walletName == "web5") {
                    // alert('need to be deleted...')
                    closePopup()

                    const wallet = await login(action, aff_ref, APP.state.get('web5Object'), dispatch)
                }
                else {
                    dispatch(set_loader(true))
                    dispatch(set_alert_msg({ type: 'info', content: 'Please Complete The Wallet Connect Process!', preventTimeout: true }))
                    walletAdress = await props.wallet.authenticate(walletName, dispatch);

                    //alert(walletAdress)
                    if (walletAdress) {
                        const result = await props.wallet.connectWithMoralis(Web3.utils.toChecksumAddress(walletAdress), walletName, aff_ref, dispatch, initial_query_params);

                        if (result) { }

                        else {
                            localStorage.removeItem('wallet');
                            // dispatch(set_alert_msg({ type: 'error', content: "Please Complete The Wallet Connect Process!" }))
                            console.log("connectWalletModal success_wallet_connect false")
                            APP.state.set("success_wallet_connect", false);
                            dispatch(set_loader(false))
                            dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
                            walletAdress = false
                        }
                    }
                }

                if (walletAdress) {

                    const url_string = window.location.href,
                        url = new URL(url_string),
                        userId = url?.searchParams?.get('userId');

                    if (userId && state.telegram_track_users_domains.includes(window.location.hostname)) {
                        let trackRes = await trackingAPI.sendTracking(userId, Web3.utils.toChecksumAddress(walletAdress), walletName)
                    }
                    // console.log('track tele...', trackRes)

                    // setTimeout(() => {

                    if (refParamObj?.tagId && walletAdress) {

                        if (refParamObj?.params?.registrationEvt) {
                            ReactPixel.track('CompleteRegistration', { wallet: Web3.utils.toChecksumAddress(walletAdress), wallet_name: walletName || '' })
                        }
                        // else if (refParamObj?.successfulConnectBtnleadEvt) {
                        //     ReactPixel.track('Lead', { wallet: Web3.utils.toChecksumAddress(walletAdress), wallet_name: walletName || '' })
                        // }
                        // else {
                        // ReactPixel.track('Contact', { wallet: Web3.utils.toChecksumAddress(walletAdress), wallet_name: walletName || '' })
                        // ReactPixel.trackCustom('successful_wallet_connect', { wallet: Web3.utils.toChecksumAddress(walletAdress), wallet_name: walletName });
                        // trackSingleCustom('PixelId', successful_wallet_connect, data);
                        // }
                    }
                    // }, 8000);

                }
            } catch (err) {
                console.log(err, 'err')
            }

            if (walletName != "web5" && walletAdress) {
                APP.controller = new GameController();
                APP.customer = new CustomerModel(1, {}, []);
                dispatch(set_demo_popup_seen(true));
                APP.controller.init();
                APP.customer.init();
                localStorage.setItem('wallet', walletName);
                APP.state.set("success_wallet_connect", true);
                sendGA4Evnt(walletName.toLowerCase())
                ga4Event('wallet connection using any method', '2_wallet_connection')
            }

            // props.closeModal(false);
            dispatch(set_connect_wallet_popup(false))
            //closePopup()
            //  window.location.reload()
        } else {
            props.wallet.install(walletName);
        }
    }

    function closePopup() {
        // props.closeModal(false)
        dispatch(set_connect_wallet_popup(false))
    }

    // validation for correct mail format
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // conditional email login
    function loginUsingEmail(APP, type, web3AuthObj, dispatch, email) {
        if (!validateEmail(email)) return;
        socialConnect(APP, type, web3AuthObj, dispatch, email)
    }

    const handleTouchStart = (event) => {
        event.preventDefault();
    };

    // Helper function to get the bot details by domain
    const getBotDetailsByDomain = (domain) => {
        return state.telegramBots.find((bot) => bot.domain === domain) || {};
    };

    const { botName } = getBotDetailsByDomain(window.location.hostname);

    return (
        <div className="connect_wallet_popup_wrap" style={{ touchAction: 'manipulation' }} onClick={handleBackgroundClick}>

            <div className={`cwp_content ${ isTelegramBrowser ? 'isTelegramBrowser' : ''}`}>
                <div className="close" onClick={handleBackgroundClick} />
                <p className="cwp_header"><span>{APP.term('connect_wallet_popup_header')}</span></p>

                <div className="cwp_connect_btns">

                    { isTelegramBrowser ? (
                        <div className="cwp_btn_row">
                        <div className="input_email_wrap">
                            <input placeholder='Enter your Email'
                                onTouchStart={handleTouchStart}
                                style={{ touchAction: 'manipulation' }}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                inputMode="email" />
                            <div className={`submit ${validateEmail(email) ? 'active' : ''}`}
                                onClick={() => loginUsingEmail(APP, 'email_passwordless', web3AuthObj, dispatch, email)}>
                                <p><span>Send</span></p>
                            </div>
                        </div>
                        {/* <TelegramLoginWidget
                            botName={botName}
                            callbackUrl={`${state.telegramServer}/callback`}
                        /> */}
                        </div>
                    ) : (
                        <>
                        <SocialBtn />

                        <div className="cwp_btn_row">
                            <div className="input_email_wrap">
                                <input placeholder='Enter your Email'
                                    onTouchStart={handleTouchStart}
                                    style={{ touchAction: 'manipulation' }}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <div className={`submit ${validateEmail(email) ? 'active' : ''}`}
                                    onClick={() => loginUsingEmail(APP, 'email_passwordless', web3AuthObj, dispatch, email)}>
                                    <p><span>Send</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="cwp_divider_wrap">
                            <div className="full_divider" />
                        </div>

                        <div className="cwp_btn_row add_margin">

                            {/* Metamask btn */}
                            <div className="cwp_btn metamask" onClick={() => connectWallet('metaMask', initial_query_params, aff_ref)}>
                                <img src='media/images/connect_modal/socials/metamask.png' />
                                <p><span>Metamask</span></p>
                            </div>

                            {/* Coinbase btn */}
                            <div className="cwp_btn coinbase" onClick={() => connectWallet('coinbase', initial_query_params, aff_ref)}>
                                <img src='media/images/connect_modal/socials/coinbase.png' />
                                <p><span>Coinbase</span></p>
                            </div>
                        </div>
                        </>
                    )}

                    {/* <div className="cwp_btn_row add_margin ismobile_connect"> */}

                    {/* Trust wallet */}

                    {/* IOS */}
                    {/* {iOS() ?
                            <a className="cwp_btn trust"
                                href={browserName.toLowerCase() !== 'webkit' ?
                                    `https://link.trustwallet.com/open_url?url=${dappLinkUrl}`
                                    : '#'}
                                onClick={() => connectWallet('trustWallet', initial_query_params, aff_ref)}>
                                <img src='media/images/connect_modal/socials/trust.png' />
                                <p>Trust wallet</p>
                            </a>

                            // Android
                            :
                            <a className="cwp_btn trust"
                                href={
                                    // !browserName.toLowerCase().includes('chrome webview') ?
                                    `https://link.trustwallet.com/open_url?url=${dappLinkUrl}`
                                    // : '#'
                                }
                                onClick={() => browserName.toLowerCase().includes('chrome webview') ?
                                    connectWallet('trustWallet', initial_query_params, aff_ref)
                                    : {}}>
                                <img src='media/images/connect_modal/socials/trust.png' />
                                <p>Trust wallet</p>
                            </a>
                        } */}
                    {/* </div> */}

                    {/* <div className="cwp_btn_row add_margin ismobile_connect"> */}

                    {/* Im token btn */}
                    {/* <a className="cwp_btn imtoken" href={openImTokenWebBrowser(initial_query_params)}>
                            <img src='media/images/connect_modal/socials/imtoken.png' />
                            <p>Im token</p>
                        </a> */}

                    {/* TP btn */}
                    {/* <div className="cwp_btn tp" onClick={() => connectWallet('tpWallet', initial_query_params, aff_ref)}>
                            <img src='media/images/connect_modal/socials/tp.png' />
                            <p>Pocket <br /> wallet</p>
                        </div> */}
                    {/* </div> */}

                    {/* <div className="cwp_btn_row add_margin ismobile_connect2"> */}

                    {/* WalletConnect btn */}
                    {/* <div className="cwp_btn walletconnect" onClick={() => connectWallet('web5', initial_query_params, aff_ref, 'walletConnect')}>
                            <img src='media/images/connect_modal/socials/walletconnect.png' />
                            <p>WalletConnect</p>
                        </div> */}
                    {/* </div> */}

                </div>
            </div>
        </div >
    );
}