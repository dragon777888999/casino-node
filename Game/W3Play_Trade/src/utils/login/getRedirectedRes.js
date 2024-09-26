import APP from "../../app";
import { set_alert_msg, set_loader } from "../../REDUX/actions/main.actions";
import authenticate from "./authenticate";

// get user's login redirected info (social)
export default async function getRedirectResult(dispatch, magic) {

    try {
        dispatch(set_loader(true))

        const result = await magic.oauth.getRedirectResult();

        // failed to get response - disable loader
        if (!result) {
            dispatch(set_loader(false))
        }
        // success - received user's wallet info
        else if (result?.oauth?.userInfo) {
            APP.state.set('profileImage', result?.oauth?.userInfo?.picture)
            authenticate(dispatch, magic)
        }
        // any other err - disable loader
        else {
            dispatch(set_loader(false))
        }

    }
    catch (err) {
        dispatch(set_loader(false))
        //     dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_autologin_magic' }))
        //     console.error(err, 'err with social login');
    }

}