import {
    WalletConnectionStatus,
    useWalletManager, useWallet,
} from "@marsprotocol/wallet-connector"
import { MsgSend, Coin } from "@delphi-labs/shuttle-react";
import React, { useState, useEffect } from "react";
import { accessToken, siteInfo, userInfo } from '../anchor/global';
import { backendUrl } from "../anchor/setup";

interface WalletModalProps {
    isModalOpen: boolean;
    closeModal: () => void
}

const WalletModal: React.FC<WalletModalProps> = ({
    isModalOpen,
    closeModal
}) => {
    const { status, connectedWallet } = useWalletManager()

    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [depositAddress, setDepositAddress] = useState("");

    const { broadcast } = useWallet();

    const [isDeposit, setIsDeposit] = useState(true);
    const copyAddress = () => { };
    const hideModal = () => { };
    const showConfirmModal = () => { };
    const onDeposit = async () => {
        try {
            let depositAmountByDenom = depositAmount * (10 ** siteInfo.digits);
            const msg = new MsgSend({
                fromAddress: connectedWallet?.account.address as string,
                toAddress: depositAddress,
                amount: [{ amount: depositAmountByDenom.toString(), denom: userInfo.selectedCoinType }]
            });
            broadcast({ messages: [msg] })
        }
        catch (err) {
            console.log(err);
        }
    };
    const onWithdraw = async () => {
        try {
            if (accessToken == "")
                return;
            const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': accessToken
                },
                body: JSON.stringify({ method: "WithdrawCoin", chain: siteInfo.chain, coinType: userInfo.selectedCoinType, amount: withdrawAmount }),
            });
            const result = await response.json();
            if (result.status == 0) {
                console.log("Withdraw success");
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken == "")
                    return;
                const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Access-Token': accessToken
                    },
                    body: JSON.stringify({ method: "GetDepositAddress", chain: siteInfo.chain, coinType: userInfo.selectedCoinType }),
                });
                const result = await response.json();
                if (result.status == 0) {
                    setDepositAddress(result.depositAddress);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    });
    return (
        <div id="depositModal" className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div style={{ position: `relative` }}>
                <div className="modal-content">
                    <button className="modal-tab"
                        id="deposit"
                        style={{ display: !isDeposit ? `block` : `none` }}
                        onClick={() => { setIsDeposit(true) }}>
                        Deposit
                    </button>
                    <button className="modal-tab"
                        id="withdraw"
                        style={{ display: isDeposit ? `block` : `none` }}
                        onClick={() => { setIsDeposit(false) }}>
                        Withdraw
                    </button>
                    <span className="close" id="closeModalBtn" onClick={closeModal}>×</span>
                    <p id="withdrawText" style={{ display: !isDeposit ? `block` : `none`, fontSize: `24px`, fontWeight: `400`, lineHeight: `24px` }}>
                        Withdraw
                    </p>
                    <p id="depositText" style={{ display: isDeposit ? `block` : `none`, fontSize: `24px`, fontWeight: `400`, lineHeight: `24px` }}>
                        Deposit
                    </p>
                    <label htmlFor="address" style={{ marginTop: `20px` }}>Address</label>
                    <div id="depositAddressContainer" style={{ display: isDeposit ? `flex` : `none`, alignItems: `center`, borderRadius: `6px`, backgroundColor: `white` }}>
                        <input style={{ border: `none` }} type="text" id="depositAddress" name="depositAddress" placeholder="Address" value={depositAddress} readOnly />
                        <button className="max-btn" onClick={copyAddress}>
                            <img src="/images/copied.png" alt="" style={{ width: `20px` }} />
                        </button>
                    </div>
                    <div id="depositAmount" style={{ display: isDeposit ? `block` : `none` }}>
                        <label htmlFor="amount" style={{ marginTop: `20px` }}>Amount</label>
                        <input style={{ border: `none`, width: `100%` }} type="number" id="depositAmount" name="depositAmount" placeholder="Amount" value={depositAmount} onChange={(e) => { setDepositAmount(Number.parseFloat(e.target.value.toString())) }} />
                    </div>
                    <div id="withdrawAddressContainer" style={{ display: !isDeposit ? `block` : `none`, alignItems: `center`, borderRadius: `6px`, backgroundColor: `white` }}>
                        <input style={{ border: `none`, width: `100%` }} type="text" id="withdrawAddress" name="withdrawAddress" placeholder="Address" value={userInfo.userCode} readOnly />
                    </div>
                    <div id="withdrawAmount" style={{ display: !isDeposit ? `block` : `none` }}>
                        <label htmlFor="amount" style={{ marginTop: `20px` }}>Amount</label>
                        <input style={{ border: `none`, width: `100%` }} type="number" id="withdrawAmount" name="withdrawAmount" placeholder="Amount" value={withdrawAmount} onChange={(e) => { setWithdrawAmount(Number.parseFloat(e.target.value.toString())) }} />
                        <div >
                            <p>Available: {userInfo.balances[userInfo.selectedCoinType]} {userInfo.selectedCoinType}</p>
                        </div>
                    </div>

                    <div className="modal-buttons" style={{ display: !isDeposit ? `block` : `none` }}>
                        <div></div>
                        <div style={{ display: `flex`, gap: `10px` }}>
                            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                            <button id="confirmWithdraw" className="confirm-btn" onClick={onWithdraw} style={{ display: `block` }}>Withdraw</button>
                        </div>
                    </div>
                    <div className="modal-buttons" style={{ display: isDeposit ? `block` : `none` }}>
                        <div></div>
                        <div style={{ display: `flex`, gap: `10px` }}>
                            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                            <button id="confirmDeposit" className="confirm-btn" onClick={onDeposit} style={{ display: `block` }}>Deposit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WalletModal;