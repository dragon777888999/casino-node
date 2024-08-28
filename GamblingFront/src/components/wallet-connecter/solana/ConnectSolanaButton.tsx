import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppContext, WalletType } from "@/hooks/AppContext";
import Link from "next/link";
import Image from "next/image";

export default function ConnectSolanaButton() {
  const wallet = useWallet();
  const { setWalletAddress, loginStep, setLoginStep, setWalletType } = useAppContext();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      setWalletAddress(wallet.publicKey.toString()); //phantom wallet address
      setLoginStep(2);
    }
    setWalletType(WalletType.Phantom);
  }, [wallet]);

  return <>{!wallet.connected && <WalletMultiButton className="">Connect</WalletMultiButton>}</>;
  // return <>{ loginStep != 2 && <WalletMultiButton className="" />}</>;
}
