// keep number without rounding up/down + with 2 float digits
export default function truncNum(number) {
    let truncatedNumber = Math.trunc(number * 100) / 100;
    return truncatedNumber.toFixed(2);
}