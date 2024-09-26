import state from "../state";
import req from "../utils/request";

const getSwapUrl = async (address, partnerRef, symbol) => {
    return req({
        url: state.swap_exchange_url + '/' + address + '/' + partnerRef + '/' + symbol
    })
}

export default { getSwapUrl };