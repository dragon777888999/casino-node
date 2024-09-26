import state from "../state";
import req from "../utils/request";

const getPixelsList = async () => {
    return req({
        url: state.pixels_list_url,
    })
}

export default { getPixelsList };