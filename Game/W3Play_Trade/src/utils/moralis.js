import state from "../state";

export async function getMessageToSign(data) {
    return fetch(state.moralis_url + '/signin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error('Something went wrong when trying to get a message to sign from the backend');
        })
}

export async function verifySignedMessage(data) {
    console.log('data: ', data)
    return fetch(state.moralis_url + '/signin/verify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
        .then(res => {
            if (res.ok) return res.json();
            console.log(res, 'res verifying signedMessage')

            throw new Error('Something went wrong in the backend while trying to verify the signed message');
        })
}