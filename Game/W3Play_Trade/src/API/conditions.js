import state from "../state";
import req from "../utils/request";

const getConditions = async (lang) => {
    return req({
        url: state.static_page_url,
        params: {
            lang,
            page: 'conditions'
        }
    })
}

export default { getConditions };