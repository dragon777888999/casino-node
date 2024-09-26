import state from "../state";
import req from "../utils/request";

const getCandlesHistory = async (amount, assetId) => {
    return req({
        url: state.graph_history_url,
        params: {
            id: assetId,
            amount: amount
        }
    })
}

export default { getCandlesHistory };