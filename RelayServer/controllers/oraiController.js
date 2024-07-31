const Cosmos = require("@oraichain/cosmosjs").default;
const createHash = require('create-hash');
const lcdUrl = "https://lcd.orai.io";
const chainId = "Oraichain";
const message = Cosmos.message;
const cosmos = new Cosmos(lcdUrl, chainId);
const config = require('../config/config');

cosmos.setBech32MainPrefix('orai');

exports.entry = async (req, res) => {
    const data = req.body;
    try {
        const method = data.method;
        switch (method) {
            case "GetBlock":
                await getBlockFunc_orai(req, res);
                break;
            case "CreateAddress":
                await createAddressFunc_orai(req, res);
                break;
            case "SendCoin":
                await sendCoinFunc_orai(req, res);
                break;
            default:
                res.send({ status: 1, msg: "Invalid method" });
        }
    }
    catch (err) {
        console.log("----------------Input--------------------------------");
        console.log(JSON.stringify(data));
        console.log("----------------Error--------------------------------");
        console.log(err);
        console.log("-----------------------------------------------------");

        res.send({ status: 1, err });
    }
};

getBlockFunc_orai = async (req, res) => {
    const data = req.body;
    var height = data.height;
    const walletAddressList = data.walletAddressList;
    const tokenAddress2CoinType = data.tokenAddress2CoinType;
    const block = await cosmos.get(`/blocks/${height}`);
    const chain = data.chain;
    const results = [];
    if (!block || !block.block || !block.block.data || !block.block.data.txs) {
        res.send({ status: 1 });
        return;
    }

    for (let index = 0; index < block.block.data.txs.length; index++) {
        for (const tokenAddress in tokenAddress2CoinType) {
            const coinType = tokenAddress2CoinType[tokenAddress];
            if (tokenAddress == "") {
                const txBase64 = block.block.data.txs[index];
                const buffer = Buffer.from(txBase64, 'base64');
                const hash = createHash('sha256');
                const txHash = hash.update(buffer).digest('hex');
                const tx = await cosmos.get(`/cosmos/tx/v1beta1/txs/${txHash}`);
                if (!tx || !tx.tx_response || !tx.tx_response.logs)
                    continue;

                for (let i = 0; i < tx.tx_response.logs.length; i++) {
                    const msg = tx.tx_response.logs[i];
                    if (!msg || !msg.events)
                        continue;
                    for (let j = 0; j < msg.events.length; j++) {
                        const event = msg.events[j];
                        if (event.type == "coin_received") {
                            const address = event.attributes[0].value;
                            const amountStr = event.attributes[1].value.replace("orai", "");
                            const amount = Number.parseInt(amountStr) / (10 ** config.digits[`${chain}_${coinType}`]);
                            if (walletAddressList.indexOf(address) !== -1)
                                results.push({ walletAddress: address, tokenAddress: tokenAddress, amount });
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
createAddressFunc_orai = async (req, res) => {
    const mnemonic = cosmos.generateMnemonic(128);
    const address = cosmos.getAddress(mnemonic);
    res.send({ status: 0, mnemonic, address });
};
sendCoinFunc_orai = async (req, res) => {
    const data = req.body;
    const fees = config.fee[data.chain];

    const childKey = cosmos.getChildKey(data.mnemonic);
    const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
        from_address: cosmos.getAddress(childKey),
        to_address: data.toAddress,
        amount: [{ denom: cosmos.bech32MainPrefix, amount: String(Math.floor(data.amount * (10 ** config.digits[`${data.chain}_${data.coinType}`]) - fees)) }]
    });

    const msgSendAny = new message.google.protobuf.Any({
        type_url: '/cosmos.bank.v1beta1.MsgSend',
        value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
    });

    const txBody = new message.cosmos.tx.v1beta1.TxBody({
        messages: [msgSendAny],
        memo: ''
    });

    const response = await cosmos.submit(childKey, txBody, 'BROADCAST_MODE_BLOCK', [{ denom: cosmos.bech32MainPrefix, amount: String(fees) }]);
    res.send({ status: 0 });
};
