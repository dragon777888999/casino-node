import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ConnectXrplButton from "../wallet-connecter/xrpl/ConnectXrplButton";
import { useEffect, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import { solanaNetworkUrl } from "../../anchor/global";

import { useAppContext } from "../../hooks/AppContext";

export default function ConnectButton() {
  const { userInfo, setUserInfo, loading, siteInfo } = useAppContext();

  const wallet = useWallet();

  const updateUserCode = (newUserCode: string) => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        userCode: newUserCode,
      });
    }
  };

  useEffect(() => {
    if (wallet.connected) updateUserCode(wallet.publicKey); //phantom wallet address
    localStorage.setItem("walleteType", "phantom");
    console.log("wallet publickey");
    // alert(wallet.publicKey);
  }, [wallet.connected]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while the data is being fetched
  }
  return (
    <>
      {siteInfo?.chain == "Xrpl" && <ConnectXrplButton />}
      {siteInfo?.chain == "Solana" && (
        // <ConnectionProvider endpoint={solanaNetworkUrl}>
        //   <WalletProvider wallets={wallets} autoConnect>
        //     <WalletModalProvider>
        <WalletMultiButton className="balance" />
        //     </WalletModalProvider>
        //   </WalletProvider>
        // </ConnectionProvider>
      )}
    </>
  );
}
