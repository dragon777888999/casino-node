import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import WalletModal from "../modal/WalleSettingModal";
import sdk from "@crossmarkio/sdk";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";
import { backendUrl } from "../../anchor/global";
import {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
} from "../../anchor/global";
import { connect } from "http2";
import DropdownWallet from "./DropdownWallet";

Modal.setAppElement("#root");
const UserInfo = () => {
  const domain = window.location.host;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nickName, setNickName] = useState("");
  const [desAddress, setDesAdress] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("");

  const [address, setAddress] = useState(" ");
  const [connected, setConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const getDataFromLocalStorage = (key: any) => {
    const data = localStorage.getItem(key);
    return data ? data : " ";
  };
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
  // const onClickMenu = () => {
  //   openModal();
  // };

  const handleSelect = async (key: string) => {
    setSelectedKey(key);
  };

  const updateUserInfo = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/Account/UserInfo?domain=${domain}`,
        {
          method: "GET",
          headers: {
            "X-Access-Token": accessToken,
          },
        },
      );
      const result = await response.json();
      //        console.log(result);
      if (result.status == 0) {
        setUserInfo(result);
        setNickName(userInfo.nickName);
        setSelectedKey(userInfo.selectedCoinType);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setConnected(getDataFromLocalStorage("connected"));
    setAddress(getDataFromLocalStorage("address"));
    const handleWalletConnect = async () => {
      if (connected) {
        try {
          console.log("############  Connect wallet   ##############");
          if (siteInfo.agentCode == "") {
            const response1 = await fetch(
              `${backendUrl}/Account/SiteInfo?domain=${domain}`,
            );
            const result1 = await response1.json();
            // console.log("suer---------siteinfo----------");
            // console.log(result1);
            setSiteInfo(result1);
          }

          const response = await fetch(
            `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo.agentCode}&userCode=${address}`,
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseBody = await response.json();
          const token = responseBody.token;
          if (token) {
            setAccessToken(token);
            await updateUserInfo();
          }
          setDesAdress(address);
        } catch (err) {
          //wallet.disconnect();
        }
        console.log("Wallet connected");
      } else {
        setAccessToken("");
        console.log("Wallet disconnected");
      }
    };

    handleWalletConnect();
  }, [address]);

  useEffect(() => {
    const timer = setInterval(async () => {
      await updateUserInfo();
    }, 1000 * 10);
    return () => clearInterval(timer);
  }, []);

  const handleDisconnectCrossmark = async () => {
    try {
      localStorage.removeItem("address");
      localStorage.removeItem("connected");
      localStorage.removeItem("token");
      localStorage.removeItem("walletType");
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
            {/* {<span> {nickName} </span>} */}
            {/* <SelectCoinTypeMenu
              items={userInfo.balances}
              selectedKey={selectedKey}
              onSelect={handleSelect}
            /> */}
            {/* <DropdownWallet
              items={userInfo.balances}
              selectedKey={selectedKey}
              onSelect={handleSelect}
            ></DropdownWallet>
            <button */}
            <button className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10">
              <p> {userInfo.balances.xrpl} Xrpl</p>
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
