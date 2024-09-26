import APP from "./../app";
import { GameClient } from "./../API/GameClient";
// import { GameClient } from "../utils/game/clients/GameClient";
import TablesModel from "./../models/Tables";
import TableModel from "./../models/Table";
import { remove_once } from "../utils/array";
import Streamer from "./../API/streamer";
import { to_precision } from "./../utils/number";
import StreamerSingleton from "../API/StreamerSingleton";
import { waitForInitialization } from "./../utils/game/utilities/utils";
import AblyClientSingleton from "../API/Ably/AblyClientSingleton";
import state from "../state";
import pools from "../API/pools";

const { now } = Date;

export default class GameController {
  constructor() {
    this.did_init = false;
    this.bind_self();
    // event subscribers
    this.subs = {};
    // property for managing server time
    this.server_delta = 0;

    // Add a popstate listener to handle browser back/forward navigation
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  async init(address) {

    // request configurations from server
    APP.state.set("skin_loader", true);
    let res = await APP.config.fetch();
    // let pools_res = await pools.getPoolsConfig();

    // console.log(pools_res.data._data.REAL, 'pool_res')

    if (!res.error) {
      this.cfg = res.data;

      APP.state.set(
        "partnerRef",
        res?.data?.partnerInfo?.partnerRef || "playnance"
      );
      APP.state.set("skin_idx", Number(res?.data?.partnerInfo?.skinId) || 0);

      // Get the current pool based on the current route
      const isDemo = APP.state.get("currentPoolId")?.includes("demo");
      const tables = APP.state.get(isDemo ? "demo_tables" : "tables");

      const currentPool = tables.find(
        (pool) => pool.uid === APP.state.get("currentPoolId")
      );

      if (currentPool) {
        const assetName = this.getAssetNameFromPool(currentPool);
        const matchedAsset = APP.state
          .get("assets")
          .find((asset) => asset.id === assetName);

        if (matchedAsset) {
          // Set the asset to the matched one
          APP.state.set("asset", matchedAsset);
        } else {
          // If no matching asset is found, fall back to the first asset
          APP.state.set("asset", APP.state.get("assets")[0]);
        }
      } else {
        // If no pool is found, set the first asset as default
        APP.state.set("asset", APP.state.get("assets")[0]);
      }

      // assign brand logo
      APP.state.set("brand_logo", res?.data?.partnerInfo?.logoUrl);

      // TO DO: IF INDEX != 0 keep loader
      // if(!) APP.state.unset('skin_loader')
      // else APP.state.set('skin_loader', true)
    }
    // set table model
    this.tables = new TablesModel(APP.state.get("tables"));
    // set initial asset
    // alert(JSON.stringify({ initNiw: address }))

    this.set_asset(APP.state.get("asset"), address);
  }

  bind_self() {
    this.update_asset_rate = this.update_asset_rate.bind(this);
    this.on_round_event = this.on_round_event.bind(this);
  }

  /**
   * @returns {Number}
   */
  server_now() {
    return now() + this.server_delta;
  }

  /**
   *
   * @param {Number} time
   */
  server_sync(time) {
    this.server_delta = time - now();
  }

  //Subscribe to rates from Nchan
  subscribeToRatesNchan() {
    // Unsubscribe from any existing streamer
    this.unsubscribeToRatesNchan();

    const currentAsset = APP.state.get("asset");
    const streamerUrl =
      APP.config.streamer_urls.asset_rates[currentAsset.remote_id];

    if (streamerUrl) {
      console.log("Subscribing to: ", streamerUrl);

      // Initialize a new streamer
      this.asset_streamer = StreamerSingleton.getInstance(
        "rates",
        streamerUrl,
        {
          onUpdate: this.update_asset_rate,
        }
      );
      APP.state.set("ratesStreamerInitialized", true);
      APP.state.set("lastStreamerAssetId", currentAsset.remote_id);
    } else {
      console.error("Streamer URL not found for asset:", currentAsset);
    }
  }

  unsubscribeToRatesNchan(unsubscribedId) {
    if (this.asset_streamer) {
      const currentAsset = APP.state.get("asset");
      const streamerUrl =
        APP.config.streamer_urls.asset_rates[unsubscribedId || currentAsset.remote_id];

      if (streamerUrl) {
        console.log("Unsubscribing from: ", streamerUrl);
        StreamerSingleton.closeInstance("rates", streamerUrl);
      }
      this.asset_streamer = null;
    }
  }

  handlePopState(event) {
    const currentPool = this.getCurrentPool();
    if (currentPool) {
      const assetName = this.getAssetNameFromPool(currentPool);
      const matchedAsset = APP.state
        .get("assets")
        .find((asset) => asset.id === assetName);

      if (matchedAsset) {
        this.set_asset(matchedAsset);
      }
    }
  }

  getCurrentPool() {
    const isDemo = APP.state.get("currentPoolId")?.includes("demo");
    const tables = APP.state.get(isDemo ? "demo_tables" : "tables");
    return tables.find((pool) => pool.route === location.pathname);
  }

  getAssetNameFromPool(pool) {
    return pool.name.replace(/^60-/, ""); // Adjust the regex based on your actual naming convention
  }

  //Subscribe to rates from Ably
  subscribeToRatesAbly() {
    console.log("rates using ably");
    let ablyClient = AblyClientSingleton.getClient();
    let rates_channel =
      (this.graph_type || APP.state.get("graph_mode")?.type) === "candles"
        ? state.candle_rate_ably_channel
        : state.rate_ably_channel;

    //channel.once('attached', fetchHistoricalData);
    this.asset_streamer = ablyClient.channels
      .get(rates_channel)
      .subscribe((msg) => {
        // only ticker type can be passed
        let type = JSON.parse(msg?.data)?.type;
        if (type !== "ticker") return;
        this.update_asset_rate({
          lastPrice: JSON.parse(msg?.data)?.price?.toString(),
          lastTimeMs: JSON.parse(msg?.data)?.timestamp * 1000,
        });

        APP.state.set("ratesStreamerInitialized", true);
      });
  }

  subscribeToRates() {
    //Temp disable rates from Ably
    //If user is connected
    // if (APP.state.get('wallet_address')){
    // 	this.subscribeToRatesAbly();
    // }else{
    this.subscribeToRatesNchan();
    //}
  }

  // rates logic using ably and only if wallet connected
  // if (state.rate_ably && !this.asset_streamer) {
  // 	console.log('rates using ably')
  // 	let ablyClient = AblyClientSingleton.getClient();
  // 	let rates_channel = ((this.graph_type || APP.state.get('graph_mode')) === 'candles') ? state.candle_rate_ably_channel : state.rate_ably_channel;
  // 	//console.log('\n\nrates_channel:\n\n ', rates_channel, this.graph_type, APP.state.get('graph_mode'))

  // 	//channel.once('attached', fetchHistoricalData);
  // 	this.asset_streamer = ablyClient.channels.get(rates_channel)
  // 		.subscribe(msg => {

  // 			// only ticker type can be passed
  // 			let type = JSON.parse(msg?.data)?.type;
  // 			if (type !== 'ticker') return;
  // 			this.update_asset_rate({
  // 				lastPrice: JSON.parse(msg?.data)?.price?.toString(),
  // 				lastTimeMs: JSON.parse(msg?.data)?.timestamp * 1000
  // 			})

  // 			APP.state.set('ratesStreamerInitialized',true);
  // 		})
  // }
  // // rates logic using regular streamer
  // else {
  // 	console.log('rates using reg streamer')
  // 	this.asset_streamer = StreamerSingleton.getInstance('rates', APP.config.streamer_urls.asset_rates[asset.remote_id], { onUpdate: this.update_asset_rate })
  // 	APP.state.set('ratesStreamerInitialized',true);
  // }
  //}

  //Unsubscribe from Ably streamer - rates channel
  unsubscribeFromRatesAbly() {
    this.asset_streamer = false;
    let rates_channel =
      (this.graph_type || APP.state.get("graph_mode")?.type) === "candles"
        ? state.candle_rate_ably_channel
        : state.rate_ably_channel;
    let ablyClient = AblyClientSingleton.getClient();
    ablyClient.channels.get(rates_channel).detach();
  }

  //Unsubscribe from nchan streamer - rates channel
  unsubscribeFromRatesNchan() { }

  unsubscribeFromRates() {
    //If user is connected
    if (!APP.state.get("wallet_address")) this.unsubscribeFromRatesAbly();
  }

  /**
   * @param {Object} asset
   */
  set_asset(asset, address) {

    if (APP.state.get("asset").id === asset.id) return;

    if (navigator.userAgent.includes("MetaMaskMobile")) {
      this.unsubscribeToRatesNchan();
    }

    APP.state.set("asset", asset);
    this.active_asset = asset;

    // this.subscribeToRatesNchan();

    const isDemo = APP.state.get("currentPoolId")?.includes("demo");
    const currentPool = APP.state
      .get(isDemo ? "demo_tables" : "tables")
      .find((pool) => pool?.uid === APP.state.get("active_table")?.uid);
    let contractAddress;

    if (!currentPool) {
      contractAddress = APP.state.get("active_table").contract_adderess;
    } else {
      contractAddress = currentPool.contract_adderess;
    }

    if (currentPool) {
      this.set_table(currentPool, contractAddress);
    }
  }

  /**
   * @param {{timestamp: {Number}, price: {string}}} data
   * @returns
   */
  update_asset_rate(data) {
    // console.log('in update asset', data?.symbol?.toLowerCase(), APP.state.get('asset')?.id.toLowerCase())
    // corrupt update data just ignore
    if (!data || !data?.symbol.toLowerCase().includes(APP.state.get('asset')?.id.toLowerCase())) return;
    const parsedData = data;

    // format input for JS
    const time = to_precision(parsedData.timestamp, 0),
      rate = Number(parsedData.price);
    // sync server time
    this.server_sync(time);
    // let table know about the update
    // if (this.active_table === undefined) {
    //   this.set_table(false).then((result) => {
    //     console.log(result);
    //   });
    // }

    this.active_table.on_rate_update({ rate, time });
  }

  update_graph_type(type) {
    this.graph_type = type;
    // console.log(type, 'type...')
    this.active_table.get_graph_data(type);
    // this.set_asset(APP.state.get('asset'));
  }
  on_round_event(data) {
    // TODO: connect phase controller view functionality here
    // alert(JSON.stringify(new Date(data?.params?.timeMs)))
    // console.log('on_round_event', data);
  }

  // auto_select_table() {

  // 	//not needed!
  // 	return;

  // 	console.log('auto_select_table');

  // 	let selected_table = (
  // 		this.tables.get_same_time_table(this.active_asset.id, this.active_table)
  // 		|| this.tables.get_default_table(this.active_asset.id)
  // 	);

  // 		console.log('selected_table',selected_table);

  // 	if (selected_table){
  // 		this.set_table(selected_table);
  // 	}
  // }

  /**
   * @param {Object} table
   */
  async set_table(table, address) {
    //Get table setup according to the route
    // const isDemo = table?.uid?.includes('demo');
    // table = APP.state
    //   .get(isDemo ? "demo_tables" : "tables")
    //   .find((pool) => pool.route === location.pathname);

    // trade page logic
    if (state.pool_routes.includes(location.pathname)) {

      if (location.pathname !== table?.route) {
        const isPathnameDemo = location.pathname?.includes("demo");
        const tables = APP.state.get(isPathnameDemo ? "demo_tables" : "tables");
        table = tables.find((itm) => itm.route === location.pathname);
        // APP.state.set('asset',APP.state.get('assets')[0]);
        if (table) {
          const assetName = table.name.replace(/^60-/, ""); // Remove '60-' from the table name
          const matchedAsset = APP.state
            .get("assets")
            .find((asset) => asset.id === assetName);
          if (matchedAsset) {
            APP.state.set("asset", matchedAsset);
            // dispatch(set_chosen_asset(matchedAsset));
          }
        }
      } else {
        //
      }
    }
    // not trade page (home /inner pages)
    else {
      const isDemoInnerPage = table?.uid?.includes("demo");
      const tables = APP.state.get(isDemoInnerPage ? "demo_tables" : "tables");

      table = tables.find((itm) => itm.uid === table?.uid);

      APP.state.set("current_game_address", table?.contract_adderess);
    }

    if (table === undefined)
      // table = APP.state.get('tables')[0]; //default contract is the first contract
      table = APP.state.get("active_table"); //default contract is active one (selected as default)

    this.active_table && this.active_table.destroy();
    this.active_table = new TableModel(table, this.active_asset);

    // console.log(table.contract_adderess, "table.contract_adderess Game.js");

    // alert(JSON.stringify({ c: table }))

    // APP.state.set("contract_adderess", table.contract_adderess);
    // console.log(table, 'table...')
    APP.state.set("investment_amounts", JSON.parse(table.investments));

    // if (!this.did_init) {
    if (!APP.state.get("loadedController")) {
      APP.state.set("loadedController", true);

      await GameClient?.init(table.contract_adderess || address);
      this.did_init = true;
    }

    await GameClient?.setGameAddress(table?.contract_adderess || address);
    // console.log(table.contract_adderess, "table.contract_adderess Game.js2", address, location.pathname);
    // await waitForInitialization("lastRoundStartedEvent");
    await this.active_table?.init();

    // console.log("in set_table", table);

    let newTable = APP.state
      .get("tables")
      .find((itm) => itm.contract_adderess === address);

    // console.log(table.contractAddress, "table.contractAddress Game.js3", newTable || table);
    APP.state.set("active_table", newTable || table);
  }

  deleteTableSubs() {
    // console.log('\n\n\n\n', 'DELETING', this.active_table, '\n\n\n\n')
    this.active_table?.destroy();
  }

  loadBets() {
    // console.log('\n\n\n\n', 'LOADING BETS AGAIN', this.active_table, '\n\n\n\n')
    this.active_table?.load_bets();
  }

  /**
   * add new subscriber
   * create a new channel if needed
   * @param {String} event
   * @param {Function} func
   */
  sub(event, func) {
    if (!(event in this.subs)) this.subs[event] = [func];
    else this.subs[event].push(func);
  }

  /**
   * removes a subscription if present
   * removes the channel if it was it's last sub
   * @param {String} event
   * @param {Function} func
   */
  unsub(event, func) {
    if (!(event in this.subs)) return;
    let channel = this.subs[event];
    remove_once(channel, func);
    if (channel.length == 0) delete this.subs[event];
  }

  /**
   * publish event with any arguments to all listeners
   * @param {String} event
   * @param  {...any} args
   */
  publish(event, ...args) {
    if (event in this.subs) for (let func of this.subs[event]) func(...args);
  }

  /**
   * enable reinitialize streamer
   * delete the blocked var
   */
  reset_streamer() {
    console.log("reset_streamer", "did_init:", this.did_init);
    this.did_init = false;
  }
}
