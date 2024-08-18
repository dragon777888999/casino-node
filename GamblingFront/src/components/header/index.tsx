import Link from "next/link";

import Image from "next/image";
import { useState, useEffect } from "react";

import MenuBar from "./MenuBar";
import ConnectButton from "./ConnectButton";
import LoginButton from "./LoginButton";
import { useAppContext } from "../../hooks/AppContext";
import { backendUrl } from "@/anchor/global";
import useFetchUserInfo from "../../hooks/useFetchingUserInfo";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const domain = window.location.host;
 
  function getWebSocketAddress(url:string) {
    // Create a new URL object from the string
    let parsedUrl = new URL(url);

    // Determine the WebSocket protocol (ws or wss)
    let wsProtocol = parsedUrl.protocol === "https:" ? "wss:" : "ws:";

    // Construct the WebSocket URL
    let wsUrl = `${wsProtocol}//${parsedUrl.host}/websocket`;

    return wsUrl;
}
  const { loading, setLoading, siteInfo, setSiteInfo, userInfo, socket, setSocket, socketData, setSocketData } =
    useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!loading) return;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );
        const result = await response.json();
        console.log("--------------site info------------");

        setSiteInfo(result);
        console.log(result);
        // updateSiteInfo();
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const ws = new WebSocket(getWebSocketAddress(backendUrl));

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      console.log('Received:', event.data);
      setSocketData(event.data); // Update the state with received data
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);
  useFetchUserInfo();
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
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm  bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"
                      }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                      }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"
                      }`}
                  ></span>
                </span>
                <span className="absolute right-0 hidden h-full w-full">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                      }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                      }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          {userInfo?.userCode ? (
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
