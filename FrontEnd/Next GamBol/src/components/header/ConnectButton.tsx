import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ConnectXrplButton from "../wallet-connecter/xrpl/ConnectXrplButton";
import { siteInfo, updateSiteInfo } from "@/anchor/global";
import { useState, useEffect } from "react";

import { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { solanaNetworkUrl } from '../../anchor/global';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function ConnectButton() {
    const [loading, setLoading] = useState(true);

    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [solanaNetworkUrl]
      );

    useEffect(() => {
        async function fetchSiteInfo() {
            try {
                await updateSiteInfo(); // Assume updateSiteInfo returns the updated siteInfo
            } catch (error) {
                console.error("Failed to update site info:", error);
            } finally {
                setLoading(false); // Set loading to false once the async function is done
            }
        }

        fetchSiteInfo();
    }, []); // Empty dependency array ensures this effect runs once on mount

    updateSiteInfo();
    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while the data is being fetched
    }
    return (<>
        {siteInfo.chain == "Xrpl" && (<ConnectXrplButton />)}
        {siteInfo.chain == "Solana" && (<ConnectionProvider endpoint={solanaNetworkUrl}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton className="balance" />
                    </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>)}
    </>
    )
}
