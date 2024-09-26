import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import mainReducer from '../reducers/main.reducer';
import mainRememberReducer from '../reducers/main.remember.reducer';
import tradeReducer from '../reducers/trade.reducer';

// reducx remeber 
const reducers = {
    mainReducer,
    mainRememberReducer,
    tradeReducer
},
    rememberedKeys = ["mainRememberReducer"]; // 'mainReducer' will be forgotten, as it's not in this list

export const rootReducer = createStore(
    rememberReducer(combineReducers(reducers)),
    compose(
        applyMiddleware(),
        // ...
        rememberEnhancer(
            window.localStorage, // or your own custom storage driver
            rememberedKeys
        )
    )
);


export default rootReducer;