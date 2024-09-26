import state from "../state";
import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";

const sendTracking = async (userId, address, name) => {

    let a = JSON.stringify({
        userId,
        wallet: {
            address,
            name
        }
    })

    return req({
        url: 'https://pnance.pp.ua/webhook/registration',
        method: 'POST',
        body: a
    })
}

export default { sendTracking };