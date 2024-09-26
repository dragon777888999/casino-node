import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameActionsProvider, GameProvider, WalletProvider } from '..';
import AlertMsg from '../../../comp/modals/AlertMsg';
import { set_app_lang, set_chosen_asset, set_demo_mode, set_iframe_popup, set_new_pool, set_valid_browser } from '../../../REDUX/actions/main.actions';
import browserDetect from '../../browserDetect';
import { languages } from '../../languages';
import ipJson from '../../../API/ipJson';
import state from '../../../state';
import BubblesTutorial from '../../../pages/BubblesTutorial';
import { localLang } from '../../languages.locales';
import jackpot from '../../../API/jackpot';
import P2pPopup from '../../../pages/TradePage/P2pPopup';
import PrivateKeyPopup from '../../../pages/TradePage/PrivateKeyPopup';
import TopupModal from '../../../pages/TradePage/TopupModal';
import Iframe from '../../../pages/p2p/Iframe';
import RedirectBrowserPopup from '../../../pages/UtilsPopups/RedirectBrowserPopup';
import routesAPI from '../../../API/routes';
import useIntercom from '../../../hooks/useIntercom';
import BwpPopup from '../../../pages/TradePage/BwpPopup';
import useAppState from '../../../hooks/useAppState';
import SkinLoader from '../../../pages/skinLoaders/SkinLoader';
import APP from '../../../app';
import loadSkin from "../../../utils/loadSkinHelper";
import Bridge from '../../../pages/topup/bridge/Bridge';
import RevBridge from '../../../pages/topup/revBridge/RevBridge';
import MetaTags from '../../../pages/MetaTags';
import useWebSocket from '../../../hooks/useWebSocket';
import { browserName } from 'react-device-detect';
import { useLocation } from 'react-router';
import InfoPaybis from '../../../pages/topup/popups/InfoPaybis';
import isWallet from '../../isWallet';
import PixPopup from '../../../pages/topup/pixTopup/PixPopup';
import EfiPayPopup from '../../../pages/topup/EfiPayTopup/EfiPayTopup';
import app from '../../../app';
import Publisher from '../../../publisher';
import { deep_copy } from '../../object';
import pools from '../../../API/pools';
import GameController from '../../../controllers/Game';
import Wallet from '../wallets/Wallet';
import CustomerModel from '../../../models/Customer';
import Config from '../../../config';
import renameKeys from '../../renameKeys';
import { getRefFromUrlParm } from '../../affiliate';
import parseIframeStringWithDOM from '../../parseStringIntoDom';

// Check if current url contains "sap" param
const checkSapClickEventToBackend = () => {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of searchParams.entries())
    if (key.toLowerCase().includes('sap')) return true;
  return false;
};

// Check if current url contains any params
const hasAnyParam = () => {
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams) return true;
  return false;
}

// Notify backend that a url with "sap" param was visited
const sendSapClickEventToBackend = async (countryCode) => {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  const body = JSON.stringify({ origin: window.location.href, countryCode: countryCode });
  const settings = { method: 'POST', mode: 'cors', headers: headers, body: body };
  try { await fetch(state.sap_clicks_url, settings) }
  catch (error) {/* leave empty! */ };
};

// Check if current url contains at least one "subid" param
const checkClickEventToBackend = () => {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of searchParams.entries())
    if (key.toLowerCase().includes('subid')) return true;
  return false;
};

// Notify backend that a url with at least
// one "subid" param was visited
const sendClickEventToBackend = async () => {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  const body = JSON.stringify({ origin: window.location.href });
  const settings = { method: 'POST', mode: 'cors', headers: headers, body: body };
  try { await fetch(state.subid_event_url, settings) }
  catch (error) {/* leave empty! */ };
};

/**
 *
 * @module Components
 */

/**
 *
 * @typedef {Object} UpVsDownParams
 * @property {string} gameContractAddress - Address of the game smart contract
 * @property {string} network - LOCAL, TESTNET, MAINNET
 * @property {string} wsUrl - Address of the network websockets provider
 */

/**
 *
 * @param {UpVsDownParams} param0
 * @returns {React.Component}
 */

window.APP = app;
APP.state = new Publisher(deep_copy(state));

APP.config = new Config();


async function getPools() {
  const response = await pools.getPoolsConfig(); // Replace with your API URL

  if (response) {

    function renameKeysInArray(arr, keyMap) {
      return arr.map((obj, idx) => {
        const newObj = renameKeys(obj, keyMap);
        newObj.id = idx + 1;
        return newObj;
      });
    }

    const keyMapping = {
      poolId: "pool_id",
      poolsGroup: "asset",
      contractAddress: "contract_adderess",
      roundStateChannel: "round_streamer_url",
      ratesPublisherType: "round_history_streamer",
      feePercentageJackpot: "jackpot_fee_percentage",
      feePercentagePlatform: "fee_percentage",
      poolRoundHistory: "pool_history_api",
    };

    if (response.data._data?.REAL) {
      APP.state.set('tables', renameKeysInArray(response.data._data.REAL, keyMapping));
      APP.state.set('active_table', renameKeys(response.data._data.REAL.find(itm => itm?.selected), keyMapping));
    }
    if (response.data._data?.DEMO) {
      APP.state.set('demo_tables', renameKeysInArray(response.data._data.DEMO, keyMapping));
      APP.state.set('demo_active_table', renameKeys(response.data._data.DEMO.find(itm => itm?.selected), keyMapping));
    }
    else {
      APP.state.set('demo_tables', []);
      APP.state.set('demo_active_table', {});
    }

    APP.play_for_fun = false;

    APP.controller = new GameController();
    APP.wallets = new Wallet(APP.state.get('default_game_network'))
    APP.customer = new CustomerModel(1, {}, []);

    APP.controller.init();
    APP.customer.init();

    let ref = getRefFromUrlParm();

    if (ref) localStorage.setItem("ref", ref);
  }
}

await getPools();

export function UpVsDown({ gameContractAddress, network, wsUrl, children }) {

  const valid_browser = useSelector(state => state.mainReducer.valid_browser);
  const redirect_browser_popup = useSelector(state => state.mainReducer.redirect_browser_popup);
  const { app_lang } = useSelector(state => state.mainRememberReducer);
  const alert_msg = useSelector(state => state.mainReducer.alert_msg);
  const bubbles_tutorial = useSelector(state => state.mainRememberReducer.bubbles_tutorial);
  const demoState = useSelector(state => state.mainRememberReducer.demo_mode);
  const currentPool = useSelector(state => state.mainRememberReducer.currentPool);
  const iframe_src = useSelector(state => state.mainReducer.iframe_src);
  const loader = useSelector(state => state.mainReducer.loader);
  const dispatch = useDispatch();
  const paybis_mobile_url = useSelector(state => state.mainReducer.paybis_info_popup?.paybis_mobile_url);
  // const _location = useLocation();
  const { efi_pay_popup, pix_popup, p2p_popup, private_key_popup, topup_wallet_popup, bwp_popup, bridge_popup, rev_bridge_popup, paybis_info_popup } = useSelector(state => state.mainReducer);
  const bubbles_url_path = window?.location?.pathname;
  const preventBubblesParams = ['/'];
  const skin_loader = useAppState('skin_loader');
  const skin_idx = useAppState('skin_idx');
  const current_game_address = useAppState('current_game_address');
  const { initializeIntercom } = useIntercom();
  const { disconnect, message, error } = useWebSocket(/* isWallet( */state.jackpot_balances_ws/* ) */);
  const [poolSynced, setPoolSync] = useState(false);
  const external_campaign_load = useAppState('external_campaign_load');

  // Update platform language according to customer
  // country code default lang should be 'en'
  const updatePlatformLang = async () => {

    // https://btcbattles.com/
    const res = await ipJson.getIpApi();

    const language = window.navigator.userLanguage || window.navigator.language;

    // If the ipapi service returns error set default country code to UK
    const customerCountryCode = (res.status === 200) ? res?.data?.country_code : 'UK';

    // BTC Battles => take browser lang and not IP lang
    const customerLangPerCountryCode = (state.platform_lang_by_browser_lang.includes(window.location.hostname) && language) ? localLang(language) : languages(customerCountryCode);

    const platformLang = state.langCfg.find(langCode => langCode.code.toLowerCase() === customerLangPerCountryCode?.toLowerCase());
    const defLang = state.langCfg.find(langCode => langCode.code === 'en');
    const selectedLang = platformLang ? platformLang : defLang;

    APP.state.set('customer.detectedCountry', customerCountryCode);

    // Only after country code has been set
    if (hasAnyParam()) {
      sendSapClickEventToBackend(customerCountryCode);
    }

    if (app_lang?.changed_by_user) return;

    dispatch(set_app_lang(selectedLang))
    APP.state.set('customer.flag', selectedLang?.src);
    APP.state.set('customer.lang', { code: selectedLang?.code, lang: selectedLang?.lang });

  };

  useLayoutEffect(() => {
    APP.state.set('skin_loader', true)
  }, [])

  useEffect(() => {
    if (state.intercom_domains_list.includes(window.location.hostname)) {
      initializeIntercom();
    }

    APP.state.set('dispatcher', dispatch)

    getRoutesList();
    jackpotInitialBalance();
    updatePlatformLang();

    document.head.innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />';

    return () => disconnect();

  }, []);

  // action for closing iframe popup
  const close_iframe_comp = () => {
    dispatch(set_iframe_popup(null))
  }

  // get jackpot initial state
  const jackpotInitialBalance = async (isActiveDemo) => {

    let res = await jackpot.getJackpotBalance(),
      balanceChannel = res?.data?.channel,
      amt,
      { balances } = res?.data;

    if (location.pathname.includes('demo') || isActiveDemo) {
      amt = balances.find(itm => itm.scope === 'total_demo')?.amount;
    }
    else {
      amt = balances.find(itm => itm.scope === 'total')?.amount;
    }

    APP.state.set('jackpot_balance', { amt: amt })

    if (!balanceChannel) return;

    // APP.state.set('jackpotBalanceChannel', res?.data?.channel)
  };

  useEffect(() => {

    if (!message) return;

    // Get the right scope of Jackpot balance object
    const isTradingRoute = state.pool_routes.includes(location.pathname);
    const isDemoRoute = location.pathname.includes('-demo');
    let scope;

    if (isTradingRoute) scope = isDemoRoute
      ? 'total_demo'
      : 'total';

    else scope = demoState?.active
      ? 'total_demo'
      : 'total';

    const parsed = JSON.parse(message);
    const totalObj = parsed?.find(itm => itm.scope === scope);

    APP.state.set('jackpot_balance', {
      amt: parseFloat(totalObj?.amount)
    });

  }, [message]);

  // get ticket worth
  async function getTicketWorth(reqUrl) {

    const res = await jackpot.getWeeklyData(reqUrl);

    if (res?.data) {
      APP.state.set('ticketWorth', Number(res.data?.ticketWorth))
    }

  }

  // get all routes list for super affiliate program
  async function getRoutesList() {
    let res = await routesAPI.getList();
    if (res?.data) {
      APP.state.set('routesList', res.data._data)
    }
  }

  // load skins by idx
  const loadSkinCss = (skin_idx) => {
    if (!skin_idx) return;
    // setLoadedSkin(true);
    loadSkin(skin_idx)
      .then(() => {
        // CSS files have been loaded
        // console.log("CSS", skin_idx, "files loaded");
        setTimeout(() => {
          APP.state.unset("skin_loader");
        }, 1000);
      })
      .catch((error) => {
        APP.state.unset("skin_loader");
        // Error occurred while loading CSS files
        console.error("Error loading CSS files:", error);
      });
  };

  useEffect(() => {
    console.log(currentPool, 'current pool')
    let defaultPool,
      isDemo = location.pathname?.includes('demo'),
      tables = APP.state.get(isDemo ? 'demo_tables' : 'tables'),

      // checking if pool is NOT disabled
      poolExists = APP.state.get(isDemo ? 'demo_tables' : 'tables').find(itm => itm.uid == currentPool.uid),

      // find saved pool in tables list
      poolFromTables = APP.state.get(isDemo ? 'demo_tables' : 'tables').find(itm => itm.pool_id === currentPool.pool_id),

      // check in tables that current pool route is same as set in tables cfg
      validPool = (currentPool?.route === poolFromTables?.route) && poolFromTables;

    console.log(poolFromTables, 'old', validPool)

    if (poolSynced) return;
    else {

      // make sure pool is the right one that has to be 
      // (** ON TRADE PAGE **)
      if (state.pool_routes.includes(location.pathname) && poolExists && validPool) {
        console.log(1)
        if (location.pathname !== currentPool.route) {
          console.log(2)
          defaultPool = tables.find(itm => itm.route === location.pathname);
        }
        else {
          console.log(3)
          const newSyncedPool = tables.find(itm => itm.uid === currentPool.uid);

          // console.log(newSyncedPool, 'default 2', currentPool)

          defaultPool = newSyncedPool;
        }
      }
      else {
        // saved pool && not trade page && pool exists
        if (currentPool?.uid && poolExists && validPool) {
          console.log(4)
          defaultPool = currentPool;
          // console.log('There is UID', currentPool)
        }
        else {
          console.log(5)
          // no saved pool && not trade page
          defaultPool = APP.state.get(isDemo ? 'demo_tables' : 'tables').find(itm => itm.selected);

        }
      }
      // setContractAddress(defaultPool);

      let currentAssets = APP.state.get('assets'),
        currentAsset = currentAssets.find(itm => itm.remote_id === defaultPool?.asset);

      if (currentAsset) {
        APP.state.set("asset", currentAsset || state.asset);
        dispatch(set_chosen_asset(currentAsset || state.asset));
      }

      APP.state.set('current_game_address', defaultPool?.contract_adderess);
      APP.controller.set_table(defaultPool, defaultPool.contract_adderess);
      // console.log('defaultPool: is ', defaultPool)
      APP.state.set('switched_pool', defaultPool?.pool_id);
      APP.state.set('currentPoolId', defaultPool?.uid);
      APP.state.set('currentToken', defaultPool?.uid?.includes('demo') ? 'demo' : 'real');
      // APP.state.set('pool.poolId', defaultPool?.pool_id)

      if (currentPool?.uid !== defaultPool?.uid) {
        dispatch(
          set_new_pool({
            displayed_msg: true,
            name: defaultPool?.name,
            pool_id: defaultPool?.pool_id,
            uid: defaultPool?.uid,
            route: defaultPool?.route
          }));
      }
      dispatch(set_demo_mode({ active: defaultPool?.uid.includes('demo') ? true : false }))
      setPoolSync(true);

    }
  }, [currentPool?.uid])

  useEffect(() => {

    // Get the right Weekly Jackpot URL
    const isTradingRoute = state.pool_routes.includes(location.pathname);
    const isDemoRoute = location.pathname.includes('-demo');
    let reqUrl;

    if (isTradingRoute) reqUrl = isDemoRoute
      ? state.weekly_jackpot_demo_url
      : state.weekly_jackpot_url;

    else reqUrl = demoState?.active
      ? state.weekly_jackpot_demo_url
      : state.weekly_jackpot_url;

    getTicketWorth(reqUrl);
    // setContractAddress(currentPool);

    // initial refetch data once switched from demo <--> live
    jackpotInitialBalance(demoState?.active);

    let interval,
      coinbaseAndroid = browserName.toLowerCase() === 'chrome webview';

    if (coinbaseAndroid) {
      jackpotInitialBalance(demoState?.active);
      interval = setInterval(() => {
        jackpotInitialBalance(demoState?.active);
      }, 1000 * 60 * 2);
    }

    return () => {
      if (coinbaseAndroid) {
        clearInterval(interval);
      }
    }

  }, [demoState?.active])

  useEffect(() => {
    const url_path = window?.location?.pathname;
    if (!state.pool_routes.includes(url_path)
      && browserDetect().toLocaleLowerCase() !== 'chrome')
      dispatch(set_valid_browser(false));
  }, [valid_browser]);

  useEffect(() => {
    let isInitialized = (typeof skin_idx !== 'undefined');
    if (isInitialized && (skin_idx == 0)) {
      APP.state.unset('skin_loader')
      return;
    }
    loadSkinCss(skin_idx)
  }, [skin_loader, skin_idx])

  if (!poolSynced || !current_game_address) {
    return (
      <div className="loader_wrap"><img src="/media/images/loaders/loader.gif" /></div>
    )
  }

  else
    return (

      <WalletProvider network={network}>
        {(!preventBubblesParams.includes(bubbles_url_path)) && bubbles_tutorial?.active && !skin_loader && !loader && (<BubblesTutorial />)}
        {loader && (<div className="loader_wrap"><img src="/media/images/loaders/loader.gif" /></div>)}
        {alert_msg?.type && !skin_loader ? <AlertMsg type={alert_msg?.type} content={alert_msg?.content} preventTimeout={alert_msg?.preventTimeout} /> : null}
        {iframe_src?.src && (<Iframe onClose={close_iframe_comp} />)}
        {redirect_browser_popup && (<RedirectBrowserPopup />)}
        {skin_loader && <SkinLoader />}
        {rev_bridge_popup && <RevBridge />}
        {paybis_info_popup?.is_active && <InfoPaybis />}

        {p2p_popup && (<P2pPopup />)}
        {bwp_popup?.active && (<BwpPopup />)}
        {private_key_popup && (<PrivateKeyPopup />)}
        {bridge_popup && (<Bridge />)}
        {pix_popup && <PixPopup />}
        {efi_pay_popup && <EfiPayPopup />}

        {paybis_mobile_url && (
          <div className="paybis_iframe">
            <iframe
              id="paybisIframe"
              title="Paybis Widget"
              src={paybis_mobile_url}
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
        )}

        {/* <MetaTags /> */}
        {external_campaign_load ?
          <iframe
            style={{ display: 'none' }}
            src={parseIframeStringWithDOM(external_campaign_load).src}
            sandbox={parseIframeStringWithDOM(external_campaign_load).sandbox}
            title="Hidden Iframe"
            width="0"
            height="0"
          />
          : null}

        <TopupModal openModal={topup_wallet_popup} />

        {/* {valid_browser ? null : <ChromePopup />} */}

        <GameProvider wsNetworkAddress={wsUrl} gameAddress={gameContractAddress} currentPool={currentPool}>
          {/* <GameActionsProvider gameAddress={gameContractAddress}> */}
          {children}
          {/* </GameActionsProvider> */}
        </GameProvider>

      </WalletProvider>

    );
};