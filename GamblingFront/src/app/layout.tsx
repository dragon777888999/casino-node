"use client";
import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";

import "@solana/wallet-adapter-react-ui/styles.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/custom.css";
import "@/css/rebel.css";
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
import "@fortawesome/fontawesome-free/css/all.min.css";
import { backendUrl } from "../anchor/global";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorMode, setColorMode] = useColorMode();
  const [divider, setDivider] = useState("");

<<<<<<< Updated upstream
  // const pathname = usePathname();

=======
  return (
    <html lang="en">
      <AppProvider>
        <SolanaWalletProvider>
          <body suppressHydrationWarning={true}>
            <div
              className=" dark dark:bg-boxdark-2 dark:text-bodydark"
              id="root"
            >
              <FetchSiteInfo>{children}</FetchSiteInfo>
            </div>
          </body>
        </SolanaWalletProvider>
      </AppProvider>
    </html>
  );
}

const FetchSiteInfo = ({ children }: { children: React.ReactNode }) => {
  const { siteInfo, setSiteInfo, loginStep, setLoginStep } = useAppContext();
>>>>>>> Stashed changes
  useEffect(() => {
    const domain = window.location.host;
    const fetchData = async () => {
<<<<<<< Updated upstream
      if (!loading) return;
      // if (loginStep != 0) return;
=======
      if (loginStep != 0) return;
      const domain = window.location.host;
>>>>>>> Stashed changes
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );

        const result = await response.json();
        console.log("----------divide----site info------------");
        console.log("result", result);

        setDivider(result.mark);
        console.log(result);
        // updateSiteInfo();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
<<<<<<< Updated upstream
    setTimeout(() => setLoading(false), 1000);
    // setColorMode("dark");
    (setColorMode as (value: string) => void)("dark");
  }, [setColorMode]);
=======
  }, []);
>>>>>>> Stashed changes

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [solanaNetworkUrl],
  );

  return (
<<<<<<< Updated upstream
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
                  {/* {loading ? <Loader /> : <RebelLayout />} */}
                </div>
              </body>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </AppProvider>
    </html>
  );
}
=======
    <>
      <link id="theme-link" rel="stylesheet" href={cssPath} />
      {children}
    </>
  );
};
>>>>>>> Stashed changes
