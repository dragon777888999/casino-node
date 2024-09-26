import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_alert_msg, set_chosen_asset, set_demo_mode } from "../../REDUX/actions/main.actions";
import useAppState from "../../hooks/useAppState";
import APP from "./../../app";
import switch_pool_handler from "../../utils/pools/switchPool";
import state from "../../state";

const GameModeSwitch = () => {

  const mainRememberState = useSelector(state => state.mainRememberReducer);
  const isDemo = mainRememberState?.currentPool?.uid?.includes('demo');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // switch platform work with demo mode
  const switchDemo = (e) => {

    // default demo table asset should be btc
    if (APP.state.get('asset')?.id !== 'btc') {

      const current_asset = state.assets.find(item => item.id === 'btc');

      APP.controller.unsubscribeToRatesNchan();
      APP.controller.set_asset(current_asset)

      setTimeout(() => {
        APP.state.set('asset', current_asset);
        APP.controller.subscribeToRates();
      }, 500);


      if (current_asset) dispatch(set_chosen_asset({ id: current_asset.id, title: current_asset.title }));

    }

    if (mainRememberState?.currentPool?.uid?.includes('demo')) return;
    e.stopPropagation();

    let navRoute = '/bitcoin-5-demo' + (mainRememberState?.initialParams ? `?${mainRememberState.initialParams}` : '');
    let demoActiveTable = APP.state.get('demo_active_table');
    // When switching to demo mode, we need to set the asset to the first asset in the assets array
    APP.state.set('asset', APP.state.get('assets')[0]);

    APP.state.set('currentToken', 'demo');
    switch_pool_handler(dispatch, navigate, demoActiveTable, demoActiveTable.color, navRoute)

    dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_demo_mode_switch' }))
    dispatch(set_demo_mode({ active: true }))

    setTimeout(() => {
      APP.customer.update_balance();
    }, 50);
  };

  // switch platform work with real mode
  const switchReal = (e) => {

    if (!mainRememberState?.currentPool?.uid?.includes('demo')) return;
    e.stopPropagation();

    let navRoute = '/trade' + (mainRememberState?.initialParams ? `?${mainRememberState.initialParams}` : '');
    let activeTable = APP.state.get('tables').find(itm => itm.selected);

    APP.state.set('currentToken', 'real');
    switch_pool_handler(dispatch, navigate, activeTable, activeTable.color, navRoute);

    dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_real_mode_switch' }))
    dispatch(set_demo_mode({ active: false }))

    setTimeout(() => {
      APP.customer.update_balance();
    }, 50);
  };

  return (
    <div className="game_mode_switch">
      <div
        className={"real " + (!isDemo ? "active" : "")}
        onClick={switchReal}>
        <p><span>{APP.term("menu_real")}</span></p>
      </div>
      <div
        className={"demo " + (isDemo ? "active" : "")}
        onClick={switchDemo}>
        <p><span>{APP.term("menu_fun")}</span></p>
      </div>
    </div>
  );
};

export default GameModeSwitch;