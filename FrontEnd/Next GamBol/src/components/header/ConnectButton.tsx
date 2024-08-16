import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ConnectXrplButton from "../wallet-connecter/xrpl/ConnectXrplButton";
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
import { useAppContext } from '../../context/AppContext';

export default function ConnectButton() {
    const { loading, siteInfo } = useAppContext();
    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [solanaNetworkUrl]
      );

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while the data is being fetched
    }
    return (<>
        {siteInfo?.chain == "Xrpl" && (<ConnectXrplButton />)}
        {siteInfo?.chain == "Solana" && (<ConnectionProvider endpoint={solanaNetworkUrl}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton className="balance" />
                    </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>)}
    </>
    )
}
