import Web3 from 'web3';
import APP from "../../app";
import GameController from "../../controllers/Game";
import CustomerModel from "../../models/Customer";
import { set_alert_msg, set_loader, set_magic_auth, set_user_magic_auth } from "../../REDUX/actions/main.actions";
import Wallet from "../game/wallets/Wallet";

export default async function authenticate(dispatch, magic) {

    // Show loader + update user state process to in progress(loading)
    dispatch(set_loader(true))
    dispatch(set_user_magic_auth({ loading: true }))

    // User data getter
    async function getUserData() {
        try {
            const userMetadata = await magic.user.getInfo();
            // console.log(userMetadata, '...userMetadata...')
            return userMetadata;
        }
        catch (e) {
            dispatch(set_loader(false))
            console.log(e, 'getUserData')
        }
    }

    // Extract logged user details
    let userData = await getUserData();

    // Prevent initializing wallet once no wallet address was returned
    if (!userData?.publicAddress) return;

    // Create new instance for new wallet address + web3
    APP.wallets = new Wallet(APP.state.get('default_game_network'), magic.rpcProvider, userData?.publicAddress)
    await APP.wallets.authenticate("magicauth", dispatch);

    // received wallet address => start signin process (moralis)
    if (userData?.publicAddress) {
        const result = await APP.wallets.connectWithMoralis(Web3.utils.toChecksumAddress(userData?.publicAddress), "magicauth", APP.state.get('aff_ref'), dispatch);

        // prevent any duplicates while connecting 
        dispatch(set_user_magic_auth({ verified: true }))

        if (userData?.email) localStorage.setItem('email', userData.email)

        if (result) {
            APP.controller = new GameController();
            APP.customer = new CustomerModel(1, {}, []);
            APP.controller.init();
            APP.customer.init();
            APP.state.set("success_wallet_connect", true);
            localStorage.setItem('wallet', "magicauth");
            dispatch(set_magic_auth(false))
            dispatch(set_user_magic_auth({ loading: false }))
        }
        else {
            console.log("magic auth login authenticate failed")
            localStorage.removeItem('wallet');
            dispatch(set_loader(false))
            dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))

            await magic.user.logout();
        }
    }
}