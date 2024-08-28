"use client";
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import React, { useMemo } from "react";
import { useWallet, WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';

export default function TronWalletProvider({
    children
}: {
    children: React.ReactNode;
}) {

    const adapters = useMemo(() => [new TronLinkAdapter()],
        []);

    return (
        <WalletProvider adapters={adapters} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
        </WalletProvider>
    );
}