"use client";
import Main from "@/components/main/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect } from "react";
import { backendUrl } from "@/anchor/setup";

// import { Provider } from "react-redux";
// import { store } from "../store/store";
import { setSiteInfo } from "@/anchor/global";
// export const metadata: Metadata = {
//   title: " GamBol ",
//   description: "This is Main page",
// };

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/Account/SiteInfo`);
        const result = await response.json();
        console.log(result);
        setSiteInfo(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  });

  return (
    <>
      {/* <Provider store={store}> */}
      <DefaultLayout>
        <Main />
      </DefaultLayout>
      {/* </Provider> */}
    </>
  );
}
