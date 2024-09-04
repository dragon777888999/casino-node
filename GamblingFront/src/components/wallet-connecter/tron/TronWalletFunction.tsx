import { useState, useCallback } from "react";
import { useAppContext } from "../../../hooks/AppContext";
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { ContractInteract } from "@tronwidgets/transaction";

const useTronFunction = () => {
  //const { connection } = useConnection();
  //  const connection = new Connection("https://elianore-hzhid1-fast-mainnet.helius-rpc.com");
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

    if (!wallet.address)
      return;
    if (depositAmount <= 0) {
      console.log("Deposit amount cannot be 0");
      return;
    }
    const tokenAddress = siteInfo?.tokenAddressMap[userInfo.selectedCoinType];
    try {
      if (tokenAddress) {
        
      }
      else {
        const response = await ContractInteract.sendTrx(
          depositAddress,
          depositAmount * (10 ** siteInfo?.digitsMap[userInfo.selectedCoinType]),
          wallet.address, null
        );
        console.log("transaction", response);
        resultCallback(0);
      }
    }
    catch (err) {
      resultCallback(1);
    }

  };
  const disconnectOnTron = () => {
    wallet.disconnect();
  };

  return { depositOnTron, disconnectOnTron, error };
};
export default useTronFunction;
