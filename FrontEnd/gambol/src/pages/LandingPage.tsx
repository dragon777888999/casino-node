import { ToastContainer, toast } from "react-toastify"
import ReactLoading from 'react-loading';
import { useContext, useEffect, useMemo, useState } from "react";
import { UserData, getUserAccountPda, getUserAta, globalAccountPda, jalaDecimal, minBuySolAmount, network, program, solVaultPda, tokenMintKey, tokenPerSol, tokenVaultPda } from "../anchor/setup";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BN } from "@coral-xyz/anchor";
import 'react-toastify/dist/ReactToastify.css';
import { useGetProgram } from "../hooks/useGetProgram";
import { formatUnits, parseUnits } from "ethers";
import { TimePanel } from "../components/TimePanel";
import { TotalInfoPanel } from "../components/TotalInfoPanel";
import { DataContext } from "../provider/DataProvider";


export const LandingPage = () => {
    const {
        creator: [creator, setCreator],
        isStarted: [isStarted, setIsStarted],
        isEnded: [isEnded, setIsEnded],
    } = useContext(DataContext);

    const wallet = useWallet();
    const anchorWallet = useAnchorWallet()
    const { connection } = useConnection();

    const { getProgram } = useGetProgram(connection, anchorWallet!)

    


    const [isBuyLoading, setIsBuyLoading] = useState(false)
    const [isClaimLoading, setIsClaimLoading] = useState(false)
    const [isRefundLoading, setIsRefundLoading] = useState(false)

    const [solBuyAmountInput, setSolBuyAmountInput] = useState("1")

    const [userData, setUserData] = useState<UserData | null>(null);


    const [tokenAmountToClaim, setTokenAmountToClaim] = useState("0");
    const [solAmountToRefund, setSolAmountToRefund] = useState("0");

    const solBuyAmount = useMemo(() => {
        if (solBuyAmountInput == "")
            return BigInt(0)
        return parseUnits(solBuyAmountInput, 9)
    }, [solBuyAmountInput])

    const jalaBuyAmount = useMemo(() => {
        return (solBuyAmount * tokenPerSol / BigInt(10 ** 9)).toString()
    }, [solBuyAmount])

    const onClickBuyToken = async () => {
        if (!wallet.publicKey) {
            toast.warning("Please Connect you wallet first")
            return;
        }
        if (!isStarted) {
            toast.warning("You can't buy tokens before the token sale is started")
            return;
        }
        if (solBuyAmount < minBuySolAmount) {
            toast.warning("You should buy more than 0.1 SOL")
            return;
        }
        setIsBuyLoading(true)

        console.log("sol buy amount", solBuyAmount)
        let result;
        try {
            const tx = await getProgram().methods.userContribute(new BN(solBuyAmount.toString()))
                .accounts({
                    solVaultAccount: solVaultPda,
                    globalAccount: globalAccountPda,
                    userAccount: getUserAccountPda(wallet.publicKey),
                    creator: creator
                })
                .transaction()
            const transactionSignature = await wallet.sendTransaction(tx, connection, { skipPreflight: true, preflightCommitment: "finalized" });
            const confirmResult = await connection.confirmTransaction(transactionSignature, "confirmed")
            const status = confirmResult.value;
            console.log("status==>", status)
            if (status && status.err) {
                result = false;
                console.log("Transaction failed: ", status.err);
            }
            else if (status) {
                result = true;
            }
            else {
                result = false;
            }

            console.log(`View on explorer: https://explorer.solana.com/tx/${transactionSignature}?cluster=${network}`);
        } catch (error) {
            result = false;
            console.log(error);
        } finally {
            if (result) {
                toast.success(`Buy Tokens successfully`)
            }
            else {
                toast.error(`Buy Tokens failed`)
            }
            setIsBuyLoading(false)
        }

    }

    const onClickClaim = async () => {
        if (!wallet.publicKey) {
            toast.warning("Please Connect you wallet first")
            return;
        }
        setIsClaimLoading(true)

        let result;
        try {
            const tx = await getProgram().methods.claimToken()
                .accounts({
                    vaultTokenAccount: tokenVaultPda,
                    mintOfTokenBeingSent: tokenMintKey,
                    receiverTokenAccount: getUserAta(wallet.publicKey),
                    globalAccount: globalAccountPda,
                    userAccount: getUserAccountPda(wallet.publicKey),
                })
                .transaction()
            const transactionSignature = await wallet.sendTransaction(tx, connection, { skipPreflight: true, preflightCommitment: "finalized" });
            const confirmResult = await connection.confirmTransaction(transactionSignature, "confirmed")
            const status = confirmResult.value;
            console.log("status==>", status)
            if (status && status.err) {
                result = false;
                console.log("Transaction failed: ", status.err);
            }
            else if (status) {
                result = true;
            }
            else {
                result = false;
            }

            console.log(`View on explorer: https://explorer.solana.com/tx/${transactionSignature}?cluster=${network}`);
        } catch (error) {
            result = false;
            console.log(error);
        } finally {
            if (result) {
                toast.success(`Claimed Tokens successfully`)
            }
            else {
                toast.error(`Claimed Tokens failed`)
            }
            setIsClaimLoading(false)
        }

    }

    const onClickRefund = async () => {
        if (!wallet.publicKey) {
            toast.warning("Please Connect you wallet first")
            return;
        }
        setIsRefundLoading(true)

        let result;
        try {
            const tx = await getProgram().methods.refund()
                .accounts({
                    solVaultAccount: solVaultPda,
                    globalAccount: globalAccountPda,
                    userAccount: getUserAccountPda(wallet.publicKey),
                })
                .transaction()
            const transactionSignature = await wallet.sendTransaction(tx, connection, { skipPreflight: true, preflightCommitment: "finalized" });
            const confirmResult = await connection.confirmTransaction(transactionSignature, "confirmed")
            const status = confirmResult.value;
            console.log("status==>", status)
            if (status && status.err) {
                result = false;
                console.log("Transaction failed: ", status.err);
            }
            else if (status) {
                result = true;
            }
            else {
                result = false;
            }

            console.log(`View on explorer: https://explorer.solana.com/tx/${transactionSignature}?cluster=${network}`);
        } catch (error) {
            result = false;
            console.log(error);
        } finally {
            if (result) {
                toast.success(`Refunded successfully`)
            }
            else {
                toast.error(`Refunded failed`)
            }
            setIsRefundLoading(false)
        }

    }

    const fetchUserData = async () => {
        if (wallet.connected) {
            const program = getProgram();
            const data: UserData = await program.account.userAccount.fetch(getUserAccountPda(wallet.publicKey!));
            console.log("user data", data)
            console.log("user data string", data?.tokenAmountToClaim?.toString(), data?.contributeSolAmount?.toString())

        }
    }

    useEffect(() => {
        if (userData) {
            setTokenAmountToClaim(userData?.tokenAmountToClaim?.toString());
            setSolAmountToRefund(userData?.contributeSolAmount?.toString());
        }
    }, [userData])

    

    


    useEffect(() => {

        if (wallet.connected) {
            fetchUserData()
            const subscriptionId = connection.onAccountChange(
                getUserAccountPda(wallet.publicKey!),
                (accountInfo) => {
                    const data = program.coder.accounts.decode("userAccount", accountInfo.data)
                    setUserData(data)
                }
            );
            return () => {
                // Unsubscribe from account change
                connection.removeAccountChangeListener(subscriptionId);
            };
        }
    }, [wallet.connected])


    


    return (
        <section className="w-full flex justify-center py-3 -mt-16">
            <div className="px-10 max-w-4xl w-full">

                <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                    <TimePanel />
                    <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-start w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div>Amount in <b>SOL</b> You Pay:</div>
                            <input
                                type="number"
                                value={solBuyAmountInput}
                                placeholder={"0"}
                                onChange={(e) => {
                                    setSolBuyAmountInput(e.target.value)
                                }}
                                className={`w-full h-[50px] outline-none border remove-arrow p-5 rounded-md  text-lg`}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>Amount in <b>JALA</b> You Receive:</div>
                            <input
                                type="number"
                                value={jalaBuyAmount}
                                placeholder={"0"}
                                onChange={() => { }}
                                className={`w-full h-[50px] outline-none border remove-arrow p-5 rounded-md  text-lg`}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={onClickBuyToken}
                                className="text-center flex justify-center items-center bg-green-600 hover:bg-green-400 h-12  w-full mt-3 sm:mt-0 text-white font-bold gap-2 rounded"
                            >
                                Buy
                                {isBuyLoading && <ReactLoading type={"bubbles"} />}
                            </button>
                        </div>

                    </div>
                </div>
                <TotalInfoPanel />
                
                <hr className="mx-48 border-1 my-10"></hr>
                <h1 className="text-center text-black text-5xl font-bold">
                    Your Mints
                </h1>
                <div className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
                    <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-center w-full">
                        <div className="font-bold text-4xl">
                            {formatUnits(BigInt(tokenAmountToClaim), jalaDecimal)}
                        </div>
                        <div><b>$JALA</b> token to claim</div>
                        <button
                            onClick={onClickClaim}
                            className={`flex justify-center items-center h-12 w-full mt-3 text-white font-bold rounded ${tokenAmountToClaim === "0" ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-400'
                                }`}
                            disabled={tokenAmountToClaim === "0"}
                        >
                            Claim
                            {isClaimLoading && <ReactLoading type={"bubbles"} />}
                        </button>
                    </div>
                    <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-center w-full">
                        <div className="font-bold text-4xl">
                            {formatUnits(solAmountToRefund, 9)}<span className="font-bold text-2xl">&nbsp;SOL</span>
                        </div>
                        <div>Total Refund</div>
                        <button
                            onClick={onClickRefund}
                            className={`flex justify-center items-center h-12 w-full mt-3 text-white font-bold rounded ${solAmountToRefund === "0" ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300'
                                }`}
                            disabled={solAmountToRefund === "0"}
                        >
                            Withdraw
                            {isRefundLoading && <ReactLoading type={"bubbles"} />}
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}