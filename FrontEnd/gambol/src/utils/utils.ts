export function solToWei(value: number) {
    // Using the correct exponentiation operator '**' instead of '^'
    const weiNumber = value * 10 ** 9;
    return weiNumber;
}

export function weiToSol(value: string) {

    const parsedValue = parseFloat(value);
    const resultValue = parsedValue / (10 ** 9);

    return resultValue;
}