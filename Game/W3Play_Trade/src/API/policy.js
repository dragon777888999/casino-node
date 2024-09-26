import state from "../state";
import req from "../utils/request";

const getPolicy = async (lang) => {
    return req({
        url: state.static_page_url,
        params: {
            lang,
            page: 'privacy'
        }
    })
}

export default { getPolicy };