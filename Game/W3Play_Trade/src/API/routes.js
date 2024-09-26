import state from "../state";
import req from "../utils/request";

const getList = async () => {
    return req({
        url: state.routes_url,
    })
}

export default { getList };