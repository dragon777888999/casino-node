export default function poolSwitch(poolObj) {
    
    if (poolObj?.route) return poolObj.route;
    else switch (String(poolObj?.uid)) {

        case '5':
            return '/trade';

        case '7':
            return '/bitcoin-7';

        case '15':
            return '/bitcoin-15';

        case '30':
            return '/bitcoin-30';

        case '60':
            return '/bitcoin-60';

        case '60-eth':
            return '/ethereum-60';

        case '60-bnb':
            return '/binance-60';

        case '60-sol':
            return '/solana-60';

        case '60-doge':
            return '/doge-60';

        case '60-shib':
            return '/shiba-60';

        case '60-pepe':
            return '/pepe-60';

        case '120':
            return '/bitcoin-120';

        case '5-demo':
            return '/bitcoin-5-demo';

        case '7-demo':
            return '/bitcoin-7-demo';

        case '15-demo':
            return '/bitcoin-15-demo';

        case '30-demo':
            return '/bitcoin-30-demo';

        case '60-demo':
            return '/bitcoin-60-demo';

        case '120-demo':
            return '/bitcoin-120-demo';

        default:
            return '/trade';
    }
}