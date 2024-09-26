import state from "../state";

// prevent specific domains from routing
export default function blockDomainRouting() {
    return state.block_routing_domains.find(itm => itm === window.location.hostname);
}