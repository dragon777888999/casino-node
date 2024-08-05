import Header from "./sub_ui/Header";
import Footer from "./sub_ui/Footer";
import { MainPage } from "./MainPage";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { backendUrl } from "../../anchor/setup";
import { setSiteInfo } from "../../anchor/global";

export const CRAFTYSTAKE = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/Account/SiteInfo`);
        const result = await response.json();
        console.log("---------------------------");
        console.log(result);
        setSiteInfo(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>CraftyStake</title>
          <link rel="icon" type="image/png" href="/craftystake.png" />
        </Helmet>
        <Header />
        <div className="container">
          <MainPage />
          <Footer />
        </div>
      </HelmetProvider>
    </div>
  );
};
