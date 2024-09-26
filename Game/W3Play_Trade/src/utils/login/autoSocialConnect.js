import { ethers } from "ethers";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import APP from "../../app";
import state from "../../state";
import Wallet from "../game/wallets/Wallet";
import { set_web3_social_obj } from "../../REDUX/actions/main.actions";
import CustomerModel from "../../models/Customer";

export default async (dispatch) => {

    const chainConfig = {
        chainNamespace: state.web3AuthCfg.chainNamespace,
        chainId: state.web3AuthCfg.chainId,
        rpcTarget: state.web3AuthCfg.rpcTarget,
        displayName: state.web3AuthCfg.displayName,
        blockExplorer: state.web3AuthCfg.blockExplorer,
        ticker: state.web3AuthCfg.ticker,
        tickerName: state.web3AuthCfg.tickerName,
    };

    let web3auth;
    try {
        let privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
        web3auth = new Web3AuthNoModal({
            clientId: APP.state.get('web3_auth_token'),
            web3AuthNetwork: WEB3AUTH_NETWORK.CYAN,
            privateKeyProvider,
        });

        let openloginAdapter = new OpenloginAdapter({
            adapterSettings: {
                storageServerUrl: 'https://session-sg.web3auth.io',
                uxMode: /*browserName.toLowerCase().includes('safari') ? 'redirect' :*/ 'popup',
                // mfaSettings: {
                //     deviceShareFactor: {
                //         enable: true,
                //         priority: 1,
                //         mandatory: true,
                //     },
                //     backUpShareFactor: {
                //         enable: true,
                //         priority: 2,
                //         mandatory: false,
                //     },
                //     socialBackupFactor: {
                //         enable: true,
                //         priority: 3,
                //         mandatory: false,
                //     },
                //     passwordFactor: {
                //         enable: true,
                //         priority: 4,
                //         mandatory: false,
                //     },
                // },
            },
            loginSettings: {
                mfaLevel: "none",
            },
            privateKeyProvider,
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.init();

        // adding wallet connect v2 adapter
        // const defaultWcSettings = await getWalletConnectV2Settings(CHAIN_NAMESPACES.EIP155, ["0x1", "0xaa36a7"], "04309ed1007e77d1f119b85205bb779d",);
        // const walletConnectModal = new WalletConnectModal({ projectId: "04309ed1007e77d1f119b85205bb779d" });
        // const walletConnectV2Adapter = new WalletConnectV2Adapter({
        //   adapterSettings: {
        //     qrcodeModal: walletConnectModal,
        //     ...defaultWcSettings.adapterSettings,
        //   },
        //   loginSettings: { ...defaultWcSettings.loginSettings },
        // });

        // web3auth.configureAdapter(walletConnectV2Adapter);

        // prevent any situation where there is any missing cfg
        // stuck user before connection => logout that user 

        dispatch(set_web3_social_obj({ obj: web3auth }))

        if (!web3auth.connected) {
            // alert('not logged in web3auth.connected')
            console.log('web3auth not logged in web3auth.connected')
        }
        else {
            console.log('web3auth connecting user')
            // getting user's wallet address
            const web5Provider = new ethers.BrowserProvider(web3auth.provider),
                signer = await web5Provider?.getSigner(),
                walletAddress = signer?.address;

            APP.wallets = new Wallet(APP.state.get('default_game_network'), web3auth.provider, walletAddress)
            await APP.wallets.authenticate('web5', dispatch);

            if (walletAddress) {

                APP.customer = new CustomerModel(1, {}, []);
                APP.customer.init();

                localStorage.setItem('wallet', "web5");
                localStorage.setItem('isWeb5', true);
                localStorage.setItem('isSingleSocialConnect', true)

                dispatch(set_web3_social_obj({ wallet: walletAddress }))
                APP.state.set('wallet_address', walletAddress)
            }
        }
    }
    catch (error) {
        console.log(error, 'error.. web3auth')
        web3auth?.logout();
        console.error(error);
    }

    return true;
}