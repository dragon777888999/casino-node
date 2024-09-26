import Web3 from "web3";
import state from "../state";
import req from "../utils/request";
// import stringifyParams from "../utils/stringifyParams";

const getDashboard = async (wallet, partnerRef) => {

    return req({
        url: state.super_affiliate_dashboard_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet),
            partnerRef
        }
    });

};
const getLeaderboard = async (from, to) => {
    const params = {};
    if (from) { params.from = from; }
    if (to) { params.to = to; }

    return req({
        url: state.affiliate_leaderboard_url,
        params: params
    });

};

export default { getDashboard, getLeaderboard };