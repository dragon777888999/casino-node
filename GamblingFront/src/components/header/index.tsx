import Link from "next/link";

import Image from "next/image";
import { useState, useEffect } from "react";

import MenuBar from "./MenuBar";
import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import { useAppContext } from "../../hooks/AppContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Switch } from "@nextui-org/react";
import ToogleButton from "./ToogleButton";
import DropdownLanguage from "./DropdownLanguage";
import ChatButton from "./ChatButton";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const {
    loginStep,
    siteInfo,
    userInfo,
    setUserInfo,
    socketData,
    setChatbarOpen,
  } = useAppContext();
  const [chain, setChain] = useLocalStorage("chain", "");
  useEffect(() => {
    try {
      if (socketData == "") return;
      const cmd = JSON.parse(socketData);
      if (cmd.type === "balance") {
        if (userInfo) {
          let balances = userInfo?.balances;
          if (balances) {
            balances[cmd.currencyCode] = cmd.balance;
            setUserInfo({
              ...userInfo,
              balances: balances,
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  }, [socketData]);
  let logoImgSrc = "/default/images/logo.png";
  let logoWidth = 45;
  let logoHeight = 45;
  if (siteInfo.themeMap?.logo) {
    logoImgSrc = `/${siteInfo.themeMap.logo}/images/logo.png`;
  }

  return (
    <>
      <header
        className="max-w-screen sticky top-0  z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
        style={{ borderBottom: "1px solid #49577b" }}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl flex-grow items-center justify-between px-2 py-1 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 ">
            {/* <!-- Hamburger Toggle BTN --> */}

            <div className="flex md:block">
              <Link href="/">
                <Image
                  className="logo-img"
                  width={logoWidth}
                  height={logoHeight}
                  src={logoImgSrc}
                  alt="Logo"
                  priority
                />
              </Link>
            </div>

            <p
              style={{
                fontSize: "28px",
                fontWeight: "500",
                color: "#EB9F19",
                fontFamily: "Century",
              }}
              className="flex hidden md:block"
            >
              {siteInfo.mark}
            </p>
            {/* !props.sidebarOpen && */}
            {siteInfo.enableSideBar && (
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  props.setSidebarOpen(!props.sidebarOpen);
                }}
                className="z-99999 block rounded-sm  bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
              >
                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                  <span className="du-block absolute right-0 h-full w-full">
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm delay-[0] duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && "!w-full delay-300"
                      }`}
                    ></span>
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-150 duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && "delay-400 !w-full"
                      }`}
                    ></span>
                    <span
                      className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && "!w-full delay-500"
                      }`}
                    ></span>
                  </span>
                  <span className="absolute right-0 hidden h-full w-full">
                    <span
                      className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm  delay-300 duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && "!h-0 !delay-[0]"
                      }`}
                    ></span>
                    <span
                      className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm duration-200 ease-in-out dark:bg-white ${
                        !props.sidebarOpen && "!h-0 !delay-200"
                      }`}
                    ></span>
                  </span>
                </span>
              </button>
            )}
          </div>

          {loginStep > 1 ? (
            <MenuBar />
          ) : (
            <div className="flex items-center gap-3 2xsm:gap-5">
              <ToogleButton />
              {/* <button
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                onClick={() => {
                  setChatbarOpen((oldVal) => !oldVal);
                }}
              >
                <svg
                  className="fill-current duration-300 ease-in-out"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9688 1.57495H7.03135C3.43135 1.57495 0.506348 4.41558 0.506348 7.90308C0.506348 11.3906 2.75635 13.8375 8.26885 16.3125C8.40947 16.3687 8.52197 16.3968 8.6626 16.3968C8.85947 16.3968 9.02822 16.3406 9.19697 16.2281C9.47822 16.0593 9.64697 15.75 9.64697 15.4125V14.2031H10.9688C14.5688 14.2031 17.522 11.3625 17.522 7.87495C17.522 4.38745 14.5688 1.57495 10.9688 1.57495ZM10.9688 12.9937H9.3376C8.80322 12.9937 8.35322 13.4437 8.35322 13.9781V15.0187C3.6001 12.825 1.74385 10.8 1.74385 7.9312C1.74385 5.14683 4.10635 2.8687 7.03135 2.8687H10.9688C13.8657 2.8687 16.2563 5.14683 16.2563 7.9312C16.2563 10.7156 13.8657 12.9937 10.9688 12.9937Z"
                    fill=""
                  />
                  <path
                    d="M5.42812 7.28442C5.0625 7.28442 4.78125 7.56567 4.78125 7.9313C4.78125 8.29692 5.0625 8.57817 5.42812 8.57817C5.79375 8.57817 6.075 8.29692 6.075 7.9313C6.075 7.56567 5.79375 7.28442 5.42812 7.28442Z"
                    fill=""
                  />
                  <path
                    d="M9.00015 7.28442C8.63452 7.28442 8.35327 7.56567 8.35327 7.9313C8.35327 8.29692 8.63452 8.57817 9.00015 8.57817C9.33765 8.57817 9.64702 8.29692 9.64702 7.9313C9.64702 7.56567 9.33765 7.28442 9.00015 7.28442Z"
                    fill=""
                  />
                  <path
                    d="M12.5719 7.28442C12.2063 7.28442 11.925 7.56567 11.925 7.9313C11.925 8.29692 12.2063 8.57817 12.5719 8.57817C12.9375 8.57817 13.2188 8.29692 13.2188 7.9313C13.2188 7.56567 12.9094 7.28442 12.5719 7.28442Z"
                    fill=""
                  />
                </svg>
              </button> */}
              <ChatButton />
              <DropdownLanguage />
              {siteInfo?.isLoginMode && <LoginButton />}
              {!siteInfo?.isLoginMode && <ConnectButton />}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
