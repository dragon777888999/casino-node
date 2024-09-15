import "@interchain-ui/react/styles";
import { useChain, useWallet } from "@cosmos-kit/react";
import { PaperPlaneIcon, ResetIcon } from "@radix-ui/react-icons";
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
import { ChainWalletCard } from "./components/chain-wallet-card";
import { useEffect } from "react";
import { useAppContext, WalletType } from "@/hooks/AppContext";

const chainNames_1 = ["oraichain", "cosmoshub"];
export default function ConnectCosmosButton() {
  const { username,address, connect, disconnect, wallet, openView } = useChain(
    chainNames_1[0]
  );
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)
  const { setWalletAddress, loginStep, setLoginStep, setWalletType } = useAppContext();

  useEffect(() => {
    if (globalStatus === "Connected" && address)  {
      setWalletAddress(address??""); //phantom wallet address
      setLoginStep(2);
    }
    setWalletType(WalletType.Phantom);
  }, [globalStatus, address]);

  if (globalStatus === "Connecting") {
    return (
      <Button onClick={() => connect()}>
        <PaperPlaneIcon className="mr-2 h-4 w-4" />
        {`Connecting ${wallet?.prettyName}`}
      </Button>
    );
  }
  if (globalStatus === "Connected") {
    return (
      <>
        <Button variant="default" size="sm" onClick={() => openView()}>
          <div className="flex justify-center items-center space-x-2">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500 leading-4 mb-2" />
            <span>Connected to: {wallet?.prettyName}</span>
          </div>
        </Button>

        <Badge className="flex" variant="outline">
          Account name: {username}
        </Badge>

        <Button
          variant="destructive"
          onClick={async () => {
            await disconnect();
            // setGlobalStatus(WalletStatus.Disconnected);
          }}
        >
          <ResetIcon className="mr-2 h-4 w-4" />
          Disconnect
        </Button>
      </>
    );
  }

  return <Button onClick={() => connect()}>Connect</Button>;
}
