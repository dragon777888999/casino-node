import state from "../state";
import req from "../utils/request";

const getPoolsConfig = async () => {
    return req({
        url: state.pools_config_url
    })
}

export default { getPoolsConfig };