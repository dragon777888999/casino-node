import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppContext } from "@/hooks/AppContext";

export default function ConnectSolanaButton() {
  const wallet = useWallet();
  const { setWalletAddress, loginStep, setLoginStep } = useAppContext();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      setWalletAddress(wallet.publicKey.toString()); //phantom wallet address
      setLoginStep(2);
    }

    localStorage.setItem("walleteType", "phantom");
    console.log("wallet publickey");
    // alert(wallet.publicKey);
  }, [wallet, setWalletAddress]);

  return <>{!wallet.connected && <WalletMultiButton className="" />}</>;
  // return <>{ loginStep != 2 && <WalletMultiButton className="" />}</>;
}
