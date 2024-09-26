import { useState, useEffect } from 'react';
import APP from './../app';
import { deep_copy } from '../utils/object';

/**
 * @param {Number} id 
 * @returns {Array}
 */
const useBet = (id) => {
    //console.log('in use bet ', id, new Date());
    const [bet_data, set_bet] = useState(id && deep_copy(APP.customer.get_pending_bet(id)));

    useEffect(() => {
        if (!id) return;
        var listener = event_bet => event_bet.local_id == id && set_bet(deep_copy(event_bet));
        APP.controller.sub('bet_placement', listener);
        return () => APP.controller.unsub('bet_placement', listener);
    }, [id])

    return bet_data;
}

export default useBet;