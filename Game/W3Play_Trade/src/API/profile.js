import state from "../state";
import req from "../utils/request";

const updateProfilePic = async (body) => {
    return req({
        url: state.profile_url,
        method: 'POST',
        body: body
    })
}

export default { updateProfilePic };