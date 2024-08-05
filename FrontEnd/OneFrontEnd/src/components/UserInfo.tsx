import { useEffect, useState } from "react";
import { backendUrl } from "../anchor/setup";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
} from "../anchor/global";
import WalletModal from "./WalletModal";
import Modal from "react-modal";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";

// Set the app element for accessibility
Modal.setAppElement("#root");

const UserInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nickName, setNickName] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const wallet = useWallet();
  const updateUserInfo = async () => {
    try {
      const response = await fetch(`${backendUrl}/Account/UserInfo`, {
        method: "GET",
        headers: {
          "X-Access-Token": accessToken,
        },
      });
      const result = await response.json();

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
      if (wallet.connected) {
        try {
          console.log("############  Connect wallet   ##############");
          if (siteInfo.agentCode == "") {
            const response1 = await fetch(`${backendUrl}/Account/SiteInfo`);
            const result1 = await response1.json();
            console.log(result1);
            setSiteInfo(result1);
          }

          const response = await fetch(
            `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo.agentCode}&userCode=${wallet.publicKey}`
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
          wallet.disconnect();
        }
        console.log("Wallet connected");
      } else {
        setAccessToken("");
        console.log("Wallet disconnected");
      }
    };

    handleWalletConnect();
  }, [wallet.connected]);
  useEffect(() => {
    const timer = setInterval(async () => {
      await updateUserInfo();
    }, 1000 * 10);
    return () => clearInterval(timer);
  });

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
  const onDisconnect = async () => {
    wallet.disconnect();
    const response = await fetch(`${backendUrl}/Account/Logout`, {
      method: "GET",
      headers: {
        "X-Access-Token": accessToken,
      },
    });
  };

  const [selectedKey, setSelectedKey] = useState<string>(
    userInfo.selectedCoinType
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
      }
    );
    setSelectedKey(key);
  };

  return (
    <div className="subHeader">
      <div className="position: relative">
        <div className="balance">
          <span> {nickName} </span>
          <SelectCoinTypeMenu
            items={userInfo.balances}
            selectedKey={selectedKey}
            onSelect={handleSelect}
          />
          {/* <div className="deposit-btn" id="openModalBtn">{balance} {siteInfo.coinType}</div> */}
          <button className="arrowDown" id="arrowBtn" onClick={showMenu}>
            <img
              src="/gamTheme/images/arrowDown.png"
              alt=""
              style={{ width: "13px", marginLeft: "7px" }}
            />
          </button>
        </div>
        <div
          className="menu_g"
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
            <img src="/gamTheme/images/arrowRight.png" />
          </button>
          <button onClick={onDisconnect}>
            <p> DISCONNECT </p>
          </button>
        </div>
      </div>
      <div className="profile">
        <img src="/gamTheme/images/avatar.png" alt="Profile Picture" />
      </div>
      <WalletModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};
export default UserInfo;
