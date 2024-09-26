import appConfig from "./API/appConfig";

// main configuration retriver and manager
class Config {
	constructor() {
		this.streamer_urls = {
			asset_rates: {
				'BTC': 'wss://ds.upvsdown.com/sub?id=rates_tickers_btc',
				'ETH': 'wss://ds.upvsdown.com/sub?id=rates_tickers_eth',
				'BNB': 'wss://ds.upvsdown.com/sub?id=rates_tickers_bnb',
				'SOL': 'wss://ds.upvsdown.com/sub?id=rates_tickers_sol',
				'DOGE': 'wss://ds.upvsdown.com/sub?id=rates_tickers_doge',
				'SHIB': 'wss://ds.upvsdown.com/sub?id=rates_tickers_shib',
				'PEPE': 'wss://ds.upvsdown.com/sub?id=rates_tickers_pepe',
				// 'PEPE': 'wss://ds.upvsdown.com/sub?id=rates_tickers_eur_usd',
				// 9: 'wss://ds.upvsdown.com/sub?id=rates_tickers_usd_jpy',
				// 10: 'wss://ds.upvsdown.com/sub?id=rates_tickers_gbp_usd',
				// 11: 'wss://ds.upvsdown.com/sub?id=rates_tickers_ndx_usd_bfx',
				// 12: 'wss://ds.upvsdown.com/sub?id=rates_tickers_wti_usd_bfx',
				// 13: 'wss://ds.upvsdown.com/sub?id=rates_tickers_xau_chf_bfx'
				// 100: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=tickers_update_100',
				// 101: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=tickers_update_101',
				// 102: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=tickers_update_102',
				// 103: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=tickers_update_103',
				// 104: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=tickers_update_104',
				// 105: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=tickers_update_105',
			},
			//rounds: 'wss://integration-updates-streamer.blitzbinary.com/sub?id=update_upvsdown_round_int_v3'
		}
	}

	// load remote configurations using this method
	async fetch() {
		return appConfig.getAppConfig();
	}
}

export default Config