import React from "react";
import Modal from "react-modal";
import sdk from "@crossmarkio/sdk";
import { isConnected, sendPayment } from "@gemwallet/api";
import { useState, useEffect } from "react";
import { backendUrl } from "@/anchor/setup";
import {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
} from "../../../anchor/global";
// Define the WalletModal component
interface WalletModalProps {
  showWalletModal: boolean;
  onRequestClose: () => void;
}
const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? data : null;
};

const WalletModal: React.FC<WalletModalProps> = ({
  showWalletModal,
  onRequestClose,
}) => {
  if (!showWalletModal) return null;

  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositAddress, setDepositAddress] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [jumpLink, setJumpLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken == "") return;
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
          body: JSON.stringify({
            method: "GetDepositAddress",
            chain: siteInfo.chain,
            coinType: userInfo.selectedCoinType,
          }),
        });

        const result = await response.json();
        if (result.status == 0) {
          setDepositAddress(result.depositAddress);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const onDeposit = async () => {
    // const walletType = getDataFromLocalStorage("walleteType");
    if (depositAmount <= 0) {
      window.alert("Deposit amount cannot be 0");
      return;
    }
    // alert(depositAmount);
    setIsHidden(false);
    try {
      if (getDataFromLocalStorage("walleteType") == "cross") {
        sdk.sync.signAndSubmit({
          TransactionType: "Payment",
          Destination: depositAddress,
          Amount: (
            depositAmount *
            10 ** siteInfo.digitsMap[userInfo.selectedCoinType]
          ).toString(), // XRP in drops
        });
      } else if (getDataFromLocalStorage("walleteType") == "gem") {
        const payment = {
          amount: (
            depositAmount *
            10 ** siteInfo.digitsMap[userInfo.selectedCoinType]
          ).toString(),
          destination: depositAddress,
        };

        sendPayment(payment).then((trHash) => {
          console.log("Transaction Hash: ", trHash);
        });
      } else {
        const payload = await fetch(
          `/api/auth/xumm/sendtransaction?depositAddress=${depositAddress}&depositAmount=${depositAmount}`,
        );
        const data = await payload.json();

        setQrcode(data.payload.refs.qr_png);
        setJumpLink(data.payload.next.always);

        const ws = new WebSocket(data.payload.refs.websocket_status);
        ws.onmessage = async (e) => {
          let responseObj = JSON.parse(e.data);
          if (responseObj.signed !== null && responseObj.signed !== undefined) {
            if (responseObj.signed) {
              alert("Your payment successed")!;
            } else {
              alert("Your payment failed");
            }
            setIsHidden(true);
          }
          console.log(responseObj);
        };

        console.log(payload);
      }
    } catch (e) {
      alert(e);
    }
  };
  const onWithdraw = async () => {
    try {
      if (accessToken == "") return;
      const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": accessToken,
        },
        body: JSON.stringify({
          method: "WithdrawCoin",
          chain: siteInfo.chain,
          coinType: userInfo.selectedCoinType,
          amount: withdrawAmount,
        }),
      });
      const result = await response.json();
      if (result.status == 0) {
        window.alert("Withdraw success");
      } else {
        window.alert(result.msg);
      }
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <Modal
      id="modal"
      className="modal"
      isOpen={showWalletModal}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <div className="mt-10 sm:mt-15" style={{ zIndex: "1" }}>
        <div className="wallet-adapter-modal-container">
          <div
            className="wallet-adapter-modal-wrapper"
            style={{ maxWidth: "800px" }}
          >
            <div
              className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4"
              style={{ marginBottom: "10px" }}
            >
              <div className="row">
                <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                  Manage Balance
                </h3>
                <button
                  className="wallet-adapter-modal-button-close"
                  onClick={() => {
                    onRequestClose();
                    setQrcode("");
                    setDepositAmount(0);
                  }}
                >
                  <svg width={14} height={14}>
                    <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="block gap-5 pb-4 md:flex md:gap-5">
              <div
                className="custom-card"
                style={{ backgroundColor: "rgb(20 28 39)" }}
              >
                <div className=" flex items-center gap-2 py-4">
                  <label>Balance :</label>
                  {/* <input
                    type="text"
                    className="mb-2 mt-2 h-10 pl-2 text-black"
                    placeholder="Balance"
                    aria-label="Balance"

                  /> */}
                  <p style={{ fontSize: `26px`, marginLeft: "30px" }}>
                    {userInfo.balances[userInfo.selectedCoinType]}{" "}
                    {userInfo.selectedCoinType}
                  </p>
                </div>
                <div className="mb-5 flex items-center gap-2">
                  <label>Amount :</label>
                  <input
                    type="text"
                    className=" ml-1 mt-2 h-10 pl-2 text-black"
                    placeholder="Withdraw amount"
                    aria-label="Withdraw amount"
                    defaultValue={withdrawAmount}
                  />
                </div>
                <div className=" flex justify-center">
                  <button
                    type="button"
                    onClick={onWithdraw}
                    className="m-auto inline-flex items-center justify-center rounded-md bg-meta-3 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
              <div
                className="custom-card"
                style={{ backgroundColor: "rgb(20 28 39)" }}
              >
                <div className="flex items-center gap-2">
                  <label>Address :</label>
                  <input
                    type="text"
                    className="my-2 h-10 pl-2 text-black"
                    placeholder="Deposit address"
                    aria-label="Deposit address"
                    defaultValue={depositAddress}
                    onChange={(e) => {
                      setDepositAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <label>Amount :</label>
                  <input
                    type="text"
                    className="mb-2 ml-1 mt-2 h-10 pl-2 text-black"
                    placeholder="Deposit Amount"
                    aria-label="Deposit Amount"
                    defaultValue={depositAmount}
                    onChange={(e) => {
                      setDepositAmount(
                        Number.parseFloat(e.target.value.toString()),
                      );
                    }}
                  />
                </div>
                {isHidden ? null : (
                  <div
                    className="qrcode mb-5"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img style={{ width: "60%" }} src={qrcode}></img>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onDeposit}
                    className="m-auto inline-flex items-center justify-center rounded-md bg-meta-3 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </div>
    </Modal>
  );
};

export default WalletModal;
