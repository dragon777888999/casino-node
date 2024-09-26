import { set_rev_bridge_alert_msg } from "../../../../REDUX/actions/main.actions";
import getERC20Balance from "./getERC20Balance"
import getTRC20Balance from "./getTRC20Balance";

function transaction_err(dispatch) {
    dispatch(set_rev_bridge_alert_msg({ type: 'error', content: 'alert_msg_error_low_wallet_balance' }))
    return false;
}

// checking if wallet address has enough amount for user's sold transaction
export default async (name, amt, dispatch) => {
    if (name.includes('erc')) {
        let wallet_erc20_balance = await getERC20Balance();

        if (wallet_erc20_balance && (amt >= wallet_erc20_balance)) {
            transaction_err(dispatch)
        }
        else return true;
    }
    else if (name.includes('trc')) {
        let wallet_trc20_balance = await getTRC20Balance();

        if (wallet_trc20_balance && (amt >= wallet_trc20_balance)) {
            transaction_err(dispatch);
        }
        else return true;
    }
}