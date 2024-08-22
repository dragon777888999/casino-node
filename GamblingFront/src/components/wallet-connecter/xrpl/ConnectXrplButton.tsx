import { useState, useEffect } from "react";
import ConnectXrplWalletModal from "./ConnectXrplWalletModal";
import { useAppContext } from "@/hooks/AppContext";
import Image from "next/image";

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
      {/* {siteInfo.mark === "Roogsino" && (
        <div>
          <button className="connect-btn">connect wallet</button>
        </div>
      )} */}
      <div className="RebelGames-connect-btn">
        <button onClick={() => openConnectWallet()}>
          <Image
            src="/RebelGames/images/component/btnImg.png"
            alt="Project Thumbnail"
            layout="responsive"
            width={150}
            height={100}
            style={{ width: "100%" }}
          />
        </button>
      </div>
      {/* <button
        onClick={() => openConnectWallet()}
        className="menu-button-connect"
      >
        <p> Connect</p>
      </button> */}
      <ConnectXrplWalletModal
        showConnectModal={showXrplConnectModal}
        onRequestClose={closeConnectModal}
      ></ConnectXrplWalletModal>
    </>
  );
}
