import { useChain, useWallet } from "@cosmos-kit/react";
import { PaperPlaneIcon, ResetIcon } from "@radix-ui/react-icons";
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
import { ChainWalletCard } from "./components/chain-wallet-card";
import { useEffect, useState } from "react";
import { useAppContext, WalletType } from "@/hooks/AppContext";
import { StdFee } from '@cosmjs/stargate';

const chainNames_1 = ["oraichain", "cosmoshub"];
const useCosmosFunction = () => {
  const { username, address, connect, disconnect, wallet, openView,signAndBroadcast } = useChain(
    chainNames_1[0]
  );
  const [error, setError] = useState<string | null>(null);
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)
  const { siteInfo, userInfo, walletType } = useAppContext();

  const depositOnCosmos = async (
    depositAddress: string,
    depositAmount: number,
    resultCallback: (status: number) => void,
    setQrcode: (qr_png: any) => void,
    setJumpLink: (link: any) => void
  ) => {
    if (globalStatus != "Connected")
      return;
    if (depositAmount <= 0) {
      console.log("Deposit amount cannot be 0");
      return;
    }
    try {
      let depositAmountByDenom = depositAmount * (10 ** siteInfo?.digitsMap[userInfo?.selectedCoinType]);
      
      const msgSend = {
        typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        value: {
          fromAddress: address,
          toAddress: depositAddress,
          amount: [
            {
              denom: userInfo.selectedCoinType,
              amount: depositAmountByDenom.toString(),
            },
          ],
        },
      };
  
      const fee: StdFee = {
        amount: [
          {
            denom: userInfo.selectedCoinType,
            amount: '5000',
          },
        ],
        gas: '200000',
      };

      const result = await signAndBroadcast([msgSend], fee, '');
      console.log('Transaction Result:', result);
      resultCallback(0);
      return;
    }
    catch (err) {
      console.log(err);
    }
    resultCallback(1);
  };
  const disconnectOnCosmos = () => {
    disconnect();
  };

  return { depositOnCosmos, disconnectOnCosmos, error };
};
export default useCosmosFunction;
