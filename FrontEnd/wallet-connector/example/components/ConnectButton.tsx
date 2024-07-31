import {
  useWalletManager,
} from "@marsprotocol/wallet-connector"

export default function ConnectButton() {
  const { connect, status, connectedWallet, disconnect } = useWalletManager()

  return (
    <div>
      <button className="deposit-btn" id="connectWalletBtn" onClick={connect}>Connect</button>
    </div>
  )
}
