import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

import { network } from "../../anchor/setup";
import { DataProvider } from "../../provider/DataProvider";
import { ROOGSINO } from "./Roogsino";
export const ParentRoo = () => {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],

    [network]
  );
  return (
    <div>
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <DataProvider>
              <ROOGSINO />
            </DataProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};
