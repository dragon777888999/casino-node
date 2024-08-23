"use client";
import "jsvectormap/dist/jsvectormap.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/custom.css";
import "@/css/rebel.css";

import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AppProvider, useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "../anchor/global";
import SolanaWalletProvider from "../components/wallet-connecter/solana/SolanaWalletProvider";

import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [title, setTitle] = useState('Sample'); // Default favicon
  const [faviconUrl, setFaviconUrl] = useState('/default/images/favicon.ico'); // Default favicon
  const [description, setDescription] = useState(''); // Default favicon

  useEffect(() => {
    async function fetchData() {
      const domain = window.location.host;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );

        const result = await response.json();
        setTitle(result.title);
        setFaviconUrl(`/${result.themeCode}/images/favicon.ico`); 
        setDescription(result.description);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={faviconUrl} />
      </Head>
      <AppProvider>
        <SolanaWalletProvider>
          <body suppressHydrationWarning={true}>
            <div
              className=" dark dark:bg-boxdark-2 dark:text-bodydark"
              id="root"
            >
              <FetchSiteInfo>{children}</FetchSiteInfo>
            </div>
          </body>
        </SolanaWalletProvider>
      </AppProvider>
    </html>
  );
}

const FetchSiteInfo = ({ children }: { children: React.ReactNode }) => {
  const { siteInfo, setSiteInfo, loginStep, setLoginStep } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      if (loginStep != 0) return;
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
  }, []);

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
