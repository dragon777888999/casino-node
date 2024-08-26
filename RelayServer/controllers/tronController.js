const TronWeb = require('tronweb');

// Set up TronWeb instance
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io', // TronGrid is the default full node provider
    headers: { "TRON-PRO-API-KEY": "your-api-key-here" }, // Use your API key if needed
});

const config = require("../config/config");

exports.entry = async (req, res) => {
  const data = req.body;
  try {
    const method = data.method;
    switch (method) {
      case "GetBlock":
        await getBlockFunc_tron(req, res);
        break;
      case "CreateAddress":
        await createAddressFunc_tron(req, res);
        break;
      case "SendCoin":
        await sendCoinFunc_tron(req, res);
        break;
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

  console.log("transactions", block.transactions);

  for (let index = 0; index < block.block.data.txs.length; index++) {
    for (const tokenAddress in tokenAddress2CoinType) {
      const coinType = tokenAddress2CoinType[tokenAddress];
      if (tokenAddress == "") {
        const txBase64 = block.block.data.txs[index];
        const buffer = Buffer.from(txBase64, "base64");
        const hash = createHash("sha256");
        const txHash = hash.update(buffer).digest("hex");
        const tx = await cosmos.get(`/cosmos/tx/v1beta1/txs/${txHash}`);
        if (!tx || !tx.tx_response || !tx.tx_response.logs) continue;

        for (let i = 0; i < tx.tx_response.logs.length; i++) {
          const msg = tx.tx_response.logs[i];
          if (!msg || !msg.events) continue;
          for (let j = 0; j < msg.events.length; j++) {
            const event = msg.events[j];
            if (event.type == "coin_received") {
              const address = event.attributes[0].value;
              const amountStr = event.attributes[1].value.replace("orai", "");
              const amount =
                Number.parseInt(amountStr) /
                10 ** config.digits[`${chain}_${coinType}`];
              if (walletAddressList.indexOf(address) !== -1)
                results.push({
                  walletAddress: address,
                  tokenAddress: tokenAddress,
                  amount,
                });
            }
          }
        }
      } else {
        //Need to be implemented
      }
    }
  }

  res.send({ status: 0, data: results });
};
createAddressFunc_tron = async (req, res) => {
  const mnemonic = cosmos.generateMnemonic(128);
  const address = cosmos.getAddress(mnemonic);
  res.send({ status: 0, mnemonic, address });
};
sendCoinFunc_tron = async (req, res) => {
  const data = req.body;
  const fees = config.fee[data.chain];

  const childKey = cosmos.getChildKey(data.mnemonic);
  const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
    from_address: cosmos.getAddress(childKey),
    to_address: data.toAddress,
    amount: [
      {
        denom: cosmos.bech32MainPrefix,
        amount: String(
          Math.floor(
            data.amount *
              10 ** config.digits[`${data.chain}_${data.coinType}`] -
              fees
          )
        ),
      },
    ],
  });

  const msgSendAny = new message.google.protobuf.Any({
    type_url: "/cosmos.bank.v1beta1.MsgSend",
    value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish(),
  });

  const txBody = new message.cosmos.tx.v1beta1.TxBody({
    messages: [msgSendAny],
    memo: "",
  });

  const response = await cosmos.submit(
    childKey,
    txBody,
    "BROADCAST_MODE_BLOCK",
    [{ denom: cosmos.bech32MainPrefix, amount: String(fees) }]
  );
  res.send({ status: 0 });
};
