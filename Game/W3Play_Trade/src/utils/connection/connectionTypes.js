import { WALLET_ADAPTERS } from "@web3auth/base";

export default async (web3auth, type, email, token) => {

    switch (type) {

        case 'email_passwordless':
            return await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: "email_passwordless",
                extraLoginOptions: {
                    login_hint: email, // email to send the OTP to
                },
            });

        case 'yandex':
            return await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: "jwt",
                extraLoginOptions: {
                    domain: "https://dev-wvket3rcqh3ff2gx.us.auth0.com", // Pass on the Auth0 `Domain` here
                    verifierIdField: "sub", // Pass on the field name of the `sub` field in the JWT
                    connection: "yandex", // Use this to skip Auth0 Modal for Yandex login
                },
            });

        case 'vkontakte':
            return await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: "jwt",
                extraLoginOptions: {
                    domain: "https://dev-wvket3rcqh3ff2gx.us.auth0.com", // Pass on the Auth0 `Domain` here
                    verifierIdField: "sub", // Pass on the field name of the `sub` field in the JWT
                    clientId: 'WzyR1BH5qsW6iLPKX8Jo13yJJtJ3zaS0',
                    connection: "vkontakte", // Use this to skip Auth0 Modal for ВКонтакте (vKontakte) login
                },
            });

        // login using telgram bot (sfa - google)
        // case 'google-telegram':
        //     return await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        //         loginProvider: "jwt",
        //         extraLoginOptions: {
        //             id_token: token,
        //             verifierIdField: "sub", // sub, email, or custom
        //         }
        //     });

        default:
            return await web3auth?.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: type,
            });
    }
}