import React, { useEffect, useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import Modal from "react-modal";
import { backendUrl } from "../../../anchor/setup";
import { accessToken, siteInfo, userInfo } from "../../../anchor/global";

import { ComputeBudgetProgram, PublicKey, Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

interface WalletModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositAddress, setDepositAddress] = useState("");
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

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
  });
  return (
    <Modal
      id="modal"
      className="modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      <div>
        <div className="modal-content-c">
          <div>
            <p>MANAGE BALANCE</p>
            <button onClick={onRequestClose}>BACK</button>
          </div>
          <div className="withdraw-c">
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
