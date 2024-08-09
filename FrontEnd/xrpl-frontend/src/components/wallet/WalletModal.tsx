import React, { useEffect, useState } from "react";
import sdk from "@crossmarkio/sdk";
import { isConnected, sendPayment } from "@gemwallet/api";
import Modal from "react-modal";
import { backendUrl } from "../../anchor/setup";
import {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
} from "../../anchor/global";

interface WalletModalProps {
  address: string;
  isOpen: boolean;
  onRequestClose: () => void;
}
const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? data : null;
};

const WalletModal: React.FC<WalletModalProps> = ({
  address,
  isOpen,
  onRequestClose,
}) => {
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
  }, [address]);

  const onDeposit = async () => {
    // const walletType = getDataFromLocalStorage("walleteType");
    if (depositAmount <= 0) {
      window.alert("Deposit amount cannot be 0");
      return;
    }
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
          `/api/auth/xumm/sendtransaction?depositAddress=${depositAddress}&depositAmount=${depositAmount}`
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
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <div>
        <div className="modal-content">
          <div>
            <p>MANAGE BALANCE</p>
            <button
              onClick={() => {
                onRequestClose();
                setQrcode("");
                setDepositAmount(0);
              }}
            >
              <img
                src="/enTheme2/images/arrowleft.png"
                alt="arrow"
                width={40}
              />
            </button>
          </div>
          <div className="withdraw">
            <section>
              <p style={{ fontSize: `12px` }}>Available Balance</p>
              <p style={{ fontSize: `26px`, margin: 0 }}>
                {userInfo.balances[userInfo.selectedCoinType]}{" "}
                {userInfo.selectedCoinType}
              </p>
            </section>
            <section>
              <p style={{ fontSize: `12px` }}>withdraw Amount</p>
              <input
                style={{ color: `black` }}
                type="number"
                id="withdrawAmount"
                name="withdrawAmount"
                placeholder=""
                value={withdrawAmount}
                onChange={(e) => {
                  setWithdrawAmount(
                    Number.parseFloat(e.target.value.toString())
                  );
                }}
              />
            </section>
            <section>
              <button className="balance" onClick={onWithdraw}>
                WITHDRAW
              </button>
            </section>
          </div>
          <div className="deposit">
            <section>
              <span>Your first deposit will require an additional 10xrp to initialize.</span>
            </section>
            <section>

              <p style={{ fontSize: `12px` }}>Deposit Address</p>
              <input
                style={{ width: "265px", paddingLeft: "5px" }}
                type="text"
                id="depositAddress"
                name="depositAddress"
                placeholder=""
                value={depositAddress}
                onChange={(e) => {
                  setDepositAddress(e.target.value);
                }}
              />
            </section>
            <section>
              <p style={{ fontSize: `12px` }}>Deposit Amount</p>
              <input
                type="number"
                id="depositAmount"
                name="depositAmount"
                placeholder=""
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(
                    Number.parseFloat(e.target.value.toString())
                  );
                }}
              />
            </section>
            <section>
              <button className="balance" onClick={onDeposit}>
                DEPOSIT
              </button>
            </section>
            {isHidden ? null : (
              <div
                className="qrcode"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={qrcode}></img>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
