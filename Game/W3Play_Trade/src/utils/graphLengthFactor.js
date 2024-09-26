import APP from "../app";
import state from "../state";

export default (pool_id, phase) => {

    const currentGraphFactors = state.graph_length_factors.find(gr => gr.pool_id === pool_id);

    if (phase) {
        if (currentGraphFactors) return currentGraphFactors[phase];
        else return APP.state.get('graph_length_factor.' + phase);
    }
    else {
        if (currentGraphFactors) return currentGraphFactors;
        else return APP.state.get('graph_length_factor');
    }
}