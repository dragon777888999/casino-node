import Link from "next/link";

import DropdownWallet from "./DropdownWallet";
import Image from "next/image";
import { useState, useEffect } from "react";
import WalletModal from "../modal/xrpl/WalleSettingModal";
import ConnectWalletModal from "../modal/xrpl/ConnectWalletModal";
import { backendUrl } from "@/anchor/setup";

import {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
} from "../../anchor/global";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const domain = window.location.host;
  const [nickName, setNickName] = useState("");
  const [desAddress, setDesAdress] = useState("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [address, setAddress] = useState(" ");

  const getDataFromLocalStorage = (key: any) => {
    const data = localStorage.getItem(key);
    return data ? data : " ";
  };
  // ----------get data from local storage---------
  getDataFromLocalStorage("connected");
  getDataFromLocalStorage("address");

  const openWalletModal = () => {
    setShowWalletModal(true);
  };

  const closeModal = () => {
    setShowWalletModal(false);
  };
  const openConnectWallet = () => {
    setShowConnectModal(true);
  };
  const closeConnectModal = () => {
    setShowConnectModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken == "") return;
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
          body: JSON.stringify({
            method: "GetDepositAddress",
            chain: siteInfo.chain,
            coinType: userInfo.selectedCoinType,
          }),
        });

        const result = await response.json();
        if (result.status == 0) {
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header
        className="max-w-screen sticky top-0  z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
        style={{ borderBottom: "1px solid #49577b" }}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 ">
            {/* <!-- Hamburger Toggle BTN --> */}
            <div className="flex hidden md:block">
              <Link href="/">
                <Image
                  width={176}
                  height={32}
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  priority
                />
              </Link>
            </div>

            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(props.sidebarOpen ? false : true);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          <div
            className="sm:block"
            style={{
              marginLeft: "10%",
            }}
          ></div>
          {connected ? (
            <ul className="flex items-center gap-2 2xsm:gap-4">
              <li>
                <button
                  className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => openWalletModal()}
                >
                  <p> Wallet</p>
                </button>
              </li>
            </ul>
          ) : (
            <div className="flex items-center gap-3 2xsm:gap-7">
              <ul className="flex items-center gap-2 2xsm:gap-4"></ul>
              <ul className="flex items-center gap-2 2xsm:gap-4">
                {/* <li>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <p>Log in</p>
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <p> Register</p>
                </Link>
              </li> */}
                <li>
                  <button
                    onClick={() => openConnectWallet()}
                    className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    <p> Connect</p>
                  </button>
                </li>
              </ul>
              {/* <!-- User Area --> */}
              {/* <DropdownUser /> */}
              {/* <!-- User Area --> */}
            </div>
          )}
        </div>
      </header>
      <WalletModal
        showWalletModal={showWalletModal}
        onRequestClose={closeModal}
      />
      <ConnectWalletModal
        showConnectModal={showConnectModal}
        onRequestClose={closeConnectModal}
      ></ConnectWalletModal>
    </>
  );
};

export default Header;
