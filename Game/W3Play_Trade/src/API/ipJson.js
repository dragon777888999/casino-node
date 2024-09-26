import req from "../utils/request";
import reqs from "../reqs";
import state from "../state";

const getIpApi = async () => {
    return req({
        url: state.ip_url,
    })
}

export default { getIpApi };