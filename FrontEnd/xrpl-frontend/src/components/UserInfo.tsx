import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import WalletModal from "./wallet/WalletModal";
const backendUrl = "https://localhost:7020";
import sdk from "@crossmarkio/sdk";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";
<<<<<<< Updated upstream
=======
import { backendUrl } from "../anchor/setup";
import {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
} from "../anchor/global";
>>>>>>> Stashed changes

Modal.setAppElement("#root");
const UserInfo = (xrpAddress) => {
  const xrpAdd = xrpAddress;
  console.log(xrpAdd.xrpAddress);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nickName, setNickName] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showMenu = () => {
    setIsMenuVisible(true);
  };
  const hideMenu = () => {
    setIsMenuVisible(false);
  };
  const onClickMenu = () => {
    openModal();
  };
  const [selectedKey, setSelectedKey] = useState<string>("0 ROOG");

  const handleSelect = async (key: string) => {
    setSelectedKey(key);
  };
<<<<<<< Updated upstream

=======
  const updateUserInfo = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/Account/UserInfo?domain=${domain}`,
        {
          method: "GET",
          headers: {
            "X-Access-Token": accessToken,
          },
        }
      );
      const result = await response.json();
      console.log(result);
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
    const handleWalletConnect = async () => {
      if (xrpAddr.xrpAddress) {
        try {
          console.log("############  Connect wallet   ##############");
          if (siteInfo.agentCode == "") {
            const response1 = await fetch(
              `${backendUrl}/Account/SiteInfo?domain=${domain}`
            );
            const result1 = await response1.json();
            console.log(result1);
            setSiteInfo(result1);
          }

          const response = await fetch(
            `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo.agentCode}&userCode=${xrpAddr.xrpAddress}`
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
  }, [xrpAddr.xrpAddress]);
  useEffect(() => {
    const timer = setInterval(async () => {
      await updateUserInfo();
    }, 1000 * 10);
    return () => clearInterval(timer);
  });
  const handleDisconnectCrossmark = async () => {
    try {
      if (xrpAddr.xrpAddress) {
        // await client.disconnect();
        console.log("Disconnected from Crossmark");
      }

      localStorage.removeItem("xrpAddress");
      localStorage.removeItem("connected");
      localStorage.removeItem("token");
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
      console.log("Wallet disconnected and information cleared");
    } catch (error) {
      console.error("Error disconnecting from Crossmark wallet:", error);
    }
  };
>>>>>>> Stashed changes
  return (
    <div className="subHeader">
      <div className="position: relative">
        <div className="balance">
          {/* <span> {nickName} </span> */}
          <span>
            {xrpAdd.xrpAddress.slice(0, 3)}...{xrpAdd.xrpAddress.slice(-3)}
          </span>
          <SelectCoinTypeMenu
<<<<<<< Updated upstream
            items={0}
=======
            items={userInfo.balances}
>>>>>>> Stashed changes
            selectedKey={selectedKey}
            onSelect={handleSelect}
          />
          {/* <div className="deposit-btn" id="openModalBtn">{balance} {siteInfo.coinType}</div> */}
          <button className="arrowDown" id="arrowBtn" onClick={showMenu}>
            <img
              src="/enTheme2/images/arrowDown.png"
              alt=""
              style={{ width: "13px", marginLeft: "7px" }}
            />
          </button>
        </div>
        <div
          className="menu"
          id="menu"
          style={{ display: isMenuVisible ? "block" : "none" }}
          onMouseLeave={hideMenu}
        >
          <button
            onClick={() => {
              onClickMenu();
            }}
          >
            <p> MANAGE BALANCE </p>
            <img src="/enTheme2/images/arrowRight.png" />
          </button>
          <button onClick={handleDisconnectCrossmark}>
            <p> DISCONNECT </p>
          </button>
        </div>
      </div>
      <div className="profile">
        <img src="/enTheme2/images/avatar.png" alt="Profile Picture" />
      </div>
      {/* <WalletModal isOpen={modalIsOpen} onRequestClose={closeModal} /> */}
      <WalletModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};
export default UserInfo;
