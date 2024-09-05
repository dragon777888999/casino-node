"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFetchUserInfo from "../../hooks/useFetchUserInfo";
import { useAppContext } from "../../hooks/AppContext";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { siteInfo, userInfo, loginStep, socket } = useAppContext();
  useEffect(() => {
    document.title = siteInfo.title;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", siteInfo.description);
    }

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    link.href = `/${siteInfo.themeCode}/images/favicon.ico`;
  });

  const sendMessage = (message: string, retryDelay = 500) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
    else {
      // Retry sending the message after a delay
      const retryTimeout = setTimeout(() => {
        sendMessage(message, retryDelay);
      }, retryDelay);

      // Cleanup timeout if the component unmounts before the timeout is reached
      return () => clearTimeout(retryTimeout);
    }
  };
  useEffect(() => {
    if (loginStep == 3) {
      const authMessage = {
        type: "auth",
        agentCode: siteInfo?.agentCode,
        userCode: userInfo.userCode,
      };
      sendMessage(JSON.stringify(authMessage));
    }
  }, [socket]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  useFetchUserInfo();
  return (
    <NextUIProvider>
      <div className="flex ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          className={`relative flex flex-1 flex-col bg-black ${sidebarOpen ? "ml-72.5$" : "ml-auto"
            }`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>

          <Footer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
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
    </NextUIProvider>
  );
}
