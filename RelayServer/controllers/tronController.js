const TronWeb = require('tronweb');

// Set up TronWeb instance
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io', // TronGrid is the default full node provider
  // headers: { "TRON-PRO-API-KEY": "your-api-key-here" }, // Use your API key if needed
});

const config = require("../config/config");

exports.entry = async (req, res) => {
  const data = req.body;
  try {
    const method = data.method;
    switch (method) {
      case "GetBlock":
        try {
          await getBlockFunc_tron(req, res);
        }
        catch (getBlockErr) {
        }
        break;
      case "CreateAddress":
        await createAddressFunc_tron(req, res);
        break;
      case "SendCoin":
        await sendCoinFunc_tron(req, res);
        break;
      case "GetBalance":
        res.send({ status: 0, balance: 0 });
        return;

      default:
        res.send({ status: 1, msg: "Invalid method" });
    }
  } catch (err) {
    console.log("----------------Input--------------------------------");
    console.log(JSON.stringify(data));
    console.log("----------------Error--------------------------------");
    console.log(err);
    console.log("-----------------------------------------------------");

    res.send({ status: 1, err });
  }
};

getBlockFunc_tron = async (req, res) => {
  const data = req.body;
  const blockNumber = data.height;
  const walletAddressList = data.walletAddressList;
  const tokenAddress2CoinType = data.tokenAddress2CoinType;
  const chain = data.chain;

  const block = await tronWeb.trx.getBlock(blockNumber);

  const results = [];
  if (!block || !block.transactions) {
    res.send({ status: 1 });
    return;
  }

  for (let index = 0; index < block.transactions.length; index++) {
    const transaction = block.transactions[index];
    for (const tokenAddress in tokenAddress2CoinType) {
      const coinType = tokenAddress2CoinType[tokenAddress];
      const contract = transaction.raw_data.contract[0];
      if (tokenAddress == "" && contract.type === "TransferContract") {
        const parameter = contract.parameter.value;
        const toAddress = tronWeb.address.fromHex(parameter.to_address);
        const amount = tronWeb.fromSun(parameter.amount);

        if (walletAddressList.includes(toAddress)) {
          results.push({ walletAddress: toAddress, tokenAddress, amount });
        }
      } else if (contract.type == "TriggerSmartContract") {
        const contractAddress = tronWeb.address.fromHex(contract.parameter.value.contract_address);

        if (tokenAddress.includes(contractAddress)) {
          // Decode the data from the transaction
          const data = transaction.raw_data.contract[0].parameter.value.data;
          const method = data.substring(0, 8); // First 4 bytes
          const toAddressHex = '41' + data.substring(8, 48); // TRON addresses are 42 bytes long in hex (including '41' prefix)
          const toAddress = tronWeb.address.fromHex(toAddressHex);
          const amountHex = data.substring(48); // Remaining bytes are the amount in hex
          const amount = tronWeb.toDecimal('0x' + amountHex); // Convert from Sun to USDT

          // Check if the method is 'transfer' and the address matches
          if (method === 'a9059cbb' && walletAddressList.includes(toAddress)) {
            results.push({ walletAddress: toAddress, tokenAddress, amount });
          }
        }
      }
    }
  }

  res.send({ status: 0, data: results });
};
createAddressFunc_tron = async (req, res) => {
  const account = await tronWeb.createAccount();
  res.send({
    status: 0,
    mnemonic: account.privateKey,
    address: account.address.base58,
  });
};
sendCoinFunc_tron = async (req, res) => {
  const data = req.body;
  const fees = config.fee[data.chain];
  const privateKey = data.mnemonic;
  const tokenAddress = data.tokenAddress;
  const coinType = data.coinType;
  const amount = data.amount;
  const toAddress = data.toAddress;

  tronWeb.setPrivateKey(privateKey);
  tronWeb.defaultAddress = {
    hex: tronWeb.address.toHex(tronWeb.address.fromPrivateKey(privateKey)),
    base58: tronWeb.address.fromPrivateKey(privateKey),
  };

  if (tokenAddress == "") {
    const transaction = await tronWeb.trx.sendTransaction(toAddress, tronWeb.toSun(amount));
  } else {
    const contract = await tronWeb.contract().at(tokenAddress);
    const result = await contract.transfer(toAddress, amount).send();
  }

  res.send({ status: 0 });
};
