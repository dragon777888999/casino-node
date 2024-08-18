"use client";
import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/custom.css";
import React, { useEffect, useState, useMemo } from "react";
import Loader from "@/components/common/Loader";
import useColorMode from "@/hooks/useColorMode";
import { AppProvider } from "@/hooks/AppContext";
// --------------solana----------
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { solanaNetworkUrl } from "../anchor/global";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorMode, setColorMode] = useColorMode();
  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    // setColorMode("dark");
    (setColorMode as (value: string) => void)("dark");
  }, []);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [solanaNetworkUrl],
  );

  return (
    <html lang="en">
      <AppProvider>
        <ConnectionProvider endpoint={solanaNetworkUrl}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <body
                suppressHydrationWarning={true}
                style={{ background: "rgb(26 34 44)" }}
              >
                <div
                  className="bg-black dark dark:bg-boxdark-2 dark:text-bodydark"
                  id="root"
                >
                  {loading ? <Loader /> : children}
                </div>
              </body>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </AppProvider>
    </html>
  );
}
