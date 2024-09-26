// import tables from './utils/pools/tables';
// import active_table from './utils/pools/active_table';
import table_skin_colors from './utils/pools/table_skin_colors';
// import demo_tables from './utils/pools/demo_tables';
// import demo_active_table from './utils/pools/active_demo_table';

export default {

	active_network: 'mainnet',
	chainId: '1829',
	chainName: 'Playnance',

	testnet_smctr_evts: 'BlockchainEventsSyncTestnet',
	mainnet_smctr_evts: 'BlockchainEventsSyncMainnet',

	plbToken: {
		name: 'PlayBlock',
		address: '0x73C3cDd1418c3F17D54A81148387d93122802E72',
		decimals: 2,
		minAllowanceThreshold: 5000 //If wallet allowance of the user is below this threshold we will create TX for signing for MAX allowance
	},

	plbToken_demo: {
		name: 'PlayBlock',
		address: '0x34fdc6f5B4e1fFD14fDf86F729c6b7973eA381C5',
		decimals: 2,
		minAllowanceThreshold: 100 //If wallet allowance of the user is below this threshold we will create TX for signing for MAX allowance
	},

	gelato_relay_api_key: 'KpoC9QR8GhenESKedc1x_rDmwjENdyp5CKj84yBaY0M_',

	menu_open: false,

	web5Params: {
		network: "polygon",
		currency: "MATIC",
		nativeToken: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",//USDC "0x04Bc29EC729d2d9f75c3Ec28a25A5b93Fc65F28a",
		from: "game",
	},

	ether_scan_t: 'SJ8T2EJKDMV7JMHK5KZ6DSX6K2R8E99AGW',

	magicAuth: {
		rpcUrl: 'https://rpc.orbit-anytrust-testnet.gelato.digital',
		chainId: 1829,
		apiKey: 'pk_live_7977A402D7AF5C81'
	},

	changelly_url: 'https://widget.changelly.com',
	changelly_from: 'btc%2Ceth%2Cusdt20%2Cusdtrx%2Cusdc%2Csol%2Cbnb%2Cbnbbsc%2Ccotibnb%2Cton%2Cada%2Ctrx%2Cxrp%2Cdoge%2Cshib%2Carb%2Cltc',
	changelly_to: 'matic',
	changelly_amount: 100,
	changelly_from_default: 'usdtrx',
	changelly_to_default: 'maticpolygon&',
	changelly_to_merchant_id: 'FL46p3x8YrE5xMaV&',

	web3AuthCfg: {
		chainNamespace: "eip155",
		chainId: '0x725', //chainId in HEX
		rpcTarget: "https://lb.drpc.org/ogrpc?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_sEyKCJCsER75lPQktuFoNr",
		displayName: "Playnance Chain",
		blockExplorer: "https://explorer.playblock.io",
		ticker: "USDP",
		tickerName: "Playnance USD",
	},

	walletConnectProjectId: 'c454c454c6bc923cc9621e5c5460367a',

	entryDistDecimal24H: 5,
	entryDistDecimalAll: 5,
	aff_leaderboard_decimal: 2,

	// sap float digits
	sap_digits: 2,

	sap_labels: ['integration-app2.upvsdown.com', 'btcrollercoaster.com', 'poolzwin.com'],
	disable_sounds_popup_labels: ['btcduels.com', 'prod-latest-cryptofights.upvsdown.com', 'integration-app2.upvsdown.com'],
	disable_initial_tutorial_labels: ['btcduels.com', 'game.bitfight.com', 'localhost', 'prod-latest.upvsdown.com', 'prod-latest-cryptofights.upvsdown.com'],
	disable_auto_tutorial: ['btcduels.com', 'game.bitfight.com', 'bitfight.com', 'integration-app2.upvsdown.com'],
	prevent_sound_popup_labels: ['btcduels.com', 'game.bitfight.com', 'bitfight.com', 'integration-app2.upvsdown.com'],

	// jackpot float digits
	animBalanceDecimalNum: 5,
	jackpot_balance_digits: 2,
	jackpot_total_prize_digits: 4,
	animPoolsDecimalNum: 2,
	animGeneralStatsWinsPaid: 5,
	animGeneralStatsAllTimeWins: 5,
	jackpot_fractional_digits: 8,
	jackpot_weekly_winner_digits: 6,
	jackpot_weekly_history_digits: 2,
	jackpot_monthly_prize_digits: 2,

	last_sec_anim: 10,
	general_stats_interval: 65000, // (1min + 5s) - added addtional 5sec to prevent front-back delays upon req

	redirect_browsers: ['facebook', 'instagram', 'telegram', 'twitter', 'linkedin'],

	platform_lang_by_browser_lang: ['cryptoclash.gg', 'btcbattles.com'],

	linearGraphId: '5ba15e',
	candlesGraphId: '08685a',

	currenciesFlags: [
		{ symbol: 'AED', flag: 'ae' },
		{ symbol: 'ARS', flag: 'ar' },
		{ symbol: 'AUD', flag: 'au' },
		{ symbol: 'AZN', flag: 'az' },
		{ symbol: 'BGN', flag: 'bg' },
		{ symbol: 'BHD', flag: 'bh' },
		{ symbol: 'BRL', flag: 'br' },
		{ symbol: 'CAD', flag: 'ca' },
		{ symbol: 'CLP', flag: 'cl' },
		{ symbol: 'COP', flag: 'co' },
		{ symbol: 'COP', flag: 'co' },
		{ symbol: 'CRC', flag: 'cr' },
		{ symbol: 'CZK', flag: 'cz' },
		{ symbol: 'DKK', flag: 'dk' },
		{ symbol: 'DOP', flag: 'do' },
		{ symbol: 'EUR', flag: 'eur' },
		{ symbol: 'GBP', flag: 'gb' },
		{ symbol: 'GEL', flag: 'ge' },
		{ symbol: 'GTQ', flag: 'gt' },
		{ symbol: 'HKD', flag: 'hk' },
		{ symbol: 'HNL', flag: 'hn' },
		{ symbol: 'HRK', flag: 'hr' },
		{ symbol: 'HUF', flag: 'hu' },
		{ symbol: 'IDR', flag: 'id' },
		{ symbol: 'ILS', flag: 'il' },
		{ symbol: 'INR', flag: 'india' },
		{ symbol: 'JPY', flag: 'jp' },
		{ symbol: 'KRW', flag: 'kr' },
		{ symbol: 'KWD', flag: 'kw' },
		{ symbol: 'MDL', flag: 'md' },
		{ symbol: 'KZT', flag: 'kz' },
		{ symbol: 'MXN', flag: 'mx' },
		{ symbol: 'MYR', flag: 'my' },
		{ symbol: 'NOK', flag: 'no' },
		{ symbol: 'NZD', flag: 'nz' },
		{ symbol: 'OMR', flag: 'om' },
		{ symbol: 'PEN', flag: 'pe' },
		{ symbol: 'PHP', flag: 'ph' },
		{ symbol: 'PLN', flag: 'pl' },
		{ symbol: 'PYG', flag: 'py' },
		{ symbol: 'QAR', flag: 'qa' },
		{ symbol: 'RON', flag: 'ro' },
		{ symbol: 'RWF', flag: 'rw' },
		{ symbol: 'SAR', flag: 'sa' },
		{ symbol: 'SEK', flag: 'se' },
		{ symbol: 'THB', flag: 'th' },
		{ symbol: 'TRY', flag: 'tr' },
		{ symbol: 'TWD', flag: 'tw' },
		{ symbol: 'UAH', flag: 'ukraine' },
		{ symbol: 'USD', flag: 'us' },
		{ symbol: 'UYU', flag: 'uy' },
		{ symbol: 'VND', flag: 'vn' },
		{ symbol: 'VND', flag: 'vn' },
		{ symbol: 'ZAR', flag: 'za' },
	],

	new_login_page_domains: ['cryptofights.pro', 'prod-latest-cryptofights.upvsdown.com', /*'localhost'*/],

	//Streamer
	ably_client_key: '1--qMA.iCW1uQ:xBghEQ53kX_3pTV22EBieoDsi6kHrYrMKuJ4Fst3xLo',
	round_started_streamer: 0, //Quicknode QuickAlerts -> ably -> frontend

	//Web3.auth
	web3_auth_token: 'BDey3GMFf8GvN7D0WwTPwpphNO2qG_E4P2enn8YSo0YXo5bVD2ceyWmkx4rbZEnP9G0YBVg2deKs7SNnqKEOaRA',
	web3_auth_network: 'cyan',

	//audio mode: can be "unkown", "suspended", "off", or "on"
	// audio_mode: 'unkown',

	// audio preference on device 
	// starts as "prompt" and becomes "on" or "off" based on answer
	// audio_preference: 'prompt',
	// bg_audio_preference: 'on',
	// audio_effect_preference: 'on',
	// voice_effect_preference: 'on',

	//Crypto Topup List
	crypto_topup_list: [
		{ name: 'btc', val: 'btc' },
		{ name: 'eth', val: 'eth' },
		{ name: 'usdt', sub: 'ERC20', val: 'usdt20' },
		{ name: 'usdt', sub: 'TRC20', val: 'usdtrx' },
		{ name: 'trx', val: 'trx' },

		{ name: 'bnb', val: 'bnb' },
		{ name: 'sol', val: 'sol' },
		{ name: 'usdc', val: 'usdc' },
		{ name: 'ada', val: 'ada' },
		{ name: 'shiba', val: 'shib' },

		{ name: 'doge', val: 'doge' },
		{ name: 'ltc', val: 'ltc' },
		{ name: 'arb', val: 'arb' },
		{ name: 'xrp', val: 'xrp' },
		{ name: 'avax', val: 'avax' },
	],

	//Paybis
	paybisPartnerId: 'd6840fd3-4602-41d0-82b5-d56e2302da2d',
	paybisUrl: 'https://widget.paybis.com',
	paybisBuyCryptoToken: 'MATIC-POLYGON',
	paybisSellCryptoToken: 'MATIC-POLYGON',
	paybisDefaultAmount: 100,


	// Transfi
	transfiApiKey: '8p3JwJcfbczLGtV4',
	transfiUrl: 'https://buy.transfi.com',
	// transfiFiatAmt: 100,
	// transfiFiatTicker: 'USD',
	transfiCryptoTicker: 'USDP',
	transfiCryptoNetwork: 'USDP',
	transfiView: 'buy_sell', //Can be buy/sell/buy_sell

	prevent_referral_program_labels: ['9wins.com', 'btcrollercoaster'],
	enable_monthly_jackpot: true,
	round_history_from_streamer: 0,
	last_sec_allowed_betting: 4,
	higher_gas_fee_seconds: 15, // how many seconds before the round ends we rise the fee
	poolBetAmount: 36,

	show_audio_popup: false,
	audio_suspended: false,
	chat_token: localStorage.getItem('chat-token') ? localStorage.getItem('chat-token') : '',
	wallet_address: '',
	chat_open: false,
	chat_api_key: 'a39tzys5dczr', 		  //Key for shared chat between partners
	chat_api_key_bcbgame: 'r7txtwczcc9h', //Key for BCB game site chat
	disable_chat_domains: ['bcb.game'],
	block_routing_domains: ['localhost', 'upvsdown.com', 'integration-app2.upvsdown.com'],
	connecting_wallet: null,
	invite_friend_link: 'https://integration-app2.upvsdown.com',
	history_page_list_amt: 100,
	//old => history_url: 'https://apricot-rhinoceros.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/load',
	history_url: 'https://api.playblock.io/v1/trades/history',
	generate_affiliate_link_url: 'https://api.playblock.io/v1/affiliate/campaign',
	generate_sap_link_url: 'https://api.playblock.io/v1/sap/campaign',
	sap_list_url: 'https://api.playblock.io/v1/sap/campaigns',
	sap_earning_report_url: 'https://api.playblock.io/v1/sap/report/earnings',
	sap_dashboard_url: 'https://api.playblock.io/v1/sap/report/dashboard',
	pixels_list_url: 'https://api.playblock.io/v1/config/social-tags',
	super_affiliate_dashboard_url: 'https://api.playblock.io/v1/affiliate/dashboard',
	dashboard_url: 'https://api.playblock.io/v1/affiliate/dashboard',
	list_url: 'https://api.playblock.io/v1/affiliate/campaign/list',
	general_stats_url: 'https://api.playblock.io/v1/stats/summary',
	earnings_report_url: 'https://api.playblock.io/v1/affiliate/report/earnings',
	partner_plan: 'https://api.playblock.io/v1/partner/add',
	static_page_url: 'https://api.playblock.io/v1/config/static',
	pools_config_url: 'https://api.playblock.io/v1/config/pools',
	terms_url: 'https://api.playblock.io/v1/config/terms',
	faq_url: 'https://api.playblock.io/v1/config/faq',
	trade_stats_url: 'https://chemical-rhinoceros.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1/load',
	profile_url: 'https://api.playblock.io/v1/customer/avatar',
	chat_url: 'https://api.playblock.io/v1/customer/chat',
	moralis_url: 'https://api.playblock.io/v1/customer',
	asset_history_url: 'https://api.playblock.io/v1/tickers/graph',
	app_config_url: 'https://api.playblock.io/v1/config/app-config',
	ip_url: 'https://ipapi.co/json',
	leaderboard_url: 'https://api.playblock.io/v1/stats/leaderboard',
	subid_event_url: 'https://api.playblock.io/v1/analytics/click',
	sap_clicks_url: 'https://api.playblock.io/v1/analytics/click',
	// sap tutorial form url for users who connected their wallet (otherwise - signin url)
	sap_tutorial_form_url: 'https://api.playblock.io/v1/sap/partner',
	p2p_payment: 'https://api.playblock.io/v1/fiat/exchange/request',
	p2p_bwp_url: 'https://api.playblock.io/v1/fiat/bwp/order',
	utorg_currencies: 'https://api.playblock.io/v1/fiat/utorg/currencies',
	utorg_payment: 'https://api.playblock.io/v1/fiat/utorg/order/init',
	contact_form_url: 'https://api.playblock.io/v1/feedback/contact_us',
	swap_exchange_url: 'https://b.playblock.io/getWalletForUser',
	rpp_campaign_url:'https://referral-partners.playblock.io/api/v1/referral-partners/script?code=',

	// ##################################
	// ####### START JACKPOT URLS: ######
	// ##################################

	jackpot_initial_state_url: 'https://api.playblock.io/v2/jackpot/balances',
	jackpot_balances_ws: 'wss://js.playblock.io/sub?id=jackpot:balance:common',

	// ##################################
	// ###### WEEKLY JACKPOT URLS: ######
	// ##################################

	// Jackpot weekly URL
	weekly_jackpot_url: 'https://api.playblock.io/v2/jackpot/round/weekly',
	weekly_jackpot_demo_url: 'https://api.playblock.io/v2/jackpot/round/weekly_demo',

	// Jackpot weekly WS
	jackpot_weekly_ws: 'wss://js.playblock.io/sub?id=jackpot:pools:weekly',
	jackpot_weekly_demo_ws: 'wss://js.playblock.io/sub?id=jackpot:pools:weekly:demo',

	// Jackpot weekly self WS
	jackpot_weekly_self_ws: 'wss://js.playblock.io/sub?id=jackpot:weekly:user',
	jackpot_weekly_demo_self_ws: 'wss://js.playblock.io/sub?id=jackpot:weekly:demo:user',

	// Jackpot weekly history URL
	jackpot_weekly_history_url: 'https://api.playblock.io/v2/jackpot/winners/history/weekly',
	jackpot_weekly_history_demo_url: 'https://api.playblock.io/v2/jackpot/winners/history/weekly_demo',

	// Jackpot weekly winners URL
	jackpot_weekly_winners_url: 'https://api.playblock.io/v2/jackpot/winners/weekly',
	jackpot_weekly_winners_demo_url: 'https://api.playblock.io/v2/jackpot/winners/weekly_demo',

	// ##################################
	// ###### MONTHLY JACKPOT URLS: #####
	// ##################################

	// Jackpot monthly URL
	monthly_jackpot_url: 'https://api.playblock.io/v2/jackpot/round/monthly',
	monthly_jackpot_demo_url: 'https://api.playblock.io/v2/jackpot/round/monthly_demo',

	// Jackpot monthly WS
	jackpot_monthly_ws: 'wss://js.playblock.io/sub?id=jackpot:pools:monthly',
	jackpot_monthly_demo_ws: 'wss://js.playblock.io/sub?id=jackpot:pools:monthly:demo',

	// Jackpot monthly self WS
	jackpot_monthly_self_ws: 'wss://js.playblock.io/sub?id=jackpot:monthly:user',
	jackpot_monthly_demo_self_ws: 'wss://js.playblock.io/sub?id=jackpot:monthly:demo:user',

	// Jackpot monthly history URL
	jackpot_monthly_history_url: 'https://api.playblock.io/v2/jackpot/winners/history/monthly',
	jackpot_monthly_history_demo_url: 'https://api.playblock.io/v2/jackpot/winners/history/monthly_demo',

	// Jackpot monthly winners URL
	jackpot_monthly_winners_url: 'https://api.playblock.io/v2/jackpot/winners/monthly',
	jackpot_monthly_winners_demo_url: 'https://api.playblock.io/v2/jackpot/winners/monthly_demo',

	// ##################################
	// ####### END JACKPOT URLS: ########
	// ##################################

	affiliate_leaderboard_url: 'https://api.playblock.io/v1/stats/affiliates/leaderboard',
	high_rollers_url: 'https://api.playblock.io/v2/tournaments/round/turnover',
	high_rollers_history_url: 'https://api.playblock.io/v2/tournaments/winners/history/turnover',
	win_ratio_url: 'https://api.playblock.io/v2/tournaments/round/winRatio',
	win_ratio_history_url: 'https://api.playblock.io/v2/tournaments/winners/history/winRatio',
	routes_url: 'https://api.playblock.io/v1/config/routes',
	graph_history_url: 'https://api.playblock.io/v2/tickers/history',
	gasToken: 'https://faucet.playblock.io/request-tokens',
	claimTokens: 'https://claim.playblock.io/claimTokens',

	// jackpot_balance_integration: 'jackpot:int:balances',
	// jackpot_balance_production: 'jackpotBalances',

	// nchan
	candles_ws: 'wss://ds.upvsdown.com/sub?id=rates_candles_btc',

	bridge_url: 'https://bridge.playnance.com',
	mumbai_url: 'https://mumbai.polygonscan.com/address/',
	polygonscan_url: 'https://polygonscan.com/address/',
	usdb_claim_ws: 'wss://ds.playblock.io/sub?id=playnance_usdb_claim_notifications_prod',
	bridge_ws: 'wss://ds.playblock.io/sub?id=playnance_bridge_notifications',

	polygonscan_url_root: 'https://explorer.playblock.io', //should be changed on integration/production

	//Polygon gas stations urls (gas fee estimation)
	polygon_gas_station_testnet: 'https://gasstation-testnet.polygon.technology/v2',
	polygon_gas_station_mainnet: 'https://gasstation.polygon.technology/v2',

	telegram_track_users_domains: ['upvsdown.com'],

	//Polygon fees deafult values in case of timeout
	polygon_gas_default_maxPriorityFee_testnet: 5,
	polygon_gas_default_maxFeePerGas_testnet: 5,
	polygon_gas_default_maxPriorityFee_mainnet: 250,
	polygon_gas_default_maxFeePerGas_mainnet: 250,

	affiliate_pages: [
		{ content: 'FAQ', page: 'faq', pathName: '/faq', src: 'faq.png' },
		{ content: 'Link Manager', page: 'linksmanager', pathName: '/share_links', src: 'linkmanager.png' },
		{ content: 'Earning Report', page: 'earningreport', pathName: '/share_report', src: 'earningreport.png' },
		{ content: 'Dashboard', page: 'dashboard', pathName: '/dashboard', src: 'dashboard.png' }],

	super_affiliate_pages: [
		{ content: 'FAQ', page: 'faq', pathName: '/faq', src: 'faq.png' },
		{ content: 'Link Manager', page: 'linksmanager', pathName: '/sap_links', src: 'linkmanager.png' },
		{ content: 'Earning Report', page: 'earningreport', pathName: '/sap_report', src: 'earningreport.png' },
		// { content: 'Dashboard', page: 'dashboard', pathName: '/sap_dashboard', src: 'dashboard.png' }
	],

	default_game_network: 'MAINNET',
	// You need a websockets connection to a node. You can create an account and get one for free here: quicknode.com
	eth_ws_uri: 'wss://lb.drpc.org/ogws?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_sEyKCJCsER75lPQktuFoNr', //Change address to alchemy integration
	eth_ws_uri_free: 'wss://lb.drpc.org/ogws?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_sEyKCJCsER75lPQktuFoNr', //Free blockchain provider
	eth_ws_web3auth: 'https://lb.drpc.org/ogrpc?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_sEyKCJCsER75lPQktuFoNr', //For web3auth purposes
	//Alternative provider for demanding purposes like getPoolHistory functionality
	eth_ws_web3AlternativeProvider: 'https://lb.drpc.org/ogrpc?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_sEyKCJCsER75lPQktuFoNr',
	eth_ws_web3AlternativeProvider1: 'https://lb.drpc.org/ogrpc?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_sEyKCJCsER75lPQktuFoNr',
	current_client_wallet: null,
	jackpot_address: '0x0D9ccD7746f5b633c135c2508E6bCCa74E289468', //Address for Jackpot
	jackpot_balance: 0,

	// jackpot channels
	weekly_pools_channel: 'jackpot:pools:weekly',
	monthly_pools_channel: 'jackpot:pools:monthly',

	// ably rates channel
	rate_ably_channel: 'rates:int:tickers:main',
	rate_ably: false,

	web3TransactionConfirmationBlocks: 2, //How many blocks we should check for transaction confirmation

	total_entry_tutorial_bubbles: 5,

	// trade page + menu
	intercom_domains_list: [
		'cryptofights.pro',
		'prod-latest-cryptofights.upvsdown.com',
		'9wins.com',
		'upvsdown.com',
		'moonxp.com',
		'sharker.com',
		'callvsput.io',
		'upvsdown.io',
		'turbobit.io',
		'poolzwin.com',
		'integration-app2.upvsdown.com',
		'localhost',
		'btcduels.com',
		'game.bitfight.com',
		'bitfight.com',
		'btcrollercoaster',
		'bitcoin.playblock.io',
		'bitstars.io'
	],

	disable_betting_tutorial_labels: [
		'localhost',
		'btcduels.com',
		'game.bitfight.com',
		'bitfight.com'
	],
	// all platform except trade mobile
	global_ui_intercom_domains_list: [
		'upvsdown.com',
		'moonxp.com',
		'sharker.com',
		'callvsput.io',
		'upvsdown.io',
		'turbobit.io',
		'poolzwin.com',
		'localhost',
		'9wins.com',
		'prod-latest.upvsdown.com',
		'integration-app2.upvsdown.com',
		'prod2.upvsdown.com',
		'btcduels.com',
		'game.bitfight.com',
		'bitfight.com',
		'bitcoin.playblock.io',
		'bitstars.io'
	],

	// label that want that chat btn will open chat beside having intercom btn 
	wh_labels_intercom_with_chat: [
		'game.bitfight.com',
		'bitfight.com',
		'integration-app2.upvsdown.com',
		'localhost',
	],

	whitelabels_powered_by: [
		'upordown.io',
		'blitzbinary.com',
		'bitcoinvsdollar.com',
		'upvsdown.com',
		'localhost',
		'prod-latest.upvsdown.com',
		'prod2.upvsdown.com',
		'integration-app2.upvsdown.com'
	],

	whitelabels_no_social: [
		'winpool.io',
		'winpoolio.upvsdown.com'
	],

	langCfg: [
		{ code: 'en', lang: 'English', src: 'usa' },
		{ code: 'sc', lang: '简体中文', src: 'china', },
		{ code: 'cn', lang: '繁體中文', src: 'hongkong', mobileTransTxt: true },
		{ code: 'jp', lang: '日本語', src: 'japan', mobileTransTxt: true, entryPage: { headerSize: '8.8em' } },
		{ code: 'ko', lang: '한국어', src: 'southkorea', mobileTransTxt: true },
		{ code: 'th', lang: 'ภาษาไทย', src: 'thailand' },
		{ code: 'ms', lang: 'Bahasa Melayu', src: 'malaysia', entryPage: { btnFontSize: '4.4em' } },
		{ code: 'vi', lang: 'tiếng việt', src: 'vietnam' },
		{ code: 'id', lang: 'Bahasa Indonesia', src: 'indonesia', entryPage: { btnFontSize: '4.4em' } },
		{ code: 'ar', lang: 'العربية', src: 'saudi' },
		{ code: 'pt', lang: 'português', src: 'brazil' },
		{ code: 'ru', lang: 'Русский', src: 'russia', entryPage: { headerSize: '8em' } },
		{ code: 'de', lang: 'Deutsch', src: 'germany' },
		{ code: 'fr', lang: 'français', src: 'france' },
		{ code: 'it', lang: 'italiano', src: 'italy' },
		{ code: 'tr', lang: 'Türkçe', src: 'turkey' },
		{ code: 'es', lang: 'Español', src: 'spain' },
		{ code: 'pl', lang: 'Język polski', src: 'poland' },
		{ code: 'hi', lang: 'हिन्दी', src: 'india' },
		{ code: 'uk', lang: 'Українська', src: 'ukraine' }
	],

	magic_private_key: 'https://reveal.magic.link/playnance',
	p2p_labels: ['cryptofight.io', 'cryptofights.pro', 'prod-latest-cryptofights.upvsdown.com', 'localhost'],

	pixels: [
		{ url: 'http://localhost:3000/', pixelId: 210171625080911, connectBtnleadEvt: true, searchedByHostname: true, registrationEvt: true },
		{ url: 'https://btcbattles.com', pixelId: 192714853490610, successfulConnectBtnleadEvt: true, searchedByHostname: true },
		{ url: 'https://btcbattles.upvsdown.com', pixelId: 192714853490610, successfulConnectBtnleadEvt: true, searchedByHostname: true },
		{ url: 'https://cryptofights.pro', pixelId: 358353790189798, connectBtnleadEvt: true, searchedByHostname: true },
		{ url: 'https://superpool.io', pixelId: 1864749460608424, connectBtnleadEvt: true, searchedByHostname: true },
		{ url: 'https://bits15.com', pixelId: 367607395758906, connectBtnleadEvt: true, searchedByHostname: true },
		{ url: 'https://cryptowinn.com', pixelId: 1302581547804056, connectBtnleadEvt: true, searchedByHostname: true },
		{ url: 'https://upvsdown.com/trade?ref=Mjc0ODc1NjAxNzAxMDg2MzQyNDU5', pixelId: 791848096045882, registrationEvt: true },
		{ url: 'https://upvsdown.com/trade?ref=Mjc0ODc2NjkxNzAxMDg2Mjk5NTcz', pixelId: 1049906889532595, registrationEvt: true },
		{ url: 'https://upvsdown.com/trade?ref=Mjc0ODc5NDgxNzAxMDg2MzMwMzgx', pixelId: 899289771845897, registrationEvt: true },
		{ url: 'https://integration-app2.upvsdown.com/?ref=22', pixelId: 210171625080922, registrationEvt: true },
		{ url: 'https://integration-app2.upvsdown.com/?ref=11', pixelId: 210171625080911, registrationEvt: true },
		{ url: 'https://upvsdown.com', logo: 'upvsdown.svg', pixelId: 235930842246448 },
	],

	whitelabels: [
		{ url: 'localhost', logo: 'upvsdown.svg', partnersPage: true, pixelId: 210171625080979, tutorialDisabled: false },
		{ url: 'upvsdown.com', logo: 'upvsdown.svg', partnersPage: true, pixelId: 235930842246448 },
		{ url: 'integration-app2.upvsdown.com', logo: 'upvsdown.svg', partnersPage: true },

		//trade.playnance.com
		{ url: 'integration-trade.playnance.com', logo: 'playnance.png', partnersPage: true },
		{ url: 'trade.playnance.com', logo: 'playnance.png', partnersPage: true },

		//Cryptobattles.io
		{ url: 'integration-trade.cryptobattles.io', logo: 'cryptobattles.png', partnersPage: false, hasEntryScreen: true },
		{ url: 'cryptobattles.io', logo: 'cryptobattles.png', partnersPage: false, hasEntryScreen: true },

		//Afortun.com
		{ url: 'integration-trade.afortun.com', logo: 'afortun.png', partnersPage: false },
		{ url: 'afortun.com', logo: 'afortun.png', partnersPage: false },

		//W3play.io
		{ url: 'integration-trade.w3play.io', logo: 'w3-logo.png', partnersPage: false },
		{ url: 'w3play.io', logo: 'w3-logo.png', partnersPage: false },

		//Updown.pro
		{ url: 'integration-trade.updown.pro', logo: 'updownpro-logo.png', partnersPage: false },
		{ url: 'trade.updown.pro', logo: 'updownpro-logo.png', partnersPage: false },

		//Poolzwin.com
		{ url: 'integration-trade.poolzwin.com', logo: 'poolzwin.png', partnersPage: false },
		{ url: 'poolzwin.com', logo: 'poolzwin.png', partnersPage: false },

		//Btcbattles.com
		{ url: 'integration-trade.btcbattles.com', logo: 'btcbattles.png', partnersPage: false },
		{ url: 'btcbattles.com', logo: 'btcbattles.png', partnersPage: false, pixelId: 862934614959329, leadEvt: true },

		//Metaoptions.io
		{ url: 'trade.metaoptions.io', logo: 'metaoptions.png', partnersPage: false, tutorialDisabled: true },
		{ url: 'metaoptions.io', logo: 'metaoptions.png', partnersPage: false, tutorialDisabled: true },
		{ url: 'integration-trade.metaoptions.io', logo: 'metaoptions.png', partnersPage: false, tutorialDisabled: true },

		//feedbets.upvsdown.com
		{ url: 'feedbets.upvsdown.com', logo: 'feedbets.png', partnersPage: false },
		{ url: 'integration-feedbets.upvsdown.com', logo: 'feedbets.png', partnersPage: false },

		//crypto.upvsdown.com
		{ url: 'crypto.upvsdown.com', logo: 'cryptocom.png', partnersPage: false },
		{ url: 'integration-crypto.upvsdown.com', logo: 'cryptocom.png', partnersPage: false },

		//greenvsred.com
		{ url: 'greenvsred.com', logo: 'greenvsred.png', partnersPage: false },
		{ url: 'greenvsred.upvsdown.com', logo: 'greenvsred.png', partnersPage: false },
		{ url: 'integration-greenvsred.upvsdown.com', logo: 'greenvsred.png', partnersPage: false },

		//btcvsdollar.com
		{ url: 'bitcoinvsdollar.com', logo: 'btcvsdollar.png', partnersPage: false },
		{ url: 'bitcoinvsdollar.upvsdown.com', logo: 'btcvsdollar.png', partnersPage: false },
		{ url: 'integration-bitcoinvsdollar.upvsdown.com', logo: 'btcvsdollar.png', partnersPage: false },

		//upordown.io
		{ url: 'upordown.io', logo: 'upordownio.png', partnersPage: false },
		{ url: 'upordownio.upvsdown.com', logo: 'upordownio.png', partnersPage: false },
		{ url: 'integration-upordownio.upvsdown.com', logo: 'upordownio.png', partnersPage: false },

		//marketmakers.io
		{ url: 'marketmakers.io', logo: 'marketmakers.png', partnersPage: false },
		{ url: 'marketmakers.upvsdown.com', logo: 'marketmakers.png', partnersPage: false },
		{ url: 'integration-marketmakers.upvsdown.com', logo: 'marketmakers.png', partnersPage: false },

		//bcb.game
		{ url: 'bcb.game', logo: 'bcbgame.svg', partnersPage: false },
		{ url: 'bcbgame.upvsdown.com', logo: 'bcbgame.svg', partnersPage: false },
		{ url: 'integration-bcbgame.upvsdown.com', logo: 'bcbgame.svg', partnersPage: false },

		//trad3fi.io
		{ url: 'trad3fi.io', logo: 'trad3fi-logo.png', partnersPage: false },
		{ url: 'trad3fiio.upvsdown.com', logo: 'trad3fi-logo.png', partnersPage: false },
		{ url: 'integration-trad3fiio.upvsdown.com', logo: 'trad3fi-logo.png', partnersPage: false },

		//cryptoplay365.io
		{ url: 'cryptoplay365.io', logo: 'cryptoplay365.png', partnersPage: false },
		{ url: 'cryptoplay365io.upvsdown.com', logo: 'cryptoplay365.png', partnersPage: false },
		{ url: 'integration-cryptoplay365io.upvsdown.com', logo: 'cryptoplay365.png', partnersPage: false },

		//play2trade.io
		{ url: 'play2trade.io', logo: 'play2trade.png', partnersPage: false },
		{ url: 'play2tradeio.upvsdown.com', logo: 'play2trade.png', partnersPage: false },
		{ url: 'integration-play2tradeio.upvsdown.com', logo: 'play2trade.png', partnersPage: false },

		//walletswhales.com
		{ url: 'walletswhales.com', logo: 'trad3fi-logo.png', partnersPage: false },
		{ url: 'walletswhales.upvsdown.com', logo: 'trad3fi-logo.png', partnersPage: false },
		{ url: 'integration-walletswhales.upvsdown.com', logo: 'trad3fi-logo.png', partnersPage: false },
	],

	// assets
	assets: [
		{
			id: 'btc',
			title: 'BTC',
			isMarketClosed: false,
			remote_id: 'BTC',
			code: 'BTC',
			name: 'Bitcoin',
			tail_digits: 4,
			color_idx: 0,
			divisor: 4,
			linear_asset_id: '5ba15e',
			candle_asset_id: '08685a'
		},
		{
			id: 'eth',
			title: 'ETH',
			isMarketClosed: false,
			remote_id: 'ETH',
			code: 'ETH',
			name: 'Ethereum',
			tail_digits: 2,
			color_idx: 0,
			divisor: 4,
			linear_asset_id: '839bca',
			candle_asset_id: '618292'
		},
		{
			id: 'bnb',
			title: 'BNB',
			isMarketClosed: false,
			remote_id: 'BNB',
			code: 'BNB',
			name: 'binance',
			tail_digits: 2,
			color_idx: 0,
			divisor: 4,
			linear_asset_id: 'f290be',
			candle_asset_id: '8a9197'
		},
		{
			id: 'sol',
			title: 'Sol',
			isMarketClosed: false,
			remote_id: 'SOL',
			code: 'SOL',
			name: 'solana',
			tail_digits: 3,
			color_idx: 0,
			divisor: 4,
			linear_asset_id: '75aec0',
			candle_asset_id: '67da70'
		},
		{
			id: 'doge',
			title: 'Doge',
			isMarketClosed: false,
			remote_id: 'DOGE',
			code: 'DOGE',
			name: 'Doge',
			tail_digits: 6,
			color_idx: 0,
			divisor: 4,
			linear_asset_id: '127ef4',
			candle_asset_id: 'e924ad'
		},
		{
			id: 'shib',
			title: 'Shib',
			isMarketClosed: false,
			remote_id: 'SHIB',
			code: 'SHIB',
			name: 'shiba',
			tail_digits: 8,
			color_idx: 0,
			divisor: 8,
			linear_asset_id: '63fd37',
			candle_asset_id: '2e25df'
		},
		{
			id: 'pepe',
			title: 'Pepe',
			isMarketClosed: false,
			remote_id: 'PEPE',
			code: 'PEPE',
			name: 'Pepe',
			tail_digits: 9,
			color_idx: 0,
			divisor: 8,
			linear_asset_id: '3ceea7',
			candle_asset_id: 'f3598c'
		},
		// {
		// 	id: 'eur-usd',
		// 	title: 'EUR/USD',
		// 	isMarketClosed: false,
		// 	remote_id: 8,
		// 	code: 'eur-usd',
		// 	name: 'EUR/USD',
		// 	tail_digits: 6,
		// 	color_idx: 0,
		// 	linear_asset_id: 'c6e0e7',
		// 	candle_asset_id: '05ede1'
		// },
		// {
		// 	id: 'jpn-usd',
		// 	title: 'JPN/USD',
		// 	isMarketClosed: false,
		// 	remote_id: 9,
		// 	code: 'jpn-usd',
		// 	name: 'JPN/USD',
		// 	tail_digits: 4,
		// 	color_idx: 0,
		// 	linear_asset_id: '487b74',
		// 	candle_asset_id: 'aa144a'
		// },
		// {
		// 	id: 'gbp-usd',
		// 	title: 'GBP/USD',
		// 	isMarketClosed: false,
		// 	remote_id: 10,
		// 	code: 'gbp-usd',
		// 	name: 'GBP/USD',
		// 	tail_digits: 6,
		// 	color_idx: 0,
		// 	linear_asset_id: '5b3fa8',
		// 	candle_asset_id: 'a8dd7c'
		// },
		// {
		// 	id: 'nasdaq',
		// 	title: 'Nasdaq',
		// 	isMarketClosed: false,
		// 	remote_id: 11,
		// 	code: 'nasdaq',
		// 	name: 'Nasdaq',
		// 	tail_digits: 2,
		// 	color_idx: 0,
		// 	linear_asset_id: 'b167aa',
		// 	candle_asset_id: '9ba571'
		// },
		// {
		//     // id: 'dax',
		//     // title: 'Dax',
		//     // isMarketClosed: false,
		//     // remote_id: 12,
		//     // code: 'dax',
		//     // name: 'Dax',
		//     // tail_digits: 6,
		//     // color_idx: 0,
		//     // linear_asset_id: 'e37a52',
		//     // candle_asset_id: '9ba571'
		// },
		// {
		// 	id: 'oil',
		// 	title: 'Oil',
		// 	isMarketClosed: false,
		// 	remote_id: 12,
		// 	code: 'oil',
		// 	name: 'Oil',
		// 	tail_digits: 4,
		// 	color_idx: 0,
		// 	linear_asset_id: 'e37a52',
		// 	candle_asset_id: 'c4dbb7'
		// },
		// {
		// 	id: 'gold',
		// 	title: 'Gold',
		// 	isMarketClosed: false,
		// 	remote_id: 13,
		// 	code: 'gold',
		// 	name: 'Gold',
		// 	tail_digits: 3,
		// 	color_idx: 0,
		// 	linear_asset_id: 'd080ae',
		// 	candle_asset_id: 'e101a3'
		// },
	],
	asset: {
		id: 'btc',
		title: 'BTC',
		isMarketClosed: false,
		remote_id: 'BTC',
		code: 'BTC',
		name: 'Bitcoin',
		tail_digits: 4,
		color_idx: 0,
		linear_asset_id: '5ba15e',
		candle_asset_id: '08685a'
	},
	asset_rates: {

	},

	table_skin_colors,

	pool_routes: [
		'/trade',
		'/bitcoin-7',
		'/bitcoin-15',
		'/bitcoin-30',
		'/bitcoin-60', '/ethereum-60', '/binance-60', '/solana-60', '/doge-60', '/shiba-60', '/pepe-60',
		'/bitcoin-120',
		'/bitcoin-5-demo',
		'/bitcoin-15-demo',
		'/bitcoin-30-demo',
		'/bitcoin-60-demo',
		'/bitcoin-120-demo'
	],

	default_investment_index: 0,

	// tables,
	// active_table,

	// demo_tables,
	// demo_active_table,

	table_select_view: 'hidden',

	// position timing
	phase: 'pending',
	phase_confirmed: false,
	entryRate: null,
	expiryRate: null,
	nextRoundTimestamp: {
		start: 0,
		end: 0
	},

	current_round: {
		is_open: false,
		start_timestamp: 0,
		entry_timestamp: 0,
		expiry_timestamp: 0,
	},

	// graph data length
	graph_length_factor: {
		open: 3500,
		pending: 1150,
		multp: 1
	},
	turbo_graph_length_factor: {
		open: 1150, //3500,
		pending: 350
	},
	candle_graph_length_factor: {
		open: 2200,
		pending: 800,
	},
	candle_graph_length_factors: [
		{
			id: '5',
			route: '/trade',
			pool_id: '15:05:btc',
			open: 4500,
			pending: 3000,
			multp: 1
		},
		{
			id: '5',
			route: '/bitcoin-5-demo',
			pool_id: '15:05:demo:btc',
			open: 4500,
			pending: 3000,
			multp: 1
		},
		{
			id: '7',
			route: '/bitcoin-7',
			pool_id: '15:07:btc',
			open: 4500,
			pending: 3000,
			multp: 1
		},
		{
			id: '7',
			route: '/bitcoin-7-demo',
			pool_id: '15:07:demo:btc',
			open: 4500,
			pending: 3000,
			multp: 1
		},
		{
			id: '15',
			route: '/bitcoin-15',
			pool_id: '15:15:btc',
			open: 3200,
			pending: 2500,
			multp: 1
		},
		{
			id: '15',
			route: '/bitcoin-15-demo',
			pool_id: '15:15:demo:btc',
			open: 3200,
			pending: 2500,
			multp: 1
		},
		{
			id: '30',
			route: '/bitcoin-30',
			pool_id: '15:30:btc',
			open: 2200,
			pending: 1800,
			multp: 1
		},
		{
			id: '30',
			route: '/bitcoin-30-demo',
			pool_id: '15:30:demo:btc',
			open: 2200,
			pending: 1800,
			multp: 1
		},
		{
			id: '60',
			route: '/bitcoin-60',
			pool_id: '30:60:btc',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60-eth',
			route: '/ethereum-60',
			pool_id: '30:60:eth',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60-bnb',
			route: '/binance-60',
			pool_id: '30:60:bnb',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60-sol',
			route: '/solana-60',
			pool_id: '30:60:sol',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60-doge',
			route: '/doge-60',
			pool_id: '30:60:doge',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60-shib',
			route: '/shiba-60',
			pool_id: '30:60:shib',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60-pepe',
			route: '/pepe-60',
			pool_id: '30:60:pepe',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '60',
			route: '/bitcoin-60-demo',
			pool_id: '30:60:btc',
			open: 1500,
			pending: 1200,
			multp: 1
		},
		{
			id: '120',
			route: '/bitcoin-120',
			open: 1500,
			pending: 1500,
			multp: 2
		},
		{
			id: '120',
			route: '/bitcoin-120-demo',
			open: 1500,
			pending: 1500,
			multp: 2
		},
	],

	graph_length_factors: [
		{
			id: '5',
			route: '/trade',
			pool_id: '15:05:btc',
			open: 1750,
			pending: 600,
			multp: 2
		},
		{
			id: '5',
			route: '/bitcoin-5-demo',
			pool_id: '15:05:demo:btc',
			open: 1750,
			pending: 600,
			multp: 2
		},
		{
			id: '7',
			route: '/bitcoin-7',
			pool_id: '15:07:btc',
			open: 1750,
			pending: 400,
			multp: 1
		},
		{
			id: '7',
			route: '/bitcoin-7-demo',
			pool_id: '15:07:demo:btc',
			open: 1750,
			pending: 400,
			multp: 1
		},
		{
			id: '15',
			route: '/bitcoin-15',
			pool_id: '15:15:btc',
			open: 3500,
			pending: 1550,
			multp: 1
		},
		{
			id: '15',
			route: '/bitcoin-15-demo',
			pool_id: '15:15:demo:btc',
			open: 3500,
			pending: 1550,
			multp: 1
		},
		{
			id: '30',
			route: '/bitcoin-30',
			pool_id: '15:30:btc',
			open: 3500,
			pending: 1150,
			multp: 1
		},
		{
			id: '30',
			route: '/bitcoin-30-demo',
			pool_id: '15:30:demo:btc',
			open: 3500,
			pending: 1150,
			multp: 1
		},
		{
			id: '60',
			route: '/bitcoin-60',
			pool_id: '30:60:btc',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60-eth',
			route: '/ethereum-60',
			pool_id: '30:60:eth',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60-bnb',
			route: '/binance-60',
			pool_id: '30:60:bnb',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60-sol',
			route: '/solana-60',
			pool_id: '30:60:sol',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60-doge',
			route: '/doge-60',
			pool_id: '30:60:doge',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60-shib',
			route: '/shiba-60',
			pool_id: '30:60:shib',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60-pepe',
			route: '/pepe-60',
			pool_id: '30:60:pepe',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '60',
			route: '/bitcoin-60-demo',
			pool_id: '30:60:demo:btc',
			open: 4500,
			pending: 2250,
			multp: 2
		},
		{
			id: '120',
			route: '/bitcoin-120',
			open: 1500,
			pending: 1500,
			multp: 2
		},
		{
			id: '120',
			route: '/bitcoin-120-demo',
			open: 1500,
			pending: 1500,
			multp: 2
		},
	],

	turbo_graph_length_factors: [
		{
			id: '5',
			pool_id: '15:05:btc',
			route: '/trade',
			open: 1150,
			pending: 250,
			multp: 1
		},
		{
			id: '5',
			route: '/bitcoin-5-demo',
			pool_id: '15:05:demo:btc',
			open: 1150,
			pending: 250,
			multp: 1
		},
		{
			id: '7',
			route: '/bitcoin-7',
			pool_id: '15:07:btc',
			open: 1150,
			pending: 320,
			multp: 1
		},
		{
			id: '7',
			route: '/bitcoin-7-demo',
			pool_id: '15:07:demo:btc',
			open: 1150,
			pending: 320,
			multp: 1
		},
		{
			id: '15',
			route: '/bitcoin-15',
			pool_id: '15:15:btc',
			open: 1150,
			pending: 500,
			multp: 1
		},
		{
			id: '15',
			route: '/bitcoin-15-demo',
			pool_id: '15:15:demo:btc',
			open: 1350,
			pending: 700,
			multp: 1
		},
		{
			id: '30',
			route: '/bitcoin-30',
			pool_id: '15:30:btc',
			open: 1150,
			pending: 700,
			multp: 1
		},
		{
			id: '30',
			route: '/bitcoin-30-demo',
			pool_id: '15:30:demo:btc',
			open: 1150,
			pending: 700,
			multp: 1
		},
		{
			id: '60',
			route: '/bitcoin-60',
			pool_id: '30:60:btc',
			open: 1350,
			pending: 675,
			multp: 1
		},
		{
			id: '60-eth',
			route: '/ethereum-60',
			pool_id: '30:60:eth',
			open: 1350,
			pending: 675,
			multp: 1
		},
		{
			id: '60-bnb',
			route: '/binance-60',
			pool_id: '30:60:bnb',
			open: 1350,
			pending: 675,
			multp: 1
		},
		{
			id: '60-sol',
			route: '/solana-60',
			pool_id: '30:60:sol',
			open: 2000,
			pending: 875,
			multp: 1
		},
		{
			id: '60-doge',
			route: '/doge-60',
			pool_id: '30:60:doge',
			open: 1350,
			pending: 675,
			multp: 1
		},
		{
			id: '60-shib',
			route: '/shiba-60',
			pool_id: '30:60:shib',
			open: 1350,
			pending: 675,
			multp: 1
		},
		{
			id: '60-pepe',
			route: '/pepe-60',
			pool_id: '30:60:pepe',
			open: 1350,
			pending: 675,
			multp: 1
		},
		{
			id: '60',
			route: '/bitcoin-60-demo',
			pool_id: '30:60:demo:btc',
			open: 3000,
			pending: 2000,
			multp: 3
		},
		{
			id: '120',
			route: '/bitcoin-120',
			open: 1500,
			pending: 1500,
			multp: 2
		},
		{
			id: '120',
			route: '/bitcoin-120-demo',
			open: 1500,
			pending: 1500,
			multp: 2
		},
	],


	// if trade was to br closed now: win, lose, tie, none 
	tradePlace: 'none',
	last_result: 'none',

	// allowed investments
	investment_amounts: [],

	// pools positions and sums
	pool: {
		total: 0,
		up: {
			total: 0,
			payout_percent: 200,
			positions: {}
		},
		down: {
			total: 0,
			payout_percent: 200,
			positions: {}
		}
	},

	button_bet: {
		up: null,
		down: null
	},

	// current user's involvment
	customer: {
		id: 1548,
		balance: 0,
		countryCode: localStorage.getItem("countryCode") || 'US',
		avatar: localStorage.getItem("avatar") ? localStorage.getItem("avatar") : `https://robohash.org/` + Math.floor(Math.random() * (999999 - 1 + 1) + 1) + '?set=set' + Math.floor(Math.random() * (4 - 1 + 1) + 1),
		last_round_pnl: 0,
		auto_trade: {
			active: 'none',
			times_selected: 0,
			times_left: 0,
			trade_investment: 0
		},
		investment: {
			up: 0, down: 0
		},
		following: [

		],
	},

	open_trades: {

	},

	// auto trade selection
	show_auto_trade_select: 'none',
	auto_trade_times_options: [5, 10, 25, 50],

	selected_investment: 0,

	// market history
	last_results: [],
	asset_history: [],
	history_point_duration: 1000,
	history_max_points: 240,

	// leadersboard
	leadersboard: [],

	affiliate_payouts: {
		tier1: 20,
		tier2: 10,
		tier3: 5,
	},

	max_user_campaigns: 20,

	user_campaigns: [],

	sap_user_campaigns: [],

	// Domains without demo switch buttons
	noDemoSwitchDomains: [
	// 'localhost',
		// 'akon.loca.lt'
		'sharker.com',
		'upvsdown.com',
		// 'prod-latest-cryptofights.playblock.io'
	],

	noAssetsSwitchDomains: [
		'sharker.com',
		'upvsdown.com',
		// 'localhost',
		// 'akon.loca.lt'
	],

	noRegularLeaderboardDomains: [],
	noWinsPaidLeaderboardDomains: [
		'cryptofights.pro',
		'prod-latest-cryptofights.upvsdown.com',
		'localhost',
		// add domains here that you want to hide the wins paid leaderboard instead of the net profit leaderboard
	],

	telegramServer: "https://tb.playnance.com",
	telegramBots: [
		{
		domain: "prod-latest.playblock.io",
		// botToken: "7336956643:AAEsfPmMAnMXfdKk3q9aWB8RMjfJrOqhMIM",
		botName: "VsTestNum1Bot",
		brandHost: "upvsdown_com",
		displayText: "%F0%9F%92%B8Play%20Now%21%20Earn%20Crypto%21%F0%9F%92%B8",
		},
		{
		domain: "upvsdown",
		// botToken: "7253683595:AAFJtQ6P_dYqTgZVEvPee0mwLIXPc4lZAVA",
		botName: "UPvsDownGamebot",
		brandHost: "upvsdown_com",
		displayText: "%F0%9F%92%B8Play%20Now%21%20Earn%20Crypto%21%F0%9F%92%B8",
		},
		/* { // for developers testing
		domain: "orkon.loca.lt",
		botName: "VsTestNum1Bot",
		brandHost: "upvsdown_com",
		displayText: "%F0%9F%92%B8Play%20Now%21%20Earn%20Crypto%21%F0%9F%92%B8",
		},
 		*/
		// add telegram bots here
	],
	  
}