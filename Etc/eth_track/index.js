const axios = require('axios');

const apiKey = 'HD59NE86B92NEQSKAKMW2QJQHHAA51WQFZ';
const address = '0x008300082C3000009e63680088f8c7f4D3ff2E87';
const lastCheckedBlock = 20921000;
const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${lastCheckedBlock}&endblock=99999999&sort=asc&apikey=${apiKey}`;

axios.get(url)
    .then(response => {
        for (let index = 0; index < response.data.result.length; index++) {
            var tx = response.data.result[index];
            // if (index == 0) {
            //     console.log(tx);
            //     console.log("************************************************");
            // }
            if (tx.from.toLowerCase() == address.toLowerCase())
                console.log(`${tx.blockNumber}, send to ${tx.to}`);
            else {
                console.log(`<<<<<< ${tx.blockNumber}, recieve from ${tx.from}`);
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