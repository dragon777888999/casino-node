let TRON = 'TLpQX818dnWGoGDKCLMFy8oFBboDy7Vr1j';

export default async () => {
    try {
        const response = await fetch(`https://apilist.tronscan.org/api/account?address=${TRON}`),
            data = await response.json(),

            usdtBalance = data.trc20token_balances.find(token => token.tokenAbbr === "USDT"),
            usdtAmount = usdtBalance ? usdtBalance.balance / (10 ** usdtBalance.tokenDecimal) : 0;

        // console.log(usdtAmount, 'trxAmount');

        return usdtAmount;

    } catch (error) {
        console.error('Error fetching TRC20 balance:', error);
        return 0;
    }
}