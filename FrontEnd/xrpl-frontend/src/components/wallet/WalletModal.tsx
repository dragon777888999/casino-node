import React, { useEffect, useState } from "react";
import sdk from "@crossmarkio/sdk";
import { isConnected, sendPayment } from "@gemwallet/api";
import Modal from "react-modal";
const { XummSdk } = require("xumm-sdk");
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

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
    setDepositAddress(address);
  }, [address]);
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
    try {
      if (getDataFromLocalStorage("walleteType") == "cross") {
        sdk.sync.signAndSubmit({
          TransactionType: "Payment",
          Destination: depositAddress,
          Amount: (depositAmount * 6).toString(), // XRP in drops
        });
      } else if (getDataFromLocalStorage("walleteType") == "gem") {
        const payment = {
          Amount: (depositAmount * 6).toString(),
          destination: depositAddress,
        };

        sendPayment(payment).then((trHash) => {
          console.log("Transaction Hash: ", trHash);
        });
      } else {
        const xumm = new XummSdk(
          process.env.XUMM_KEY,
          process.env.XUMM_KEY_SECRET
        );
        const Payload = {
          txjson: {
            TransactionType: "Payment",
            Amount: (depositAmount * 6).toString(),
            destination: depositAddress,
          },
        };
        const payload = await xumm.payload.create(Payload, true);
        const data = await payload.json();

        setQrcode(data.payload.refs.qr_png);
        setJumpLink(data.payload.next.always);

        if (isMobile) {
          //open in new tab
          window.open(data.payload.next.always, "_blank");
        }
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
            <button onClick={onRequestClose}>
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
