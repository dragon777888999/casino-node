const { ComputeBudgetProgram, Connection, Keypair, PublicKey, SystemInstruction, SystemProgram, Transaction, sendAndConfirmTransaction } = require("@solana/web3.js");
const base58 = require("bs58").default;
const { createAssociatedTokenAccountIdempotentInstruction, createCloseAccountInstruction, createTransferInstruction, getAssociatedTokenAddressSync } = require("@solana/spl-token");
const connection = new Connection("https://elianore-hzhid1-fast-mainnet.helius-rpc.com");
//const connectionForSend = new Connection("https://mainnet.helius-rpc.com/?api-key=c9a8b601-657e-4de5-a8a7-a347a24e6fb1");
const config = require('../config/config');

exports.entry = async (req, res) => {
    const data = req.body;
    try {
        const method = data.method;
        switch (method) {
            case "GetUserTransaction":
                await getUserTransaction_solana(req, res);
                break;
            case "CreateAddress":
                await createAddressFunc_solana(req, res);
                break;
            case "SendCoin":
                await sendCoinFunc_solana(req, res);
                break;
            case "SendFee":
                await sendFeeFunc_solana(req, res);
                break;
            case "GetBalance":
                await getBalance(req, res);
                return;

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

getBalance = async (req, res) => {
    const data = req.body;

    // Convert the public key string to a PublicKey object
    const publicKey = new PublicKey(data.address);

    // Fetch the balance of the account
    const balance = await connection.getBalance(publicKey);

    // Convert the balance from lamports to SOL (1 SOL = 1,000,000,000 lamports)
    console.log(`Balance: ${balance / 1e9} SOL`);

    res.send({ status: 0, balance: balance });
}

getUserTransaction_solana = async (req, res) => {
    const data = req.body;
    const accountPublicKey = new PublicKey(data.walletAddress);
    const beforeSignature = data.beforeSignature;
    const tokenAddress = data.tokenAddress;
    var results = [];
    var lastSignature = null;
    if (tokenAddress) {
        const ata = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), accountPublicKey)
        const confirmedSignatureInfos = await connection.getSignaturesForAddress(ata, { limit: 20 }, 'confirmed');
        for (let i = 0; i < confirmedSignatureInfos.length; i++) {
            let txHash = confirmedSignatureInfos[i].signature;
            //            console.log(txHash);
            if (!lastSignature)
                lastSignature = txHash;
            if (txHash == beforeSignature) {
                break;
            }

            const txData = await connection.getParsedTransaction(
                txHash,
                {
                    commitment: "confirmed",
                    maxSupportedTransactionVersion: 0
                }
            );
            try {
                const ixs = txData.transaction.message.instructions;
                for (let i = 0; i < ixs.length; i++) {
                    //console.log("&&&&", ixs[i]);
                    if (ixs[i]['parsed'] && !txData.meta.err) {
                        if (ixs[i].programId.toBase58() != "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
                            continue;
                        if (ixs[i].parsed?.type == "transferChecked" && ata.toBase58() == ixs[i].parsed.info.destination) {
                            results.push({ walletAddress: data.walletAddress, tokenAddress: tokenAddress, amount: ixs[i].parsed.info.tokenAmount.uiAmount });
                        } else if (ixs[i].parsed?.type == "transfer" && ata.toBase58() == ixs[i].parsed.info.destination) {
                            results.push({ walletAddress: data.walletAddress, tokenAddress: tokenAddress, amount: ixs[i].parsed.info.amount / (10 ** config.digits[`${data.chain}_${data.coinType}`]) });
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    } else {
        const confirmedSignatureInfos = await connection.getSignaturesForAddress(accountPublicKey, { limit: 20 }, 'confirmed');
        for (let i = 0; i < confirmedSignatureInfos.length; i++) {
            let txHash = confirmedSignatureInfos[i].signature;
            //            console.log(txHash);
            if (!lastSignature)
                lastSignature = txHash;
            if (txHash == beforeSignature) {
                break;
            }

            const txData = await connection.getParsedTransaction(
                txHash,
                {
                    commitment: "confirmed",
                    maxSupportedTransactionVersion: 0
                }
            );
            try {
                const ixs = txData.transaction.message.instructions;
                for (let i = 0; i < ixs.length; i++) {

                    if (ixs[i]['parsed'] && !txData.meta.err) {
                        if (ixs[i].programId.toBase58() != "11111111111111111111111111111111")
                            continue;
                        if (ixs[i].parsed && ixs[i].parsed.type == "transfer" && ixs[i].parsed.info && ixs[i].parsed.info.destination == data.walletAddress) {
                            results.push({ walletAddress: data.walletAddress, tokenAddress: tokenAddress, amount: ixs[i].parsed.info.lamports / (10 ** config.digits[`${data.chain}_${data.coinType}`]) });
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    res.send({ status: 0, lastSignature, data: results });
};
createAddressFunc_solana = async (req, res) => {
    const newKeypair = Keypair.generate()
    const mnemonic = base58.encode(newKeypair.secretKey)
    const address = newKeypair.publicKey.toBase58()
    res.send({ status: 0, mnemonic, address });
};

async function sleep(ms) {
    console.log(new Date().toLocaleString(), "sleepTime", ms);
    return new Promise((resolve) => setTimeout(resolve, ms));
}

sendFeeFunc_solana = async (req, res) => {
    const data = req.body;
    data.coinType = config.nativeToken[data.chain];
    data.amount = config.fee[data.chain] / (10 ** config.digits[`${data.chain}_${data.coinType}`]);
    await sendNativeTokenFunc_solana(data, res);
};
sendCoinFunc_solana = async (req, res) => {
    const data = req.body;
    console.log(JSON.stringify(data));

    if (data.tokenAddress == "")
        await sendNativeTokenFunc_solana(data, res);
    else
        await sendUnnativeTokenFunc_solana(data, res);
};

sendNativeTokenFunc_solana = async (data, res) => {

    const toAddress = new PublicKey(data.toAddress)
    const wallet = Keypair.fromSecretKey(base58.decode(data.mnemonic))
    const amount = data.amount;

    let maxLamports = config.fee[data.chain];
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: maxLamports,
    });
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 500,
    });
    const transaction = new Transaction()
        .add(addPriorityFee)
        .add(modifyComputeUnits)
        .add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: toAddress,
                lamports: Math.floor((10 ** config.digits[`${data.chain}_${data.coinType}`]) * amount),
            })
        );
    const latestBlockhash = await connection.getLatestBlockhashAndContext();
    transaction.recentBlockhash = latestBlockhash.value.blockhash;
    transaction.lastValidBlockHeight = latestBlockhash.context.slot + 150

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [wallet],
        {
            skipPreflight: true,
            maxRetries: config.maxRetries[data.chain],
            commitment: "confirmed",
        }
    );

    res.send({ status: 0, txnId: signature });
}
sendUnnativeTokenFunc_solana = async (data, res) => {
    const amount = data.amount;
    const toAddress = new PublicKey(data.toAddress)
    const tokenAddress = data.tokenAddress
    const wallet = Keypair.fromSecretKey(base58.decode(data.mnemonic))
    const ata = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), wallet.publicKey)
    const nextAta = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), toAddress, true)

    let maxLamports = config.fee[data.chain];
    const transaction = new Transaction()

    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: maxLamports,
    });
    transaction.add(addPriorityFee)

    transaction.add(createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, nextAta, toAddress, new PublicKey(tokenAddress)))

    // Add token transfer instructions to transaction
    transaction.add(
        createTransferInstruction(
            ata,
            nextAta,
            wallet.publicKey,
            amount * (10 ** config.digits[`${data.chain}_${data.coinType}`]),
        ),
    );

    const latestBlockhash = await connection.getLatestBlockhashAndContext();
    transaction.recentBlockhash = latestBlockhash.value.blockhash;
    transaction.lastValidBlockHeight = latestBlockhash.context.slot + 150
    const txnId = await sendAndConfirmTransaction(connection, transaction, [wallet], { skipPreflight: true, maxRetries: config.maxRetries[data.chain], commitment: "confirmed" });
    res.send({ status: 0, txnId });
};