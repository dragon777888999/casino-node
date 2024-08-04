import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { AdminPage } from "./pages/AdminPage"
import { NoPage } from "./pages/NoPage"
import { MainPage } from "./pages/MainPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { backendUrl, agentCode } from "./anchor/setup";
import { siteInfo, setSiteInfo } from './anchor/global';
import { useContext, useEffect, useMemo, useState } from "react";

const AppRouter =  () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backendUrl}/Account/SiteInfo`);
                const result = await response.json();
                console.log(result);
                setSiteInfo(result);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    })
    return (
        <div className="container">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default AppRouter;