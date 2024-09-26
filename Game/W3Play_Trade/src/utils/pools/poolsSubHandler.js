const poolSubHandler = (keyToRemove, isDemo) => {

    const poolsSubState = /*isDemo === 'demo' ? 'pools_subs_demo' :*/ 'pools_subs';
    const currentState = APP.state.get(poolsSubState);
    const newState = {};

    for (const eventName in currentState) {
        if (currentState.hasOwnProperty(eventName)) {

            // copying the current nested object and deleting the key to remove
            const updatedObject = { ...currentState[eventName] };
            delete updatedObject[keyToRemove];

            newState[eventName] = updatedObject;
        }
    }

    APP.state.set(poolsSubState, newState);
};

export default poolSubHandler;
