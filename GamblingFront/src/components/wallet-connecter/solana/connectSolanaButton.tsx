import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppContext } from "@/hooks/AppContext";

export default function ConnectSolanaButton() {
  const wallet = useWallet();
  const { setWalletAddress } = useAppContext();

  useEffect(() => {
    if (wallet.connected) setWalletAddress(wallet.publicKey); //phantom wallet address
    localStorage.setItem("walleteType", "phantom");
    console.log("wallet publickey");
    // alert(wallet.publicKey);
  }, [wallet, setWalletAddress]);

  return (
    <>
      <WalletMultiButton className="" />
    </>
  );
}
