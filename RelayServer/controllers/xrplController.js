const config = require("../config/config"); // Adjust path as necessary
const xrpl = require("xrpl");
const { xrpToDrops } = require("xrpl");

exports.entry = async (req, res) => {
  const data = req.body;
  try {
    const method = data.method;
    switch (method) {
      case "SetupTrustLine":
        await setupTrustLine_xrpl(req, res);
        break;
      case "GetUserTransaction":
        await getUserTransaction_xrpl(req, res);
        break;
      case "GetBlock":
        await getBlockFunc_xrpl(req, res);
        break;
      case "CreateAddress":
        await createAddressFunc_xrpl(req, res);
        break;
      case "SendCoin":
        await sendCoinFunc_xrpl(req, res);
        break;
      case "GetBalance":
        await getBalance_xrpl(req, res);
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

getUserTransaction_xrpl = async (req, res) => {
  const data = req.body;
  const walletAddress = data.walletAddress;
  const beforeSignature = data.beforeSignature ? Number(data.beforeSignature) : 0;
  const coinType = data.coinType;
  const tokenAddress = data.tokenAddress;
  const split = tokenAddress.split("_");
  const tokenCurrency = split[0];
  var results = [];
  var lastSignature = null;
  const chain = "Xrpl";
  let tokenIssuer = "";
  if (split.length > 1)
    tokenIssuer = split[1];

  const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server
  await client.connect();
  try {
    // Get the transaction history for the account
    let response = {};
    if (beforeSignature == 0) {
      response = await client.request({
        "command": "account_tx",
        "account": walletAddress,

        "limit": 10 // Limit the number of transactions to retrieve
      });
    }
    else {
      response = await client.request({
        "command": "account_tx",
        "account": walletAddress,
        "ledger_index_min": beforeSignature + 1,
        "limit": 10 // Limit the number of transactions to retrieve
      });
    }

    for (const tx of response.result.transactions) {
      const txHash = tx.tx_json.TxnSignature;
      if (!lastSignature)
        lastSignature = tx.ledger_index;
      if (tx.ledger_index == beforeSignature) {
        break;
      }
      if (
        tx.tx_json.TransactionType === "Payment" &&
        tx.meta.TransactionResult === "tesSUCCESS"
      ) {
        console.log(tx);
        const amount = tx.tx_json.DeliverMax;
        if (tokenAddress!="" && (amount.currency != tokenCurrency || amount.issuer != tokenIssuer))
          continue;

        const value = amount.value || amount / 10 ** config.digits[`${chain}_${coinType}`]; // Convert drops to XRP if necessary
        results.push({ walletAddress: data.walletAddress, tokenAddress: tokenAddress, amount: value, txHash: txHash });

      }
    }

    res.send({ status: 0, lastSignature, data: results });
  } catch (error) {
    console.error("Error fetching ledger data:", error);
    res.send({ status: 1 });
  } finally {
    await client.disconnect();
  }
};

const setupTrustLine_xrpl = async (req, res) => {
  const data = req.body;
  const chain = "Xrpl";
  const tokenAddress = data.tokenAddress; //issuerAddress_tokenCurrency
  const split = tokenAddress.split("_");
  const tokenCurrency = split[0];
  let issuerAddress = "";
  if (split.length > 1)
    issuerAddress = split[1];

  const maxAmount = data.maxAmount; // Issuer address

  // Define the account credentials (test account or mainnet)
  const account = {
    address: data.address, // XRP account address
    secret: data.mnemonic // Secret key
  };

  const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server

  try {
    // Connect to the network
    await client.connect();

    // Prepare the TrustSet transaction
    const trustSetTransaction = {
      "TransactionType": "TrustSet",
      "Account": account.address,
      "LimitAmount": {
        "currency": tokenCurrency,
        "issuer": issuerAddress,
        "value": "999966399" // Max amount of the token to trust
      }
    };

    // Sign the transaction
    const signedTx = await client.submitAndWait(trustSetTransaction, {
      wallet: xrpl.Wallet.fromSeed(account.secret)
    });

    console.log(`Transaction result: ${signedTx.result.meta.TransactionResult}`);
    console.log(`Transaction hash: ${signedTx.result.tx_json.hash}`);

    // Disconnect from the XRP Ledger
    await client.disconnect();
    res.send({ status: 0 });
  } catch (error) {
    console.error('Error fetching account balance:', error);
    res.send({ status: 1 });
  }
}
const getBalance_xrpl = async (req, res) => {
  const client = new xrpl.Client("wss://s1.ripple.com"); // Public XRPL server
  const data = req.body;
  const chain = "Xrpl";
  const coinType = data.coinType;
  const tokenAddress = data.tokenAddress; //issuerAddress_tokenCurrency
  try {
    let balances = {};
    // Connect to the network
    await client.connect();
    if (!tokenAddress) {
      // Prepare the request
      const accountInfo = await client.request({
        command: 'account_info',
        account: data.walletAddress,
        ledger_index: 'validated'
      });

      // Extract the balance (in drops, where 1 XRP = 1,000,000 drops)
      const balanceInDrops = accountInfo.result.account_data.Balance;
      const balanceInXRP = xrpl.dropsToXrp(balanceInDrops);
      balances = { [config.nativeToken[chain]]: balanceInXRP };
      //console.log(`Balance for account ${data.address}: ${balanceInXRP} XRP`);
    }
    else {
      // Query the account's trustlines (which include token balances)
      const response = await client.request({
        command: "account_lines",
        account: data.walletAddress
      });

      // Find the specific trustline for the given token
      const trustlines = response.result.lines;
      const split = tokenAddress.split("_");
      const tokenCurrency = split[0];
      let tokenIssuer = "";
      if (split.length > 1)
        tokenIssuer = split[1];
      const tokenTrustline = trustlines.find(line => line.currency === tokenCurrency && line.account === tokenIssuer);

      // if (tokenTrustline) {
      //   console.log(`Token balance for ${coinType}: ${tokenTrustline.balance}`);
      // } else {
      //   console.log(`No trustline found for ${coinType} from issuer ${issuerAddress}`);
      // }
      balances = { [data.coinType]: tokenTrustline.balance };
    }
    // Disconnect from the client
    await client.disconnect();
    res.send({ status: 0, balances: balances });
  } catch (error) {
    console.error('Error fetching account balance:', error);
  }
}

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
        let tokenAddress = "";
        if (amount.issuer)
          tokenAddress = `${amount.currency}_${amount.issuer}`;
        if (!tokenAddress2CoinType || !tokenAddress2CoinType.hasOwnProperty(tokenAddress))
          continue;
        const coinType = tokenAddress2CoinType[tokenAddress];
        const value = amount.value || amount / 10 ** config.digits[`${chain}_${coinType}`]; // Convert drops to XRP if necessary

        if (walletAddressList.includes(destination)) {
          results.push({
            walletAddress: destination,
            tokenAddress: tokenAddress,
            amount: value,
          });
        }
      }
    }

    res.send({ status: 0, data: results });
  } catch (error) {
    //console.error("Error fetching ledger data:", error);
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

  let amount;
  if (data.tokenAddress) {
    const s = data.tokenAddress.split("_");
    // Sending token (IOU)
    amount = {
      currency: s[1], // The token's currency code, e.g., "USD", "EUR", "TOKEN"
      issuer: s[0], // The issuer's (token creator's) XRP address
      value: data.amount.toString(), // The amount of the token to send
    };
  } else {
    // Sending XRP
    amount = Math.floor(
      parseFloat(data.amount) *
      10 ** config.digits[`${data.chain}_${data.coinType}`] -
      fees
    ).toString();
  }
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
