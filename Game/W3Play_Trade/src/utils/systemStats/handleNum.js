import state from "../../state";
import numberFormat from "../numberFormat";

// handle big/small int in diff syntex
export default function handleNum(amt, players, isAlltimeamt) {
    let isTestnet = state.active_network === 'testnet';

    // all time amount && mainnet should be int
    if (!isTestnet && isAlltimeamt) return numberFormat.addCommas(parseInt(amt));

    // logic for players amt
    else if (players) {
        if (Number(players) < 10000) return amt;
        else return Number(numberFormat.addCommas(amt));
    }
    // logic for percents and payouts amt
    else {
        if (amt < 1000) return parseFloat(amt.toFixed(2));
        // if (999999 < amt) return numberFormat.addCommas(parseInt(amt));
        else return numberFormat.addCommas(parseFloat(amt).toFixed(2));
    }
}