import { useState, useEffect } from "react";
import ConnectXrplWalletModal from "./ConnectXrplWalletModal";



export default function ConnectXrplButton() {
    const [showXrplConnectModal, setShowXrplConnectModal] = useState(false);
    const openConnectWallet = () => {
        setShowXrplConnectModal(true);
    };
    const closeConnectModal = () => {
        setShowXrplConnectModal(false);
    };

    return (
        <>
            <button
                onClick={() => openConnectWallet()}
                className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
                <p> Connect</p>
            </button>
            <ConnectXrplWalletModal
                showConnectModal={showXrplConnectModal}
                onRequestClose={closeConnectModal}
            ></ConnectXrplWalletModal>
        </>
    )
}
