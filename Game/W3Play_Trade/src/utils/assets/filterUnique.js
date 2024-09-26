import state from "../../state";

export default function filterUnique(pools) {

    let uniquePoolsGroups = [...new Set(pools.map(item => item.asset))],
        newItems = uniquePoolsGroups.map(asset => {
            return state.assets.find(itm => itm.remote_id === asset);
        });
    return newItems;
}