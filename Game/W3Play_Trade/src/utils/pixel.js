import state from "../state";

export function pixelIdByWh() {
    // search for whitelabel pixel id 
    return state.whitelabels.find(wh => wh.url === window.location.hostname);
}