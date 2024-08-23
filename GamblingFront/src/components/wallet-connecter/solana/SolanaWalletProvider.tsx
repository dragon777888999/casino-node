"use client";
import "@solana/wallet-adapter-react-ui/styles.css";
import React, {useMemo } from "react";
// --------------solana----------
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { solanaNetworkUrl } from "../../../anchor/global";

export default function SolanaWalletProvider({
    children
}: {
    children: React.ReactNode;
}) {

    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [solanaNetworkUrl],
    );

    return (
        <ConnectionProvider endpoint={solanaNetworkUrl}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}