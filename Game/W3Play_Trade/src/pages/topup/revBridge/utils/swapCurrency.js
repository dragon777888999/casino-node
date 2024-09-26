import { ethers } from "ethers";
import tokenInfo from "../../../../API/contracts/USD.json";
import { set_alert_msg, set_rev_bridge_alert_msg } from "../../../../REDUX/actions/main.actions";
import state from "../../../../state";
import { EtherValue } from "../../../../utils/web3";

export const playBlockTransaction = async (
  transactionDetails,
  walletProvider,
  prov,
  dispatch
) => {
  const { depositAddress: to, amount, currencyNexusId } = transactionDetails;
  console.log("4- transactionDetails", transactionDetails);
  console.log("4- to", to);

  if (amount > 0 && to != "") {
    try {
      let signer, provider, response, nonce;
      //Social wallet connect
      if (typeof APP.state.get("web5signer") !== "undefined") {
        provider = APP.state.get("web5signer").provider;
        signer = APP.state.get("web5signer");
        nonce = await provider.getTransactionCount(signer.getAddress());
      }

      //Other wallets like Metamask/Coinbase etc.
      else if (typeof window.ethereum !== "undefined") {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        nonce = await provider.getTransactionCount(signer.getAddress());
      } else {
        // Handle case where Ethereum provider is not available
        console.error("4- Ethereum provider not available");
      }

      const realToken = state.plbToken;
      const demoToken = state.plbToken_demo;

      const isDemo = /* APP.state.get("currentToken") === "demo" */ false;
      const currentToken = isDemo ? demoToken : realToken;
      const tokenContract = new ethers.Contract(
        currentToken.address,
        tokenInfo.abi,
        signer
      ),
        valueInWei = parseFloat(amount * 10 ** currentToken.decimals).toFixed(
          2
        );

      const value = Math.floor(parseFloat(valueInWei)).toString();

      // Now convert to BigInt
      let bigIntValue = BigInt(value);

      if (
        parseFloat(EtherValue({ wei: APP.customer.balance })) <
        parseFloat(amount)
      ) {
        const low_bln_alert = "alert_msg_error_low_balance";
        dispatch(
          set_rev_bridge_alert_msg({ type: "error", content: low_bln_alert })
        );
        return;
      }
      response = await tokenContract.transfer(to, bigIntValue, {
        nonce: nonce,
      });
      if (response) {
        console.log("4- response", response);
        return "success";
      } else {
        dispatch(
          set_alert_msg({
            type: "error",
            content: "alert_msg_error_matic_transfer",
          })
        );
      }
    } catch (e) {
      dispatch(
        set_alert_msg({
          type: "error",
          content: "alert_msg_error_transfer_fields",
        })
      );
      console.log("4- Error", e);
      return "error";
    }
  } else if (!amount || typeof amount !== "number") {
    dispatch(
      set_alert_msg({
        type: "error",
        content: "alert_msg_error_amount_transfer",
      })
    );
  } else if (!to) {
    dispatch(
      set_alert_msg({
        type: "error",
        content: "alert_msg_error_address_transfer",
      })
    );
  } else {
    dispatch(
      set_alert_msg({
        type: "error",
        content: "alert_msg_error_transfer_fields",
      })
    );
  }
};
