import { useState, useCallback } from "react";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import { PublicKey, Transaction, ComputeBudgetProgram } from "@solana/web3.js";

const useDepositPhantom = (wallet, connection, siteInfo, depositAddress) => {
  const [depositAmount, setDepositAmount] = useState(0);

  const deposit = useCallback(async () => {
    if (!wallet.publicKey) return;
    if (depositAmount <= 0) {
      window.alert("Deposit amount cannot be 0");
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
      console.log(transactionSignature);
      setDepositAmount(0);
      const confirmResult = await connection.confirmTransaction(
        transactionSignature,
        "confirmed",
      );
      const status = confirmResult.value;
      console.log(status);
    } catch (error) {
      console.error("Transaction error:", error);
    }
  }, [wallet, connection, siteInfo, depositAddress, depositAmount]);

  return { deposit, setDepositAmount };
};

export default useDepositPhantom;
