import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import WalletModal from "../modal/WalletModal";
import sdk from "@crossmarkio/sdk";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";
import { backendUrl } from "../../anchor/global";

import { connect } from "http2";
import DropdownWallet from "./DropdownWallet";

import { useAppContext } from '../../context/AppContext';
import GetUserInfo from "../wallet-connecter/xrpl/GetUserInfo";


Modal.setAppElement("#root");
const UserInfo = () => {
  const domain = window.location.host;


  const {  userInfo,
        setUserInfo,
        siteInfo,
        setSiteInfo,
        accessToken,
        setAccessToken } = useAppContext();


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nickName, setNickName] = useState("");
  const [desAddress, setDesAdress] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("");


  const [showWalletModal, setShowWalletModal] = useState(false);


  // ----------get data from local storage---------

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  const closeModal = () => {
    setShowWalletModal(false);
  };

  const showMenu = () => {
    setIsMenuVisible(true);
  };
  const hideMenu = () => {
    setIsMenuVisible(false);
  };



  useEffect(() => {

   GetUserInfo();


  }, []);



  const handleDisconnectCrossmark = async () => {
    try {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
      console.log("Wallet disconnected and information cleared");
    } catch (error) {
      console.error("Error disconnecting from Crossmark wallet:", error);
    }
  };

  return (
    <>
      <div className="balance flex ">
        <div className="flex justify-center gap-5">
          <div className="flex items-center">

            <button className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">
              <p> {userInfo?.balances[0]} Xrpl</p>
            </button>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => openWalletModal()}
          >
            <p> Wallet</p>
          </button>
        </div>
      </div>
      <div className="justify-end">
        <button
          className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
          onClick={handleDisconnectCrossmark}
        >
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
export default UserInfo;
