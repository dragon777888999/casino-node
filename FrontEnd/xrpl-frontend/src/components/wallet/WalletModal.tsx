import React, { useEffect, useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import Modal from "react-modal";
import {
  useBalance,
  useSendXRP,
  ReserveRequirement,
} from "@nice-xrpl/react-xrpl";

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

const WalletModal: React.FC<WalletModalProps> = ({
  address,
  isOpen,
  onRequestClose,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositAddress, setDepositAddress] = useState("");

  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState();
  const [sending, setSending] = useState(false);
  const sendXRP = useSendXRP();
  // const balance = useBalance();
  useEffect(() => {
    setDestinationAddress(address);
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
    setSending(true);
    try {
      const result = await sendXRP(destinationAddress, amount);
      console.log("UI: ", result);
    } catch (e) {
      alert(e);
    }
    setSending(false);
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
            <button onClick={onRequestClose}>BACK</button>
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
              <button onClick={onWithdraw}>WITHDRAW</button>
            </section>
          </div>
          <div className="deposit">
            <section>
              <p style={{ fontSize: `12px` }}>Deposit Address</p>
              <input
                type="text"
                id="depositAddress"
                name="depositAddress"
                placeholder=""
                value={depositAddress}
                readOnly
              />
            </section>
            <section>
              <p style={{ fontSize: `12px` }}>Deposit Amount</p>
              <input
                type="number"
                id="depositAmount"
                name="depositAmount"
                placeholder=""
                value={amount}
              />
            </section>
            <section>
              <button onClick={onDeposit}>DEPOSIT</button>
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
