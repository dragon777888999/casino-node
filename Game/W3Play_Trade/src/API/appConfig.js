import req from "../utils/request";
import reqs from "../reqs";
import state from "../state";

const getAppConfig = async () => {
    return req({
        url: state.app_config_url,
    })
}
const test = async () => {
    return req({
        url: reqs().customer,
    })
}

export default { getAppConfig, test };