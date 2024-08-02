import { useContext, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import WalletModal from "./wallet/WalletModal";
const backendUrl = "https://localhost:7020";
import sdk from "@crossmarkio/sdk";
import SelectCoinTypeMenu from "./SelectCoinTypeMenu";

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

  return (
    <div className="subHeader">
      <div className="position: relative">
        <div className="balance">
          {/* <span> {nickName} </span> */}
          <span>
            {xrpAdd.xrpAddress.slice(0, 3)}...{xrpAdd.xrpAddress.slice(-3)}
          </span>
          <SelectCoinTypeMenu
            items={0}
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
          <button>
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
