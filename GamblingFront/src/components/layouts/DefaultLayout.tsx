"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
<<<<<<< Updated upstream
    // <AppProvider>
    <div className="flex bg-black">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`relative flex flex-1 flex-col bg-black ${
          sidebarOpen ? "ml-72.5$" : "ml-auto"
        }`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
=======
    <NextUIProvider>
      <div className="flex ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          className={`relative flex flex-1 flex-col ${
            sidebarOpen ? "ml-72.5$" : "ml-auto"
          }`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
>>>>>>> Stashed changes

        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>

        <Footer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
<<<<<<< Updated upstream
    </div>
=======
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
>>>>>>> Stashed changes
  );
}
