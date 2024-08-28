const config = require("../config/config"); // Adjust path as necessary
const xrpl = require("xrpl");
const { xrpToDrops } = require("xrpl");

exports.entry = async (req, res) => {
  const data = req.body;
  try {
    const method = data.method;
    switch (method) {
      case "GetBlock":
        try {
          await getBlockFunc_xrpl(req, res);
        } catch (getBlockErr) {

        }
        break;
      case "CreateAddress":
        await createAddressFunc_xrpl(req, res);
        break;
      case "SendCoin":
        await sendCoinFunc_xrpl(req, res);
        break;

      default:
        res.send({ status: 1, msg: "Invalid method" });
    }
  } catch (err) {
    // console.log("----------------Input--------------------------------");
    // console.log(JSON.stringify(data));
    // console.log("----------------Error--------------------------------");
    // console.log(err);
    // console.log("-----------------------------------------------------");
    res.send({ status: 1, err });
  }
};

const createAddressFunc_xrpl = async (req, res) => {
  try {
    // Generate a new keypair using XRPL
    const wallet = xrpl.Wallet.generate();
    // Extract the seed and classicAddress from the wallet
    // const mnemonic = wallet.seed;
    const mnemonic = wallet.seed;
    const address = wallet.classicAddress;
    // Send the response
    res.send({ status: 0, mnemonic, address });
  } catch (error) {
    console.error("Error creating address:", error);
    res.send({ status: 1, error: error.message });
  }
};

const getBlockFunc_xrpl = async (req, res) => {
  const data = req.body;
  const chain = data.chain;
  const ledgerIndex = data.height;
  const walletAddressList = data.walletAddressList;
  const tokenAddress2CoinType = data.tokenAddress2CoinType;
  const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server
  const results = [];

  await client.connect();

  // Fetch the ledger data
  try {
    const ledger = await client.request({
      command: "ledger",
      ledger_index: ledgerIndex,
      transactions: true,
      expand: true,
    });
    // console.log(ledger);
    if (
      !ledger ||
      !ledger.result ||
      !ledger.result.ledger ||
      !ledger.result.ledger.transactions
    ) {
      res.send({ status: 1 });
      return;
    }

    for (const tx of ledger.result.ledger.transactions) {
      if (
        tx.tx_json.TransactionType === "Payment" &&
        tx.meta.TransactionResult === "tesSUCCESS"
      ) {
        const destination = tx.tx_json.Destination;
        const amount = tx.tx_json.DeliverMax;
        const issuer = amount.issuer || "";
        if (!tokenAddress2CoinType || !tokenAddress2CoinType.hasOwnProperty(issuer))
          continue;
        const coinType = tokenAddress2CoinType[issuer];
        const value = amount.value || amount / 10 ** config.digits[`${chain}_${coinType}`]; // Convert drops to XRP if necessary

        if (walletAddressList.includes(destination)) {
          results.push({
            walletAddress: destination,
            tokenAddress: issuer,
            amount: value,
          });
        }
      }
    }

    res.send({ status: 0, data: results });
  } catch (error) {
    console.error("Error fetching ledger data:", error);
    res.send({ status: 1 });
  } finally {
    await client.disconnect();
  }
};
const sendCoinFunc_xrpl = async (req, res) => {
  const data = req.body;
  const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server

  const fees = config.fee[data.chain];

  let wallet;

  const amount = Math.floor(
    parseFloat(data.amount) *
    10 ** config.digits[`${data.chain}_${data.coinType}`] -
    fees
  ).toString();
  try {
    if (data.mnemonic && data.mnemonic.trim().length > 0) {
      console.log("Using seed for wallet creation");
      try {
        wallet = xrpl.Wallet.fromSeed(data.mnemonic.trim());
        console.log("Address (from seed):", wallet.address);
        console.log("Seed (from seed):", wallet.seed);
      } catch (error) {
        console.error("Error creating wallet from seed:", error);
        res.status(400).send({ status: 1, error: "Invalid seed" });
        return;
      }
    } else {
      console.error("No valid mnemonic or seed provided.");
      res
        .status(400)
        .send({ status: 1, error: "No valid mnemonic or seed provided." });
      return;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send({ status: 1, error: "An unexpected error occurred." });
  }

  // try {
  //   if (data.mnemonic && data.mnemonic.trim().length > 0) {
  //     console.log("Using mnemonic for wallet creation");
  //     const mnemonic = data.mnemonic.trim().toLowerCase();
  //     console.log("Mnemonic:", mnemonic);

  //     try {
  //       wallet = xrpl.Wallet.fromMnemonic(mnemonic);
  //       console.log("Address (from mnemonic):", wallet.address);
  //       console.log("Seed (from mnemonic):", wallet.seed);
  //     } catch (error) {
  //       console.error("Error creating wallet from mnemonic:", error);
  //       res.status(400).send({ status: 1, error: "Invalid mnemonic" });
  //       return;
  //     }
  //   } else if (data.seed && data.seed.trim().length > 0) {
  //     console.log("Using seed for wallet creation");
  //     try {
  //       wallet = xrpl.Wallet.fromSeed(data.seed.trim());
  //       console.log("Address (from seed):", wallet.address);
  //       console.log("Seed (from seed):", wallet.seed);
  //     } catch (error) {
  //       console.error("Error creating wallet from seed:", error);
  //       res.status(400).send({ status: 1, error: "Invalid seed" });
  //       return;
  //     }
  //   } else if (data.entropy && data.entropy.trim().length > 0) {
  //     console.log("Using entropy for wallet creation");
  //     try {
  //       wallet = xrpl.Wallet.fromEntropy(data.entropy.trim());
  //       console.log("Address (from entropy):", wallet.address);
  //       console.log("Seed (from entropy):", wallet.seed);
  //     } catch (error) {
  //       console.error("Error creating wallet from entropy:", error);
  //       res.status(400).send({ status: 1, error: "Invalid entropy" });
  //       return;
  //     }
  //   } else {
  //     console.error("No valid mnemonic or seed provided.");
  //     res
  //       .status(400)
  //       .send({ status: 1, error: "No valid mnemonic or seed provided." });
  //     return;
  //   }
  // } catch (error) {
  //   console.error("Unexpected error:", error);
  //   res.status(500).send({ status: 1, error: "An unexpected error occurred." });
  // }

  try {
    await client.connect();

    const transaction = {
      TransactionType: "Payment",
      Account: data.fromAddress,
      Destination: data.toAddress,
      Amount: amount, // Convert XRP to drops (smallest unit of XRP)
      Fee: fees.toString(), // Convert XRP to drops for fees
      Sequence: (
        await client.request({
          command: "account_info",
          account: data.fromAddress,
          ledger_index: "validated",
        })
      ).result.account_data.Sequence,
      LastLedgerSequence:
        (
          await client.request({
            command: "ledger",
            ledger_index: "validated",
          })
        ).result.ledger_index + 5,
    };

    const preparedTx = await client.autofill(transaction);

    const signedTx = wallet.sign(preparedTx);

    const response = await client.submitAndWait(signedTx.tx_blob, {
      maxTimeout: 60000,
    });
    console.log(response);
    if (response.result.meta.TransactionResult === "tesSUCCESS") {
      res.send({ status: 0 });
    } else {
      res.send({ status: 1, error: response.result.engine_result_message });
    }
  } catch (error) {
    console.error("Error sending transaction:", error);
    res.send({ status: 1 });
  } finally {
    await client.disconnect();
  }
};
