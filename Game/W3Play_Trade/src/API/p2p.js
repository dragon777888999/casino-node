import Web3 from "web3";
import state from "../state";
import req from "../utils/request";

// only uah
const submitPayment = async (wallet, amount, currency, country) => {
    return req({
        url: state.p2p_payment,
        method: 'POST',
        auth: true,
        token: localStorage.getItem("auth-token"),
        body: {
            wallet,
            amount, // amount of fiat user transfers to convert to MATIC
            currency, // amount currency : RUB or UAH
            country // country code
        }
    })
}

// others (not uah)
const submitBwpPayment = async (wallet, amount, currency, country) => {
    return req({
        url: state.p2p_bwp_url,
        method: 'POST',
        auth: true,
        token: localStorage.getItem("auth-token"),
        body: {
            wallet,
            amount, // amount of fiat user transfers to convert to MATIC
            currency, // amount currency : RUB or UAH
            country // country code
        }
    })
}

export default { submitPayment, submitBwpPayment };