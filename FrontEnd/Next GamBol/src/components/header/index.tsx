import Link from "next/link";

import Image from "next/image";
import { useState, useEffect } from "react";
import  { useSelector } from 'react-redux';
import { fetchData } from '../../store';
import { useAppDispatch } from '../../store';

import ConnectXrplWalletModal from "../wallet-connecter/xrpl/ConnectXrplWalletModal";
import {
  WalletMultiButton,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import UserInfo from "./UserInfo";
import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import { useAppContext } from '../../context/AppContext';
import { backendUrl } from "@/anchor/global";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [connected, setConnected] = useState(false);
  const domain = window.location.host;
 
  const { loading, setLoading, siteInfo,setSiteInfo } = useAppContext();

  const getDataFromLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? data : null;
  };
  // ----------get data from local storage---------

  useEffect(() => {
    const fetchData = async () => {
      if (!loading)
        return;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );
        const result = await response.json();
        console.log("--------------site info------------");
        console.log(result);
        setSiteInfo(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  });
  useEffect(() => {
    //setConnected(getDataFromLocalStorage("connected"));
    // setAddress(getDataFromLocalStorage("address"));
    // setWalletType(getDataFromLocalStorage("walleteType"));
  }, [siteInfo]);

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

          {connected ? (
            <UserInfo />
          ) : (
            <div className="flex items-center gap-3 2xsm:gap-7">
              <ul className="flex items-center gap-2 2xsm:gap-4"></ul>
              {siteInfo?.isLoginMode && (
                <LoginButton />
              )}
              {!siteInfo?.isLoginMode && (
                <ConnectButton />
              )
              }
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
