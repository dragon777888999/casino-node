import { useState, useEffect } from "react";
import sdk from "@crossmarkio/sdk";
import { sendPayment } from "@gemwallet/api";
import { useAppContext, WalletType } from "../../../hooks/AppContext";

const useXrplFunction = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { siteInfo, userInfo, walletType } = useAppContext();
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);
  const depositOnXrpl = async (
    depositAddress: string,
    depositAmount: number,
    resultCallback: (status: number) => void,
    setQrcode: (qr_png: any) => void,
    setJumpLink: (link: any) => void
  ) => {
    const tokenAddress = siteInfo?.tokenAddressMap[userInfo.selectedCoinType];
    console.log(walletType, depositAddress, tokenAddress, depositAmount);
    const split = tokenAddress.split("_");
    const tokenCurrency = split[0];
    let tokenIssuer = null;
    if (split.length > 1)
      tokenIssuer = split[1];

    try {
      if (walletType == WalletType.Crossmark) {
        let payment = {};
        if (tokenCurrency && tokenIssuer)
          payment = {
            TransactionType: "Payment",
            Destination: depositAddress,
            Amount: {
              currency: tokenCurrency, // Replace with the token symbol
              issuer: tokenIssuer, // Replace with the actual issuer's XRP address
              value: depositAmount.toString(), // Convert the amount to a string
            }
          };
        else
          payment = {
            TransactionType: "Payment",
            Destination: depositAddress,
            Amount: (
              depositAmount * 10 ** siteInfo?.digitsMap[userInfo?.selectedCoinType]
            ).toString(), // XRP in drops
          };
        sdk.sync.signAndSubmit(payment);
        setStatus(0);
        resultCallback(0);
      } else if (walletType == WalletType.Gem) {
        let payment = null;
        if (tokenCurrency && tokenIssuer)
          payment = {
            amount: {
              currency: tokenCurrency, // Replace with the token symbol
              issuer: tokenIssuer, // Replace with the actual issuer's XRP address
              value: depositAmount.toString(), // Convert the amount to a string
            },
            destination: depositAddress, // Replace with the recipient's address
          };
        else
          payment = {
            amount: (
              depositAmount * 10 ** siteInfo?.digitsMap[userInfo?.selectedCoinType]
            ).toString(),
            destination: depositAddress,
          };

        sendPayment(payment)
          .then((trHash) => {
            console.log("Transaction Hash: ", trHash);
            setStatus(0);
            resultCallback(0);
          })
          .catch((error) => {
            console.error("Payment failed:", error);
            setStatus(1);
            setError(error.message);
            resultCallback(1);
          });
      } else if (walletType == WalletType.Xumm) {
        let query = `/api/auth/xumm/sendtransaction?depositAddress=${depositAddress}&depositAmount=${depositAmount}`;
        if (tokenCurrency && tokenIssuer)
          query += `&currency=${tokenCurrency}&issuer=${tokenIssuer}`;
        const payload = await fetch(query);
        const data = await payload.json();

        setQrcode(data.payload.refs.qr_png);
        setJumpLink(data.payload.next.always);
        if (isMobile) {
          //open in new tab
          window.open(data.payload.next.always, "_blank");
        }
        const ws = new WebSocket(data.payload.refs.websocket_status);
        ws.onmessage = async (e) => {
          let responseObj = JSON.parse(e.data);
          if (responseObj.signed !== null && responseObj.signed !== undefined) {
            if (responseObj.signed) {
              setStatus(0);
              resultCallback(0);
            } else {
              setStatus(1);
              resultCallback(1);
            }
            setQrcode(null);
          }
        };
      }
    } catch (e) {
      console.error("Transaction error:", e);
      const errorMessage = (e as Error).message || "An unknown error occurred";
      setError(errorMessage);
      resultCallback(1);
    }
  };
  const disconnectOnXrpl = () => {
  };

  return { depositOnXrpl, disconnectOnXrpl, status, error };
};

export default useXrplFunction;
