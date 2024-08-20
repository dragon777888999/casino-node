import { useEffect, useState } from "react";
import Modal from "react-modal";
import WalletModal from "../modal/WalletModal";

import { useWallet } from "@solana/wallet-adapter-react";

import { useAppContext } from "../../hooks/AppContext";

import { backendUrl } from "@/anchor/global";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";

// Modal.setAppElement("#root");
const MenuBar = () => {
  const domain = window.location.host;

  const { userInfo, setUserInfo, siteInfo, accessToken } = useAppContext();

  const [showWalletModal, setShowWalletModal] = useState(false);
  const wallet = useWallet();
  // ----------solana-------------
  const updateUserCode = (newUserCode: string) => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        userCode: newUserCode,
      });
    }
  };

  const [selectedKey, setSelectedKey] = useState<string>(
    userInfo?.selectedCoinType,
  );

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
    console.log("Site Info userinfo:", siteInfo);
    console.log("User Info userinfo:", userInfo);
  }, []);

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  const closeModal = () => {
    setShowWalletModal(false);
  };

  const handleDisconnect = async () => {
    try {
      if (siteInfo?.chain == "Solana") {
        wallet.disconnect();
        // alert("1");
      }
      // alert("2");
      const response = await fetch(`${backendUrl}/Account/Logout`, {
        method: "GET",
        headers: {
          "X-Access-Token": wallet.publicKey,
        },
      });
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
      updateUserCode("");
      console.log("Wallet disconnected and information cleared");
    } catch (error) {
      console.error("Error disconnecting from Crossmark wallet:", error);
    }
  };

  return (
    <>
      <div className="balance flex ">
        <div className="flex justify-center gap-5 sm:gap-3">
          <div className="flex items-center">
            {/* <button className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">
              <p>
                {" "}
                {userInfo?.balances[userInfo.selectedCoinType]}
                {userInfo?.selectedCoinType}
              </p>
            </button> */}
            {/* <SelectCoinTypeMenu
              items={userInfo?.balances}
              selectedKey={selectedKey}
              onSelect={handleSelect}
            /> */}
          </div>

          {/* <button
            className="ml-2 inline-flex items-center justify-center rounded-md border border-meta-3 px-4 py-1 text-center font-medium text-meta-3 hover:bg-opacity-90"
            onClick={() => openWalletModal()}
          > */}
          <button
            className="menu-button-wallet"
            onClick={() => openWalletModal()}
          >
            <p> Wallet</p>
          </button>
        </div>
      </div>
      <div className="justify-end">
        <button className="menu-button-connect " onClick={handleDisconnect}>
          <p> Disconnect </p>
        </button>
      </div>
      <WalletModal
        showWalletModal={showWalletModal}
        onRequestClose={closeModal}
      />
    </>
  );
};
export default MenuBar;
