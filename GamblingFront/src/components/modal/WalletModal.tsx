import React from "react";
import Modal from "react-modal";
import sdk from "@crossmarkio/sdk";
import { sendPayment } from "@gemwallet/api";
import { useState, useEffect } from "react";
import { backendUrl } from "@/anchor/global";
import { useAppContext } from "../../hooks/AppContext";
import Image from "next/image";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useDepositOnSolana from "../wallet-connecter/solana/SolanaWalletFunction";
import useDepositOnXrpl from "../wallet-connecter/xrpl/XrplWalletFunction";
import useDepositOnTron from "../wallet-connecter/tron/TronWalletFunction";
import { stat } from "fs";

Modal.setAppElement("#root");
// Define the WalletModal component
interface WalletModalProps {
  showWalletModal: boolean;

  onRequestClose: () => void;
}
const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? data : null;
};

const WalletModal: React.FC<WalletModalProps> = ({
  showWalletModal,
  onRequestClose,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [depositAddress, setDepositAddress] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [jumpLink, setJumpLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { userInfo, setUserInfo, siteInfo, accessToken, loginStep } =
    useAppContext();

  const { depositOnSolana } = useDepositOnSolana();
  const { depositOnXrpl } = useDepositOnXrpl();
  const { depositOnTron } = useDepositOnTron();

  const onSelectCoinType = async (key: string) => {
    const response = await fetch(
      `${backendUrl}/Account/SwitchCoinType?coinType=${key}`,
      {
        method: "GET",
        headers: {
          "X-Access-Token": accessToken,
        },
      },
    );
    setUserInfo({
      ...userInfo,
      selectedCoinType: key,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loginStep != 3) return;

        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
          body: JSON.stringify({
            method: "GetDepositAddress",
            chain: siteInfo?.chain,
            coinType: userInfo?.selectedCoinType,
          }),
        });

        const result = await response.json();
        console.log("address", result.depositAddress);
        if (result.status == 0) {
          setDepositAddress(result.depositAddress);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [loginStep]);

  const depositResultCallback = async (status: number) => {
    console.log("depositCallback", status);
    if (status != 0) {
      toast.error("Deposit fail");
      return;
    }
    if (siteInfo.checkBalance) {
      const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": accessToken,
        },
        body: JSON.stringify({
          method: "CheckBalance",
          chain: siteInfo?.chain,
          coinType: userInfo?.selectedCoinType,
        }),
      });
      const result = await response.json();
      if (result.status != 0) {
        toast.error(result.msg);
        return;
      }
      toast.success(`${userInfo.selectedCoinType} ${result.depositAmount} has been credited to your account.`);
    }
  };
  const onCheckBalance = async () => {
    const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": accessToken,
      },
      body: JSON.stringify({
        method: "CheckBalance",
        chain: siteInfo?.chain,
        coinType: userInfo?.selectedCoinType,
      }),
    });
    const result = await response.json();
    if (result.status != 0) {
      toast.error(result.msg);
      return;
    }
    toast.success(`${userInfo.selectedCoinType} ${result.depositAmount} has been credited to your account.`);
  };
  const onDeposit = () => {
    if (depositAmount == null) {
      toast.warn("You must set a deposit amount");
      return;
    }
    if (siteInfo?.chain == "Xrpl") {
      depositOnXrpl(
        depositAddress,
        depositAmount,
        depositResultCallback,
        setQrcode,
        setJumpLink,
      );
    } else if (siteInfo?.chain == "Solana") {
      depositOnSolana(
        depositAddress,
        depositAmount,
        depositResultCallback,
        setQrcode,
        setJumpLink,
      );
    }
    else if (siteInfo?.chain == "Tron") {
      depositOnTron(
        depositAddress,
        depositAmount,
        depositResultCallback,
        setQrcode,
        setJumpLink,
      );
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
          chain: siteInfo?.chain,
          coinType: userInfo?.selectedCoinType,
          amount: withdrawAmount,
        }),
      });
      const result = await response.json();
      if (result.status == 0) {
        toast.error("Withdraw success");
        setWithdrawAmount(null);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error("failed");
      console.log(error);
    }
  };
  const onCopy = () => {
    navigator.clipboard.writeText(depositAddress).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      },
    );
  };
  if (!showWalletModal) return null;

  return (
    <Modal
      id="modal"
      className="modal"
      isOpen={showWalletModal}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="custom-modal " style={{ zIndex: "1" }}>
        <div className="wallet-adapter-modal-container">
          <div
            className="wallet-adapter-modal-wrapper"
            style={{ maxWidth: "800px" }}
          >
            <div className="w-full">
              <div
                className="border-blueGray-200 flex items-center justify-between rounded-t pb-2 pt-4"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <div className="justify-start">
                  <SelectCoinTypeMenu
                    items={userInfo?.balances}
                    selectedKey={userInfo?.selectedCoinType}
                    onSelect={onSelectCoinType}
                  />
                </div>
                <div className="flex items-center">
                  <h3
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    Manage Balance
                  </h3>
                </div>

                <div className="row ">
                  <button
                    className="wallet-adapter-modal-button-close"
                    onClick={() => {
                      onRequestClose();
                      setQrcode("");
                      setDepositAmount(null);
                      setWithdrawAmount(null);
                    }}
                  >
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="wallet-modal-message my-3  max-w-xs p-3">
                <div className="block w-full  break-words">
                  <span>{siteInfo.walletModalMessage}</span>
                </div>
              </div>
              <div className="block gap-5 pb-4 md:flex md:gap-5">
                <div
                  className="custom-wallet-modal-card"
                  style={{ backgroundColor: "rgb(20 28 39)" }}
                >
                  <div className="balance-label flex items-center gap-2 py-4">
                    <label>Balance :</label>

                    <p
                      style={{
                        fontSize: `26px`,

                        gap: "5px",
                        color: "white",
                      }}
                    >
                      <span>
                        {userInfo?.balances[userInfo?.selectedCoinType]}
                      </span>
                      <span> {userInfo?.selectedCoinType}</span>
                    </p>
                  </div>
                  <div className="mb-5 flex items-center gap-2">
                    <label>Amount :</label>
                    <input
                      type="number"
                      className=" ml-1 mt-2 h-8 pl-2 text-black"
                      aria-label="Withdraw amount"
                      value={withdrawAmount ?? ""}
                      // style={{ color: "white" }}
                      onChange={(e) => {
                        setWithdrawAmount(Number.parseFloat(e.target.value));
                        const value = Number.parseFloat(e.target.value);
                      }}
                    />
                  </div>

                  <div className=" mt-2 flex justify-center">
                    <button
                      type="button"
                      disabled={!withdrawAmount}
                      onClick={() => {
                        onWithdraw();
                      }}
                      className="wallet-manage-modal-button"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
                <div
                  className="custom-wallet-modal-card"
                  style={{ backgroundColor: "rgb(20 28 39)" }}
                >
                  <div className="flex items-center gap-2">
                    <label>Address :</label>
                    <input
                      type="text"
                      className="my-2 ml-1 h-8 pl-2 text-black"
                      placeholder="Deposit address"
                      aria-label="Deposit address"
                      defaultValue={depositAddress}
                      style={{ textOverflow: "ellipsis" }}
                      onChange={(e) => {
                        setDepositAddress(e.target.value);
                        const value = Number.parseFloat(e.target.value);
                      }}
                    />
                    <div className="tooltipContainer ">
                      <button
                        onClick={onCopy}
                        className="ml-2 h-9 items-center bg-black px-3 text-white"
                      >
                        <i className="fa-regular fa-copy" />
                      </button>
                      <div className="tooltip">Copy your address</div>
                    </div>
                  </div>
                  <div className=" flex items-center gap-2">
                    <label>Amount :</label>
                    <input
                      type="number"
                      className="mb-2 ml-1 mt-2 h-8 pl-2 text-black"
                      aria-label="Deposit Amount"
                      defaultValue=""
                      value={depositAmount ?? ""}
                      // style={{ color: "white" }}
                      onChange={(e) => {
                        setDepositAmount(Number.parseFloat(e.target.value));
                        const value = Number.parseFloat(e.target.value);
                      }}
                    />
                  </div>

                  <div
                    className="qrcode"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {isHidden && (
                      <Image
                        src={qrcode}
                        alt="QR code"
                        width={600}
                        height={400} // Adjust these values based on your image size
                        style={{ width: "60%" }} // Apply additional styling if needed
                      />
                    )}
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      disabled={!depositAmount}
                      onClick={() => {
                        onDeposit();
                      }}
                      className="wallet-manage-modal-button  m-auto  "
                    >
                      Deposit
                    </button>
                    {siteInfo.checkBalance && (
                      <button
                        type="button"
                        onClick={() => {
                          onCheckBalance();
                        }}
                        className="wallet-manage-modal-button  m-auto  "
                      >
                        Check Balance
                      </button>)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </Modal>
  );
};

export default WalletModal;
