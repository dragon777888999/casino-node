"use client";
import Main from "@/components/main/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect } from "react";
import { backendUrl } from "@/anchor/global";
import { NextUIProvider } from "@nextui-org/react";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
import { setSiteInfo } from "@/anchor/global";
// export const metadata: Metadata = {
//   title: " GamBol ",
//   description: "This is Main page",
// };

export default function Home() {
  return (
    <>
      {/* <Provider store={store}> */}
      <NextUIProvider>
        <DefaultLayout>
          <Main />
        </DefaultLayout>
      </NextUIProvider>

      {/* </Provider> */}
    </>
  );
}
