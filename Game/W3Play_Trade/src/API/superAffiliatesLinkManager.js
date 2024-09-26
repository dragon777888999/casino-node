import Web3 from "web3";
import state from "../state";
import req from "../utils/request";

const getList = async (from, to) => {
    return req({
        url: state.sap_list_url,
        auth: true,
        params: {
            ...(from && ({ from })),
            ...(to && ({ to }))
        }
    });
};

const generateSapLink = async (wallet, title, partnerRef, route, tagId) => {

    return req({
        url: state.generate_sap_link_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet), // wallet of the player requesting a new campaign link
            partnerRef,
            title, // any string describing the campaign
            target: route, // route to the target page
            ...(tagId && ({ tagId })), // facebook pixel id
        }
    });
};

const getEarningsReport = async () => {
    return req({
        url: state.sap_earning_report_url,
        auth: true
    });
};

const getDashboard = async () => {
    return req({
        url: state.sap_dashboard_url,
        auth: true
    });
};

export default { getList, generateSapLink, getEarningsReport, getDashboard };