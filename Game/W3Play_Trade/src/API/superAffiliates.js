import Web3 from "web3";
import state from "../state";
import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";

const getList = async (token) => {
    return req({
        url: state.sap_list_url,
        method: 'GET',
        headers: { 'Authorization': 'bearer ' + token }
    });
};

const createAccount = async (token, body) => {
    console.log(body, 'body')
    return req({
        token,
        url: state.sap_tutorial_form_url,
        method: 'POST',
        auth: true,
        body
    });
};

const generateLink = async (wallet, title, partnerRef) => {
    return req({
        url: state.generate_sap_link_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet), // wallet of the player requesting a new campaign link
            title, // any string describing the campaign
            partnerRef,
        }
    });
};

const getEarningsReport = async () => {
    return req({
        url: state.sap_earning_report_url,
        auth: true
    });
};

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

export default { getList, createAccount, generateLink, getEarningsReport, getDashboard };