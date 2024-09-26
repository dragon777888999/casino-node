import { set_loader, set_user_magic_auth } from "../../REDUX/actions/main.actions";

// checking wether user already connected
export default async function isUserConnected(dispatch, magic) {
    const isLoggedIn = await magic.user.isLoggedIn();
    // if (isLoggedIn && location.pathname !== '/') dispatch(set_loader(true))
    // update params + cleanup 
    dispatch(set_user_magic_auth({ isLoggedIn: isLoggedIn, validLogin: true, loading: false, verified: false }))
}