import { set_loader, set_topup_close_btn } from "../../REDUX/actions/main.actions";

export default async function deSwap(APP, dispatch) {

    var script = document.createElement('script');
    script.src = 'https://app.debridge.finance/assets/scripts/widget.js';
    // script.onload = () => {
    // 	setScriptLoaded(true);
    // };

    //0xa19d60eAf845ce537276B21729550C42884d2BBC
    //APP.wallets.walletProvider.selectedAddress

    dispatch(set_loader(true))
    setTimeout(() => {
        dispatch(set_topup_close_btn('deswap'))
        dispatch(set_loader(false))
    }, 4000);

    //deSwap params
    var script1 = document.createElement('script');
    script1.textContent = 'deBridge.widget(' + JSON.stringify({
        "v": "1",
        "element": "deswap",
        // "title": "Playnance Bridge",
        // "description": "Swap any token to MATIC",
        // "width": window.screen.width,
        // "height": window.screen.height,
        "supportedChains": {
            "inputChains": {
                "1": "all",
                "10": "all",
                "56": "all",
                "137": "all",
                "8453": "all",
                "42161": "all",
                "43114": "all",
                "59144": "all",
                "7565164": "all"
            },
            "outputChains": {
                "1": "all",
                "10": "all",
                "56": "all",
                "137": "all",
                "8453": "all",
                "42161": "all",
                "43114": "all",
                "59144": "all",
                "7565164": "all"
            }
        },
        "inputChain": 1,
        "outputChain": 137,
        "inputCurrency": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "outputCurrency": "",
        "address": APP.wallets.walletProvider.selectedAddress,
        "showSwapTransfer": true,
        "amount": "10",
        "lang": "en",
        "mode": "deswap",
        "isEnableBundle": false,
        "affiliateFeePercent":"1",
        "affiliateFeeRecipient":"0x041dB96053cFBDb9A8f84FBb4935e078f915E83e",
        "r": 5034,
        "styles": "eyJib3JkZXJSYWRpdXMiOjgsImZvbnRGYW1pbHkiOiIifQ==",
        "theme": "dark",
        "isHideLogo": false
    }, null, 2) + ');';

    script1.setAttribute('data-script-type', 'debridge-widget');

    document.body.appendChild(script);
    setTimeout(() => {
        document.body.appendChild(script1);
    }, 1000);

    script.onload = () => {
        // setScriptLoaded(true);
    };
}