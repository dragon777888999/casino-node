import state from "../state";

export function getChatToken(walletAddress, partnerRef) {

    return fetch(
        state.chat_url + `/token?wallet=${walletAddress}`
        , {
            // method: 'GET',
            params: JSON.stringify({ partnerRef })
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('something went wrong while getting chat token');
        })
}