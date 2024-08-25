"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFetchUserInfo from "../../hooks/useFetchUserInfo";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("------------------------DefaultLayout------------------");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useFetchUserInfo();
  return (
    <NextUIProvider>
      <div className="flex ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          className={`relative flex flex-1 flex-col bg-black ${
            sidebarOpen ? "ml-72.5$" : "ml-auto"
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
