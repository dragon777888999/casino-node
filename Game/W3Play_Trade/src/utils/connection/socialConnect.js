import { ethers } from "ethers";
import {
    set_alert_msg,
    set_connect_wallet_popup,
    set_loader,
    set_redirect_browser_popup,
    set_safari_web5_login,
    set_telegram_login,
    set_web3_social_obj
} from "../../REDUX/actions/main.actions";
import Wallet from "../game/wallets/Wallet";
import login from "./login";
import { browserName } from "react-device-detect";
import state from "../../state";
import connectionTypes from "./connectionTypes";
import detectTelegramBrowser from "../detectTelegramBrowser";

// connect using web3auth by a social that is pressed
export default async (APP, type, web3auth, dispatch, email) => {
    try {
        let wallet;

        // Handle redirection for specific browsers
        if (state.redirect_browsers.includes(browserName.toLowerCase())) {
            dispatch(set_connect_wallet_popup(false));
            setTimeout(() => {
                dispatch(set_redirect_browser_popup(true));
            }, 250);
            return;
        }

        let web3authProvider;
        try {
            web3authProvider = await connectionTypes(web3auth, type, email);

            // flag for telegram redirection
            if (detectTelegramBrowser()) {
                dispatch(set_telegram_login(true))
            }
        }
        catch (error) {
            // web3auth.logout();
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_complete_singin' }));
            console.error("Error during login:", error);
            dispatch(set_loader(false));
            return;
        }

        // Save web5 login using Safari to auto login after web3auth logic redirection
        if (browserName.toLowerCase() === 'safari') {
            dispatch(set_safari_web5_login({ login: true, wallet: 'web5' }));
        }

        const web5Provider = new ethers.BrowserProvider(web3authProvider);
        const signer = await web5Provider?.getSigner();
        const walletAddress = signer?.address;

        if (walletAddress) {
            dispatch(set_web3_social_obj({ wallet: walletAddress, obj: web3auth }));
            wallet = walletAddress;

            let user = await web3auth?.getUserInfo();
            if (user?.email) {
                APP.state.set('profileImage', user?.profileImage)
                APP.state.set('user_email', user?.email)
            }
        }

        dispatch(set_loader(true));

        APP.wallets = new Wallet(APP.state.get('default_game_network'), web3auth.provider, wallet);
        await APP.wallets.authenticate('web5', dispatch);
        localStorage.setItem("wallet", 'web5')

        const _ref = APP?.controller?.cfg?.partnerInfo?.partnerRef;
        const partnerRef = _ref ? 'playnance' : _ref;

        if (wallet) {
            login(APP, dispatch, type, partnerRef, wallet);
        }

    } catch (error) {
        console.error('Error in connectUsingWeb3Auth:', error);
        APP.state.set('user_email', null);
        APP.state.set('profileImage', null);
        // web3auth?.logout();
        dispatch(set_loader(false));
    }
}