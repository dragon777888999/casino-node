"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import RebelHeader from "./RebelHeader";
import Footer from "@/components/footer";

export default function RebelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    // <AppProvider>
    <div className="flex bg-black">
      <div
        className={`relative flex flex-1 flex-col bg-black ${
          sidebarOpen ? "ml-72.5$" : "ml-auto"
        }`}
      >
        <RebelHeader />

        {/* <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"></div>
        </main> */}

        {/* <Footer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      </div>
    </div>
  );
}
