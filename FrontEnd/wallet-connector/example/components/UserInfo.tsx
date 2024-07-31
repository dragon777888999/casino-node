import {
  WalletConnectionStatus,
  useWalletManager,
} from "@marsprotocol/wallet-connector"
import { useEffect, useState } from "react"
import { accessToken, setAccessToken,siteInfo, userInfo, setUserInfo } from '../anchor/global';
import { backendUrl } from "../anchor/setup";
import WalletModal from "./WalletModal";

export default function UserInfo() {
  const { connect, status, connectedWallet, disconnect } = useWalletManager()
  const [isConnected, setIsConnected] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDisconnect = () => {
    disconnect()
  }
  const updateUserInfo = async () => {
    try {
      const response = await fetch(`${backendUrl}/Account/UserInfo`, {
        method: 'GET',
        headers: {
          'X-Access-Token': accessToken
        },
      });
      const result = await response.json();
      //        console.log(result);
      if (result.status == 0) {
        setUserInfo(result);
        setBalance(userInfo.balances[userInfo.selectedCoinType]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setIsConnected(status === WalletConnectionStatus.Connected)
    const handleWalletConnect = async () => {
        if (status === WalletConnectionStatus.Connected) {
            try {
                const response = await fetch(`${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo.agentCode}&userCode=${connectedWallet?.account.address}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseBody = await response.json();
                const token = responseBody.token;
                if (token) {
                    setAccessToken(token);
                    await updateUserInfo();
                }
            } catch (err) {
                disconnect();
            }
            console.log("Wallet connected");
        } else {
            setAccessToken("");
            console.log("Wallet disconnected");
        }
    };

    handleWalletConnect();
}, [status])
useEffect(() => {
  const timer = setInterval(async () => {
      await updateUserInfo();
  }, 1000 * 10);
  return () => clearInterval(timer);
});

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="balance">
        <img src="/images/ethereum.png" alt="Profile Picture" />
        <span>{balance} {userInfo.selectedCoinType}</span>
        <button className="deposit-btn" id="openModalBtn" onClick={() => { openModal() }}>Wallet</button>
        <button className="deposit-btn" onClick={handleDisconnect}>Disconnet</button>
      </div>
      <div className="profile">
        <img src="/images/avatar.png" alt="Profile Picture" />
      </div>
      <WalletModal isModalOpen = {modalIsOpen} closeModal={closeModal}/>
    </div>
  )
}
