import { useState, useCallback } from "react";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import { PublicKey, Transaction, ComputeBudgetProgram } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useAppContext } from "../../../hooks/AppContext";

const useDepositOnSolana = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { siteInfo, userInfo, walletType } =    useAppContext();

  const depositOnSolana = async (
    depositAddress: string,
    depositAmount: number,
    resultCallback: (status: number) => void,
    setQrcode: (qr_png: any) => void,
    setJumpLink: (link: any) => void
  ) => {
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
      const errorMessage = (error as Error).message || "An unknown error occurred";
      setError(errorMessage);
    }
    console.log("status", status);
  };

  return { depositOnSolana, status, error };
};

export default useDepositOnSolana;
