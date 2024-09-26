import APP from "../../app";
import { set_user_magic_auth } from "../../REDUX/actions/main.actions";
import authenticate from "./authenticate";

// login with own email
export default async function emailLogin(email, dispatch) {

    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        validEmail = regex.test(email);

    // if (!validEmail) return;

    let res = await APP.magic.auth.loginWithEmailOTP({ email: email });
    dispatch(set_user_magic_auth({ loginType: 'email' }))

    if (res) {
        authenticate(dispatch, APP.magic)
    }
}