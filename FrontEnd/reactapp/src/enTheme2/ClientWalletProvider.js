
import { WalletProvider } from "@solana/wallet-adapter-react";
import {
    PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

export function ClientWalletProvider(
    props
) {
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            
        ],
        []
    );

    return (
        <WalletProvider wallets={wallets} {...props}>
            <WalletModalProvider {...props} />
        </WalletProvider>
    );
}

export default ClientWalletProvider;