import numberFormat from "../numberFormat";

export default function numFormat(amt, decimalPoint) {
    if (999999 < amt)
        return numberFormat.addCommas(parseInt(amt));
    else
        return numberFormat.addCommas(amt.toFixed(decimalPoint));
}