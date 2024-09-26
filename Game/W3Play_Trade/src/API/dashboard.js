import Web3 from "web3";
import state from "../state";
import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";

const getDashboard = async (wallet, partnerRef) => {
    return req({
        url: state.dashboard_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet),
            partnerRef
        }
    })
}

export default { getDashboard };