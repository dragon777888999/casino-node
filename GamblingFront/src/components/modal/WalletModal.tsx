import React from "react";
import Modal from "react-modal";
import sdk from "@crossmarkio/sdk";
import { sendPayment } from "@gemwallet/api";
import { useState, useEffect } from "react";
import { backendUrl } from "@/anchor/global";
import { useAppContext } from "../../hooks/AppContext";
import Image from "next/image";
import SelectCoinTypeMenu from "../header/SelectCoinTypeMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------solana wallet------------
import { ComputeBudgetProgram, PublicKey, Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import useDepositPhantom from "@/hooks/useDepositPhantom";

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
  const { userInfo, setUserInfo, loading, siteInfo, accessToken } =
    useAppContext();
  const wallet = useWallet();
  const { connection } = useConnection();

  const [selectedKey, setSelectedKey] = useState<string>(
    userInfo?.selectedCoinType ?? "",
  );
  const { deposit, status, error } = useDepositPhantom(
    depositAddress,
    depositAmount,
  );
  const phantomDeposit = async () => {
    await deposit();

    if (status || error) {
      setDepositAmount(null);
    }
  };

  const handleSelect = async (key: string) => {
    userInfo.selectedCoinType = key;
    const response = await fetch(
      `${backendUrl}/Account/SwitchCoinType?coinType=${key}`,
      {
        method: "GET",
        headers: {
          "X-Access-Token": accessToken,
        },
      },
    );
    setSelectedKey(key);
  };
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
  }, [accessToken, userInfo, siteInfo]);

  // const useDepositPhantom = async () => {
  //   if (!wallet.publicKey) return;
  //   if (depositAmount <= 0) {
  //     window.alert("Deposit amount cannot be 0");
  //     return;
  //   }

  //   const tokenAddress =
  //     siteInfo?.tokenAddressMap[siteInfo.availableCoinTypes[0]];

  //   const ata = getAssociatedTokenAddressSync(
  //     new PublicKey(tokenAddress),
  //     wallet.publicKey,
  //   );

  //   const nextAta = getAssociatedTokenAddressSync(
  //     new PublicKey(tokenAddress),
  //     new PublicKey(depositAddress),
  //     true,
  //   );

  //   const transaction = new Transaction();
  //   const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
  //     microLamports: 210000,
  //   });
  //   transaction.add(addPriorityFee);

  //   transaction.add(
  //     createAssociatedTokenAccountIdempotentInstruction(
  //       wallet.publicKey,
  //       nextAta,
  //       new PublicKey(depositAddress),
  //       new PublicKey(tokenAddress),
  //     ),
  //   );

  //   transaction.add(
  //     createTransferInstruction(
  //       ata,
  //       nextAta,
  //       wallet.publicKey,
  //       depositAmount * 10 ** siteInfo?.digitsMap[userInfo?.selectedCoinType], //Instead userInfo.selectCoinType
  //     ),
  //   );

  //   const transactionSignature = await wallet.sendTransaction(
  //     transaction,
  //     connection,
  //     { skipPreflight: true, preflightCommitment: "finalized" },
  //   );
  //   console.log(transactionSignature);
  //   setDepositAmount(0);
  //   const confirmResult = await connection.confirmTransaction(
  //     transactionSignature,
  //     "confirmed",
  //   );
  //   const status = confirmResult.value;
  //   console.log(status);
  // };
  const onWithdrawPhantom = async () => {
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
          coinType: userInfo?.selectedCoinType, //Instead userInfo.selectCoinType
          amount: withdrawAmount,
        }),
      });
      console.log("here is withdraw");
      console.log(withdrawAmount);
      const result = await response.json();
      if (result.status == 0) {
        setWithdrawAmount(null);
      } else {
        toast.info(result.msg);
      }
    } catch (error) {
      toast.error("An unknown error occurred");
      console.log(error);
    }
  };
  const onDeposit = () => {
    if (siteInfo?.chain == "Xrpl") {
      onDepositXrpl();
    } else {
      phantomDeposit();
      // useDepositPhantom();
    }
  };

  const onDepositXrpl = async () => {
    // const walletType = getDataFromLocalStorage("walleteType");
    if (depositAmount == null) {
      toast.warn("You must set a deposit amount");
      return;
    }
    // alert(depositAmount);
    setIsHidden(false);

    try {
      if (getDataFromLocalStorage("walleteType") == "cross") {
        const response = sdk.sync.signAndSubmit({
          TransactionType: "Payment",
          Destination: depositAddress,
          Amount: (
            depositAmount *
            10 **
              (siteInfo?.digitsMap[
                userInfo?.selectedCoinType || "defaultCoinType"
              ] || 0)
          ).toString(), // XRP in drops
        });
        console.log(response);
        //if (response.result === "tesSUCCESS")
        {
          console.log("Transaction successful!");
          setDepositAmount(null);
        }
        // else {
        //   console.error("Transaction failed with status:", response.result);
        // }
      } else if (getDataFromLocalStorage("walleteType") == "gem") {
        const payment = {
          amount: (
            depositAmount *
            10 **
              (siteInfo?.digitsMap[
                userInfo?.selectedCoinType || "defaultCoinType"
              ] || 0)
          ).toString(),
          destination: depositAddress,
        };

        sendPayment(payment)
          .then((trHash) => {
            console.log("Transaction Hash: ", trHash);
            setDepositAmount(null);
          })
          .catch((error) => {
            console.error("Payment failed:", error);
            setDepositAmount(null);
            // Handle error or alert the user
          });
      } else if (getDataFromLocalStorage("walleteType") == "xum") {
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
            setDepositAmount(null);
            setIsHidden(true);
          }
          console.log(responseObj);
        };
        // setDepositAmount(0);
        console.log(payload);
      }
    } catch (e) {
      toast.error("failed");
      console.log(e);
    }
  };

  const onWithdrawXrol = async () => {
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
        // window.alert("Withdraw success");
        setWithdrawAmount(null);
      } else {
        // window.alert(result.msg);
        setWithdrawAmount(null);
      }
    } catch (error) {
      toast.error("failed");
      console.log(error);
    }
  };

  const onWithdraw = () => {
    if (siteInfo?.chain == "Xrpl") {
      onWithdrawXrol();
    } else {
      onWithdrawPhantom();
    }
  };
  // alert(depositAmount);
  const handleCopy = () => {
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
      <div className="footer-modal " style={{ zIndex: "1" }}>
        <div className="wallet-adapter-modal-container">
          <div className="wallet-adapter-modal-wrapper">
            <div className="w-full">
              <div
                className="border-blueGray-200 flex items-center justify-between rounded-t pb-2 pt-4"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <div className="justify-start">
                  <SelectCoinTypeMenu
                    items={userInfo?.balances}
                    selectedKey={selectedKey}
                    onSelect={handleSelect}
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
                  <div className=" flex items-center gap-2 py-4">
                    <label>Balance :</label>

                    <p
                      style={{
                        fontSize: `26px`,
                        marginLeft: "30px",
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
                      className=" ml-1 mt-2 h-10 pl-2 text-black"
                      aria-label="Withdraw amount"
                      value={withdrawAmount ?? ""}
                      style={{ color: "white" }}
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
                      className="my-2 h-10 pl-2 text-black"
                      placeholder="Deposit address"
                      aria-label="Deposit address"
                      defaultValue={depositAddress}
                      style={{ color: "white", textOverflow: "ellipsis" }}
                      onChange={(e) => {
                        setDepositAddress(e.target.value);
                        const value = Number.parseFloat(e.target.value);
                      }}
                    />
                    <div className="tooltipContainer ">
                      <button
                        onClick={handleCopy}
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
                      className="mb-2 ml-1 mt-2 h-10 pl-2 text-black"
                      aria-label="Deposit Amount"
                      defaultValue=""
                      value={depositAmount ?? ""}
                      style={{ color: "white" }}
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
