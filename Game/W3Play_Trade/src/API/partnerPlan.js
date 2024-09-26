import state from "../state";
import req from "../utils/request";

//  String wallet; // partner wallet
//  String url; // partner's site link
//  String logo; // base64 encoded string representation of logo
//  String email;

const generatePartner = async (body) => {
    return req({
        url: state.partner_plan,
        method: 'POST',
        body: body
    })
}

export default { generatePartner };