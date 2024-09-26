import { set_iframe_popup, set_loader } from "../../REDUX/actions/main.actions";

// deSwap - bridge render
export default async function deSwap(APP, dispatch) {

    const params = {
        "inputChain": 1,
        "outputChain": 137,
        "inputCurrency": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "outputCurrency": "",
        "address": APP.wallets.walletProvider.selectedAddress,
        "amount": "10",
        "affiliateFeePercent":"1",
        "affiliateFeeRecipient":"0x041dB96053cFBDb9A8f84FBb4935e078f915E83e",
        "r": 5034,
        "v": 1
    };

    let deBridge_linking = `https://app.debridge.finance/deswap?inputChain=${params.inputChain}&inputCurrency=${params.inputCurrency}&outputChain=${params.outputChain}&outputCurrency=${params.outputCurrency}&amount=${params.amount}&address=${params?.address}&v=${params.v}&affiliateFeePercent=${params.affiliateFeePercent}&affiliateFeeRecipient=${params.affiliateFeeRecipient}&r=${params.r}`;

    dispatch(set_loader(true))
    setTimeout(() => {
        dispatch(set_loader(false))
    }, 3000);

    dispatch(set_iframe_popup({ src: deBridge_linking, type: 'deswap' }))
}