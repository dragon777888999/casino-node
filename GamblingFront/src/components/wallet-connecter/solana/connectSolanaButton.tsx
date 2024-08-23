import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAppContext } from "@/hooks/AppContext";
import Link from "next/link";
import Image from "next/image";

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
  }, [wallet]);
  return (
    <>
      {
        <Link href="/">
          <Image
            src="/RebelGames/images/component/btnImg.png"
            alt="Project Thumbnail"
            layout="responsive"
            width={40}
            height={40}
            style={{ width: "100%" }}
          />
        </Link>
      }
    </>
  );
  // return <>{!wallet.connected && <WalletMultiButton className="" />}</>;
  // return <>{ loginStep != 2 && <WalletMultiButton className="" />}</>;
}
