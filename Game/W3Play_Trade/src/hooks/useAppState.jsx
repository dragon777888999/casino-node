import { useState, useEffect } from 'react';
import APP from './../app'

const useAppState = (path, defaultVal) => {
    const [result, setResult] = useState(defaultVal === undefined ? APP.state.get(path) : defaultVal);

    useEffect(() => {
        var listener = state_data => {
            if (typeof state_data == 'object' && !Array.isArray(state_data) && state_data !== null) {
                // required so updates always trigger
                state_data = { ...state_data }
            }
            setResult(state_data)
        };
        APP.state.sub(path, listener);
        return () => APP.state.unsub(path, listener);
    }, [path])

    return result;
}

export default useAppState;