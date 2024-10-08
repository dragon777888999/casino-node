const axios = require('axios');
const { Web3 } = require('web3');

const apiKey = 'HD59NE86B92NEQSKAKMW2QJQHHAA51WQFZ';//62c5dccbb9c2462381b0fd3488002067
const address = '0x5f7f643a410dcd0468d3ade08d91de3860152223';
const bananaGun = '0x3328F7f4A1D1C57c35df56bBf0c9dCAFCA309C49';
const digits = 18;
const f = 10 ** digits;
const lastCheckedBlock = 20911556;
const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${lastCheckedBlock}&endblock=99999999&sort=asc&apikey=${apiKey}`;

var provider = `https://mainnet.infura.io/v3/${apiKey}`;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

axios.get(url)
    .then(response => {
        for (let index = 0; index < response.data.result.length; index++) {
            var tx = response.data.result[index];
            // if (index == 0) {
            //      console.log(tx);
            //      console.log("************************************************");
            // }
            if (tx.from.toLowerCase() == address.toLowerCase()) {
                if (tx.to.toLowerCase() == bananaGun.toLowerCase()) {
                    //console.log(`${tx.blockNumber}, send to ${tx.to}, value:${tx.value / f}`);
                    try {
                        procTranaction("buy", tx);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            else {
                if (tx.from.toLowerCase() == bananaGun.toLowerCase()) {
                    console.log(`<<<<<< ${tx.blockNumber}, recieve from ${tx.from}, value:${tx.value / f}`);
                    try {
                        procTranaction("sell", tx);
                    }
                    catch (err) {
                        console.log(err);
                    }

                }
                //console.log(tx);
            }
            // console.log("from = ", tx.from);
            // console.log("to = ", tx.to);
            // console.log("blockNumber = ", tx.blockNumber);
        }

    })
    .catch(error => {
        console.error(error);
    });

procTranaction = async (type, txn) => {
    const txnHash = txn.hash;
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txnHash}&apikey=${apiKey}`;

    const response = await axios.get(url);
    if (response.data.result) {
        const txnDetails = response.data.result;
        console.log(`${type} in ${txn.blockNumber}, eth:${txn.value / f}`);
        //console.log(txn);
        //var amount = txnDetails.value - txnDetails.gasPrice;
        //console.log("amount", amount / f);

        // Decode input data to get token addresses and other parameters
        const decodedInput = web3.eth.abi.decodeParameters(
            ['address', 'uint256', 'address', 'uint256'], // Based on the swap function parameters
            txn.input.slice(10) // Remove the first 10 characters (function selector)
        );

        const tokenAddress1 = decodedInput[0];
        const tokenAmountRaw1 = decodedInput[1]; // Assuming the second parameter is the token amount in raw units
        const tokenAddress2 = decodedInput[2];
        const tokenAmountRaw2 = decodedInput[3]; // Assuming the second parameter is the token amount in raw units
        //console.log("                      tokenAddress=",tokenAddress1, ",tokenAmount=",tokenAmountRaw1);
        //console.log("tokenAddress=",tokenAddress2, ",tokenAmount=",tokenAmountRaw2);
        return;
        // Get token name, symbol, and decimals
        const abi = [
            // Read-Only Functions
            "function decimals() view returns (uint8)",
            "function symbol() view returns (string)",
            "function name() view returns (string)",
        ];
        const tokenContract = new web3.eth.Contract([
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [{ "name": "", "type": "string" }],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [{ "name": "", "type": "string" }],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [{ "name": "", "type": "uint8" }],
                "type": "function"
            }
        ], tokenAddress);
        try {
            const tokenName = await tokenContract.methods.name().call();
            const tokenSymbol = await tokenContract.methods.symbol().call();
            const tokenDecimals = await tokenContract.methods.decimals().call();

            // Calculate the human-readable token amount
            const tokenAmount = tokenAmountRaw / (10 ** tokenDecimals);
            console.log(`Token: ${tokenName} (${tokenSymbol}), Amount: ${tokenAmount}`);
        }
        catch (err) {
            console.log(err);
        }
    } else {
        console.log('Transaction not found or invalid hash.');
    }

}