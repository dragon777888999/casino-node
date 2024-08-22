"use client";
import Main from "@/components/main/page";

import DefaultLayout from "@/components/layouts/DefaultLayout";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { useAppContext } from "../hooks/AppContext";
import { backendUrl } from "@/anchor/global";

export default function Home() {
  const {
    loading,
    setLoading,
    loginStep,
    setLoginStep,
    siteInfo,
    setSiteInfo,
    userInfo,
    setUserInfo,
    socketData,
    walletAddress,
  } = useAppContext();
  const domain = window.location.host;
  useEffect(() => {
    const fetchData = async () => {
      if (!loading) return;
      // if (loginStep != 0) return;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );
        const result = await response.json();
        console.log("--------------site info------------");
        console.log("result", result);
        setSiteInfo(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
        // setLoginStep(1);
      }
    };

    fetchData();
  });
  if (loading)
    return (<></>);
  let cssPath = "/default/styles/main.css";
   if (siteInfo.themeMap.style)
     cssPath = `/${siteInfo.themeMap.style}/styles/main.css`;
  return (
    <>
    <link id="theme-link" rel="stylesheet" href={cssPath} />
      <NextUIProvider>
        <DefaultLayout>
          <Main />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </DefaultLayout>
      </NextUIProvider>
    </>
  );
}
