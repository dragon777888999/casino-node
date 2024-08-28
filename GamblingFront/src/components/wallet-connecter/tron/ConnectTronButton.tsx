import { useEffect, useState } from "react";
import { useAppContext ,WalletType} from "@/hooks/AppContext";
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';

export default function ConnectTronButton() {
  const wallet = useWallet();
  const { setWalletAddress, loginStep, setLoginStep , setWalletType} = useAppContext();

  useEffect(() => {
    if (wallet.connected && wallet.address) {
      setWalletAddress(wallet.address.toString()); //phantom wallet address
      setLoginStep(2);
    }
    setWalletType(WalletType.TronLink);
  }, [wallet]);

  return <>{!wallet.connected && <WalletActionButton className="">Connect</WalletActionButton>}</>;
}
