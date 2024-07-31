import {
    WalletConnectionStatus,
    useWalletManager,
} from "@marsprotocol/wallet-connector"
import { useEffect, useState } from "react"
import ConnectButton from "./ConnectButton"
import UserInfo from "./UserInfo"
import { stat } from "fs/promises"
import { accessToken, setAccessToken, siteInfo, userInfo } from '../anchor/global';
import { backendUrl } from "../anchor/setup";

export default function Header() {
    const { connect, status, connectedWallet, disconnect } = useWalletManager()
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        setIsConnected(status === WalletConnectionStatus.Connected)
        console.log(status, "HHHH");
    }, [status])


    return (
        <header>
            <div className="header-wrapper container">
                <a className="logo" href="https://www.oraicasino.io">
                    <img src="/images/logo.png" alt="Oraicasino.io" />
                </a>
                {isConnected
                    ? <UserInfo />
                    : <ConnectButton />}
            </div>
        </header>

    )
}