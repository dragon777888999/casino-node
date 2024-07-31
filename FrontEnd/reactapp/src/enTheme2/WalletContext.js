import { useMemo } from 'react';
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import ClientWalletProvider from './ClientWalletProvider'
import config from '../config';

const WalletContext = ({ children }) => {
  
  const endpoint = useMemo(() => config.solanaRpc, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <ClientWalletProvider autoConnect>
        {children}
      </ClientWalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContext;