import React, { useEffect, useRef } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserBalance from './user_balance'
import useAppState from '../hooks/useAppState'
import APP from './../app';
import '../styles/pages/tradePage/menu.css';
// import { set_sound } from '../REDUX/actions/main.actions';
// import { set_audio } from '../REDUX/actions/main.actions';
import {
	set_affiliate_tutorial, set_alert_msg, set_app_lang, set_bg_music, set_bubbles_tutorial,
	set_connect_wallet_popup, set_demo_mode, set_initial_query_params, set_last_sap_tutorial_slide, set_loader, set_polygon_details,
	set_safari_web5_login, set_sound_effects, set_user_sec, set_voiceover, set_web3_social_obj, set_web_connection_type
} from '../REDUX/actions/main.actions';
// import { browserName } from 'react-device-detect';
import state from '../state';
import logoCfg from '../utils/logoCfg';
import { sleep } from '../utils/async';
import Socials from '../pages/EntryScreens/Socials';
import Wallet from '../utils/game/wallets/Wallet';
import ga4Event from '../utils/ga4.event';
import poolSwitch from '../utils/poolSwitcher';
import GameModeSwitch from './demo/GameModeSwitch';

const isUpVsDownDomain = ([/*'localhost', */'upvsdown.com', 'integration-app2.upvsdown.com', 'prod-latest.upvsdown.com'].includes(window.location.hostname));
const isPlaynanceDomain = (['localhost', 'upvsdown.io', 'turbobit.io', 'moonxp.com', 'callvsput.io', 'playblocks.upvsdown.com', 'prod-latest.playblock.io'].includes(window.location.hostname));

let label_socials = ['localhost', 'cryptofights.pro', 'prod-latest-cryptofights.upvsdown.com', 'btcbattles.com',
	'tradingbattle.io', 'btcroyal.co', 'polywin.co', 'upvsdown.com', 'btcduels.com', '9wins.com', 'btcblitz.com',
	'bitfight.com', 'game.bitfight.com', 'bitstars.io'];

let mobile = (navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i));

function close_menu(e) {
	APP.state.set('menu_open', false);
}

//Disconnect from current wallet
async function logout_click(dispatch, isConnected, social_web3_obj/*, closeWidgetConnectedWallet*/) {

	APP.state.set('menu_open', false);

	if (isConnected) {
		// closeWidgetConnectedWallet();

		dispatch(set_loader(true))
		await sleep(2200)
		ga4Event('disconnect wallet button', 'wallet_disconnection')

		const wallet_type = localStorage.getItem("wallet");

		if (social_web3_obj?.wallet && social_web3_obj?.obj?.logout) {
			social_web3_obj?.obj?.logout();
			console.log('WAS DISCONNCTED...')
			localStorage.removeItem('isWeb5')
			// logout(); // RETURN BACK (web5 logic steve - delete) 
		}
		else if (wallet_type === 'web5') {
			localStorage.removeItem('isWeb5')
			// logout(); // RETURN BACK (web5 logic steve - delete)
		}

		// alert(wallet_type)
		// Logout from magic auth + reset state
		// if (wallet_type === 'magicauth') {

		// 	try {
		// 		await APP.magic.user.logout();
		// 		// alert(JSON.stringify(await APP.magic.user.isLoggedIn()))
		// 	} catch {
		// 		// alert('Error with logout')
		// 	}

		// 	dispatch(set_user_magic_auth({ loginType: false, isLoggedIn: false, validLogin: false, loading: false, verified: false }))
		// }

		dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_disconnect' }))
		localStorage.removeItem('wallet');
		localStorage.removeItem('chat-token');
		localStorage.removeItem('auth-token');
		localStorage.removeItem('avatar');
		localStorage.removeItem('bxc-active-transaction');
		localStorage.removeItem('email')
		localStorage.removeItem('isSingleSocialConnect')
		// web3 = null;
		console.log('unset wallet address');
		APP.state.unset("wallet_address");
		APP.controller.publish('user_wallet_address_changed', null);
		APP.state.unset("customer.avatar");
		APP.state.unset("user_email");
		APP.state.unset("initial_web5_load");
		APP.state.unset("web5signer");
		dispatch(set_user_sec(null));

		dispatch(set_demo_mode({ popup: false, claim_popup_wallet_address: '' }));

		// navigate('trade');

		// APP.wallets = new Wallet(APP.state.get('default_game_network')) => CHECK IF NEEDED

		dispatch(set_loader(false))
		dispatch(set_web3_social_obj(null))
		dispatch(set_safari_web5_login({ login: false }))
		dispatch(set_web_connection_type(null))
		dispatch(set_initial_query_params(null))
		dispatch(set_polygon_details({ provider: false, matic_transaction: false, update_balance: false, matic_balance: '0' }))

		// window.location.reload();

		// generate new avatar once was removed
		let setNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1),
			new_generated_avatar = `https://robohash.org/` + Math.floor(Math.random() * (999999 - 1 + 1) + 1) + '?set=set' + setNumber;
		APP.state.set('customer.avatar', new_generated_avatar);

		//Logout from walletconnect native connection
		try {
			console.log('logout....');
			//APP.state.get('walletConnectModal').disconnect();


			let walletsToDisconnect = APP.state.get('web3Onboard').state.get().wallets;
			for (let i = 0; i < walletsToDisconnect.length; i++) {
				const w = APP.state.get('web3Onboard').state.get().wallets[i];
				await APP.state.get('web3Onboard').disconnectWallet({ label: w.label })
			}


			APP.state.unset('walletConnectSigner');
			APP.state.unset('success_wallet_connect');
			APP.state.set('walletConnectDisconnected', true);
			localStorage.removeItem('walletConnectSubscribeProviderSet');
			console.log('remove 3');
			localStorage.removeItem('walletConnectConnected');
			//localStorage.removeItem('walletConnectModal');
			//APP.state.unset('walletConnectModal');
		} catch (e) {
			console.log('No wallet connect object to disconnect');
		}

	} else {
		dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_disconnect" }))
	}

}

function AccountBox({ onClick }) {

	const avatar = useAppState('customer.avatar') || localStorage.getItem('avatar');
	const countryCode = useAppState('customer.countryCode');
	const wallet_address = useAppState('wallet_address');
	const dispatch = useDispatch();
	const isLangOpen = useAppState('lang_open');
	const lang = useSelector(state => state.mainRememberReducer.app_lang);

	// slice wallet address
	function sliceAddress(wallet) {
		return `(${wallet.slice(0, 5)}...${wallet.slice(-5, wallet.length)})`
	}

	// condition to check if connect wallet is allowed by specific country
	function openConnectWallet(dispatch) {
		// send click on connect btn event (pixel)
		let wh_details = APP.state.get('pixels').find(itm => {
			if (itm?.params?.searchedByHostname) {
				return itm.target.includes(window.location.hostname);
			}
			else {
				return itm.target === window.location.href;
			}
		})

		if (wh_details?.params?.connectBtnleadEvt) ReactPixel.track('Lead')
		ga4Event('user click on connect wallet button', 'Connect_wallet_click')

		close_menu();
		dispatch(set_connect_wallet_popup(true));
	}

	return (

		<div className="account_box" style={{ zIndex: 'initial' }}>

			<div className="balance_amount" style={{ zIndex: 5 }}>

				{wallet_address
					? <UserBalance />
					: <div className="balance_amount_wallet_connect" onClick={() => openConnectWallet(dispatch)}>
						<img src="/media/images/wallet_btn.png" alt='wallet' />
						<p>{APP.term('header_connect_wallet')}</p>
					</div>
				}

			</div>

			<Link className="profile_link" to={{ pathname: "/userprofile" }}>
				<img src="/media/images/camera.svg" alt='camera' />
				<div className='change-avatar-txt'><span>{APP.term('change_avatar')}</span></div>
			</Link>

			<div className='language-container' onClick={onClick}>
				<img className='chevron-down' src="/media/images/chevron-down.svg" alt="chevron" />
				<img className='flag' src={`/media/images/flags/${lang?.src || 'usa'}.svg`} alt="flag" />
				{!isLangOpen && <div className='language-container__lang'><span>{lang?.lang || 'English'}</span></div>}
			</div>

			<div className="image_bubble" style={{ zIndex: 8888 }}>
				<img className="user_avatar" src={avatar} alt='avatar' />
				<div className="country"><img src={`/media/images/flags/${countryCode.toLowerCase()}.svg`} alt='flag' /></div>
				{wallet_address ?
					<div className="address_row">
						<div className="address"><span>{sliceAddress(wallet_address)}</span></div>
					</div> : null}
			</div>

		</div>

	)
}

// function mute_voice() {
// 	APP.state.set('voice_effect_preference', 'off');
// 	if (APP.state.get('bg_audio_preference') == 'off'
// 		&& APP.state.get('audio_effect_preference') == 'off') {
// 		APP.state.set('audio_preference', 'off');
// 	}
// }
// function unmute_voice() {
// 	APP.state.set('voice_effect_preference', 'on')
// 	if (APP.state.get('audio_preference') == 'off') {
// 		APP.state.set('audio_preference', 'on');
// 		APP.unmute && APP.unmute();
// 	}
// }
// function mute_effects() {
// 	APP.state.set('audio_effect_preference', 'off');
// 	if (APP.state.get('bg_audio_preference') == 'off'
// 		&& APP.state.get('voice_effect_preference') == 'off') {
// 		APP.state.set('audio_preference', 'off');
// 	}
// 	APP.stop_all_sfx && APP.stop_all_sfx();
// }
// function unmute_effects() {
// 	APP.state.set('audio_effect_preference', 'on')
// 	if (APP.state.get('audio_preference') == 'off') {
// 		APP.state.set('audio_preference', 'on');
// 		APP.unmute && APP.unmute();
// 	}
// }
// function mute_bg() {
// 	APP.state.set('bg_audio_preference', 'off');
// 	if (APP.state.get('audio_effect_preference') == 'off'
// 		&& APP.state.get('voice_effect_preference') == 'off') {
// 		APP.state.set('audio_preference', 'off');
// 	}
// }
// function unmute_bg() {
// 	APP.state.set('bg_audio_preference', 'on');
// 	if (APP.state.get('audio_preference') == 'off') {
// 		APP.state.set('audio_preference', 'on');
// 		APP.unmute && APP.unmute();
// 	}
// }

function SoundControls() {
	const dispatch = useDispatch();
	const { bg_music_on, sound_effects_on, voiceover_on } = useSelector(state => state.mainRememberReducer);

	function mute_effects() {
		dispatch(set_sound_effects(false));
		APP.state.set('temp_sounds', false);
		ga4Event('at least one of voiceover or sound effects or background music button was turned off', 'sounds_off')
	}

	function unmute_effects() {
		const promise = new Promise((resolve, reject) => {

			dispatch(set_sound_effects(true))
			APP.state.set('temp_sounds', true);

			resolve('sound effects are on')
		})

		promise.then(() => {
			if (mobile) {

				let arr = [
					'gained_profits', 'last_trade_chance', 'nearing_expiry', 'new_invest',
					'new_round', 'trade_started'];

				setTimeout(() => {
					for (let sound of arr) {
						APP.sounds[sound].play()
						APP.sounds[sound].stop()
					}
				}, 200)
			}
		});
	}

	function mute_voice() {
		dispatch(set_voiceover(false));
		APP.state.set('temp_voiceover', false);
		ga4Event('at least one of voiceover or sound effects or background music button was turned off', 'sounds_off')
	}
	function unmute_voice() {

		const promise = new Promise((resolve, reject) => {

			// APP.sounds.ambience.stop();

			dispatch(set_voiceover(true))
			APP.state.set('temp_voiceover', true);

			resolve('voiceover are on')
		})

		promise.then(() => {
			if (mobile) {
				let arr = [
					'distributing_down_payouts', 'distributing_payouts',
					'distributing_up_payouts', 'voice_no_more_trades',
					'voice_place_your_trade', 'voice_you_won'];

				setTimeout(() => {
					for (let sound of arr) {
						APP.sounds[sound].play()
						APP.sounds[sound].stop()
					}
				}, 500)
			}
		})
	}

	function mute_bg() {
		dispatch(set_bg_music(false));
		APP.state.set('temp_bg', false);
		ga4Event('at least one of voiceover or sound effects or background music button was turned off', 'sounds_off')
	}
	function unmute_bg() {
		dispatch(set_bg_music(true))
		APP.state.set('temp_bg', true);
	}

	const effects_click = sound_effects_on ? mute_effects : unmute_effects,
		voice_click = voiceover_on ? mute_voice : unmute_voice,
		bg_click = bg_music_on ? mute_bg : unmute_bg;

	// useEffect(() => {
	// 	let sendObj = {
	// 		effects_enabled: _effects,
	// 		voice_enabled: _voice,
	// 		bg_enabled: _bg
	// 	}
	// 	dispatch(set_sound(sendObj))
	// }, [_effects, _voice, _bg])

	return (
		<>
			<div className="sound_row sound_effects">
				<div className="title"><span>{APP.term('sound_effects')}</span></div>
				<div className={'switch' + (sound_effects_on ? ' on' : '')} onClick={effects_click}>
					<span>{APP.term(sound_effects_on ? 'on' : 'off')}</span>
				</div>
			</div>
			<div className="sound_row voiceover">
				<div className="title"><span>{APP.term('voiceover')}</span></div>
				<div className={'switch' + (voiceover_on ? ' on' : '')} onClick={voice_click}>
					<span>{APP.term(voiceover_on ? 'on' : 'off')}</span>
				</div>
			</div>
			<div className="sound_row background_music">
				<div className="title"><span>{APP.term('background_music')}</span></div>
				<div className={'switch' + (bg_music_on ? ' on' : '')} onClick={bg_click}>
					<span>{APP.term(bg_music_on ? 'on' : 'off')}</span>
				</div>
			</div>
		</>
	)
}

const version = '1.0'
const build_number = ''

function VersionText() {

	let isBitStars = window.location.hostname === 'bitstars.io'
	return (
		<div className="version_text">
			<span>{APP.term(isBitStars ? 'menu_powered_by_bitstars' : 'menu_power_by')}</span>
			{/* {APP.term('version_text_static')} {version} ({build_number}) */}
		</div>
	)
}

// render a div for active page and a link to other pages
function PathLink({ path, active_path, text, className, onClick }) {
	return (
		path == active_path
			? <div className={"page_link active " + className} onClick={onClick}><span>{text}</span></div>
			: <Link to={{ pathname: path }} className={"page_link " + className} onClick={onClick}><span>{text}</span></Link>
	)
}

const MenuPartnerBox = ({ position }) => {
	return (
		<div className={`menu_partner-flex ${position}`}>
			<Link to="/partner_program" className="menu_partner-button">
				<span>{APP.term('button_become_a_partner')}</span>
			</Link>
			<div className="menu_partner-text-flex">
				<div className="white"><span>{APP.term('menu_you_bring_the')}</span></div>
				<div className="gold"><span>{APP.term('menu_traffic')}</span></div>
				<div className="white"><span>{APP.term('menu_we_bring_the')}</span></div>
				<div className="gold"><span>{APP.term('menu_tech')}</span></div>
			</div>
		</div>
	);
};

const MenuPartnerCaptions = () => {
	return (
		<div className="menu_partner-captions-flex">
			<div className="partner_top_text"><span>{APP.term('menu_become_a_partner')}</span></div>
			<div className="partner_middle_text"><span>{APP.term('menu_start_your_web3')}</span></div>
			{/* <div className="partner_bottom_text"><span>({APP.term('menu_minimum_players')})</span></div> */}
		</div>
	);
};

const PlaynanceLink = () => (
	<a href='https://www.playnance.com/' target="_blank" className="bottom_logo">
		<img className="playnance_logo" src="/media/images/playnance_logo.png" alt='playnance_logo' title='Playnance' />
		<VersionText />
	</a>
);

export default function SiteMenu() {

	const isopen = useAppState('menu_open');
	const isLangOpen = useAppState('lang_open');
	const active_path = useLocation().pathname;
	const social_web3_obj = useSelector(state => state.mainRememberReducer.social_web3_obj);
	const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
	const wallet_address = useAppState('wallet_address');
	const dispatch = useDispatch();

	const preventBackTradeBtn = [
		'/trade',
		'/bitcoin-7',
		'/bitcoin-15',
		'/bitcoin-60', '/ethereum-60', '/binance-60', '/solana-60', '/doge-60', '/shiba-60', '/pepe-60',
		'/bitcoin-120',
		'/bitcoin-5-demo',
		'bitcoin-7-demo',
		'/bitcoin-15-demo', '/bitcoin-30-demo', '/bitcoin-60-demo', '/bitcoin-120-demo'
	];

	// Check if the current domain is in the noDemoSwitchDomains array
	const noDemoSwitchDomains = APP.state.get('noDemoSwitchDomains');
	const currentDomain = window.location.hostname;
	const shouldShowDemoSwitch = !noDemoSwitchDomains.includes(currentDomain);
	// Determine whether the current domain is in the noWinsPaidLeaderboardDomains list
	const isInNoWinsPaidLeaderboardDomains = state.noWinsPaidLeaderboardDomains.includes(currentDomain);
	// If noRegularLeaderboardDomains is empty, then only domains in noWinsPaidLeaderboardDomains should see the regular leaderboard
	const showRegularLeaderboard = isInNoWinsPaidLeaderboardDomains;
	const showWinsPaidLeaderboard = !isInNoWinsPaidLeaderboardDomains;

	// close menu after changing page
	useEffect(close_menu, [active_path]);

	//update chosen lang and its flaf
	const updateLang = (itm) => {
		dispatch(set_app_lang({ ...itm, changed_by_user: true }));
		ga4Event("user's default language changed", 'language_changed')
		APP.state.set('customer.flag', itm?.src);
		APP.state.set('customer.lang', { code: itm?.code, lang: itm?.lang });
		APP.state.set('lang_open', false);
		window.location.reload();
	};

	const handleBackgroundClick = (event) => {
		// click event from child components and elements, bubbling to this handler...
		if (event.target.className === "site_menu_popup_wrap" || event.target.className === "site_menu_popup_wrap site_menu_popup_wrap_mobile") {
			// false - means closing the modal
			APP.state.set('lang_open', false);
		}
	};

	// valid whitelabel - added powered by logo
	const powered_by = () => {
		return state.whitelabels_powered_by.find(wh => wh === window.location.hostname);
	};

	// open bubbles tutorial on trade page
	const openTutorial = () => {
		APP.state.set('menu_open', false);
		APP.state.set('menu_tutorial', true);
		dispatch(set_bubbles_tutorial({ active: true }));
		APP.state.set('user_tutorial_gesture', true);
	};

	// condition for detecting label with social links
	const labelWithSocials = () => {
		if (label_socials.includes(window.location.hostname)) return true;
		else return false;
	};

	let hostname = window.location.hostname;
	let whitelabels = Object.values(APP.state.get('whitelabels'));
	let whiteLabelObj = whitelabels.find(item => item.url === hostname);

	if (whiteLabelObj === undefined)
		whiteLabelObj = whitelabels.find(item => item.url === 'upvsdown.com');

	// const scriptRef = useRef(null);

	// useEffect(() => {

	// 	// create the script element
	// 	const script = document.createElement('script');
	// 	script.src = 'https://app.debridge.finance/assets/scripts/widget.js';
	// 	script.async = true;

	// 	// Set a ref to the script element
	// 	scriptRef.current = script;

	// 	// append the script to the document's head
	// 	document.head.appendChild(script);

	// 	// clean up the script when the component unmounts
	// 	return () => {
	// 		if (scriptRef.current) document.head.removeChild(scriptRef.current);
	// 	};

	// }, []);

	// var widgetObj;

	// bypass for closing deswap bridge connected wallet
	// async function closeWidgetConnectedWallet() {

	// 	const widgetConfig = {
	// 		"v": "1",
	// 		"element": "deswap_none",
	// 		"supportedChains": {
	// 			"inputChains": {
	// 				"1": "all",
	// 				"10": "all",
	// 				"56": "all",
	// 				"137": "all",
	// 				"8453": "all",
	// 				"42161": "all",
	// 				"43114": "all",
	// 				"59144": "all",
	// 				"7565164": "all"
	// 			},
	// 			"outputChains": {
	// 				"1": "all",
	// 				"10": "all",
	// 				"56": "all",
	// 				"137": "all",
	// 				"8453": "all",
	// 				"42161": "all",
	// 				"43114": "all",
	// 				"59144": "all",
	// 				"7565164": "all"
	// 			}
	// 		},
	// 		"inputChain": 1,
	// 		"outputChain": 137,
	// 		"inputCurrency": "0xdac17f958d2ee523a2206206994597c13d831ec7",
	// 		"outputCurrency": "",
	// 		"address": APP.wallets.walletProvider.selectedAddress,
	// 		"showSwapTransfer": true,
	// 		"amount": "10",
	// 		"lang": "en",
	// 		"mode": "deswap",
	// 		"isEnableBundle": false,
	// 		"affiliateFeePercent": "1",
	// 		"affiliateFeeRecipient": "0x041dB96053cFBDb9A8f84FBb4935e078f915E83e",
	// 		"r": 5034,
	// 		"styles": "eyJib3JkZXJSYWRpdXMiOjgsImZvbnRGYW1pbHkiOiIifQ==",
	// 		"theme": "dark",
	// 		"isHideLogo": false
	// 	};

	// 	widgetObj = window.deBridge.widget(widgetConfig, () => { });

	// 	setTimeout(() => {
	// 		widgetObj.disconnect();
	// 	}, 5000);

	// };

	return (

		<div className={'site_menu' + (isopen ? ' open' : '')}>

			<div id="deswap_none" />
			<a href="#" className="site_logo">
				<img src={logoCfg(APP?.controller?.cfg, 'logoUrl')} alt='' />
			</a>

			{isLangOpen ?
				<div className="site_menu_popup_wrap " onClick={handleBackgroundClick}>
					<div className="site_menu_popup">
						<img src={`/media/images/combined-shape@3x.png`} className="site_menu_popup_bg" alt='bg' />
						<div className="site_menu_popup_content_box">
							{state.langCfg.map((itm, i) => (
								<button key={i} className='site_menu_popup_content_btn' onClick={() => updateLang(itm)}>
									<img src={`/media/images/flags/${itm?.src}.svg`} className="site_menu_content_flag" alt='flag' />
									<p className="site_menu_content_lang"><span>{itm?.lang}</span></p>
								</button>
							))}
						</div>
					</div>
				</div>
				: null}

			<div className="close" onClick={close_menu}></div>

			<AccountBox onClick={() => APP.state.set('lang_open', !isLangOpen)} />

			{!preventBackTradeBtn.includes(active_path) && (
				<Link to={{ pathname: poolSwitch(currentPoolDetails) }} className="trade_link">
					<span>{APP.term('back_to_trade_page')}</span>
				</Link>)}

			<div className="links_scroll" style={{ zIndex: isLangOpen ? -2 : '' }}>

				{isUpVsDownDomain && <MenuPartnerBox position="top" />}

				{/* Socials*/}
				{labelWithSocials() &&
					(<>
						<div className="cat_title additional_title">
							<p><span>{APP.term('menu_socials')}</span></p>
							{state.intercom_domains_list.includes(window.location.hostname) && (<p><span>{APP.term('menu_support')}</span></p>)}
						</div>

						<Socials />
					</>)}

				{/* Demo/Real mode */}
				{shouldShowDemoSwitch && (
					<>
						<div className="cat_title">
							<span>{APP.term('menu_game_mode_desc')}</span>
						</div>


						<div className="demo_real_row game_mode">
							<div className="title">
								<span>{APP.term('menu_game_mode')}</span>
							</div>
							<GameModeSwitch />
						</div>
					</>
				)}

				{/* Daily content */}
				<div className="cat_title">
					<span>{APP.term('menu_daily_content')}</span>
				</div>

				{/* <PathLink
					path="/high_rollers"
					active_path={active_path}
					className="leaderboard"
					text={APP.term('menu_high_rollers')}
				/> */}

				<PathLink
					path="/win_ratio"
					active_path={active_path}
					className="leaderboard"
					text={APP.term('menu_win_ratio')}
				/>


				{/* Jackpot */}
				<div className="cat_title">
					<span>{APP.term('jackpot_category')}</span>
				</div>

				<PathLink
					path="/weekly_jackpot"
					active_path={active_path}
					className="jackpot_weekly"
					text={APP.term('menu_jackpot_weekly')}
				/>

				<PathLink
					path="/monthly_jackpot"
					active_path={active_path}
					className="jackpot_monthly"
					text={APP.term('menu_jackpot_monthly')}
				/>

				<PathLink
					path="/jackpot_winners"
					active_path={active_path}
					className="jackpot_history"
					text={APP.term('menu_jackpot_history')}
				/>


				{/* Leaderboard */}
				<div className="cat_title">
					<span>{APP.term('leaderboard')}</span>
				</div>

				{showWinsPaidLeaderboard && (
					<PathLink
						path="/leaderboard_wins_paid"
						active_path={active_path}
						className="leaderboard"
						text={APP.term('top_winners_wins_paid')}
					/>
				)}

				{showRegularLeaderboard && (
					<PathLink
						path="/leaderboard"
						active_path={active_path}
						className="leaderboard"
						text={APP.term('top_winners')}
					/>
				)}

				<div className="cat_title">
					<span>{APP.term('activity_links_category')}</span>
				</div>

				{/* <PathLink
					path="/open_trades"
					active_path={active_path}
					className="open_trades"
					text={APP.term('open_trades')}
				/> */}

				{/* <PathLink
					path="/my_stats"
					active_path={active_path}
					className="my_stats"
					text={APP.term('my_stats_menu_link')}
				/> */}

				<PathLink
					path="/trade_history"
					active_path={active_path}
					className="trades_history"
					text={APP.term('trade_history')}
				/>

				{wallet_address && (<div className="cat_title">
					<span>{APP.term('menu_web3_title')}</span>
				</div>)}

				{wallet_address && (<PathLink
					path="/topup"
					onClick={() => APP.state.set('topup_x_menu', true)}
					active_path={active_path}
					className="my_wallet"
					text={APP.term('menu_wallet_btn')}
				/>)}


				{/* Affiliates and etc.. */}

				{!state.prevent_referral_program_labels.includes(window.location.hostname) &&
					(
						<>
							<div className="cat_title">
								<span>{APP.term('sharing_links_category')}</span>
							</div>

							<PathLink
								path="/share_links"
								active_path={active_path}
								className="share_links"
								text={APP.term('share_program_links')}
							/>

							<PathLink
								path="/share_report"
								active_path={active_path}
								className="share_report"
								text={APP.term('share_program_reports')}
							/>

							<PathLink
								path="/dashboard"
								active_path={active_path}
								className="share"
								text={APP.term('share_program')}
							/>

							<PathLink
								path="/affiliate_leaderboard"
								active_path={active_path}
								className="aff_leaderboard"
								text={APP.term('menu_aff_leaderboard')}
							/>

							<PathLink
								path="/share"
								active_path={active_path}
								className="aff_tutorial"
								onClick={() => dispatch(set_affiliate_tutorial(false))}
								text={APP.term('affiliate_program_tutorial')}
							/>
						</>
					)}

				{/* APP.term('ap_menu_item_tutorial')  */}



				{/* SUPER AFFILIATES PROGRAM */}
				{state.sap_labels.includes(window.location.hostname) ?
					<>
						<div className="cat_title">
							<span>{APP.term('sap_aff_title')}</span>
						</div>

						<PathLink
							path="/sap"
							onClick={() => dispatch(set_last_sap_tutorial_slide({ last_slide: 0 }))}
							active_path={active_path}
							className="sap sap_tutorial"
							text={APP.term('sap_menu_item_tutorial')}
						/>

						<PathLink
							path="/sap_links"
							active_path={active_path}
							className="sap share_links"
							text={APP.term('sap_menu_item_link_manager')}
						/>

						{/* <PathLink
							path="/sap_dashboard"
							active_path={active_path}
							className="sap share_report"
							text={APP.term('sap_menu_item_dashboard')}
						/> */}

						<PathLink
							path="/sap_report"
							active_path={active_path}
							className="sap share_report"
							text={APP.term('sap_menu_item_earnings')}
						/>
					</> : null}

				{isUpVsDownDomain && <>

					<div className="cat_title">
						<span>{APP.term('cat_become_a_partner')}</span>
					</div>

					<PathLink
						path="/partner_program"
						active_path={active_path}
						className="partner_program whitelabel"
						text={APP.term('menu_whitelabel_program')}
					/>

					{/* <PathLink
					path="/partner_program"
					active_path={active_path}
					className="partner_program affiliate"
					text={APP.term('menu_affiliate_program')}
				/> */}

				</>}


				{/* Show partners page for defined whitelabels */}
				{/* {partnersPage} */}

				{/* <PathLink
					path="/wallet"
					active_path={active_path}
					className="wallet" 
					text={APP.term('connect_wallet_menu_link')}
				/> */}

				<div className="cat_title">
					<span>{APP.term('info_links_category')}</span>
				</div>

				{/* <PathLink
					path="/about"
					active_path={active_path}
					className="about"
					text={APP.term('about_us')}
				/> */}

				<PathLink
					path="/faq"
					active_path={active_path}
					className="faq"
					text={APP.term('FAQ')}
				/>

				<PathLink
					path="/knowledge_center"
					active_path={active_path}
					className="knowledge-center-item"
					text="Defi Knowledge Center"
				/>

				{/* {!state.disable_initial_tutorial_labels.includes(window.location.hostname) */}
				{/* && ( */}
				<PathLink path={currentPoolDetails.route} active_path={active_path}
					className="tutorial"
					onClick={() => openTutorial()}
					text={APP.term('tutorial')}
				/>
				{/* )} */}

				{/* <PathLink
					path="/support"
					active_path={active_path}
					className="contact_support"
					text={APP.term('contact_support')}
				/> */}

				<PathLink
					path="/policy"
					active_path={active_path}
					className="privacy_policy"
					text={APP.term('privacy_policy')}
				/>

				<PathLink
					path="/contact_us"
					active_path={active_path}
					className="contact"
					text={APP.term('contact_title')}
				/>

				<div className="cat_title">
					<span>{APP.term('settings')}</span>
				</div>

				<SoundControls />

				<div className="logout" onClick={() => logout_click(dispatch, wallet_address, social_web3_obj/*, closeWidgetConnectedWallet*/)}>
					<span>{APP.term('logout')}</span>
				</div>

				{isUpVsDownDomain &&
					<>
						<MenuPartnerBox position="bottom" />
						<MenuPartnerCaptions />
					</>
				}

				{/* {powered_by() && ( */}
				{isPlaynanceDomain && <PlaynanceLink />}
				{/* )} */}
			</div>
		</div >
	);

};