import { useState, useEffect } from "react";
import ConnectXrplWalletModal from "./ConnectXrplWalletModal";
import { useAppContext } from "@/hooks/AppContext";

export default function ConnectXrplButton() {
  const [showXrplConnectModal, setShowXrplConnectModal] = useState(false);
  const openConnectWallet = () => {
    setShowXrplConnectModal(true);
  };
  const closeConnectModal = () => {
    setShowXrplConnectModal(false);
  };
  const { siteInfo } = useAppContext();
  return (
    <>
      {siteInfo.mark === "Roogsino" && (
        <div>
          <button className="connect-btn">connect wallet</button>
        </div>
      )}
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
