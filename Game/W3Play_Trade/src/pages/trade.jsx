import React, { useState, useEffect, useContext, useRef, useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import { set_alert_msg, set_betting_tutorial, set_bubbles_tutorial, set_chosen_asset, set_connect_wallet_popup, set_demo_mode, set_full_screen, set_iframe_popup, set_new_pool, set_pools_popup, set_sounds_popup, set_topup_close_btn, set_topup_wallet_popup, set_tutorial, set_utorg_popup } from '../REDUX/actions/main.actions';
import { GameContext, PoolProvider, PoolContext, WalletContext } from '../utils/game';

//Components
import TradeHeader from './TradePage/TradeHeader';
import PoolSide from './TradePage/PoolSide';
import PositionTimer from './TradePage/PositionTimer';
import GraphArea from './TradePage/GraphArea';
import InvestSelect from './TradePage/InvestSelect';
import MarketStats from './TradePage/MarketStats';
import RoundPhaseController from './TradePage/RoundPhaseController';
import AppChat from './TradePage/AppChat';
import ChangeAvatar from './ChangeAvatar';
import PoolsSelect from '../pages/TradePage/PoolsSelect';
import AssetSelect from '../pages/TradePage/AssetSelect';
import BotRadarPopupUI from '../pages/TradePage/BotRadarPopupUI';
import APP from '../app';
import useAppState from '../hooks/useAppState';
import { setFullScreen } from '../utils/fullScreen';
import SoundsPopup from '../comp/sounds_popup';
import useDimension from '../hooks/useDimension';
import PoolsReturn from './TradePage/PoolsReturn';
import HeaderPoolsDetails from './TradePage/HeaderPoolsDetails';
import TermsAndConditions from '../comp/modals/Terms';
import Tutorial from './Tutorial';
import BubbleTutorial from './TradePage/BubbleTutorial';
import MagicAuth from './TradePage/MagicAuth';
import socialAuthenticate from '../utils/login/authenticate';
import getRedirectRes from '../utils/login/getRedirectedRes';
import ConnectWalletModal from './TradePage/ConnectWalletModal';
import { useNavigate } from 'react-router-dom';
import state from '../state';
import parsedErrHandler from '../utils/parsedErrHandler';
import ClaimCoinsPopup from './TradePage/demo/ClaimCoinsPopup';
import DemoHeader from '../comp/demo/DemoHeader';
import HelmetManager from '../comp/HelmetManager';
import ErrorBoundary from '../comp/ErrorBoundary';
// import UtorgPopup from './TradePage/UtorgPopup';
// import removeDebridgeWidgetScript from '../utils/topup/closeWidget.deswap';
// import PrivateKeyPopup from './TradePage/PrivateKeyPopup';

const Game = React.memo(() => {

	const [activeChangeAvt, setChangeAvt] = useState(false);
	const dispatch = useDispatch();
	const fullScreen = useSelector(state => state.mainRememberReducer.full_screen);
	const active_tutorial = useSelector(state => state.mainRememberReducer.seen_tutorial);
	const magicAuth = useSelector(state => state.mainReducer.magic_auth);
	const demo_mode = useSelector(state => state.mainRememberReducer.demo_mode);
	const connected_user_magic_auth = useSelector(state => state.mainRememberReducer.connected_user_magic_auth);
	const completed_betting_tutorial = useSelector(state => state.mainRememberReducer.completed_betting_tutorial);
	const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
	const walletAdress = useAppState('wallet_address');
	const { pool_id } = useAppState('active_table');
	const user_tutorial_gesture = useAppState('user_betting_tutorial_gesture');
	const { onBetWinningsSent } = useContext(PoolContext);
	const { account, updateBalance, wallet, authenticate } = useContext(WalletContext);
	const [marketHeight, setMarketHeight] = useState(null);
	const marketRef = useRef();

	//
	const demo_popup_seen = useSelector(state => state.mainRememberReducer.demo_popup_seen);
	useEffect(() => {
		// Show popup if the user is not logged in and hasn't seen the popup before
		if (!walletAdress && !demo_popup_seen && (demo_mode?.active || location.pathname.includes('demo'))) {
			dispatch(set_demo_mode({ popup: true }));
		}
	}, [walletAdress, demo_popup_seen, demo_mode?.active, location.pathname]);
	//

	onBetWinningsSent(({ poolId, sender, betAmount, winningsAmount }) => {
		if (!account || sender.toLowerCase() !== account.toLowerCase()) return;
		console.log(account.toLowerCase(), sender.toLowerCase())
		console.log('update balance')
		updateBalance();
	});

	const closeTutorial = () => {
		// setTutorial(false);

		dispatch(set_connect_wallet_popup(true));
		dispatch(set_tutorial(false));
		// prevent setting full screen if already was opened & closed
		if (!fullScreen /*&& APP.state.get('wallet_address')*/) {
			setFullScreen();
			dispatch(set_full_screen(true));
		}
	};

	// onRoundEnded(({ poolId, timestamp, startPrice, endPrice }) => {
	// 	if (poolId !== currentPool) return;
	// 	setResult(relation_cases(endPrice, startPrice, 'up', 'tie', 'down'));
	// 	setTimeout(() => setResult('none'), 2000)
	// 	updateBalance();
	// })

	// useEffect(() => {
	// 	// dispatch(set_tutorial(false)) // tst
	// 	let disabledTutorial = tutorialMode();
	// 	if (disabledTutorial) {
	// 		dispatch(set_tutorial(true))
	// 	}
	// }, []);

	useEffect(() => {
		// APP.API.setCurrentPool = setCurrentPool(pool_id);
		if (!walletAdress) return;
		updateBalance();
	}, [pool_id]);

	// Attaches resize observer to "market" div, in order to update
	// its inner graph size and make it responsive in mobile portrait
	useEffect(() => {
		// initProvider()
		// if(document.body.clientWidth > 480) return;

		const observerCallback = () => {
			setMarketHeight(marketRef.current.offsetHeight);
		};
		const resizeObserver = new ResizeObserver(observerCallback);
		resizeObserver.observe(marketRef.current);

		return () => {
			resizeObserver.disconnect();
		}
	}, []);

	const [isPositionTimerReadyToLoad, setPositionTimerReadyToLoad] = useState(false);

	useEffect(() => {
		//console.log('XX trade::use effect');
		if (APP.state.get('current_round').start_timestamp != 0) { //check if the data is loaded from rounds streamer
			// console.log('XX trade::use effect setPositionTimerReadyToLoad = true');
			setPositionTimerReadyToLoad(true);
		}
	}, [APP.state.get('current_round')]);


	let tradePageLoaded = false;
	useEffect(() => {
		APP.controller.subscribeToRates(); //Subscribe to rates from trade page
		tradePageLoaded = true;
	}, [tradePageLoaded]);

	return (
		<div className="page trade_page">

			<HelmetManager
				title="Trading Arena"
				description="Engage in real-time Bitcoin price predictions, challenge fellow Players, and earn Crypto. Benefit from cutting-edge DeFi tools & seamless Web3 integration."
				keywords="Tradingview ,Bitcoin trading strategies ,Bitcoin price prediction trading, trading bots, crypto trading, bitcoin trading, earn crypto, earn money online "
				canonical="/trade"
			/>

			<RoundPhaseController />
			{magicAuth ? <MagicAuth /> : null}
			{connect_wallet_popup &&
				(<ConnectWalletModal
					wallet={wallet}
					authenticate={authenticate} />)}

			{active_tutorial ? <Tutorial onPress={() => closeTutorial(fullScreen)} /> : null}

			{/* betting tutorial (after login) */}
			{((completed_betting_tutorial === 'active') && walletAdress) || user_tutorial_gesture ? <BubbleTutorial /> : null}

			<DemoHeader pathName="/trade" />

			<div className={"trade_page_content " + (demo_mode?.active ? 'demo' : '')}>
				<TradeHeader onOpenAvt={() => setChangeAvt(true)} />
				<div className="contents">
					<HeaderPoolsDetails />
					<PoolSide dir="up" disabled={true} />
					<div className="trade_center">
						<div className="market" ref={marketRef}>
							<MarketStats />
							{isPositionTimerReadyToLoad && ( <>
								<ErrorBoundary>
									<PositionTimer />
								</ErrorBoundary>
							</>)}
							<ErrorBoundary>
								<GraphArea marketHeight={marketHeight} />
							</ErrorBoundary>
						</div>
						<PoolsReturn />
						<div className="trade_btns_mobile">
							<PoolSide dir="up" isMobile={true} />
							<PoolSide dir="down" isMobile={true} />
						</div>
						<InvestSelect />
					</div>
					<PoolSide dir="down" disabled={true} />
				</div>
				{demo_mode?.popup && (demo_mode?.active || location.pathname.includes('demo')) && (
					walletAdress ? (
						walletAdress === demo_mode?.claim_popup_wallet_address && <ClaimCoinsPopup isLoggedIn={true} />
					) : (
						<ClaimCoinsPopup isLoggedIn={false} />
					)
				)}
			</div>
			{activeChangeAvt ? <ChangeAvatar onClose={() => setChangeAvt(false)} /> : null}
		</div>
	);

});



function TradePage() {

	const completed_tutorial = useSelector(state => state.mainReducer.completed_tutorial);

	const { pools_popup } = useSelector(state => state.mainReducer);
	const { asset_popup } = useSelector(state => state.mainReducer);

	const terms_popup = useSelector(state => state.mainRememberReducer.terms_popup);
	const lastSavedPool = useSelector(state => state.mainRememberReducer.currentPool);
	const bubbles_tutorial = useSelector(state => state.mainRememberReducer.bubbles_tutorial);
	const success_wallet_connect = useAppState('success_wallet_connect');
	const contract_signed_up = useAppState('contract_signed_up');
	const contract_signed_down = useAppState('contract_signed_down');
	const activate_sounds_popup = useAppState('activate_sounds_popup');
	const bet_failed = useAppState('round_closing_bet_fail');
	const global_bet_failed = useAppState('global_bet_failed');
	const bet_error_msg = useAppState('bet_error_msg');
	const nav_to_topup = useAppState('nav_to_topup');
	const isMobilePortrait = useDimension();
	const { gameClient } = useContext(GameContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const enabledSoundsPopup = useSelector(state => state.mainRememberReducer.sounds_popup);
	const bot_radar_platform = useSelector(state => state.tradeReducer.bot_radar_platform);
	const completed_betting_tutorial = useSelector(state => state.mainRememberReducer.completed_betting_tutorial);
	const firstLoad = useSelector(state => state.mainReducer.first_load);

	const isDemo = lastSavedPool?.uid?.includes('demo');
	const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
	const currentPool = tables.find(pool => pool.uid === lastSavedPool?.uid);
	const currentPoolId = currentPool?.uid;

	// const [skinLoaded, setLoadedSkin] = useState(false);

	// const {bg_music_on, sound_effects_on, voiceover_on} = useSelector(state => state.mainRememberReducer);
	// const fullScreen = useSelector(state => state.mainRememberReducer.full_screen);

	const get_game_fee = async (gameClient) => {
		var fee = await gameClient.getFeePercentage();
		var jackpotFee = await gameClient.getFeeJackpotPercentage();

		APP.state.set('game_fee_percent', fee); 				/* Fee */
		APP.state.set('game_jackpot_fee_percent', jackpotFee);  /* Jackpot Fee */
		//APP.state.set('game_fee_percent', 0) //disable for now
	}

	// Set asset based on URL when the page loads
	useEffect(() => {
		const setAssetBasedOnURL = () => {
			const currentPool = tables.find(pool => pool.route === location.pathname);
			if (currentPool) {
				const assetName = currentPool.name.replace(/^60-/, "");
				const matchedAsset = APP.state.get("assets").find(asset => asset.id === assetName);
				if (matchedAsset) {
					APP.state.set("asset", matchedAsset);
					dispatch(set_chosen_asset(matchedAsset));
					APP.controller.set_asset(matchedAsset);
				}
			}
		};

		setAssetBasedOnURL();

		// Listen to popstate events to handle browser navigation
		const handlePopState = () => {
			setAssetBasedOnURL();
		};
		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [location.pathname, tables, dispatch]);
	  

	useEffect(() => {
		if (gameClient) {

			gameClient.onGameStopped && gameClient.onGameStopped(({ reason }) => {
				console.log('Game has been stopped: ' + reason)
			})
			gameClient.onGameStarted && gameClient.onGameStarted(() => {
				console.log('Game has been restarted')
			})
			get_game_fee(gameClient)
			// APP.API.initialize()

		}
	}, [gameClient]);

	useEffect(() => {

		// keyboard controlls
		let keydown = e => {
			let element = false;
			switch (e.keyCode) {
				case 38: // up: trade up
					element = document.querySelector(".trade_page .pool_side.up .trade_btn");
					element.click();
					break;
				case 40: // down: trade down
					element = document.querySelector(".trade_page .pool_side.down .trade_btn");
					element.click();
					break;
				case 37: // left: invest less
					element = document.querySelector(".trade_page .invest_select .step_btn.less");
					element.click();
					break;
				case 39: // right: invest more
					element = document.querySelector(".trade_page .invest_select .step_btn.more");
					element.click();
					break;
			}
		};

		// event for keyboard controlls
		document.addEventListener('keydown', keydown);

		// clean nav to toptop page - taken trade with insufficient gas fee
		APP.state.unset('nav_to_topup')

		return () => {
			dispatch(set_sounds_popup(false))
			// event cleanup for keyboard controlls
			document.removeEventListener('keydown', keydown);
			APP.state.set('menu_open', false);
			APP.state.unset('did_round_end_once');

			//stop playing sounds
			// handleSounds('stop')

			// Unsubscribe from all streamers on component unmount
			APP.controller.unsubscribeToRatesNchan();
		}
	}, []);

	useEffect(() => {
		// let portrait = window.innerWidth < window.innerHeight;
		if (state.disable_auto_tutorial.includes(window.location.hostname) && !APP.state.get('menu_tutorial')) {
			return;
		}
		APP.state.unset('menu_tutorial')

		// unique sounds popup after first time pools selection (after login) and finished betting tutorial
		if ((activate_sounds_popup == 2) && completed_betting_tutorial) {

			// list for labels that prevent showing sounds popup
			if (state.prevent_sound_popup_labels.includes(window.location.hostname)) return;

			dispatch(set_sounds_popup(true));
		}

		if (!bubbles_tutorial?.active && !bubbles_tutorial?.seen) {
			dispatch(set_bubbles_tutorial({ active: true, seen: false }));
		}

	}, [bubbles_tutorial, completed_tutorial, activate_sounds_popup]);

	useEffect(() => {
		if (success_wallet_connect) {
			dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_connect' }));
			// Dispatch the sounds popup here after successful connection
			dispatch(set_sounds_popup(true));
			// make betting tutorial only once + prevent label that dont want the auto tutorial (they will use it using tutorial menu btn)
			if (completed_betting_tutorial === 'inactive' && !state.disable_auto_tutorial.includes(window.location.hostname)) {
				dispatch(set_betting_tutorial('active'))
			}

			APP.state.unset("success_wallet_connect", false);
		}
	}, [success_wallet_connect]);

	useLayoutEffect(() => {
		if (contract_signed_up || contract_signed_down) {

			dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_signed' }));
			APP.customer.update_balance();
		}
	}, [contract_signed_up, contract_signed_down]);

	useEffect(() => {
		if (bet_failed) {
			APP.state.unset('round_closing_bet_fail');
		}
	}, [bet_failed]);

	useEffect(() => {
		if (bet_failed) {
			dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_failed_bet' }));
		}
		let timeout = setTimeout(() => {
			APP.state.unset('global_bet_failed');
		}, 4000);

		return () => clearTimeout(timeout)

	}, [global_bet_failed]);


	// reveived bet err msg (catch in WalletContract.js)
	// will be seen as top alert red msg
	useEffect(() => {
		if (bet_error_msg) {
			parsedErrHandler(dispatch, bet_error_msg)
		}
	}, [bet_error_msg])

	useEffect(() => {
		if (nav_to_topup?.active && !nav_to_topup.loaded) {
			navigate('/topup');
			APP.state.set('nav_to_topup', { loaded: true, active: true })
		}
	}, [nav_to_topup?.active]);

	// sync for pools 
	// (demo/real pools based on pathname)
	// useEffect(() => {
	// 	if (!lastSavedPool?.uid || (lastSavedPool?.uid !== currentPool?.uid)) {
	// 		dispatch(set_new_pool(
	// 			{
	// 				displayed_msg: true,
	// 				name: currentPool.name,
	// 				symbol_color: currentPool.color,
	// 				uid: currentPool?.uid,
	// 				route: currentPool?.route
	// 			}));
	// 	}
	// }, [currentPool])


	return (
		<>

			{terms_popup ? <TermsAndConditions /> : null}
			{pools_popup && (<PoolsSelect />)}
			{asset_popup && (<AssetSelect />)}
			{bot_radar_platform && (<BotRadarPopupUI />)}
			{/* {skinLoaded && <link rel="stylesheet" href="./path/to/your.css" />} */}

			{/* <TopupModal
				openModal={topup_wallet_popup || isWalletTopupModalOpen}
				closeModal={setIsWalletTopupModalOpen}
				send={props.send}></TopupModal> */}

			{/* {p2p_popup && (<P2pPopup />)} */}
			{/* {private_key_popup && (<PrivateKeyPopup />)} */}
			{/* {utorg_popup && (<UtorgPopup />)} */}

			<PoolProvider defaultPoolId={currentPoolId}>
				<Game />
			</PoolProvider>

			{APP.state.get('wallet_address') && !isMobilePortrait && <AppChat />}
			{!firstLoad && enabledSoundsPopup && <SoundsPopup />}

		</>
	);

};

export default React.memo(TradePage);