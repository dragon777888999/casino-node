import React, { useEffect, useRef } from "react";
import APP from "../../../app";
import "./RevBridgeApp.scss";
import PageBox from "./components/PageBox";
import { DataProvider } from "./utils/state";
import { useFetchCoins } from "./utils/useFetchCoins";
import useWebSocket from "./utils/useWebSocket";
import { wsEndpoints } from "./utils/wsUrls";
import isWallet from "../../../utils/isWallet";

const RevBridgeApp = () => {

    const { data, disconnect, connect } = useWebSocket(isWallet(wsEndpoints.production));
    const { coins, error, fetchAllCoins } = useFetchCoins();
    const loaded = useRef(null);

    useEffect(() => {

        const handleVisibilityChange = () => {
            if (document.hidden) {
                disconnect();
            } else {
                connect();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        if (!loaded.current) {
            loaded.current = true;
            fetchAllCoins();

            APP.state.set('rbIsLoading', false);
            APP.state.set('rbsetRingStatuses', false);
        }

        const originalTitle = document.title;
        document.title = "Crypto Bridge";

        // Revert to the original title when the component unmounts
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            console.log('')
            disconnect();
            document.title = originalTitle;
        }
    }, []);

    return (
        <>
            <DataProvider wsData={data} coinsDataAfterFetch={{ coins, error }}>
                <PageBox />
            </DataProvider>
        </>
    );
};

export default RevBridgeApp;