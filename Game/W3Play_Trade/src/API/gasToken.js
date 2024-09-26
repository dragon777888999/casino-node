import state from "../state";
import req from "../utils/request";

const getGasToken = async (wallet_address) => {
    return req({
        url: state.gasToken + '/' + wallet_address
    })
}

export default { getGasToken };