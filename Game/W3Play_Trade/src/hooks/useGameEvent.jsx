import { useState, useEffect } from 'react';
import APP from './../app';

/**
 * this hook lets you listen to specific event on the game controller
 * and get the last payload of the event to your view
 * @param {String} event 
 * @returns {Array}
 */
const useGameEvent = (event) => {
    const [last_args, set_last_args] = useState([]);
        
    useEffect(() => {
        var listener = (...args) => set_last_args(args);
        APP.controller.sub(event, listener);
        return () => APP.controller.unsub(event, listener);
    }, [event])

    return last_args;
}

export default useGameEvent;