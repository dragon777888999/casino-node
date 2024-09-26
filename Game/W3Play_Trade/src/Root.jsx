import React, { useLayoutEffect, useState, useEffect, useContext, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import APP from './app';
// import Wallets from "./controllers/Wallets";
import Wallet from './utils/game/wallets/Wallet';
import GameController from './controllers/Game';
import CustomerModel from './models/Customer';
import Config from "./config";
import Publisher from "./publisher";
import TradePage from './pages/trade';
import term_getter from "./terms";
import state_template from "./state";
import LeaderboardPage from './pages/leaderboard';
import LeaderboardWinsPaidPage from './pages/leaderboardWinsPaid';
import PartnersProgram from './pages/PartnersProgram';
import PartnerProgram from './pages/PartnerProgram/PartnerProgram';
import sim_trade from './simulation/trade';
import sim_leaderboard from './simulation/leaderboard';
import EntryScreen from './pages/EntryScreen';

import Home from './pages/Home/Home';
import HomeSharker from './pages/HomeSharker/HomeSharker';
import HomeBitFight from './pages/HomeBitFight/HomeBitFight';

// import NewEntryScreen from './pages/NewEntryScreen/NewEntryScreen';
import NewEntryScreen from './pages/NewEntryScreen/default/NewEntryScreen';
import NewEntryScreen_CryptoFights from './pages/NewEntryScreen/cryptoFights/NewEntryScreen';

// import HowToPlay from './pages/HowToPlay/HowToPlay';
import HowToPlay from './pages/HowToPlay/default/HowToPlay';
import HowToPlay_CryptoFights from './pages/HowToPlay/cryptoFights/HowToPlay';

// import HowToAffiliate from './pages/HowToAffiliate/HowToAffiliate';
import HowToAffiliate from './pages/HowToAffiliate/default/HowToAffiliate';
import HowToAffiliate_CryptoFights from './pages/HowToAffiliate/cryptoFights/HowToAffiliate';

import CryptoFightsDisclaimer from './pages/CryptoFightsDisclaimer/CryptoFightsDisclaimer';

import TradeHistoryPage from './pages/TradeHistory';
import OpenTradesPage from './pages/OpenTrades';
import { deep_copy } from './utils/object';
// import AboutUsPage from './pages/Support/AboutUsPage';
import PrivacyPolicyPage from './pages/Support/PrivacyPolicyPage';
import AffiliateEarningsReport from './pages/Affiliates/EarningsReport';
import AffiliateLinksMananger from './pages/Affiliates/LinksMananger';
import AffiliatePagesHub from './pages/AffiliatePagesHub';
import SAPDashboard from './pages/SuperAffiliates/Dashboard';
import SAPEarningsReport from './pages/SuperAffiliates/EarningsReport/EarningsReport';
import SAPLinksManager from './pages/SuperAffiliates/LinksManager/LinksManager';
import KnowledgeCenter from './pages/KnowledgeCenter/KnowledgeCenter';
import SAPTutorial from './pages/SuperAffiliates/Tutorial/Tutorial';
import { FAQ } from './pages/Support/FAQ';
// import { Support } from './pages/Support/Support';
import UserProfile from './pages/UserProfile';
import { getRefFromUrlParm } from './utils/affiliate';
import useAppState from './hooks/useAppState';
import extractParam from './utils/extractParam';
import Dashboard from './pages/Affiliates/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import CryptoBattles from './pages/EntryScreens/Cryptobattles';
import BTCBattles from './pages/EntryScreens/BTCBattles';
import { set_alert_msg, set_bg_music, set_demo_mode, set_initial_query_params, set_last_active_table, set_loader, set_new_pool, set_pools_popup, set_ref_param, set_safari_web5_login, set_sounds_popup, set_sound_effects, set_tutorial, set_voiceover, set_web3_social_obj } from './REDUX/actions/main.actions';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import ReactPixel from 'react-facebook-pixel';
import state from './state';
import { pixelIdByWh } from './utils/pixel';
import blockDomainRouting from './utils/blockDomainRouting';
// import ipJson from './API/ipJson';
// import { languages } from './utils/languages';
import { sleep } from './utils/async';
// import Redirect from './comp/Redirect';
import RedirectExternal from './comp/RedirectExternal';
import dynamicLang from './utils/dynamicLang';
// import authenticate from './utils/login/authenticate';
import isUserConnected from './utils/login/isUserConnected';
import WeeklyJackpot from './pages/Jackpot/Weekly/WeeklyJackpot';
import MonthlyJackpot from './pages/Jackpot/Monthly/MonthlyJackpot';
import JackpotWinners from './pages/Jackpot/Winners/JackpotWinners';
import JackpotHistory from './pages/Jackpot/Winners/History';
import Maintenance from './pages/Maintenance';
import AffiliateLeaderboard from './pages/AffiliateLeaderboard';
import Success from './pages/p2p/Success';
import UtorgSuccess from './pages/utorg/Succes';
import Failure from './pages/p2p/Failure';

import ContactUs from './pages/ContactUs/ContactUs';
import AblyClientSingleton from './API/Ably/AblyClientSingleton';
// import jackpot from './API/jackpot';
// import { GameContext } from './utils/game';
// import { ablyGetRoundHistory } from './API/Ably/AblyRoundHistory';
import Topup from './pages/Topup';

import web3Singleton from './API/Web3Singleton';
import UpVsDownGameV1 from './API/contracts/UpVsDownGameV1.json';
import { convertHexToColonFormat } from './utils/game/utilities/utils';
import WinRatio from './pages/Tournaments/WinRatio.top10';
// import History from './pages/Tournaments/highRollers/History';
// import HistoryRatio from './pages/Tournaments/winRatio/History';
import JackpotWinnersMonthly from './pages/Jackpot/Winners/JackpotWinners.monthly';
import MonthlyJackpotHistory from './pages/Jackpot/Winners/History.monthly';
import pixelAPI from './API/pixel';
import CryptoTopup from './pages/CryptoTopup';
import CashTopup from './pages/CashTopup';
import extractParamsFromString from './utils/extractUrlParams';
import StreamerSingleton from './API/StreamerSingleton';
import autoSocialConnect from './utils/login/autoSocialConnect';
// import autoSocialConnect2 from './utils/login/llautoSocial.test2';

/* Gelato Relay */
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import switchPool from './utils/pools/switchPool';
// import TradeRouting from './utils/routing/TradeRouting';
import autoSocialSfaConnect from './utils/login/autoSocialSfaConnect';
// import { browserName } from 'react-device-detect';
import detectTelegramBrowser from './utils/detectTelegramBrowser';
// import login from './utils/connection/login';
import loginWithTelegram from './utils/login/loginWithTelegram';
import updateAsset from './utils/assets/updateAsset';

const page_simulator = {
    trade: sim_trade,
    leaderboard: sim_leaderboard
};

// window.APP = APP;

// APP.config = new Config();
// APP.state = new Publisher(deep_copy(state_template));
APP.term = term_getter;
APP.API = {};

/* Init Gelato Relay */
const gelatoRelay = new GelatoRelay();
APP.state.set('gelatoRelay', gelatoRelay);

if (APP.state.get('active_network') == 'mainnet') {
    Sentry.init({
        dsn: "https://3b63a3bee57644edbf3ce6b8aec06c8c@o873345.ingest.sentry.io/4504796864970752",
        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 0.1,
        // If the entire session is not sampled, use the below sample rate to sample
        // sessions when an error occurs.
        replaysOnErrorSampleRate: 1.0,
        integrations: [new BrowserTracing(), new Sentry.Replay()],
        tracesSampleRate: 1.0,
    });
}


// Refresh the page to rebuild the graph and connect to ably after hidden visibility and come back> X seconds
let backgroundTimer;
let shouldRefresh = false;

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function handleVisibilityChange() {

    console.log('is mobile device', isMobileDevice());
    if (!isMobileDevice()) {
        return; // Skip the logic if not on a mobile device
    }

    if (document.visibilityState === 'hidden') {
        // User has switched away from the tab, start a timer
        backgroundTimer = setTimeout(() => {
            shouldRefresh = true;
        }, 30000); // 30 seconds
    } else {
        console.log('back timer', backgroundTimer);
        console.log('shouldRefresh', shouldRefresh);

        console.log('call ably connect');
        AblyClientSingleton.getClient().connect();

        // User has come back to the tab
        clearTimeout(backgroundTimer);
        if (shouldRefresh) {
            // Refresh the page if the tab was in the background for 30 seconds or more
            //window.location.reload();
        }
        shouldRefresh = false; // Reset the flag
    }
}

APP.play_sound = function (name) {
    if (!APP.sounds) return;
    APP.sounds[name].play();
}

// Listen for visibility change events
document.addEventListener("visibilitychange", handleVisibilityChange);

const Root = () => {

    let simulator;
    let tradeSimulation = true;
    let [load, setLoad] = useState(false);
    let lang = useSelector(state => state.mainRememberReducer?.app_lang);
    let web3AuthObj = useSelector(state => state.mainRememberReducer.social_web3_obj?.obj);
    let { bg_music_on, sound_effects_on, voiceover_on, last_active_table, login_x_safari, last_web5_connection_type, social_web3_obj, initial_query_params } = useSelector(state => state.mainRememberReducer);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let asset_switch = useAppState('asset_switch');
    let skin_loader = useAppState('skin_loader');
    let wallet_address = useAppState('wallet_address');
    let activate_claim_popup = useAppState('activate_claim_popup');
    let location = useLocation();
    let currentPool = useSelector(state => state.mainRememberReducer.currentPool);
    const demo_mode = useSelector(state => state.mainRememberReducer.demo_mode);
    const telegram_login = useSelector(state => state.mainRememberReducer.telegram_login);

    const streamer_data = state.round_history_from_streamer;
    const ablyRoundsClient = streamer_data ? AblyClientSingleton.getClient() : null;
    const [loadedAblyHistory, setLoadedAblyHistory] = useState(false);
    const [loadedBlockHistory, setLoadedBlockHistory] = useState(false);
    //const active_table = useAppState('active_table');

    //active table is the current pool according to the path and not the default active_table
    const isDemo = location.pathname?.includes('demo') || currentPool?.uid?.includes('demo');
    const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');

    const prevLocation = useRef(location.pathname);
    // const navigate = useNavigate();

    // useLayoutEffect(() => {
    //     const currentPath = location.pathname;
    //     const prevPath = prevLocation.current;

    //     if (currentPath === prevPath) return;

    //     if (state.pool_routes.includes(currentPath)) {
    //         dispatch(set_demo_mode({ lastMode: currentPath }))

    //         if (((demo_mode?.lastMode !== currentPath) || !demo_mode?.lastMode)) {
    //             let condition =
    //                 demo_mode?.lastMode.includes('demo') && !currentPath.includes('demo') ||
    //                 !demo_mode?.lastMode.includes('demo') && currentPath.includes('demo')

    //             if (condition) {
    //                 window.location.reload();
    //             }
    //         }
    //     }
    //     prevLocation.current = currentPath;

    // }, [location]);

    // if (isDemo) {
    // APP.state.set('currentToken', 'demo');
    // }

    // let active_table = tables.find(pool => pool?.uid === currentPool?.uid);

    // if (active_table == undefined) {
    //     console.log('larwa', currentPool);
    //     active_table = APP.state.get('active_table');
    // }

    // APP.state.set('active_table', active_table);

    // console.log('ROOT.js active_table', active_table);


    // const { gameClient } = useContext(GameContext);

    //When user connected wallet use ably for rates streaming otherwise use nchan streamer
    // APP.controller.sub('user_wallet_address_changed', function (wallet_address) {
    // console.log('user_wallet_address_changed', wallet_address);
    // if (wallet_address)
    //     APP.controller.subscribeToRates();
    // else
    //     APP.controller.unsubscribeFromRates();
    // });


    //console.log('in root.jsx');

    // const injected = injectedModule();
    // const trust = trustModule();

    // const wcInitOptions = {
    //     /**
    //      * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
    //      */
    //     projectId: APP.state.get('walletConnectProjectId'),
    //     /**
    //      * Chains required to be supported by all wallets connecting to your DApp
    //      */
    //     requiredChains: [APP.state.get('chainId')],
    //     /**
    //      * Chains required to be supported by all wallets connecting to your DApp
    //      */
    //     optionalChains: [],
    //     /**
    //      * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
    //      * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
    //      * To connect with WalletConnect
    //      */
    //     dappUrl: window.location.origin
    // }

    // initialize the module with options
    // https://onboard.blocknative.com/docs/modules/core
    // const walletConnect = walletConnectModule(wcInitOptions);

    // let onboardObject = false;
    // useEffect(() => {
    //     console.log('onboard in useeffect');
    //     const onboard = Onboard({
    //         apiKey: '7fba0611-fb2e-414a-80b4-39282566d156',
    //         theme: 'dark',
    //         wallets: [/*injected, trust,*/ walletConnect],
    //         chains: [
    //             {
    //                 id: APP.state.get('chainId').toString(16),
    //                 token: 'MATIC',
    //                 label: 'Polygon',
    //                 rpcUrl: APP.state.get('eth_ws_web3auth')
    //             }
    //         ],
    //         //Don't display the account center
    //         accountCenter: {
    //             desktop: {
    //                 enabled: false,
    //                 position: 'bottomRight'
    //             },
    //             mobile: {
    //                 enabled: false,
    //                 position: 'topRight'
    //             }
    //         },
    //         connect: {
    //             showSidebar: false,
    //             removeWhereIsMyWalletWarning: true,
    //             autoConnectLastWallet: true
    //         },
    //         appMetadata: {
    //             name: window.location.origin,
    //             description: 'Play2Earn Crypto!'
    //         },
    //         notify: {
    //             desktop: {
    //                 enabled: false,
    //             },
    //             mobile: {
    //                 enabled: false,
    //             }
    //         }
    //     });

    //     console.log('setting web3onboard object');
    //     APP.state.set('web3Onboard', onboard);
    //     //console.log('number of connected wallets with onboard', onboard.state.get().wallets.length);


    //     const wallets = onboard.state.select('wallets')
    //     const { unsubscribe } = wallets.subscribe((update) => {
    //         console.log('Onboard wallets update: ', update);
    //         //if account changed after connect wallet disconnect all wallets
    //         if (update[0].accounts.length > 1) {
    //             (async () => {
    //                 let walletsToDisconnect = APP.state.get('web3Onboard').state.get().wallets;
    //                 for (let i = 0; i < walletsToDisconnect.length; i++) {
    //                     const w = APP.state.get('web3Onboard').state.get().wallets[i];
    //                     await APP.state.get('web3Onboard').disconnectWallet({ label: w.label })
    //                 }
    //                 //reload after disconnect all wallets
    //                 setTimeout(() => {
    //                     window.location.reload();
    //                 }, 2000);

    //             })();
    //         }
    //     }
    //     );

    //     // unsubscribe when updates are no longer needed
    //     //unsubscribe()


    //     setTimeout(() => {
    //         //console.log('number of connected wallets with onboard after 2 seconds', APP.state.get('web3Onboard').state.get().wallets.length);

    //         if (onboard.state.get().wallets.length) {
    //             console.log('Wallet already connected with Onboard ', onboard.state.get().wallets[0].accounts[0].address);

    //             let address, provider;
    //             try {
    //                 address = onboard.state.get().wallets[0].accounts[0].address;
    //                 console.log('address = ', address);
    //                 provider = onboard.state.get().wallets[0].provider;
    //                 console.log('provider = ', provider);
    //             } catch (e) {
    //                 console.log('ERROR:', e);
    //             }

    //             //Check if wallet was previously connected and signed
    //             if (localStorage.getItem('walletConnectConnected')) {
    //                 console.log('1 ', localStorage.getItem('walletConnectConnected').toLowerCase());
    //                 console.log('2 ', address.toLowerCase());
    //                 if (localStorage.getItem('walletConnectConnected').toLowerCase() == address.toLowerCase()) {
    //                     console.log('wallet was connected previously with address', address);

    //                     //User connected already with wallet connect - for example after refresh
    //                     dispatch(set_loader(true)); //Display loader

    //                     console.log('ROOT::1');
    //                     APP.controller = new GameController();
    //                     APP.customer = new CustomerModel(1, {}, [address]);
    //                     APP.wallets = new Wallet(APP.state.get('default_game_network'), provider, address)

    //                     //Update user balance
    //                     //APP.state.set('customer.balance', await APP.wallets.web3.eth.getBalance(address, 'pending'));
    //                     APP.controller.init();
    //                     APP.customer.init();

    //                     APP.state.set("success_wallet_connect", true);
    //                     APP.state.set('auto_log_in', true)

    //                     localStorage.setItem('wallet', "web5");
    //                     localStorage.setItem('isWeb5', true);
    //                     localStorage.setItem('walletConnectConnected', address);

    //                     localStorage.setItem('walletConnectConnectedWalletName', 'wallet');

    //                     //localStorage.setItem('walletConnectConnectedWalletName', walletConnectModal.getWalletProvider().session.peer.metadata.name);

    //                     //Login successful - remove the connect wallet button    
    //                     APP.state.set('wallet_address', address);
    //                     APP.controller.publish('user_wallet_address_changed', address);
    //                     APP.state.set('walletConnectModal', walletConnectModal);

    //                     localStorage.setItem('last_wallet_address', address); //For https://betcio.backlog.com/view/UPVSDOWN-1032

    //                     dispatch(set_loader(false)); //Hide loader

    //                 }
    //             } else {
    //                 (async () => {
    //                     console.log('No saved wallet in local storage, disconnect from onboard');
    //                     let walletsToDisconnect = APP.state.get('web3Onboard').state.get().wallets;
    //                     for (let i = 0; i < walletsToDisconnect.length; i++) {
    //                         const w = APP.state.get('web3Onboard').state.get().wallets[i];
    //                         await APP.state.get('web3Onboard').disconnectWallet({ label: w.label })
    //                     }
    //                 })();
    //             }

    //         } else {
    //             console.log('Wallet is not connected with Onboard');
    //         }

    //     }, 2500); //wait 2.5 seconds till we get the current state of connected wallets

    // }, [onboardObject]);











    if (APP.state.get('active_table').round_history_streamer == 'nchan') {
        // getRoundsFromNchan();
    } else if (APP.state.get('active_table').round_history_streamer == 'ably') {
        getRoundsFromAbly();
    }

    function getRoundsFromAbly() {
        const ablyClient = AblyClientSingleton.getClient();
        //console.log(ablyClient.channels.all['RoundStarted-1-integration']);

        //Ably - handle RoundStarted events
        if (!ablyClient.channels.all[active_table.round_started_channel]) {
            // console.log('root.js active table started', active_table);
            ablyClient.channels.get(active_table.round_started_channel, { params: { rewind: '1' } })
                .subscribe(roundStartedEvent => {
                    //console.log("RoundStarted last message from ably", roundStartedEvent)

                    const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
                    const abi = UpVsDownGameV1.abi;
                    const event = abi.find(item => item.type === "event" && item.name === "RoundStarted");

                    let data = roundStartedEvent.data[0].logs[0].data;
                    let topics = roundStartedEvent.data[0].logs[0].topics;

                    const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

                    let poolId = convertHexToColonFormat(decodedLog.poolId);
                    let price = decodedLog.price;
                    let timestamp = decodedLog.timestamp;

                    const lastRoundStartedEvent = {
                        'poolId': poolId,
                        'startPrice': parseInt(price) / 10000,
                        'timestamp': Number(timestamp)
                    }

                    APP.state.set('lastRoundStartedEvent', lastRoundStartedEvent);
                    //console.log('Round current state', APP.state.get('round_current_state'));

                    let currentRoundPhaseFromGameController = APP.state.get('round_current_state');

                    if (APP.state.get('round_started_streamer')) {
                        if (currentRoundPhaseFromGameController == 'ExpirationPhase') {
                            APP.state.set('phase', 'pending');
                        } else {
                            APP.state.set('phase', 'open');
                        }
                    }
                });
        }

        //Ably - handle RoundEnded events
        if (!ablyClient.channels.all[active_table.pool_history_channel]) {
            // console.log('root.js active table ended', active_table);
            ablyClient.channels.get(active_table.pool_history_channel, { params: { rewind: '1' } })
                .subscribe(roundEndedEvent => {
                    //console.log("RoundEnded last message from ably", roundEndedEvent)

                    const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
                    const abi = UpVsDownGameV1.abi;
                    const event = abi.find(item => item.type === "event" && item.name === "RoundEnded");

                    let data = roundEndedEvent.data[0].logs[0].data;
                    let topics = roundEndedEvent.data[0].logs[0].topics;

                    const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

                    let poolId = convertHexToColonFormat(decodedLog.poolId);
                    let price = decodedLog.startPrice;
                    let timestamp = decodedLog.timestamp;

                    const lastRoundEndedEvent = {
                        'poolId': poolId,
                        'startPrice': parseInt(price) / 10000,
                        'timestamp': Number(timestamp)
                    }

                    APP.state.set('lastRoundEndedEvent', lastRoundEndedEvent);
                    //console.log('Round current state', APP.state.get('round_current_state'));

                    let currentRoundPhaseFromGameController = APP.state.get('round_current_state');

                    if (APP.state.get('round_started_streamer')) {
                        if (currentRoundPhaseFromGameController == 'PlaceTradePhase') {
                            APP.state.set('phase', 'open');
                            //APP.state.set('phase_confirmed', false);
                            //APP.state.set('entryRate', null);
                        } else {
                            APP.state.set('phase', 'pending');
                        }
                    }
                });
        }
    }

    function onRoundStartedUpdate(roundStartedEvent) {
        const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
        const abi = UpVsDownGameV1.abi;
        const event = abi.find(item => item.type === "event" && item.name === "RoundStarted");

        // console.log('round started event', roundStartedEvent);
        // APP.state.set('round_current_state', 'ExpirationPhase');

        let data = roundStartedEvent[0].logs[0].data;
        let topics = roundStartedEvent[0].logs[0].topics;

        const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

        let poolId = convertHexToColonFormat(decodedLog.poolId);
        let price = decodedLog.price;
        let timestamp = decodedLog.timestamp;

        const lastRoundStartedEvent = {
            'poolId': poolId,
            'startPrice': parseInt(price) / 10000,
            'timestamp': Number(timestamp)
        }

        APP.state.set('lastRoundStartedEvent', lastRoundStartedEvent);
        //console.log('Round current state', APP.state.get('round_current_state'));

        let currentRoundPhaseFromGameController = APP.state.get('round_current_state');

        if (APP.state.get('round_started_streamer')) {
            if (currentRoundPhaseFromGameController == 'ExpirationPhase') {
                APP.state.set('phase', 'pending');
            } else {
                APP.state.set('phase', 'open');
            }
        }
    }

    function onRoundEndedUpdate(roundEndedEvent) {
        const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
        const abi = UpVsDownGameV1.abi;
        const event = abi.find(item => item.type === "event" && item.name === "RoundEnded");

        // APP.state.set('round_current_state', 'PlaceTradePhase');

        let data = roundEndedEvent[0].logs[0].data;
        let topics = roundEndedEvent[0].logs[0].topics;

        const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

        let poolId = convertHexToColonFormat(decodedLog.poolId);
        let price = decodedLog.startPrice;
        let timestamp = decodedLog.timestamp;

        const lastRoundEndedEvent = {
            'poolId': poolId,
            'startPrice': parseInt(price) / 10000,
            'timestamp': Number(timestamp)
        }

        APP.state.set('lastRoundEndedEvent', lastRoundEndedEvent);
        //console.log('Round current state', APP.state.get('round_current_state'));

        let currentRoundPhaseFromGameController = APP.state.get('round_current_state');

        if (APP.state.get('round_started_streamer')) {
            if (currentRoundPhaseFromGameController == 'PlaceTradePhase') {
                APP.state.set('phase', 'open');
                //APP.state.set('phase_confirmed', false);
                //APP.state.set('entryRate', null);
            } else {
                APP.state.set('phase', 'pending');
            }
        }
    }

    function getRoundsFromNchan() {
        const roundStartedChannelName = APP.state.get('active_table').nchan_channel_round_started;
        const roundEndedChannelName = APP.state.get('active_table').nchan_channel_round_ended;
        const nchanUrl = APP.state.get('active_table').nchan_url;

        const roundStartedStreamer = StreamerSingleton.getInstance(
            'round_started_events',
            nchanUrl + roundStartedChannelName,
            { onUpdate: onRoundStartedUpdate });

        const roundEndedStreamer = StreamerSingleton.getInstance(
            'round_ended_events',
            nchanUrl + roundEndedChannelName,
            { onUpdate: onRoundEndedUpdate });

    }

    /** WALLET CONNECT **/
    let walletConnectModal = false;
    // useEffect(() => {
    //     console.log('in use effect root.jsx');
    //     const projectId = APP.state.get('walletConnectProjectId');

    //     const network = {
    //         chainId: 137,
    //         name: 'Polygon',
    //         currency: 'MATIC',
    //         explorerUrl: APP.state.get('polygonscan_url_root'),
    //         rpcUrl: 'https://rpc.ankr.com/polygon'
    //     }

    //     const metadata = {
    //         name: window.location.host,
    //         description: window.location.host,
    //         url: window.location.origin
    //     }

    //     //Create Wallet Connect modal
    //     walletConnectModal = createWeb3Modal({
    //         defaultChain: [network],
    //         ethersConfig: defaultConfig({
    //             metadata,
    //             defaultChain: [network],
    //             enableEIP6963: true,
    //             enableInjected: true,
    //             enableCoinbase: true,
    //             rpcUrl: 'https://rpc.ankr.com/polygon'
    //         }),
    //         chains: [network],
    //         projectId
    //     });

    //     //Subscribe to wallet connect state changes
    //     let provider = walletConnectModal.subscribeProvider(handleWalletConnectStateChange);

    //     console.log('subscribeProvider', provider);
    //     APP.state.set('walletConnectModal', walletConnectModal);

    // }, [walletConnectModal]);

    // const handleWalletConnectStateChange = async ({ provider, providerType, address, chainId, isConnected }) => {
    //     console.log('in handle wallet connect state change func', new Date());
    //     console.log('provider', provider);
    //     console.log('providerType', providerType);
    //     console.log('address', address);
    //     console.log('chainid', chainId);
    //     console.log('isConnected', isConnected);
    //     console.log('isConnected from modal', walletConnectModal.getIsConnected());

    //     console.log('Wallet connect modal status 2:', walletConnectModal.getIsConnected(), walletConnectModal.getAddress());


    //     //Switch address in the wallet functionality (When user swith to other wallet address inside his wallet)

    //     //If wallet disconnected - for example when session timed out
    //     if (!isConnected) {
    //         APP.state.get('walletConnectModal').disconnect();
    //         APP.state.unset('walletConnectSigner');
    //         APP.state.unset('success_wallet_connect');
    //         APP.state.set('walletConnectDisconnected', true);
    //         localStorage.removeItem('walletConnectSubscribeProviderSet');
    //         console.log('remove 3');
    //         localStorage.removeItem('walletConnectConnected');

    //         APP.state.unset("wallet_address");
    //         APP.state.unset("customer.avatar");
    //         APP.state.unset("user_email");
    //         APP.state.unset("initial_web5_load");
    //     }

    //     let signAfterSwitchAddress = false;

    //     //Check if wallet address was changed
    //     if (typeof (address) !== 'undefined') { // && (APP.state.get('wallet_address') !== '' && typeof (APP.state.get('wallet_address') != 'undefined'))) {
    //         console.log('Z ', typeof (address), address);
    //         console.log('Z ', typeof (APP.state.get('wallet_address')), APP.state.get('wallet_address'));

    //         if (APP.state.get('wallet_address')) {
    //             if (APP.state.get('wallet_address').toLowerCase() != address.toLowerCase()) { //compare lowercase strings for better compatibility
    //                 console.log('User address was changed in the wallet', 'old:', APP.state.get('wallet_address').toLowerCase(), 'new:', address.toLowerCase());

    //                 signAfterSwitchAddress = true; //Need to work on this - for now refresh after account was changed
    //                 window.location.reload();
    //             }
    //         }
    //     }

    //     //Switch network functionality (When user connected with wrong network in his wallet)
    //     let networkNotFoundInWallet = false;
    //     (async () => {
    //         if (walletConnectModal.getWalletProvider()) {

    //             let network = APP.state.get('active_network');
    //             let neededChainId, neededChainId_int;

    //             if (network === 'testnet') {
    //                 neededChainId = '0x13881';
    //                 neededChainId_int = '80001';
    //             } else if (network === 'mainnet') {
    //                 neededChainId = '0x89';
    //                 neededChainId_int = '137';
    //             }

    //             const currentUserChainId = await walletConnectModal.getWalletProvider().request({ method: "eth_chainId" });

    //             if (currentUserChainId.toString() !== neededChainId && currentUserChainId.toString() !== neededChainId_int) {
    //                 console.log('need to switch to ' + neededChainId + ' network');
    //                 try {
    //                     await walletConnectModal.getWalletProvider().request({
    //                         params: [{ chainId: neededChainId }],
    //                         method: "wallet_switchEthereumChain",
    //                     });

    //                     window.location.reload();

    //                 } catch (e) {
    //                     console.log('ERROR: ', e.message);
    //                     if (e.message.includes('Unrecognized chain ID')) {
    //                         networkNotFoundInWallet = true;
    //                         console.log('set networkNotFoundInWallet to true')
    //                     }
    //                 }
    //             }

    //             //No appropriate network found in wallet
    //             if (networkNotFoundInWallet) {
    //                 walletConnectModal.close();
    //                 walletConnectModal.disconnect();

    //                 dispatch(set_alert_msg({ type: 'error', content: APP.state.get('chainName') + ' ' + APP.term('wc_network_not_found') }));
    //                 return;
    //             }
    //         }

    //         if (walletConnectModal.getWalletProvider())
    //             console.log('session info', walletConnectModal.getWalletProvider().session);

    //         if (isConnected && !localStorage.getItem('walletConnectConnected') && address || (isConnected && signAfterSwitchAddress)) {
    //             console.log('before sign -> networkNotFoundInWallet', networkNotFoundInWallet);

    //             walletConnectModal.close();
    //             console.log('Connected with Wallet connect');
    //             console.log('wallet info', walletConnectModal.getAddress());

    //             //Create wallets object
    //             APP.wallets = new Wallet(APP.state.get('default_game_network'), provider, address)

    //             //Save signer for global usage
    //             //const signer = provider.signer;

    //             const ethersProvider = new BrowserProvider(provider)
    //             const signer = await ethersProvider.getSigner()

    //             APP.state.set('walletConnectSigner', signer);

    //             //Connection successful - sign Message with Moralis
    //             let result;
    //             try {
    //                 result = await APP.wallets.connectWithMoralis(Web3.utils.toChecksumAddress(address), "web5", APP.state.get('aff_ref'), dispatch)
    //             } catch (e) {
    //                 console.log('ERROR: ', e);
    //             }
    //             console.log('connect with moralis result', result);
    //             if (result) {
    //                 console.log("login authenticate success");
    //                 APP.controller = new GameController();
    //                 APP.customer = new CustomerModel(1, {}, []);
    //                 APP.controller.init();
    //                 APP.customer.init();
    //                 APP.state.set("success_wallet_connect", true);
    //                 APP.state.set('auto_log_in', true)
    //                 localStorage.setItem('wallet', "web5");
    //                 localStorage.setItem('isWeb5', true);
    //                 localStorage.setItem('walletConnectConnected', true);
    //                 localStorage.setItem('walletConnectConnectedWalletName', walletConnectModal.getWalletProvider().session.peer.metadata.name);

    //                 //Login successful - remove the connect wallet button    
    //                 console.log('address = ', address);
    //                 APP.state.set('wallet_address', Web3.utils.toChecksumAddress(address));
    //                 APP.state.set('walletConnectModal', walletConnectModal);

    //                 localStorage.setItem('last_wallet_address', address); //For https://betcio.backlog.com/view/UPVSDOWN-1032

    //             }
    //             else {
    //                 console.log("login authenticate failed")

    //                 localStorage.removeItem('wallet');
    //                 console.log('remove 2');
    //                 localStorage.removeItem('walletConnectConnected');
    //                 localStorage.removeItem('walletConnectConnectedWalletName');
    //                 //dispatch(set_loader(false))
    //                 dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
    //                 //await logout()
    //                 walletConnectModal.disconnect();
    //                 APP.state.unset('walletConnectSigner');
    //             }

    //             walletConnectModal.close();
    //         } else if (isConnected) {

    //             //User connected already with wallet connect - for example after refresh
    //             dispatch(set_loader(true)); //Display loader

    //             console.log('ROOT::1');
    //             APP.controller = new GameController();
    //             APP.customer = new CustomerModel(1, {}, [address]);
    //             APP.wallets = new Wallet(APP.state.get('default_game_network'), provider, address)

    //             //Update user balance
    //             APP.state.set('customer.balance', await APP.wallets.web3.eth.getBalance(address, 'pending'));
    //             APP.controller.init();
    //             APP.customer.init();

    //             APP.state.set("success_wallet_connect", true);
    //             APP.state.set('auto_log_in', true)

    //             localStorage.setItem('wallet', "web5");
    //             localStorage.setItem('isWeb5', true);
    //             localStorage.setItem('walletConnectConnected', true);

    //             localStorage.setItem('walletConnectConnectedWalletName', walletConnectModal.getWalletProvider().session.peer.metadata.name);

    //             //Login successful - remove the connect wallet button    
    //             APP.state.set('wallet_address', address);
    //             APP.state.set('walletConnectModal', walletConnectModal);

    //             localStorage.setItem('last_wallet_address', address); //For https://betcio.backlog.com/view/UPVSDOWN-1032

    //             dispatch(set_loader(false)); //Hide loader
    //         }

    //     })();
    // };

    // Magic Auth
    let [connected, setConnected] = useState(false);

    const customNodeOptions = {
        rpcUrl: state.magicAuth.rpcUrl,
        chainId: state.magicAuth.chainId,
    }
    const magic = new Magic(state.magicAuth.apiKey, {
        network: customNodeOptions,
        extensions: [new OAuthExtension()],
    })
    APP.magic = magic;

    // APP.state.set('initial_web5_load', true)

    async function _switchPool(switchedName, name, color, itm) {

        if (!itm) return;

        // // prevent launching same pool
        // if (switchedName.toLowerCase() === name.toLowerCase()) {
        //     console.log(switchedName, name, ';TEST9')
        //     dispatch(set_pools_popup(false));
        //     // dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_pool_active' }));
        //     return;
        // }
        dispatch(set_demo_mode({ active: itm.uid?.includes('demo') ? true : false }))

        switchPool(dispatch, navigate, itm, color);
        dispatch(set_alert_msg({ type: 'success', content: APP.term('alert_msg_success_pool1') + ' ' + name.toUpperCase() + ' ' + APP.term('alert_msg_success_pool_sec') + ' ' + APP.term('alert_msg_success_pool2') }));
    }

    const checksocial = async (last_web5_connection_type) => {

        // await sleep(1500)

        // if ((login_x_safari?.wallet === 'web5') && login_x_safari?.login && !social_web3_obj?.wallet) {
        //     try {
        //         const wallet = await login(last_web5_connection_type || null, null, APP.state.get('web5Object'), dispatch, initial_query_params, true)
        //     }
        //     catch (e) {
        //         dispatch(set_loader(false))
        //     }
        // }

        // if (((localStorage.getItem("wallet") == "web5") && social_web3_obj?.wallet) || (social_web3_obj?.wallet && login_x_safari?.login)) {

        //     // Prevent re-renders
        //     const chainConfig = {
        //         chainNamespace: state.web3AuthCfg.chainNamespace,
        //         chainId: state.web3AuthCfg.chainId,
        //         rpcTarget: state.web3AuthCfg.rpcTarget,
        //         displayName: state.web3AuthCfg.displayName,
        //         blockExplorer: state.web3AuthCfg.blockExplorer,
        //         ticker: state.web3AuthCfg.ticker,
        //         tickerName: state.web3AuthCfg.tickerName,
        //     };
        //     const web3auth = new Web3AuthNoModal({
        //         clientId: APP.state.get('web3_auth_token'),
        //         web3AuthNetwork: APP.state.get('web3_auth_network'),
        //         chainConfig,
        //     });

        //     const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

        //     const openloginAdapter = new OpenloginAdapter({
        //         privateKeyProvider,
        //         adapterSettings: {
        //             uxMode: browserName.toLowerCase().includes('safari') ? 'redirect' : 'popup',
        //             storageServerUrl: 'https://session-sg.web3auth.io'
        //         }
        //     });

        //     web3auth.configureAdapter(openloginAdapter);

        //     // save web3auth obj for logout/auto logic 
        //     // APP.state.set('web5Object', web3auth)
        //     dispatch(set_web3_social_obj({ obj: web3auth }))

        //     await web3auth.init();
        //     if (web3auth) {
        //         try {
        //             socialConnect(APP, localStorage.getItem("wallet"), web3auth, dispatch, social_web3_obj?.wallet, true)
        //         }
        //         catch (e) {
        //             console.log(e, 'auto login')
        //         }
        //     }
        // }
        // else if ((localStorage.getItem("wallet") == "web5") && last_web5_connection_type) {
        //     try {
        //         const wallet = await login(last_web5_connection_type || null, null, APP.state.get('web5Object'), dispatch, null, true)
        //     }
        //     catch (e) {
        //         console.log(e, 'auto login web5 connection')
        //     }
        // }
    }

    // receving msg from jackpot balance socket
    // const onJackpotBalance = (client, _channel, callbackFunc) => {
    //     const channel = client.channels.get(_channel);

    //     channel.subscribe((message) => {
    //         let msg = JSON.parse(message?.data);
    //         if (message?.name !== 'balance') return;

    //         callbackFunc(msg);
    //     });
    // };

    // [tempBg, setTempBg] = useState(false),
    // [tempSounds, setTempSounds] = useState(false),
    // [tempVoiceover, setTempVoiceover] = useState(false);
    // let all_tables = useAppState('tables', []);
    // async function changeTable() {
    //     // deep linked pool id
    //     let poolId = Number(extractParam('pool'));
    // 	if (!poolId) return;

    // [tempBg, setTempBg] = useState(false),
    // [tempSounds, setTempSounds] = useState(false),
    // [tempVoiceover, setTempVoiceover] = useState(false);
    // all_tables = useAppState('tables', []);
    // all_tables = APP.state.get('tables');

    // async function changeTable(compare) {

    // deep linked pool id
    // let poolId = Number(extractParam('pool'));

    // update last table times on return from background
    // if (compare) {

    //     let table = all_tables.find(itm => itm.selected)

    //     setTimeout(async () => {
    //         if (table?.id && APP?.API?.change_table) {
    //             APP?.API?.change_table(table.id);
    //             await APP?.controller?.set_table(table);
    //         }
    //     }, 200);

    //     // await APP.controller.init();
    //     return;
    // }

    // if (!poolId) {
    //     // prevent table setter if API hasn't loaded yet 
    //     if (last_active_table?.id && APP?.API?.change_table) {
    //         APP?.API?.change_table(last_active_table?.id);
    //         await APP?.controller?.set_table(last_active_table);
    //     }
    //     return;
    // }

    // // assign the deep linked pool as an active table
    // let table = all_tables.find(itm => itm.id == poolId)
    // APP?.API?.change_table(table.id);
    // await APP?.controller?.set_table(table);
    // }

    // useLayoutEffect(() => {
    //     if (all_tables?.length) {
    //         changeTable();
    //     }
    // }, [all_tables.length])

    useEffect(() => {
        if (activate_claim_popup && wallet_address) {
            dispatch(set_demo_mode({ popup: true, claim_popup_wallet_address: wallet_address }));
            APP.state.unset('activate_claim_popup')
        }
    }, [activate_claim_popup, wallet_address]);

    useEffect(() => {
        document.body.classList.toggle("chat_open", false);
    }, [location.key]);

    useLayoutEffect(() => {

        let pageName = location.pathname.substring(1);
        if (load) return;

        if (tradeSimulation && pageName.length) {
            (simulator = page_simulator['trade']) && simulator(APP, APP.state);
            (simulator = page_simulator['leaderboard']) && simulator(APP, APP.state);
            setLoad(true);
        }
    }, [location])

    useEffect(() => {

        // prevent logic on self selection asset
        if (asset_switch && (location.pathname === APP.state.get('last_pathname'))) return;

        let last_pathname = APP.state.get('last_pathname');
        let demo_last_pathname = last_pathname?.includes('demo');

        if (!APP.state.get('asset')) {
            APP.state.set('asset', state.asset)
        }

        if (state.pool_routes.includes(location.pathname) && last_pathname/*&& state.pool_routes.includes(last_pathname)*/) {
            // make sure right asset is on right pools
            updateAsset(dispatch);

            if (location.pathname !== last_pathname) {
                let skinId = APP.state.get('skin_idx') || 0;

                let symbol_colors = state.table_skin_colors.find(itm => itm.id == skinId).pools_btn_colors;

                let isDemo = location.pathname?.includes('demo');
                let tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
                APP.state.set('currentToken', isDemo ? 'demo' : 'real');
                let poolToSwitch = tables.find(itm => itm.route === location.pathname);
                // alert(2)

                // if (demo_last_pathname) {
                //     APP.state.set('currentToken', 'real');
                //     dispatch(set_demo_mode({ active: false }))
                // }
                // else {
                //     APP.state.set('currentToken', 'demo');
                //     dispatch(set_demo_mode({ active: true }))
                // }

                APP.state.unset('asset_switch');
                _switchPool(poolToSwitch.name, poolToSwitch.name, symbol_colors[poolToSwitch?.id - 1], poolToSwitch)
                // dispatch(set_loader(true))
                // window.location.reload();
            }
        }
        APP.state.set('last_pathname', location.pathname)
    }, [location.pathname/*, asset_switch]*/])

    useEffect(() => {
        if (lang?.code) {

            APP.state.set('customer.lang', lang)

            // import dynamic css file for specific lang
            if (lang?.code) {
                dynamicLang(lang?.code)
            }

            setTimeout(() => {
                APP.term = term_getter;
            }, 200);
        }
    }, [lang])

    const onVisibilityChange = async () => {

        console.log('on visibility change');

        if (document.visibilityState === 'visible') {
            if (APP.state.get('app-reload-in-progress')) {
                // console.log('app::Root.jsx block initiation')
                return; //if app reload in progress don't initiate another app reload
            }

            // mobile (including ipad) + stay on bg more than 1min => reload window
            let lastBgTime = APP.state.get('last_bg_mode'),
                mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
                currentTime = new Date().getTime();

            // 30sec mobile not visible tag => make reload
            if (((lastBgTime + (1000 * 30)) < currentTime) && mobile) {
                dispatch(set_loader(true))
                setTimeout(() => {
                    window.location.reload()
                }, 1200);
            }
            // 10 mins web not visibable tab => make reload
            if (((lastBgTime + (1000 * 30 * 20)) < currentTime) && !mobile) {
                dispatch(set_loader(true))
                setTimeout(() => {
                    window.location.reload()
                }, 1200);
            }

            // prevent reset of game controller once left for less than 3sec 
            if ((new Date().getTime() - APP.state.get('last_platform_unmount')) <= 3000) {
                return;
            }
            //console.log('app::App reload in progress...', new Date());
            APP.state.set('app-reload-in-progress', true)
            APP.state.set('timer_update', true)
            // window.location.reload();
            //console.log('app::Root.jsx::Create new game controller', new Date())
            //console.log('app::before new gamecontroller', new Date())
            APP.controller = new GameController();
            // APP.wallets = new Wallets(APP.state.get('default_game_network'));
            // APP.wallets = new Wallet(APP.state.get('default_game_network'))
            // APP.customer = new CustomerModel(1, {}, []);
            // APP.controller.reset_streamer();
            // await sleep(1000)
            //console.log('app::before app controller init', new Date())
            APP.controller.init();
            // getRoundHistory();
            await sleep(1000)
            APP.state.set('resetGraph', true);
            // APP.customer.init();

            // changeTable(true)

            // if(walletApp) window.location.reload();

            let tempBg = APP.state.get('temp_bg');
            let tempVoiceover = APP.state.get('temp_voiceover');
            let tempSounds = APP.state.get('temp_sounds');

            // console.log('tempVoiceover: ', tempVoiceover, 'tempBg: ', tempBg, ' tempSounds:', tempSounds)
            if (tempVoiceover) unmute_voice();
            if (tempBg) unmute_bg();
            if (tempSounds) unmute_effects();

            // APP.state.set('pool',
            //     {
            //         total: 0,
            //         up: { total: 0, payout_percent: 200, positions: [] },
            //         down: { total: 0, payout_percent: 200, positions: [] }
            //     })

            //APP.state.set('app-reload-in-progress', false)
            //console.log('app::app reload done', new Date())
        }

        else {
            APP.state.set('last_platform_unmount', new Date().getTime())
            APP.state.set('last_bg_mode', new Date().getTime())
            dispatch(set_loader(false))
            dispatch(set_voiceover(false))
            dispatch(set_bg_music(false))
            dispatch(set_sound_effects(false))
        }

    };

    // make sure the last table was saved still exists
    // async function compare_tables(last_table) {
    //     if (!last_table) return;

    //     console.log('last_table', last_table)

    //     const isDemo = location.pathname.includes('demo') || currentPool?.uid?.includes('demo');
    //     const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');

    //     console.log('tables:', tables)

    //     let is_still_exits = tables.find(table => table.uid === last_table.uid);
    //     if (is_still_exits) return;
    //     else {
    //         let current_default_table = tables.find(table => table.selected);

    //         await APP.controller.set_table(current_default_table);
    //         dispatch(set_last_active_table(current_default_table))
    //     }

    // }


    // update table
    // async function update_table(table) {
    //     dispatch(set_last_active_table(table))

    //     APP.controller = new GameController();
    //     APP.customer = new CustomerModel(1, {}, []);
    //     APP.controller.init();
    //     APP.customer.init();
    // }

    // upon return from any tab - make sure to reconnect
    // async function set_new_tables(last_table) {
    // if (!last_table) {
    // let default_table = state.tables.find(table => table.selected);

    // window.location.reload();
    // update_table(default_table);
    // }

    // else {
    //     let current_saved_table = state.tables.find(table => table.pool_id === last_table.pool_id)
    //     if (current_saved_table) {
    //         let current_saved_table = state.tables.find(table => table.selected);

    //         update_table(current_saved_table)
    //     }

    // }
    // }

    // get a list of all domain/affiliates 
    async function getPixelCfg() {
        let res = await pixelAPI.getPixelsList();

        APP.state.set('pixels', res.data._data)

        if (res.error) return;

        const advancedMatching = { em: 'test@email.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching

        let wh_details = APP.state.get('pixels').find(itm => {
            if (itm?.params?.searchedByHostname) {
                return itm.target.includes(window.location.hostname);
            }
            else {
                return itm.target === window.location.href;
            }
        })

        const options = {
            autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
            debug: true, // enable logs
        };

        if (wh_details?.tagId) {

            dispatch(set_ref_param(wh_details))
            ReactPixel.init(wh_details?.tagId, advancedMatching, options);
            ReactPixel.pageView(); // For tracking page view
            // ReactPixel.track('wallet', 21); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
            // ReactPixel.trackSingle(wh_details?.pixelId); // For tracking default events.
            // ReactPixel.trackCustom('wallet_l', ); // For tracking custom events. More info about custom events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-events
            // ReactPixel.trackSingleCustom(192714853490610, event, data); // For tracking custom events.
        }
    }

    useEffect(() => {

        // only for telegram bot
        if (web3AuthObj && telegram_login && detectTelegramBrowser()) {
            loginWithTelegram(web3AuthObj, dispatch);
        }

    }, [web3AuthObj, telegram_login])

    useLayoutEffect(() => {

        // initialize
        // compare_tables(last_active_table)


        APP.state.set('initialUri', window.location.href)

        // prevent setting web3auth (safari) redirecting params
        if (!window.location.href.includes('sessionId') && window?.location?.search?.substring(1)) {
            APP.state.set('initialParams', window.location.search.substring(1))
            dispatch(set_initial_query_params({ initialParams: window.location.search.substring(1), initialUri: window.location.href, ref: getRefFromUrlParm() }))
        }

        getPixelCfg();

        dispatch(set_tutorial(false))
        //initialize tutorial
        // if (walletApp) {
        // dispatch(set_tutorial(true))
        // }

        document.addEventListener("visibilitychange", onVisibilityChange);
        // checksocial()
        initWeb5(dispatch);

        if (bg_music_on) APP.state.set('temp_bg', bg_music_on);
        if (voiceover_on) APP.state.set('temp_voiceover', voiceover_on);
        if (sound_effects_on) APP.state.set('temp_sounds', sound_effects_on);
        // initializeWeb5Cfg(params)

        // if (currentPool?.displayed_msg) {
        //     let name = currentPool?.name,
        //         capitalizeName = name[0].toUpperCase() + name.slice(1);

        //     // dispatch(set_new_pool({ displayed_msg: false }))
        //     dispatch(set_alert_msg({ type: 'success', content: APP.term('alert_msg_success_pool1') + ' ' + capitalizeName + ' ' + APP.term('alert_msg_success_pool_sec') + ' ' + APP.term('alert_msg_success_pool2') }));

        //     // list for labels that prevent showing sounds popup
        //     if (state.prevent_sound_popup_labels.includes(window.location.hostname)) return;

        //     dispatch(set_sounds_popup(true))
        // }


        // prevent situation where there are mismatch between colors and pool path
        // const isDemo = location.pathname.includes('demo') || currentPool?.uid?.includes('demo');
        // const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');

        // console.log(tables, 'tables..', isDemo)
        // console.log(currentPool, 'currentPool..', isDemo)

        // let activePool = tables.find(itm => itm.name === currentPool?.name);

        // if (currentPool?.route !== location.pathname) {
        //     console.log('init POOL is not synced', 'isDemo', isDemo, location.pathname)
        //     let syncedPool = tables.find(itm => itm.route === location.pathname),
        //         defaultPool = tables.find(itm => itm.route === '/trade');

        //     // prevent situations where saved pool is active despite it was changed using browser
        //     if (state.pool_routes.includes(location.pathname)) {

        //         const isDemoPathname = location.pathname.includes('demo');
        //         const tables = APP.state.get(isDemoPathname ? 'demo_tables' : 'tables');
        //         const foundPoolByPathname = tables.find(itm => itm.route === location.pathname);

        //         if (isDemoPathname) {
        //             APP.state.set('currentToken', 'demo')
        //         }

        //         console.log(isDemoPathname, 'isDemoPathname', location.pathname);
        //         console.log(foundPoolByPathname, 'foundPoolByPathname', tables);
        //         APP.state.set('active_table', foundPoolByPathname)
        //         dispatch(set_new_pool({
        //             name: foundPoolByPathname?.name,
        //             symbol_color: foundPoolByPathname?.symbol_color,
        //             uid: foundPoolByPathname?.uid,
        //             route: foundPoolByPathname?.route
        //         }));
        //     }


        //     else {
        //         console.log('outside special pathname.')
        //         // check if demo pool still exists in the pool list
        //         // if not => take the default and update 
        //         if (isDemo) {
        //             APP.state.set('currentToken', 'demo');

        //             let poolExists = tables.find(itm => itm.uid === currentPool.uid);
        //             if (poolExists) {
        //                 APP.state.set('active_table', poolExists);
        //                 console.log('DEMO pool is synced now', poolExists)
        //                 return;
        //             }
        //             else {
        //                 let defaultDemoPool = state.demo_active_table;
        //                 console.log('DEMO pool is being synced')
        //                 APP.state.set('active_table', defaultDemoPool);

        //                 dispatch(set_new_pool({
        //                     name: defaultDemoPool?.name,
        //                     symbol_color: defaultDemoPool?.symbol_color,
        //                     uid: defaultDemoPool?.uid,
        //                     route: defaultDemoPool?.route
        //                 }));
        //             }
        //         }
        //         // check if real pool still exists in the pool list
        //         // if not => take the default and update 
        //         else {
        //             APP.state.set('active_table', syncedPool || defaultPool)
        //             console.log("3-5", syncedPool, defaultPool);
        //             dispatch(set_new_pool({
        //                 name: syncedPool?.name || defaultPool?.name,
        //                 symbol_color: syncedPool?.symbol_color || defaultPool?.symbol_color,
        //                 uid: syncedPool?.uid || defaultPool?.uid,
        //                 route: syncedPool?.route || defaultPool?.route
        //             }));
        //         }
        //     }
        // }
        // else {
        //     const isDemo = currentPool?.route?.includes('demo');
        //     const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
        //     if (isDemo) APP.state.set('currentToken', 'demo');
        //     const defaultTable = tables.find(itm => itm.route === currentPool.route);
        //     APP.state.set('active_table', defaultTable)
        //     console.log('init POOL is synced', currentPool, defaultTable)
        // }


        // updating state if user was logged in user MagicAuth
        isUserConnected(dispatch, APP.magic)

        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, []);

    //first initializing of web5js
    function initWeb5(dispatch) {
        if (detectTelegramBrowser()) {
            autoSocialSfaConnect(dispatch, navigate)
        }
        else {
            autoSocialConnect(dispatch);
        }
    }


    useEffect(() => {
        async function getWalletInfo() {

            let user_email = APP.state.get('user_email'),
                isWeb5 = localStorage.getItem("wallet") === 'web5';

            if (wallet_address && web3AuthObj && !user_email && isWeb5) {
                let user = await web3AuthObj.getUserInfo();

                if (user?.email) {
                    APP.state.set('user_email', user?.email)
                }
                if (user?.profileImage) {
                    APP.state.set('customer.avatar', user?.profileImage)
                    APP.state.set('profileImage', user?.profileImage)
                }
            }
        }
        getWalletInfo();

    }, [web3AuthObj, wallet_address])
    // const [hasExecutedEffect, setHasExecutedEffect] = useState(false);

    // useEffect(() => {

    //     if (hasExecutedEffect) return;

    //     // web5 object was not recevied => do nothing 
    //     if (!web5Object) return;

    //     // safari social login
    //     // else if (login_x_safari?.login) checksocial();

    //     // auto login on refresh
    //     else if (web5Object && !APP.state.get('auto_log_in') && last_web5_connection_type) {
    //         // checksocial(last_web5_connection_type);
    //     }

    //     setHasExecutedEffect(true);
    // }, [login_x_safari?.login, APP.state.get('web5Object'), hasExecutedEffect, last_web5_connection_type, social_web3_obj?.wallet])


    //handling dynamic whitelabels entry screen
    function homePageSelector() {

        const currentUrl = window.location.href;
        const paramsString = extractParamsFromString(currentUrl);
        const hostname = window.location.hostname;
        const whitelabels = Object.values(APP.state.get('whitelabels'));
        const whiteLabelObj = whitelabels.find(item => item.url === hostname);

        if (hostname === 'game.bitfight.com') return <RedirectExternal url={`https://www.bitfight.com?${paramsString}`} />;
        if (hostname === 'cryptoclash.gg') return <RedirectExternal url={`https://info.cryptoclash.gg?${paramsString}`} />;
        if (hostname === 'bitfight.com') return <RedirectExternal url={`https://lp.bitfight.com?${paramsString}`} />;
        if ((hostname === 'cryptofights.pro') || (hostname === 'cryptofight.io') || (hostname === 'prod-latest-cryptofights.upvsdown.com')) return <NewEntryScreen_CryptoFights />;
        if (hostname === 'sharker.com') return <HomeSharker />;

        // Do not touch at the moment please, will be changed later
        if (hostname === 'bitfight.com' || hostname === 'playblocks.upvsdown.com') return <HomeBitFight />;
        // if (hostname === 'localhost') return <HomeBitFight />;

        switch (window.location.href) {

            case 'https://upvsdown.com/?ref=MjE4NzA0NTcxNjk4OTMwNTIyNzEy':
            case 'https://prod-latest.upvsdown.com/?ref=MjE4NzA0NTcxNjk4OTMwNTIyNzEy':
                return (<Home />) //New open page

            case 'https://upvsdown.com/?ref=MjE4NzMwNDQxNjk4OTMwNTM4MDgw':
            case 'https://prod-latest.upvsdown.com/?ref=MjE4NzMwNDQxNjk4OTMwNTM4MDgw':
                return (<EntryScreen />)  //Old open page

            default:
                return (<Home />)
        }
    }

    function howToPlaySelector() {

        const hostname = window.location.hostname;

        if ((hostname === 'cryptofights.pro') || (hostname === 'cryptofight.io') || (hostname === 'prod-latest-cryptofights.upvsdown.com'))
            return <HowToPlay_CryptoFights />;

        return <HowToPlay />;

    }

    function howToAffiliateSelector() {

        const hostname = window.location.hostname

        if ((hostname === 'cryptofights.pro') || (hostname === 'cryptofight.io') || (hostname === 'prod-latest-cryptofights.upvsdown.com'))
            return <HowToAffiliate_CryptoFights />;

        return <HowToAffiliate />;

    }

    function unmute_effects() {
        dispatch(set_sound_effects(true))
    }

    function unmute_voice() {
        dispatch(set_voiceover(true))
    }

    function unmute_bg() {
        dispatch(set_bg_music(true))
    }

    // useLayoutEffect(() => {
    //     if (bg_music_on) APP.state.set('temp_bg', bg_music_on);
    //     if (voiceover_on) APP.state.set('temp_voiceover', voiceover_on);
    //     if (sound_effects_on) APP.state.set('temp_sounds', sound_effects_on);
    // }, [voiceover_on, bg_music_on, sound_effects_on]);
    if (skin_loader) return;

    else return (
        <Routes>
            <>

                {/* Mini-site pages: */}
                {/* Home */}
                <Route path="/" element={homePageSelector()} />
                <Route path="/home-real" element={homePageSelector()} />
                <Route path="/home-demo" element={homePageSelector()} />
                {/* About (old default home page) */}
                <Route path="/about" element={<NewEntryScreen />} />
                {/* How to play */}
                <Route path="/how_to_play" element={howToPlaySelector()} />
                {/* Be an affiliate */}
                <Route path="/how_to_aff" element={howToAffiliateSelector()} />

                {/* Crypto Fights pages: */}
                <Route path="/cf_disclaimer" element={<CryptoFightsDisclaimer />} />
                {/* <Route path="/cf_entry_page" element={<NewEntryScreen_CryptoFights />} />
                <Route path="/cf_how_to_play" element={<HowToPlay_CryptoFights />} />
                <Route path="/cf_how_to_aff" element={<HowToAffiliate_CryptoFights />} /> */}

                {/* Routes for the pools */}
                {APP.state.get('tables').map(itm => (
                    <Route key={itm.route} path={itm.route} element={<TradePage />} />
                ))}

                {/* Routes demo pools */}
                {APP.state.get('demo_tables').map(itm => (
                    <Route key={itm.route} path={itm.route} element={<TradePage />} />
                ))}

                <Route path="/knowledge_center" element={<KnowledgeCenter />} />
                <Route path="/trade-pro" element={<TradePage />} />
                <Route path="/userprofile" element={<UserProfile />} />
                <Route path="/topup" Component={Topup} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/leaderboard_wins_paid" element={<LeaderboardWinsPaidPage />} />
                <Route path="/affiliate_leaderboard" element={<AffiliateLeaderboard />} />
                <Route path="/trade_history" element={<TradeHistoryPage />} />
                <Route path="/open_trades" element={<OpenTradesPage />} />
                {/* <Route path="/about" element={<AboutUsPage />} /> */}
                <Route path="/policy" element={<PrivacyPolicyPage />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/support" element={<Support />} /> */}
                <Route path="/share" element={<AffiliatePagesHub />} />
                <Route path="/share_report" element={<AffiliateEarningsReport />} />
                <Route path="/share_links" element={<AffiliateLinksMananger />} />
                <Route path="/partners" element={<PartnersProgram />} />

                <Route path="/sap_links" element={<SAPLinksManager />} />
                <Route path="/sap_report" element={<SAPEarningsReport />} />
                <Route path="/sap" element={<SAPTutorial />} />
                <Route path="/sap_dashboard" element={<SAPDashboard />} />

                <Route path="/weekly_jackpot" element={<WeeklyJackpot />} />
                {state.enable_monthly_jackpot && (<Route path="/monthly_jackpot" element={<MonthlyJackpot />} />)}
                <Route path="/jackpot_winners" element={<JackpotWinners />} />
                <Route path="/jackpot_monthly_winners" element={<JackpotWinnersMonthly />} />
                <Route path="/jackpot_history" element={<JackpotHistory />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/p2p_success" element={<Success />} />
                <Route path="/utorg_success" element={<UtorgSuccess />} />
                <Route path="/p2p_failure" element={<Failure />} />
                <Route path="/contact_us" element={<ContactUs />} />
                <Route path="/partner_program" element={<PartnerProgram />} />
                {/* <Route path="/high_rollers" element={<HighRollers />} /> */}
                <Route path="/win_ratio" element={<WinRatio />} />
                <Route path="/crypto_topup" element={<CryptoTopup />} />
                <Route path="/cash_topup" element={<CashTopup />} />
                {/* <Route path="/highroller_history" element={<History />} /> */}
                {/* <Route path="/winratio_history" element={<HistoryRatio />} /> */}
                <Route path="/jackpot_monthly_history" element={<MonthlyJackpotHistory />} />

            </>
        </Routes>

    );

}

export default React.memo(Root, ({ prev, next }) => prev === next);