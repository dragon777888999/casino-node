import Link from "next/link";

import Image from "next/image";
import { useState, useEffect } from "react";

import MenuBar from "./MenuBar";
import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import { useAppContext } from "../../hooks/AppContext";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { loginStep, siteInfo, userInfo, setUserInfo, socketData } =
    useAppContext();
  useEffect(() => {
    try {
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
            {/* <div className="block flex md:hidden">
              <Link href="/">
                <Image
                  width={35}
                  height={15}
                  src={miniLogoImgSrc}
                  alt="Logo"
                  priority
                />
              </Link>
            </div> */}
            <p
              style={{ fontSize: "28px", fontWeight: "700" }}
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
            <div className="flex items-center gap-3 2xsm:gap-7">
              <ul className="flex items-center gap-2 2xsm:gap-4"></ul>
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
