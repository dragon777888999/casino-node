"use client";
import React, { useState } from "react";
import { ChainProvider, defaultModalViews } from "@cosmos-kit/react";
import { MainWalletBase } from "@cosmos-kit/core";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { Chain } from "@chain-registry/types";
import { ChainName } from "@cosmos-kit/core";

export default function CosmosWalletProvider({
  children
}: {
  children: React.ReactNode;
}) {

  const defaultWallets: MainWalletBase[] = [...keplrWallets, ...leapWallets];
  const [wallets, setWallets] = useState<MainWalletBase[]>(defaultWallets);

  return (
    <ChainProvider
      // chains={chains}
      // assetLists={[...assets]}
      chains={["oraichain", "cosmoshub", "secretnetwork"]}
      assetLists={[]}
      wallets={[
        // ...wallets,
        ...keplrWallets,
        ...leapWallets,
        // ...owalletWallets,
        // ...ninjiWallets,
        // ...snapWallet,
        // ...ledgerWallets,
        // ...web3AuthWallets,
        // ...trustWallets,
        //...stationWallets,
        //...galaxyStationWallets,
        // ...tailwindWallet,
        // ...cosmostationWallets,
        // ...omniWallets,
        // ...exodusWallets,
        // ...shellWallets,
        // ...vectisWallets,
        // ...xdefiWallets,
        // ...frontierWallets,
        //...coin98Wallets,
        // ...finWallets,
        // ...cdcwalletWallets,
      ]}
      // throwErrors={"connect_only"}
      subscribeConnectEvents={true}
      defaultNameService={"stargaze"}
      walletConnectOptions={{
        signClient: {
          projectId: "a8510432ebb71e6948cfd6cde54b70f7",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "CosmosKit Example",
            description: "CosmosKit test dapp",
            url: "https://test.cosmoskit.com/",
            icons: [
              "https://raw.githubusercontent.com/cosmology-tech/cosmos-kit/main/packages/docs/public/favicon-96x96.png",
            ],
          },
        },
      }}
      signerOptions={{
        signingStargate: (chain: Chain | ChainName) => {
          const chainName =
            typeof chain === "string" ? chain : chain.chain_name;
          switch (chainName) {
            case "osmosis":
              return {
                // @ts-ignore
                gasPrice: new GasPrice(Decimal.zero(1), "uosmo"),
              };
            default:
              return void 0;
          }
        },
      }}
      logLevel={"DEBUG"}
      endpointOptions={{
        isLazy: true,
        endpoints: {
          cosmoshub: {
            rpc: [
              {
                url: "https://rpc.cosmos.directory/cosmoshub",
                headers: {},
              },
            ],
          },
          
          oraichain: {
            rpc: ['https://rpc.orai.io'],
            rest: ['https://lcd.orai.io'],
          },
     
          // terra2: {
          //   rpc: ["https://terra-rpc.lavenderfive.com/"],
          //   rest: ["https://phoenix-lcd.terra.dev/"],
          // },
          // terra2testnet: {
          //   rpc: ["https://terra-testnet-rpc.polkachu.com/"],
          //   rest: ["https://pisco-lcd.terra.dev/"],
          // },
        },
      }}
    // // ==== Custom base modal customization
    // // modalTheme={{
    // //   modalContentClassName: "my-custom-modal-content",
    // }}
    // // ==== Custom components
    // // modalViews={{
    // //   ...defaultModalViews,
    // //   Connected: CustomConnectedView,
    // // }}
    // walletModal={CustomModal}
    // modalOptions={{ mobile: { displayQRCodeEveryTime: true } }}
    >
      {children}
    </ChainProvider>
  );
}