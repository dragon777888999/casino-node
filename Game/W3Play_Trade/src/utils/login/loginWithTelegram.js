import { ethers } from "ethers";
import APP from "../../app";
import { set_loader, set_telegram_login, set_web3_social_obj } from "../../REDUX/actions/main.actions";
import login from "../connection/login";
import Wallet from "../game/wallets/Wallet";

// login with telegram (after web3auth sfa redirection)
export default async function loginWithTelegram(web3AuthObj, dispatch) {

    const provider = new ethers.BrowserProvider(web3AuthObj.provider);
    const signer = await provider?.getSigner();
    const walletAddress = signer?.address;

    if (walletAddress) {
        dispatch(set_web3_social_obj({ wallet: walletAddress, obj: web3AuthObj }));
        walletAddress;

        let user = await web3AuthObj?.getUserInfo();
        if (user?.email) {
            APP.state.set('profileImage', user?.profileImage)
            APP.state.set('user_email', user?.email)
        }
    }

    dispatch(set_loader(true));

    APP.wallets = new Wallet(APP.state.get('default_game_network'), web3AuthObj.provider, walletAddress);
    await APP.wallets.authenticate('web5', dispatch);
    localStorage.setItem("wallet", 'web5')

    const _ref = APP?.controller?.cfg?.partnerInfo?.partnerRef;
    const partnerRef = _ref ? 'playnance' : _ref;

    if (walletAddress) {
        login(APP, dispatch, 'web5', partnerRef, walletAddress);
        dispatch(set_telegram_login(null));
    }
}