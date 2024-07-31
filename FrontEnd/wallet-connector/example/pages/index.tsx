import {
  ChainInfoID,
  WalletID,
  WalletManagerProvider,
} from "@marsprotocol/wallet-connector"
import type { NextPage } from "next"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Body from "../components/Body"
import Footer from "../components/Footer"

import { backendUrl } from "../anchor/setup"
import { siteInfo, setSiteInfo } from '../anchor/global'

const Home: NextPage = () => {
  const [defaultChain, setDefaultChain] = useState(ChainInfoID.Injective1);
  useEffect(() => {
    setTimeout(() => {
      setDefaultChain(ChainInfoID.Oraichain);
    }, 1000);

    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/Account/SiteInfo`);
        const result = await response.json();
        console.log(result);
        setSiteInfo(result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  })
  return (
    <WalletManagerProvider
      defaultChainId={defaultChain}
      chainIds={[ChainInfoID.Oraichain]}
      enabledWallets={[
        WalletID.Keplr,
        WalletID.Leap,
        WalletID.KeplrMobile,
        WalletID.LeapMobile
      ]}
      renderLoader={() => <div>Loading...</div>}
      walletConnectProjectId={"1f78a236c17d100c81cb18679e76e1ba"}
      persistent
    >
      <Header />
      <Body />
      <Footer />
    </WalletManagerProvider>
  )
}

export default Home
