import APP from "../../app";
import { set_loader, set_new_pool, set_pools_popup } from "../../REDUX/actions/main.actions";
import { sleep } from "../async";
import clear_table from "../clearTable";
import poolSubHandler from "./poolsSubHandler";

export default async (dispatch, navigate, nextPool, color, navRoute) => {

    const { uid, pool_id, contract_adderess, route, name } = nextPool;

    APP.state.unset('loaded_table');

    dispatch(set_pools_popup(false));
    poolSubHandler(uid);
    // poolSubHandler(APP.state.get('currentPoolId'));
    // await sleep(1000);
    // APP.controller.deleteTableSubs();
    dispatch(set_loader(true))

    const url = new URL(navRoute, window.location.origin),
        currentPathname = url.pathname;

    if (currentPathname !== location.pathname) {
        navigate(navRoute || route);
    }

    APP.state.set('preventInitialLoadingBets', true)
    APP.state.set('switched_pool', pool_id);
    APP.state.set('currentPoolId', uid);
    APP.state.set('current_game_address', contract_adderess);

    // clear calc of pools bet amounts
    APP.state.set('total_pool_down', 0);
    APP.state.set('total_pool_up', 0);

    // clear_table();

    await APP.controller.set_table(nextPool, contract_adderess);

    APP.state.unset('did_round_end_once');
    APP.state.unset('show_result');

    APP.state.set('resetGraph', true);
    APP.state.set('timer_update', true);

    setTimeout(() => {
        dispatch(set_loader(false))
    }, 1000);

    APP.state.unset('preventInitialLoadingBets')
    APP.state.unset('did_round_end_once');
    APP.controller.loadBets();

    dispatch(set_new_pool({ displayed_msg: true, name, symbol_color: color, pool_id, uid, route }));
}