import { ethers } from "ethers";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WEB3AUTH_NETWORK, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

import APP from "../../app";
import state from "../../state";
import Wallet from "../game/wallets/Wallet";
import { set_web3_social_obj } from "../../REDUX/actions/main.actions";
import CustomerModel from "../../models/Customer";

/**
 * Initializes Web3Auth and handles authentication flow.
 *
 * @param {Function} dispatch - Redux dispatch function.
 * @returns {Promise<boolean>} - Returns true upon successful initialization.
 */
export default async (dispatch) => {
   
    // Define the blockchain configuration
    const chainConfig = {
        chainNamespace: state.web3AuthCfg.chainNamespace,
        chainId: state.web3AuthCfg.chainId,
        rpcTarget: state.web3AuthCfg.rpcTarget,
        displayName: state.web3AuthCfg.displayName,
        blockExplorer: state.web3AuthCfg.blockExplorer,
        ticker: state.web3AuthCfg.ticker,
        tickerName: state.web3AuthCfg.tickerName,
    };

    try {
        const clientId = state.web3_auth_token; // Web3Auth Client ID

        // Initialize the Ethereum Private Key Provider
        const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

        // Initialize Web3Auth without modal
        const web3auth = new Web3AuthNoModal({
            clientId,
            web3AuthNetwork: WEB3AUTH_NETWORK.CYAN, // Use appropriate network
            privateKeyProvider: privateKeyProvider,
        });

        // Configure the OpenLogin Adapter with JWT settings
        const openloginAdapter = new OpenloginAdapter({
            adapterSettings: {
                storageServerUrl: 'https://session-sg.web3auth.io', // Ensure this URL is correct
                uxMode: "redirect", // Use "redirect" for full-page redirects
                loginConfig: {
                    jwt: {
                        verifier: "web3auth-login-with-telegram", // Ensure this matches your Web3Auth verifier name
                        typeOfLogin: "jwt",
                        clientId, // Same client ID used in Web3Auth initialization
                    },
                },
            },
        });

        web3auth.configureAdapter(openloginAdapter);

        // Initialize Web3Auth
        await web3auth.init();

        // Extract JWT token from URL if present
        const params = new URLSearchParams(window.location.search);
        const jwtToken = params.get("token");

        if (jwtToken) {
            // alert('2' + jwtToken);
            console.log('JWT token found in URL, attempting login');
            await loginWithWeb3Auth(web3auth, jwtToken, dispatch);
            // Remove the token from the URL to clean up
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Check if user is already connected
        if (!web3auth.connected) {
            console.log('Web3Auth not logged in. Awaiting user action.');
            // Optionally, you can trigger the login flow here or wait for user interaction
        } else {
            console.log('Web3Auth is connected. Fetching user information.');
            await handleAuthenticatedUser(web3auth, dispatch);
        }

        // Dispatch the Web3Auth instance for future use if needed
        dispatch(set_web3_social_obj({ obj: web3auth }));

    } catch (error) {
        console.error('Error during Web3Auth initialization:', error);
        // Attempt to logout in case of errors to reset any partial states
        try {
            await web3auth?.logout();
        } catch (logoutError) {
            console.error('Error during Web3Auth logout:', logoutError);
        }
    }

    return true;
};

/**
 * Handles login with Web3Auth using a JWT token.
 *
 * @param {Web3AuthNoModal} web3auth - Initialized Web3Auth instance.
 * @param {string} token - JWT token obtained from the authentication provider.
 * @param {Function} dispatch - Redux dispatch function.
 */
const loginWithWeb3Auth = async (web3auth, token, dispatch) => {
    // alert('3');
    try {
        // Connect to Web3Auth using the JWT token
        const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "jwt",
            extraLoginOptions: {
                id_token: token,
                verifierIdField: "sub", // Ensure this matches your JWT claims
            },
        });
        // alert('4');
        // Initialize ethers provider with Web3Auth provider
        const ethersProvider = new ethers.BrowserProvider(web3authProvider);
        // alert('4.1');
        const signer = await ethersProvider.getSigner();
        // alert('4.2');
        const walletAddress = await signer.getAddress();
        // alert('5');

        // Initialize Wallet and Authenticate
        APP.wallets = new Wallet(APP.state.get('default_game_network'), web3authProvider, walletAddress);
        // alert('6');
        await APP.wallets.authenticate('web5', dispatch);

        if (walletAddress) {
            // Initialize Customer Model
            APP.customer = new CustomerModel(1, {}, []);
            await APP.customer.init();

            // Store wallet information in localStorage
            localStorage.setItem('wallet', "web5");
            localStorage.setItem('isWeb5', "true"); // Stored as string
            localStorage.setItem('isSingleSocialConnect', "true");

            // Dispatch wallet address to Redux store
            dispatch(set_web3_social_obj({ wallet: walletAddress }));
            APP.state.set('wallet_address', walletAddress);

            console.log('User authenticated and wallet initialized:', walletAddress);
            // Optionally, navigate to a different page or perform other actions
            // e.g., navigate('/trade');
        }
    } catch (error) {
        console.error('Error during JWT login with Web3Auth:', error);
        // Attempt to logout to clean up any partial authentication states
        try {
            await web3auth.logout();
        } catch (logoutError) {
            console.error('Error during Web3Auth logout after failed JWT login:', logoutError);
        }
    }
};

/**
 * Handles actions after a user is authenticated with Web3Auth.
 *
 * @param {Web3AuthNoModal} web3auth - Initialized Web3Auth instance.
 * @param {Function} dispatch - Redux dispatch function.
 */
const handleAuthenticatedUser = async (web3auth, dispatch) => {
    try {
        // Initialize ethers provider with Web3Auth provider
        const ethersProvider = new ethers.BrowserProvider(web3auth.provider);
        const signer = await ethersProvider.getSigner();
        const walletAddress = await signer.getAddress();

        // Initialize Wallet and Authenticate
        APP.wallets = new Wallet(APP.state.get('default_game_network'), web3auth.provider, walletAddress);
        await APP.wallets.authenticate('web5', dispatch);

        if (walletAddress) {
            // Initialize Customer Model
            APP.customer = new CustomerModel(1, {}, []);
            await APP.customer.init();

            // Store wallet information in localStorage
            localStorage.setItem('wallet', "web5");
            localStorage.setItem('isWeb5', "true"); // Stored as string
            localStorage.setItem('isSingleSocialConnect', "true");

            // Dispatch wallet address to Redux store
            dispatch(set_web3_social_obj({ wallet: walletAddress }));
            APP.state.set('wallet_address', walletAddress);

            console.log('User authenticated and wallet initialized:', walletAddress);
            // Optionally, navigate to a different page or perform other actions
            // e.g., navigate('/trade');
        }
    } catch (error) {
        console.error('Error handling authenticated user:', error);
        // Attempt to logout in case of errors to reset any partial states
        try {
            await web3auth.logout();
        } catch (logoutError) {
            console.error('Error during Web3Auth logout after handling authenticated user:', logoutError);
        }
    }
};
