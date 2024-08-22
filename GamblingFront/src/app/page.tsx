"use client";
import Main from "@/components/main/page";

import DefaultLayout from "@/components/layouts/DefaultLayout";

import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  return (
    <>
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
