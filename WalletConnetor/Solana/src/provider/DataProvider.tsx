import { createContext, useEffect, useState } from "react";
import { GlobalData, globalAccountPda, program, solVaultPda, tokenVaultPda } from "../anchor/setup";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useGetProgram } from "../hooks/useGetProgram";
import { PublicKey } from "@solana/web3.js";

export const DataContext = createContext<any>({})

export const DataProvider = ({ children }: any) => {

    const anchorWallet = useAnchorWallet()
    const { connection } = useConnection();
    const { getProgram } = useGetProgram(connection, anchorWallet!)

    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [totalTokenClaimed, setTotalTokenClaimed] = useState("0");
    const [totalTokenToSell, setTotalTokenToSell] = useState("0");
    const [totalSolRaised, setTotalSolRaised] = useState("0");
    const [tokenAmountPerSol, setTokenAmountPerSol] = useState("0");
    const [creator, setCreator] = useState<PublicKey>();

    const [globalData, setGlobalData] = useState<GlobalData | null>(null);

    useEffect(() => {
        if (globalData) {

            setTotalTokenClaimed(globalData?.claimedTokenAmount?.toString())
            setTotalTokenToSell(globalData?.totalTokenAmountToSell?.toString())
            setTotalSolRaised(globalData?.totalSolRaised?.toString())
            setTokenAmountPerSol(globalData?.tokenAmountPerSol?.toString())
            setCreator(new PublicKey(globalData?.creator.toBase58()))
        }
    }, [globalData])

    useEffect(() => {
        fetchGlobalData()
        // console.log("solVaultPda", solVaultPda.toBase58())
        // console.log("tokenVaultPda", tokenVaultPda.toBase58())

        const subscriptionId = connection.onAccountChange(
            globalAccountPda,
            (accountInfo) => {
                const data = program.coder.accounts.decode("globalAccount", accountInfo.data)
                setGlobalData(data)
            }
        );
        return () => {
            // Unsubscribe from account change
            connection.removeAccountChangeListener(subscriptionId);
        };
    }, [])

    const fetchGlobalData = async () => {
        const program = getProgram();
        const data: GlobalData = await program.account.globalAccount.fetch(globalAccountPda);
        console.log("global data", data)
        console.log("owner", data.owner.toBase58())
        setGlobalData(data)
    }

    const store = {
        totalTokenClaimed: [totalTokenClaimed, setTotalTokenClaimed],
        totalTokenToSell: [totalTokenToSell, setTotalTokenToSell],
        totalSolRaised: [totalSolRaised, setTotalSolRaised],
        tokenAmountPerSol: [tokenAmountPerSol, setTokenAmountPerSol],
        creator: [creator, setCreator],
        isStarted: [isStarted, setIsStarted],
        isEnded: [isEnded, setIsEnded]
    }

    return (
        <DataContext.Provider value={store}>
            {children}
        </DataContext.Provider>
    );
}