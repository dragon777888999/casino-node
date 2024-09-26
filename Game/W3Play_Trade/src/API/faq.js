import state from "../state";
import req from "../utils/request";

const getFaq = async (lang) => {
    return req({
        url: state.faq_url,
        params: { lang }
    })
}

export default { getFaq };