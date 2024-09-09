"use client";
import "jsvectormap/dist/jsvectormap.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/custom.css";

import React, { useEffect,   useRef } from "react";
import Loader from "@/components/common/Loader";
import { AppProvider, useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "../anchor/global";
import SolanaWalletProvider from "../components/wallet-connecter/solana/SolanaWalletProvider";
import TronWalletProvider from "../components/wallet-connecter/tron/TronWalletProvider";
import CosmosWalletProvider from "../components/wallet-connecter/cosmos/CosmosWalletProvider";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import useLocalStorage from "../hooks/useLocalStorage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>

        <TronWalletProvider>
          <SolanaWalletProvider>

            <body suppressHydrationWarning={true}>
              <div
                className=" dark dark:bg-boxdark-2 dark:text-bodydark"
                id="root"
              >
                <CosmosWalletProvider>
                  <FetchSiteInfo>
                    <DefaultLayout>

                      {children}

                    </DefaultLayout>
                  </FetchSiteInfo>
                </CosmosWalletProvider>
              </div>
            </body>

          </SolanaWalletProvider>
        </TronWalletProvider>

      </AppProvider>
    </html>
  );
}

const FetchSiteInfo = ({ children }: { children: React.ReactNode }) => {
  const {
    siteInfo,
    setSiteInfo,
    siteInfoList,
    setSiteInfoList,
    loginStep,
    setLoginStep,
    socket,
    setSocket,
    socketData,
    setSocketData
  } = useAppContext();
  const [chain, setChain] = useLocalStorage("chain", "");

  useEffect(() => {
    const fetchData = async () => {
      if (loginStep != 0) return;
      const domain = window.location.host;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfoList?domain=${domain}`,
        );

        const result = await response.json();
        console.log("----------site info------------");
        console.log("result", result);

        setSiteInfoList(result);
        const chains = Object.keys(result);
        var curChain = chain;
        if (curChain == "" || !chains.includes(curChain)) {
          curChain = chains[0];
          setChain(curChain);
        }
        const info = result[curChain];
        setSiteInfo(info);
        setLoginStep(1);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);


  const reconnectInterval = useRef(1000); // Initial reconnect interval (1 second)
  const maxReconnectInterval = useRef(30000); // Maximum reconnect interval (30 seconds)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connectWebSocket = () => {
    // Create a new URL object from the string
    let parsedUrl = new URL(backendUrl);

    // Determine the WebSocket protocol (ws or wss)
    let wsProtocol = parsedUrl.protocol === "https:" ? "wss:" : "ws:";

    // Construct the WebSocket URL
    let wsUrl = `${wsProtocol}//${parsedUrl.host}/websocket?agentCode=${siteInfo.agentCode}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      //console.log("Received:", event.data);
      setSocketData(event.data); // Update the state with received data
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      handleReconnect();
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.close();
    };

    setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 60000); // Send a ping every 60 seconds

    setSocket(ws);
  };
  const handleReconnect = () => {
    // Clear any existing timeouts
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }

    // Attempt to reconnect after a delay
    timeout.current = setTimeout(() => {
      console.log(
        `Attempting to reconnect in ${reconnectInterval.current / 1000} seconds...`,
      );
      connectWebSocket();

      // Increase the reconnect interval, but don't exceed the maximum
      reconnectInterval.current = Math.min(
        reconnectInterval.current * 2,
        maxReconnectInterval.current,
      );
    }, reconnectInterval.current);
  };

  useEffect(() => {
    if (loginStep == 1)
      connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [loginStep]);

  if (loginStep == 0) {
    return <Loader />; // Show Loader while user data is being fetched
  }

  let cssPath = "/default/styles/main.css";
  if (siteInfo.themeMap.style)
    cssPath = `/${siteInfo.themeMap.style}/styles/main.css`;
  // console.log("list", siteInfoList);
  return (
    <>
      <link id="theme-link" rel="stylesheet" href={cssPath} />
      {children}
    </>
  );
};
