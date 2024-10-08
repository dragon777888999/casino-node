import { useEffect, useState } from "react";
import Modal from "react-modal";
import WalletModal from "../modal/WalletModal";
import { useAppContext } from "../../hooks/AppContext";

import { backendUrl } from "@/anchor/global";
import DropdownUser from "./DropdownUser";
import SelectCoinTypeMenu from "../modal/SelectCoinTypeMenu";
import ToogleButton from "./ToogleButton";
import DropdownNotification from "./DropdownNotification";
import DropdownBonus from "./DropdownBonus";
import DropdownLanguage from "./DropdownLanguage";
import ChatButton from "./ChatButton";


// Modal.setAppElement("#root");
const MenuBar = () => {
  const { siteInfo, userInfo, loginStep, accessToken } = useAppContext();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [selectedKey, setSelectedKey] = useState<string>(
    userInfo?.selectedCoinType ?? "",
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

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  const closeModal = () => {
    setShowWalletModal(false);
  };
  const playingStatus = location.pathname.indexOf("casino") >= 0;
  return (
    <>
      <div className="balance flex ">
        <div className="flex justify-center gap-5 sm:gap-3">
          <div className="flex items-center">
         
          </div>

          {loginStep == 3 && (
            <button
              className="menu-button-wallet"
              onClick={() => openWalletModal()}
            >
              <div className=" flex gap-1">
                {!playingStatus && <span>{userInfo?.balances[userInfo?.selectedCoinType]}</span>}
                <span>{userInfo?.selectedCoinType}</span>
              </div>
            </button>
          )}
        </div>
      </div>
    
      <div className="flex items-center justify-end gap-3">
        <ToogleButton />
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {siteInfo.featureMap && siteInfo.featureMap.notification && (
              <li>
                <DropdownNotification />
              </li>)
            }
            {siteInfo.featureMap && siteInfo.featureMap.bonus && (
              <li>
                <DropdownBonus />
              </li>)
            }
             {siteInfo.featureMap && siteInfo.featureMap.language && <li>
              <DropdownLanguage />
            </li>}
            {siteInfo.featureMap && siteInfo.featureMap.chat && <li>
              <ChatButton />
            </li>}
            <li>
              <DropdownUser />
            </li>
          </ul>
          {/* <!-- User Area --> */}

          {/* <!-- User Area --> */}
        </div>
        {/* <button className="menu-button-connect " onClick={handleDisconnect}>
          <p> Disconnect </p>
        </button> */}
      </div>
      <WalletModal
        showWalletModal={showWalletModal}
        onRequestClose={closeModal}
      />
    </>
  );
};
export default MenuBar;
