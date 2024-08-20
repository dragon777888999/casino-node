import { useState, useEffect } from "react";
import ConnectXrplWalletModal from "./ConnectXrplWalletModal";

export default function ConnectXrplButton() {
  const [showXrplConnectModal, setShowXrplConnectModal] = useState(false);
  const openConnectWallet = () => {
    setShowXrplConnectModal(true);
  };
  const closeConnectModal = () => {
    setShowXrplConnectModal(false);
  };

  return (
    <>
      <button
        onClick={() => openConnectWallet()}
        className="menu-button-connect"
      >
        <p> Connect</p>
      </button>
      <ConnectXrplWalletModal
        showConnectModal={showXrplConnectModal}
        onRequestClose={closeConnectModal}
      ></ConnectXrplWalletModal>
    </>
  );
}
