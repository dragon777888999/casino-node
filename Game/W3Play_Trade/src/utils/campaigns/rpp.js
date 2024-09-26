import APP from "../../app";
import state from "../../state";

// get iframe that has to be loaded by specific rpp 
export default async function fetchCampaign(rpp) {
    try {
        const response = await fetch(state.rpp_campaign_url + rpp);
        if (response.ok) {
            const data = await response.text();
            APP.state.set('external_campaign_load', data);
            return data;
        }
    } catch (error) {
        console.error('err rpp', error);
    }
};