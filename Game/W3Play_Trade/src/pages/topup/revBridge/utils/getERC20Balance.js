import state from "../../../../state";

let ERC20_address = '0x5009e9B9058f9A7AAD42D01ffe3D8E94788fb01E',
    Tether_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

export default async () => {

    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${Tether_address}&address=${ERC20_address}&tag=latest&apikey=${state.ether_scan_t}`

    try {
        let response = await fetch(url),
            data = await response.json();

        if (data.status === '1') {
            const balance = data.result / 10 ** 6;;
            // console.log('token Balance: balance');
            return balance;

        } else {
            console.error('Error fetching token balance:', data.message);
        }

    } catch (error) {
        console.error('Error fetching token balance:', error);
        return 0;
    }
};
