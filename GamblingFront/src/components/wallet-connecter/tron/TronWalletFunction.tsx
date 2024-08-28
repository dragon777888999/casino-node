import { useState, useCallback } from "react";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import { PublicKey, Transaction, ComputeBudgetProgram, SystemProgram, Connection } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useAppContext } from "../../../hooks/AppContext";

const useDepositOnTron = () => {
  //const { connection } = useConnection();
  const connection = new Connection("https://elianore-hzhid1-fast-mainnet.helius-rpc.com");
  const wallet = useWallet();
  const [error, setError] = useState<string | null>(null);
  const { siteInfo, userInfo, walletType } = useAppContext();

  const depositOnTron = async (
    depositAddress: string,
    depositAmount: number,
    resultCallback: (status: number) => void,
    setQrcode: (qr_png: any) => void,
    setJumpLink: (link: any) => void
  ) => {
    if (!wallet.publicKey)
      return;
    if (depositAmount <= 0) {
      console.log("Deposit amount cannot be 0");
      return;
    }
    const maxLamports = 210000;
    const tokenAddress = siteInfo?.tokenAddressMap[userInfo.selectedCoinType];
    const transaction = new Transaction();
    
    if (tokenAddress) {
      const ata = getAssociatedTokenAddressSync(
        new PublicKey(tokenAddress),
        wallet.publicKey,
      );
      const nextAta = getAssociatedTokenAddressSync(
        new PublicKey(tokenAddress),
        new PublicKey(depositAddress),
        true,
      );

      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: maxLamports,
      });
      transaction.add(addPriorityFee);
      transaction.add(
        createAssociatedTokenAccountIdempotentInstruction(
          wallet.publicKey,
          nextAta,
          new PublicKey(depositAddress),
          new PublicKey(tokenAddress),
        ),
      );
      transaction.add(
        createTransferInstruction(
          ata,
          nextAta,
          wallet.publicKey,
          depositAmount * 10 ** siteInfo?.digitsMap[userInfo.selectedCoinType],
        ),
      );
    }
    else {
      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: maxLamports,
      });
      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 500,
      });
      transaction.add(addPriorityFee);
      transaction.add(modifyComputeUnits);
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(depositAddress),
          lamports: Math.floor(depositAmount * 10 ** siteInfo?.digitsMap[userInfo.selectedCoinType]),
        })
      );
    }
    try {
      const latestBlockhash = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = latestBlockhash.value.blockhash;
      //transaction.lastValidBlockHeight = latestBlockhash.context.slot + 150

      const transactionSignature = await wallet.sendTransaction(
        transaction,
        connection,
        { skipPreflight: true, preflightCommitment: "finalized" },
      );
      console.log("transaction", transactionSignature);
      let t = {
        signature: transactionSignature,
        blockhash: latestBlockhash.value.blockhash,
        lastValidBlockHeight: latestBlockhash.value.lastValidBlockHeight
      };
      const confirmResult = await connection.confirmTransaction(
        t,
        "confirmed",
      );
      if (confirmResult.value.err) {
        console.error("Transaction confirmation failed:", confirmResult.value.err);
        resultCallback(1);
        return;
      }
      console.log("Transaction confirmed");
      resultCallback(0);
    } catch (error) {
      console.error("Transaction error:", error);
      const errorMessage = (error as Error).message || "An unknown error occurred";
      setError(errorMessage);
    }
    resultCallback(1);
    console.log("status", status);
  };
  const disconnectOnTron = () => {
    const wallet = useWallet();
    wallet.disconnect();
  };
  
  return { depositOnTron, disconnectOnTron ,error };
};
export default useDepositOnTron;
