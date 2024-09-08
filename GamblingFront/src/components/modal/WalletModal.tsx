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
import { BalanceModalInfo } from "@/types/walletModal";
import { VirtualBalanceModalInfo } from "@/types/walletModal";
import SelectConvertTypeMenu from "./SelectConvertTypeMenu";

import useSolanaFunction from "../wallet-connecter/solana/SolanaWalletFunction";
import useXrplFunction from "../wallet-connecter/xrpl/XrplWalletFunction";
import useTronFunction from "../wallet-connecter/tron/TronWalletFunction";
import useCosmosFunction from "../wallet-connecter/cosmos/CosmosWalletFunction";
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
  const [withDrawConvert, setWithDrawConvert] = useState("");
  const [depositConvert, setDepositConvert] = useState("");
  const [withDrawRate, setWithDrawRate] = useState("");
  const [depositRate, setDepositRate] = useState("");
  const { userInfo, setUserInfo, siteInfo, accessToken, loginStep } =
    useAppContext();
  const [balanceModalInfo, setBalanceModalInfo] = useState<BalanceModalInfo>();
  const [virtualBalanceModalInfo, setVirtualBalanceModalInfo] =
    useState<VirtualBalanceModalInfo>();

  const { depositOnSolana } = useSolanaFunction();
  const { depositOnXrpl } = useXrplFunction();
  const { depositOnTron } = useTronFunction();
  const { depositOnCosmos } = useCosmosFunction();

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
  const onWithDrawConvertType = async (key: string, rate: string) => {
    setWithDrawConvert(key);
    setWithDrawRate(rate);
  };
  const onDepositConvertType = async (key: string, rate: string) => {
    setDepositConvert(key);
    setDepositRate(rate);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (loginStep != 3) return;

  //       const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Access-Token": accessToken,
  //         },
  //         body: JSON.stringify({
  //           method: "GetDepositAddress",
  //           chain: siteInfo?.chain,
  //           coinType: userInfo?.selectedCoinType,
  //         }),
  //       });

  //       const result = await response.json();
  //       console.log("address", result.depositAddress);
  //       if (result.status == 0) {
  //         setDepositAddress(result.depositAddress);
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };

  //   fetchData();
  // }, [loginStep]);

  useEffect(() => {
    const GetBalanceModalInfo = async () => {
      if (userInfo.selectedCoinType == "$USO") return;
      try {
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
          body: JSON.stringify({
            method: "GetBalanceModalInfo",
            chain:siteInfo.chain,
            coinType: userInfo?.selectedCoinType,
          }),
        });

        const result = await response.json();
        console.log("GetBalanceModalInfo", result);
        if (result.status == 0) {
          setDepositAddress(result.depositAddress);
          // setUserInfo({
          //   ...userInfo,
          //   balances: result.balance,
          // });
          console.log("deposit address", result.depositAddress);
          setBalanceModalInfo(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const GetVirtualBalanceModalInfo = async () => {
      try {
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
          body: JSON.stringify({
            method: "GetVirtualBalanceModalInfo",
            chain:siteInfo.chain,
            coinType: siteInfo.virtualCoinType,
          }),
        });

        const result = await response.json();
        console.log("GetBalanceModalInfo", result);
        if (result.status == 0) {
          // setDepositAddress(result.depositAddress);
          // setUserInfo({
          //   ...userInfo,
          //   balances: result.balance,
          // });
          setVirtualBalanceModalInfo(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    if (loginStep != 3) return;
    if (userInfo.selectedCoinType == siteInfo.virtualCoinType)
      GetVirtualBalanceModalInfo();
    else
      GetBalanceModalInfo();
  }, [loginStep,userInfo.selectedCoinType]);
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
      toast.success(
        `${userInfo.selectedCoinType} ${result.depositAmount} has been credited to your account.`,
      );
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
    toast.success(
      `${userInfo.selectedCoinType} ${result.depositAmount} has been credited to your account.`,
    );
  };
  const onDeposit = () => {
    // if (userInfo.selectedCoinType == "$USO")
    //   setDepositAmount(depositAmount * Number(depositRate));
    if (depositAmount == null) {
      toast.warn("You must set a deposit amount");
      return;
    }
    if (depositAmount > Number(balanceModalInfo?.depositMinLimit)) {
      toast.warn(
        "You must set an amount greater than the minimum deposit amount.",
      );
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
    } else if (siteInfo?.chain == "Tron") {
      depositOnTron(
        depositAddress,
        depositAmount,
        depositResultCallback,
        setQrcode,
        setJumpLink,
      );
    } else if (siteInfo?.chain == "Oraichain") {
      depositOnCosmos(
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
      if (
        withdrawAmount !== null &&
        withdrawAmount > Number(balanceModalInfo?.withdrawalMaxLimit)
      ) {
        toast.warn(
          "You must set an amount lower than the maximum withdrawal amount.",
        );
        return;
      }
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
  // alert(virtualBalanceModalInfo?.withdrawConvertMaxLimit);

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
                className="border-blueGray-200 block items-center justify-between rounded-t pb-2 pt-4 md:flex"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <div className="justify-start">
                  <SelectCoinTypeMenu
                    items={userInfo?.balances}
                    selectedKey={userInfo?.selectedCoinType}
                    onSelect={onSelectCoinType}
                  />
                </div>
                <div className="flex items-center justify-center pt-2">
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
              {siteInfo.walletModalMessageMap && siteInfo.walletModalMessageMap[userInfo.selectedCoinType] && <div className="wallet-modal-message my-3  max-w-xs p-3">
                <div className="block w-full  break-words">
                  <span>{siteInfo.walletModalMessageMap[userInfo.selectedCoinType]}</span>
                </div>
              </div>}
              {userInfo?.selectedCoinType != siteInfo.virtualCoinType && (
                <div className="block gap-5 pb-4 md:flex md:gap-5">
                  <div
                    className="custom-wallet-modal-card"
                    style={{ backgroundColor: "rgb(20 28 39)" }}
                  >
                    <div className="balance-label flex items-center gap-2 py-4">
                      <label>Balance :</label>

                      <p
                        id="balance"
                        style={{
                          gap: "5px",
                          color: "white",
                        }}
                      >
                        <span>{String(balanceModalInfo?.balance ?? "")}</span>

                        <span> {userInfo?.selectedCoinType}</span>
                      </p>
                    </div>
                    {balanceModalInfo?.withdrawalMaxLimit && (<div className="balance-label flex items-center gap-2">
                      <label>MaxLimit :</label>
                      <p
                        style={{
                          marginLeft: "15%",
                          color: "white",
                        }}
                      >
                        {String(balanceModalInfo?.withdrawalMaxLimit ?? "")}
                      </p>
                    </div>)}
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
                    <div className="flex items-center gap-2 pb-1 pt-1">
                      <label>Address :</label>
                      <input
                        type="text"
                        className="my-2 ml-1 h-8 pl-2 text-black"
                        placeholder="Deposit address"
                        aria-label="Deposit address"
                        defaultValue={balanceModalInfo?.depositAddress}
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
                    {balanceModalInfo?.depositMinLimit && (<div className=" flex items-center gap-2">
                      <label>MinLimit :</label>
                      <p
                        id="minlimit"
                        style={{
                          color: "white",
                        }}
                      >
                        {String(balanceModalInfo?.depositMinLimit ?? "")}
                      </p>
                    </div>)}
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

                    {qrcode && (
                      <div className="m-2 flex justify-center">
                        <div className="qrcode" style={{ width: "80%" }}>
                          <Image
                            src={qrcode} // URL of the image
                            alt="QR code" // Accessibility text
                            width={300} // Width of the image
                            height={200} // Height of the image
                            style={{ width: "50%" }} // Inline styles, if needed
                            layout="responsive" // Optional: adjust layout as needed
                          />
                        </div>
                      </div>
                    )}

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
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {userInfo?.selectedCoinType == siteInfo.virtualCoinType && (
                <div className="gpa-5 block pb-4 md:flex md:gap-5">
                  <div
                    className="custom-wallet-modal-card"
                    style={{ backgroundColor: "rgb(20 28 39)" }}
                  >
                    <div className="balance-label flex items-center gap-2 py-4">
                      <label>Balance :</label>

                      <p
                        id="balance"
                        style={{
                          gap: "5px",
                          color: "white",
                        }}
                      >
                        <span>
                          {String(virtualBalanceModalInfo?.balance ?? "")}
                        </span>

                        <span> {userInfo?.selectedCoinType}</span>
                      </p>
                    </div>
                    <div className="my-3 block items-baseline  justify-between md:flex">
                      <div className="mb-4 flex items-baseline  justify-between md:mb-0">
                        <p className="mr-2">Rate:</p>
                        <SelectConvertTypeMenu
                          convertType={
                            virtualBalanceModalInfo?.withdrawConvertRatio ?? ""
                          }
                          selectedKey={
                            withDrawConvert ? withDrawConvert : "Type"
                          }
                          selectedRate={withDrawRate}
                          onSelect={onWithDrawConvertType}
                        />
                        <div
                          className="type-rate flex items-baseline justify-center"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <p>{withDrawRate}</p>
                        </div>
                      </div>

                      <div className="justify-first flex items-center pl-0 md:pl-2">
                        <p>Max limit:</p>
                        <p
                          className="pl-2"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          {
                            (
                              virtualBalanceModalInfo?.withdrawConvertMaxLimit as any
                            )[withDrawConvert as string | number]
                          }
                        </p>
                      </div>
                    </div>
                    {/* <div className="mb-3 flex">
                      <SelectConvertTypeMenu
                        convertType={
                          virtualBalanceModalInfo?.withdrawConvertRatio ?? ""
                        }
                        selectedKey={withDrawconvert ? withDrawconvert : "Type"}
                        selectedRate={withDrawRate}
                        onSelect={onWithDrawConvertType}
                      />
                    </div> */}
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
                    <div className="my-3 block items-baseline  justify-between md:flex">
                      <div className="mb-4 mr-3 flex  items-baseline justify-between md:mb-0">
                        <p className="mr-2">Rate:</p>
                        <SelectConvertTypeMenu
                          convertType={
                            virtualBalanceModalInfo?.depositConvertRatio ?? ""
                          }
                          selectedKey={depositConvert ? depositConvert : "Type"}
                          selectedRate={depositRate}
                          onSelect={onDepositConvertType}
                        />
                        <div
                          className="type-rate flex items-center justify-center"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <p>{depositRate}</p>
                        </div>
                      </div>

                      <div className="justify-first flex items-baseline ">
                        <p>Max limit:</p>
                        <p
                          className="pl-4"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          {
                            (
                              virtualBalanceModalInfo?.depositConvertMinLimit as any
                            )[depositConvert as string | number]
                          }
                        </p>
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
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
