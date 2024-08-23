import { useState, useCallback } from "react";
import {
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import { useAppContext } from "../../../hooks/AppContext";
import { PublicKey, Transaction, ComputeBudgetProgram } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import sdk from "@crossmarkio/sdk";
import { sendPayment } from "@gemwallet/api";
import { SiteInfo,UserInfo } from '../../../hooks/AppContext';

const depositOnXrpl = async (siteInfo: SiteInfo, userInfo: UserInfo, walletType: string, depositAddress: string, depositAmount: number) => {
  try {
    if (walletType == "cross") {
      const response = sdk.sync.signAndSubmit({
        TransactionType: "Payment",
        Destination: depositAddress,
        Amount: (depositAmount * 10 ** (siteInfo?.digitsMap[userInfo?.selectedCoinType])
        ).toString(), // XRP in drops
      });
      console.log(response);
      //if (response.result === "tesSUCCESS")
      {
        console.log("Transaction successful!");
        return {status:0};
      }
      // else {
      //   console.error("Transaction failed with status:", response.result);
      // }
    } else if (walletType == "gem") {
      const payment = {
        amount: (depositAmount * 10 ** (siteInfo?.digitsMap[userInfo?.selectedCoinType])).toString(),
        destination: depositAddress,
      };

      sendPayment(payment)
        .then((trHash) => {
          console.log("Transaction Hash: ", trHash);
        })
        .catch((error) => {
          console.error("Payment failed:", error);
          // Handle error or alert the user
        });
    } else if (walletType == "xum") {
      const payload = await fetch(
        `/api/auth/xumm/sendtransaction?depositAddress=${depositAddress}&depositAmount=${depositAmount}`,
      );
      const data = await payload.json();

      setQrcode(data.payload.refs.qr_png);
      setJumpLink(data.payload.next.always);

      const ws = new WebSocket(data.payload.refs.websocket_status);
      // console.log("111111");
      // console.log(ws);
      // console.log("111111");

      ws.onmessage = async (e) => {
        let responseObj = JSON.parse(e.data);
        console.log("message");
        console.log(responseObj);
        if (responseObj.signed !== null && responseObj.signed !== undefined) {
          if (responseObj.signed) {
            // ?alert("Your payment successed")!;
          } else {
            // alert("Your payment failed");
          }
        }
        console.log(responseObj);
      };
      // setDepositAmount(0);
      console.log(payload);
    }
  } catch (e) {
    console.log(e);
  }
  return { deposit, status, error };
};

export default depositOnXrpl;
