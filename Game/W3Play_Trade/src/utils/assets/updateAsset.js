import APP from "../../app";
import { set_chosen_asset } from "../../REDUX/actions/main.actions";
import state from "../../state";

export default (dispatch) => {

    let new_asset,
        saved_asset_obj = APP.state.get('asset'),
        lastStreamerAssetId = APP.state.get('lastStreamerAssetId'),
        current_asset = state.assets.find(itm => location.pathname.includes(itm.name?.toLowerCase()));

    if (current_asset?.id === 'btc' || location.hostname.includes('trade') || location.hostname.includes('bitcoin')) {
        new_asset = state.assets.find(itm => itm.id == 'btc');
    }

    else if (lastStreamerAssetId !== saved_asset_obj.remote_id) {
        new_asset = current_asset;
    }
    // prevent re-init of asset
    else if (location.pathname.includes(saved_asset_obj?.name?.toLowerCase())) {
        return;
    }
    else if (current_asset) {
        new_asset = current_asset;
    }
    else {
        new_asset = state.assets.find(itm => itm.id == 'btc');
    }

    APP.controller.unsubscribeToRatesNchan(lastStreamerAssetId);
    APP.controller.set_asset(new_asset)

    setTimeout(() => {
        APP.state.set('asset', new_asset);
        APP.controller.subscribeToRates();
    }, 500);

    dispatch(set_chosen_asset({ id: current_asset?.id, title: current_asset?.title }));
}