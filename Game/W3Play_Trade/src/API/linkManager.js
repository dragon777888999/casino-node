import Web3 from "web3";
import state from "../state";
import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";

const getList = async (wallet, partnerRef) => {
    return req({
        url: state.list_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet),
            partnerRef
        }
    })
}

const generateLink = async (wallet, title, partnerRef) => {
    return req({
        url: state.generate_affiliate_link_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet), // wallet of the player requesting a new campaign link
            title, // any string describing the campaign
            "whiteLabel": "WT", // for now this field is not processed, but don't ignore it in the request
            partnerRef,
        }
    })
}

const getEarningsReport = async (wallet, partnerRef) => {
    return req({
        url: state.earnings_report_url,
        method: 'POST',
        body: {
            wallet: Web3.utils.toChecksumAddress(wallet),
            partnerRef
        }
    })
}

export default { getList, generateLink, getEarningsReport };