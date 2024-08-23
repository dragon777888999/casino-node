import ConnectXrplButton from "../wallet-connecter/xrpl/ConnectXrplButton";
import ConnectSolanaButton from "../wallet-connecter/solana/ConnectSolanaButton";

import { useAppContext } from "../../hooks/AppContext";

export default function ConnectButton() {
  const {  loginStep, siteInfo } = useAppContext();

  if (loginStep == 0) {
    return <div>Loading...</div>; // Show a loading indicator while the data is being fetched
  }
  return (
    <>
      {siteInfo?.chain == "Xrpl" && <ConnectXrplButton />}
      {siteInfo?.chain == "Solana" && <ConnectSolanaButton />}
    </>
  );
}
