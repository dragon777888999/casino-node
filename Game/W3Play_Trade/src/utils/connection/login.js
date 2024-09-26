import Web3 from 'web3';
import GameController from '../../controllers/Game';
import CustomerModel from '../../models/Customer';
import { set_alert_msg, set_connect_wallet_popup, set_loader, set_web_connection_type } from '../../REDUX/actions/main.actions';
import ga4Event from '../ga4.event';

export default async (APP, dispatch, type, partnerRef, walletAddress) => {

    dispatch(set_connect_wallet_popup(false))

    const result = await APP.wallets.connectWithMoralis(Web3.utils.toChecksumAddress(walletAddress), "web5", APP.state.get('aff_ref'), dispatch);

    if (result) {
        console.log("login authenticate success...")

        APP.controller = new GameController();
        APP.customer = new CustomerModel(1, {}, []);
        APP.controller.init();
        APP.customer.init();

        APP.state.set("success_wallet_connect", true);
        APP.state.set('auto_log_in', true)

        localStorage.setItem('wallet', "web5");
        localStorage.setItem('isWeb5', true);
        localStorage.setItem('isSingleSocialConnect', true)

        // google analytics events
        // if (isAutoLogin) {
        // ga4Event('wallet connection using any method', 'auto_login_wallet_connection')
        // }
        // else {
        ga4Event('wallet connection using any method', '2_wallet_connection')
        ga4Event('web5 connection', 'social_connection')
        // }

        dispatch(set_web_connection_type(type))
    }
    else {
        console.log("login authenticate failed")
        localStorage.removeItem('wallet');
        dispatch(set_loader(false))
        dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
        // await logout()
    }
}