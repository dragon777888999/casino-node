import { useState, useCallback } from "react";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import { useAppContext } from "./AppContext";
import { PublicKey, Transaction, ComputeBudgetProgram } from "@solana/web3.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

const useDepositPhantom = (depositAddress: string, depositAmount: any) => {
  const { siteInfo } = useAppContext();
  const { connection } = useConnection();

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wallet = useWallet();
  const deposit = useCallback(async () => {
    if (!wallet.publicKey) return;
    if (depositAmount <= 0) {
      console.log("Deposit amount cannot be 0");
      return;
    }

    const tokenAddress =
      siteInfo?.tokenAddressMap[siteInfo.availableCoinTypes[0]];
    const ata = getAssociatedTokenAddressSync(
      new PublicKey(tokenAddress),
      wallet.publicKey,
    );
    const nextAta = getAssociatedTokenAddressSync(
      new PublicKey(tokenAddress),
      new PublicKey(depositAddress),
      true,
    );

    const transaction = new Transaction();
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 210000,
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
        depositAmount *
          10 ** siteInfo?.digitsMap[siteInfo.availableCoinTypes[0]],
      ),
    );

    try {
      const transactionSignature = await wallet.sendTransaction(
        transaction,
        connection,
        { skipPreflight: true, preflightCommitment: "finalized" },
      );
      console.log("transaction", transactionSignature);
      setStatus("Deposit successful");
      const confirmResult = await connection.confirmTransaction(
        transactionSignature,
        "processed",
      );
    } catch (error) {
      console.error("Transaction error:", error);
    }
    console.log("status", status);
  }, [wallet, connection, siteInfo, depositAddress, depositAmount]);

  return { deposit, status, error };
};

export default useDepositPhantom;
