import Header from "./sub_ui/Header";
import Footer from "./sub_ui/Footer";
import { MainPage } from "./MainPage";
import { useEffect, useMemo, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { backendUrl } from "../../anchor/setup";
import { setSiteInfo } from "../../anchor/global";
import "./style_r.css";
export const ROOGSINO = () => {
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
          <title>Roogsino</title>
          <link rel="icon" type="image/png" href="/roogsino.png" />
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
