const { Client, AccountInfo, XrpClient } = require("xrpl");
const { Account } = require("xrpl");
const { generateKeyPair } = require("xrpl"); // Ensure you have the xrpl package installed
const { Payment, IssuedCurrency } = require("xrpl");
const { encode, decode } = require("ripple-keypairs"); // Ensure you have this package installed

const config = require("../config/config"); // Adjust path as necessary
const xrpl = require("xrpl");
const { xrpToDrops } = require("xrpl");

exports.entry = async (req, res) => {
  const data = req.body;
  try {
    const method = data.method;
    switch (method) {
      case "GetBlock":
        await getBlockFunc_xrpl(req, res);
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
    console.log("----------------Input--------------------------------");
    console.log(JSON.stringify(data));
    console.log("----------------Error--------------------------------");
    console.log(err);
    console.log("-----------------------------------------------------");
    res.send({ status: 1, err });
  }
};

const createAddressFunc_xrpl = async (req, res) => {
  try {
    // Generate a new keypair using XRPL
    const wallet = xrpl.Wallet.generate();
    // Extract the seed and classicAddress from the wallet
    const mnemonic = wallet.seed;
    const address = wallet.classicAddress;
    // Send the response
    res.send({ status: 0, mnemonic, address });
  } catch (error) {
    console.error("Error creating address:", error);
    res.send({ status: 1, error: error.message });
  }
};

//   const ledgerIndex = data.ledgerIndex;
//   const walletAddressList = data.walletAddressList;
//   const tokenAddress2CoinType = data.tokenAddress2CoinType;
//   const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server
//   const results = [];

//   // try {
//   //   await client.connect();

//   //   // Fetch the ledger data
//   //   // const ledger = await client.request({
//   //   //   command: "ledger",
//   //   //   ledger_index: ledgerIndex,
//   //   //   transactions: true,
//   //   //   expand: true,
//   //   // });

//   //   // if (
//   //   //   !ledger ||
//   //   //   !ledger.result ||
//   //   //   !ledger.result.ledger ||
//   //   //   !ledger.result.ledger.transactions
//   //   // ) {
//   //   //   res.send({ status: 1 });
//   //   //   return;
//   //   // }

//   //   // Iterate through transactions in the ledger
//   //   // for (const tx of ledger.result.ledger.transactions) {
//   //   //   if (
//   //   //     tx.TransactionType === "Payment" &&
//   //   //     tx.meta.TransactionResult === "tesSUCCESS"
//   //   //   ) {
//   //   //     const destination = tx.Destination;
//   //   //     const amount = tx.Amount;
//   //   //     const currency = amount.currency || "XRP";
//   //   //     const value = amount.value || amount / 1000000; // Convert drops to XRP if necessary

//   //   //     if (walletAddressList.includes(destination)) {
//   //   //       results.push({
//   //   //         walletAddress: destination,
//   //   //         tokenAddress: currency === "XRP" ? "" : amount.issuer,
//   //   //         amount: value,
//   //   //       });
//   //   //     }
//   //   //   }
//   //   // }

//   //   res.send({ status: 0, data: results });
//   // } catch (error) {
//   //   console.error("Error fetching ledger data:", error);
//   //   res.send({ status: 1 });
//   // } finally {
//   //   await client.disconnect();
//   // }
// };

// const sendFeeFunc_xrpl = async (req, res) => {
//   try {
//     const data = req.body;

//     // Validate the chain and ensure it's supported
//     if (!config.nativeToken[data.chain] || !config.fee[data.chain]) {
//       throw new Error(`Unsupported chain: ${data.chain}`);
//     }

//     // Set coinType and compute amount
//     data.coinType = config.nativeToken[data.chain];
//     const feeInBaseUnits = config.fee[data.chain];
//     const decimals = config.digits[`${data.chain}_${data.coinType}`] || 6; // Default to 6 decimals if not defined
//     data.amount = feeInBaseUnits / 10 ** decimals;

//     // Create XRPL client
//     //const client = new XrpClient("wss://s.altnet.rippletest.net:51233"); // Use appropriate network

//     await client.connect();

//     // Prepare payment transaction
//     const payment = {
//       TransactionType: "Payment",
//       Account: data.senderAddress,
//       Destination: data.receiverAddress,
//       Amount: {
//         currency: data.coinType,
//         value: data.amount.toString(),
//         issuer: data.senderAddress,
//       },
//       Fee: "12", // Adjust the fee as needed
//       Sequence: await client.getNextSequence(data.senderAddress), // Fetch next sequence number
//     };

//     // Sign the transaction
//     const signedTx = await client.autofill(payment);
//     const result = await client.submit(signedTx.tx_blob);

//     // Disconnect the client
//     await client.disconnect();

//     // Send the response
//     res.send({ status: 0, result: result.result });
//   } catch (error) {
//     console.error("Error sending fee:", error);
//     res.status(500).send({ status: 1, error: error.message });
//   }
// };

// const sendCoinFunc_xrpl = async (req, res) => {
//   const data = req.body;
//   console.log(JSON.stringify(data));

//   try {
//     // Create XRPL client and connect
//     const client = new Client("wss://s.altnet.rippletest.net:51233"); // Use the testnet or mainnet as needed
//     await client.connect();

//     if (!data.tokenAddress || data.tokenAddress === "") {
//       // Send native XRP
//       await sendNativeXRP(client, data, res);
//     } else {
//       // Send issued token (custom token)
//       await sendIssuedToken(client, data, res);
//     }

//     // Disconnect the client
//     await client.disconnect();
//   } catch (error) {
//     console.error("Error sending coin:", error);
//     res.status(500).send({ status: 1, error: error.message });
//   }
// };

// const sendNativeXRP = async (client, data, res) => {
//   try {
//     const { senderAddress, recipientAddress, amount } = data;

//     // Prepare payment transaction
//     const payment = {
//       TransactionType: "Payment",
//       Account: senderAddress,
//       Destination: recipientAddress,
//       Amount: amount, // Amount should be in drops (1 XRP = 1,000,000 drops)
//       Fee: "12", // Example fee, adjust as needed
//       Sequence: await client.getNextSequence(senderAddress),
//     };

//     // Sign and submit transaction
//     const preparedTx = await client.autofill(payment);
//     const { signedTransaction } = await client.sign(preparedTx.txJSON);
//     const result = await client.submit(signedTransaction);

//     // Send response
//     res.send({ status: 0, result: result.result });
//   } catch (error) {
//     console.error("Error sending native XRP:", error);
//     res.status(500).send({ status: 1, error: error.message });
//   }
// };

// const sendIssuedToken = async (client, data, res) => {
//   try {
//     const { senderAddress, recipientAddress, amount, tokenAddress } = data;

//     // Prepare issued currency payment transaction
//     const payment = {
//       TransactionType: "Payment",
//       Account: senderAddress,
//       Destination: recipientAddress,
//       Amount: {
//         currency: tokenAddress,
//         value: amount,
//         issuer: senderAddress,
//       },
//       Fee: "12", // Example fee, adjust as needed
//       Sequence: await client.getNextSequence(senderAddress),
//     };

//     // Sign and submit transaction
//     const preparedTx = await client.autofill(payment);
//     const { signedTransaction } = await client.sign(preparedTx.txJSON);
//     const result = await client.submit(signedTransaction);

//     // Send response
//     res.send({ status: 0, result: result.result });
//   } catch (error) {
//     console.error("Error sending issued token:", error);
//     res.status(500).send({ status: 1, error: error.message });
//   }
// };

// const sendNativeTokenFunc_xrpl = async (data, res) => {
//   try {
//     const { senderAddress, recipientAddress, amount, tokenAddress } = data;

//     // Initialize XRPL client
//     const client = new Client("wss://s.altnet.rippletest.net:51233"); // Use appropriate network (testnet or mainnet)
//     await client.connect();

//     // Determine if we are sending native XRP or issued currency
//     let payment;
//     if (!tokenAddress || tokenAddress === "") {
//       // Sending native XRP
//       payment = {
//         TransactionType: "Payment",
//         Account: senderAddress,
//         Destination: recipientAddress,
//         Amount: {
//           value: amount.toString(), // Amount in XRP
//           currency: "XRP",
//         },
//         Fee: config.fee.xrpl.toString(), // Transaction fee in drops
//         Sequence: await client.getNextSequence(senderAddress),
//       };
//     } else {
//       // Sending issued currency
//       payment = {
//         TransactionType: "Payment",
//         Account: senderAddress,
//         Destination: recipientAddress,
//         Amount: {
//           value: amount.toString(), // Amount in issued currency
//           currency: tokenAddress, // Issuer's token address
//           issuer: senderAddress,
//         },
//         Fee: config.fee.xrpl.toString(), // Transaction fee in drops
//         Sequence: await client.getNextSequence(senderAddress),
//       };
//     }

//     // Prepare and sign transaction
//     const preparedTx = await client.autofill(payment);
//     const { signedTransaction } = await client.sign(preparedTx.txJSON);
//     const result = await client.submit(signedTransaction);

//     // Send response
//     res.send({ status: 0, txnId: result.result.tx_json.hash });

//     // Disconnect the client
//     await client.disconnect();
//   } catch (error) {
//     console.error("Error sending token:", error);
//     res.status(500).send({ status: 1, error: error.message });
//   }
// };

// const sendUnnativeTokenFunc_xrpl = async (data, res) => {
//   try {
//     const { senderAddress, recipientAddress, amount, tokenAddress, mnemonic } =
//       data;

//     // Initialize XRPL client
//     const client = new Client("wss://s.altnet.rippletest.net:51233"); // Use the appropriate network (testnet or mainnet)
//     await client.connect();

//     // Convert amount to the smallest unit (drops for XRP or as specified for issued tokens)
//     const tokenAmount = {
//       currency: tokenAddress,
//       value: amount.toString(), // Amount in issued currency
//       issuer: senderAddress,
//     };

//     // Create payment transaction
//     const payment = {
//       TransactionType: "Payment",
//       Account: senderAddress,
//       Destination: recipientAddress,
//       Amount: tokenAmount,
//       Fee: config.fee.xrpl.toString(), // Transaction fee in drops
//       Sequence: await client.getNextSequence(senderAddress),
//     };

//     // Prepare, sign, and submit transaction
//     const preparedTx = await client.autofill(payment);
//     const { signedTransaction } = await client.sign(preparedTx.txJSON);
//     const result = await client.submit(signedTransaction);

//     // Send response with transaction ID
//     res.send({ status: 0, txnId: result.result.tx_json.hash });

//     // Disconnect the client
//     await client.disconnect();
//   } catch (error) {
//     console.error("Error sending issued token:", error);
//     res.status(500).send({ status: 1, error: error.message });
//   }
// };

// module.exports = { sendNativeTokenFunc_xrpl };

// module.exports = { sendCoinFunc_xrpl };
const getBlockFunc_xrpl = async (req, res) => {
  const data = req.body;
  const ledgerIndex = data.ledgerIndex;
  const walletAddressList = data.walletAddressList;
  const tokenAddress2CoinType = data.tokenAddress2CoinType;
  const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server
  const results = [];

  await client.connect();

  //   //   // Fetch the ledger data
  try {
    const ledger = await client.request({
      command: "ledger",
      ledger_index: ledgerIndex,
      transactions: true,
      expand: true,
    });
    console.log(ledger);
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
        tx.TransactionType === "Payment" &&
        tx.meta.TransactionResult === "tesSUCCESS"
      ) {
        const destination = tx.Destination;
        const amount = tx.Amount;
        const currency = amount.currency || "XRP";
        const value = amount.value || amount / 1000000; // Convert drops to XRP if necessary

        if (walletAddressList.includes(destination)) {
          results.push({
            walletAddress: destination,
            tokenAddress: currency === "XRP" ? "" : amount.issuer,
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

  const amount = Math.floor(
    data.amount * 10 ** config.digits[`${data.chain}_${data.coinType}`] - fees
  );

  try {
    await client.connect();

    // Prepare the payment transaction
    const transaction = {
      TransactionType: "Payment",
      Account: data.fromAddress,
      Destination: data.toAddress,
      Amount: xrpl.xrpToDrops(amount / 10 ** 6), // Convert XRP to drops (smallest unit of XRP)
      Fee: xrpl.xrpToDrops(fees / 10 ** 6), // Convert XRP to drops for fees
      Sequence: await client
        .getAccountInfo(data.fromAddress)
        .then((info) => info.sequence),
      LastLedgerSequence:
        (await client.request({ command: "ledger", ledger_index: "validated" }))
          .ledger_index + 5,
    };

    // Sign the transaction
    const preparedTx = await client.autofill(transaction);
    const signedTx = client.sign(preparedTx, data.secret);

    // Submit the transaction
    const response = await client.submitAndWait(signedTx.tx_blob, {
      maxTimeout: 60000,
    });

    if (response.result.engine_result === "tesSUCCESS") {
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
