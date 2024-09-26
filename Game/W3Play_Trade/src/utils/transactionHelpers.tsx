import { set_iframe_popup, set_loader } from '../REDUX/actions/main.actions';
import state from '../state';
import React from 'react';

export function buyCoin(wallet_address: string, dispatch: React.Dispatch<any>) {
    if (!wallet_address) return;
    dispatch(set_loader(true))

    setTimeout(() => {
        dispatch(set_loader(false))
    }, 5000);

    let view: string;

    if (state.transfiView == 'buy') {
        view = '&view=buy';
    } else if (state.transfiView == 'sell') {
        view = '&view=sell';
    } else if (state.transfiView == 'buy_sell') {
        view = '';
    }

    let url = `${state.transfiUrl}/?apiKey=${state.transfiApiKey}&cryptoTicker=${state.transfiCryptoTicker}&cryptoNetwork=${state.transfiCryptoNetwork}&walletAddress=${wallet_address}${view}`;
    dispatch(set_iframe_popup({ src: url, type: 'bank_transfer' }))
}