"use client";
import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/custom.css";
import "@/css/rebel.css";

import React, { useEffect } from "react";
import Loader from "@/components/common/Loader";
import { AppProvider, useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "../anchor/global";
import SolanaWalletProvider from "../components/wallet-connecter/solana/SolanaWalletProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("------------------------layout------------------");

  return (
    <html lang="en">
      <AppProvider>
        <SolanaWalletProvider>
          <body
            suppressHydrationWarning={true}
            style={{ background: "rgb(26 34 44)" }}
          >
            <div
              className="bg-black dark dark:bg-boxdark-2 dark:text-bodydark"
              id="root"
            >
              <FetchSiteInfo>
                {children}
              </FetchSiteInfo>
            </div>
          </body>
        </SolanaWalletProvider>
      </AppProvider>
    </html>
  );
}

const FetchSiteInfo = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { siteInfo, setSiteInfo, loginStep, setLoginStep } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      if (loginStep != 0)
        return;
      const domain = window.location.host;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );

        const result = await response.json();
        console.log("----------site info------------");
        console.log("result", result);

        setSiteInfo(result);
        setLoginStep(1);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  },[]);

  if (loginStep == 0) {
    return <Loader />; // Show Loader while user data is being fetched
  }

  let cssPath = "/default/styles/main.css";
  if (siteInfo.themeMap.style)
    cssPath = `/${siteInfo.themeMap.style}/styles/main.css`;

  return (
    <>
      <link id="theme-link" rel="stylesheet" href={cssPath} />
      {children}
    </>
  ); 
};