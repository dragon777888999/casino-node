import { ToastContainer, toast } from "react-toastify"
import ReactLoading from 'react-loading';
import { useContext, useMemo, useState } from "react";
import { getUserAta, globalAccountPda, jalaDecimal, network, solVaultPda, tokenMintKey, tokenVaultPda } from "../anchor/setup";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BN } from "@coral-xyz/anchor";
import 'react-toastify/dist/ReactToastify.css';
import { useGetProgram } from "../hooks/useGetProgram";
import { parseUnits } from "ethers";
import { TimePanel } from "../components/TimePanel";
import { TotalInfoPanel } from "../components/TotalInfoPanel";
import { DataContext } from "../provider/DataProvider";


export const AdminPage = () => {

    const wallet = useWallet();
    const anchorWallet = useAnchorWallet()
    const { connection } = useConnection();
    const {
        isStarted: [isStarted, setIsStarted],
        isEnded: [isEnded, setIsEnded],
    } = useContext(DataContext);

    const { getProgram } = useGetProgram(connection, anchorWallet!)

    const [isDepositLoading, setIsDepositLoading] = useState(false)
    const [isWithdrawTokenLoading, setIsWithdrawTokenLoading] = useState(false)
    const [isWithdrawSolLoading, setIsWithdrawSolLoading] = useState(false)

    const [depositTokenAmountInput, setDepositTokenAmountInput] = useState("0");
    const [withdrawTokenAmountInput, setWithdrawTokenAmountInput] = useState("0");
    const [withdrawSolAmountInput, setWithdrawSolAmountInput] = useState("0");

    const depositTokenAmount = useMemo(() => {
        if (depositTokenAmountInput == "")
            return BigInt(0)
        return parseUnits(depositTokenAmountInput, jalaDecimal)
    }, [depositTokenAmountInput])
    const withdrawTokenAmount = useMemo(() => {
        if (withdrawTokenAmountInput == "")
            return BigInt(0)
        return parseUnits(withdrawTokenAmountInput, jalaDecimal)
    }, [withdrawTokenAmountInput])
    const withdrawSolAmount = useMemo(() => {
        if (withdrawSolAmountInput == "")
            return BigInt(0)
        return parseUnits(withdrawSolAmountInput, 9)
    }, [withdrawSolAmountInput])


    const onClickDepositToken = async () => {
        if (!wallet.publicKey) {
            toast.warning("Please Connect you wallet first")
            return;
        }
        if (depositTokenAmount == BigInt(0)) {
            toast.warning("You should deposit more than 0 JALA")
            return;
        }
        setIsDepositLoading(true)

        let result;
        try {
            const tx = await getProgram().methods.depositToken(new BN(depositTokenAmount.toString()))
                .accounts({
                    mintOfTokenBeingSent: tokenMintKey,
                    vaultTokenAccount: tokenVaultPda,
                    senderTokenAccount: getUserAta(wallet.publicKey),
                    globalAccount: globalAccountPda,
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
                toast.success(`Deposit Tokens successfully`)
            }
            else {
                toast.error(`Deposit Tokens failed`)
            }
            setIsDepositLoading(false)
        }

    }
    const onClickWithdrawToken = async () => {
        if (!wallet.publicKey) {
            toast.warning("Please Connect you wallet first")
            return;
        }
        if (!isEnded) {
            toast.warning("You can't withdraw before the token sale is ended")
            return;
        }
        console.log("withdrawTokenAmount", withdrawTokenAmount, withdrawTokenAmountInput)
        if (withdrawTokenAmount == BigInt(0)) {
            toast.warning("You should withdraw more than 0 JALA")
            return;
        }
        setIsWithdrawTokenLoading(true)

        let result;
        try {
            const tx = await getProgram().methods.withdrawToken(new BN(withdrawTokenAmount.toString()))
                .accounts({
                    mintOfTokenBeingSent: tokenMintKey,
                    vaultTokenAccount: tokenVaultPda,
                    receiverTokenAccount: getUserAta(wallet.publicKey),
                    globalAccount: globalAccountPda,
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
                toast.success(`Withdraw Tokens successfully`)
            }
            else {
                toast.error(`Withdraw Tokens failed`)
            }
            setIsWithdrawTokenLoading(false)
        }

    }
    const onClickWithdrawSol = async () => {
        if (!wallet.publicKey) {
            toast.warning("Please Connect you wallet first")
            return;
        }
        if (!isEnded) {
            toast.warning("You can't withdraw before the token sale is ended")
            return;
        }
        if (withdrawSolAmount == BigInt(0)) {
            toast.warning("You should deposit more than 0 JALA")
            return;
        }
        setIsWithdrawSolLoading(true)

        let result;

        try {
            const tx = await getProgram().methods.withdrawSol(new BN(withdrawSolAmount.toString()))
                .accounts({
                    solVaultAccount: solVaultPda,
                    globalAccount: globalAccountPda,
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
                toast.success(`Withdraw Sol successfully`)
            }
            else {
                toast.error(`Withdraw Sol failed`)
            }
            setIsWithdrawSolLoading(false)
        }

    }



    return (
        <section className="w-full flex justify-center py-3 -mt-16">
            <div className="px-10 max-w-4xl w-full">

                <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                    <TimePanel />
                    <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-start w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div>Amount in <b>JALA</b> You Deposit:</div>
                            <input
                                type="number"
                                value={depositTokenAmountInput}
                                placeholder={"0"}
                                onChange={(e) => {
                                    setDepositTokenAmountInput(e.target.value)
                                }}
                                className={`w-full h-[50px] outline-none border remove-arrow p-5 rounded-md  text-lg`}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={onClickDepositToken}
                                className="text-center flex justify-center items-center bg-green-600 hover:bg-green-400 h-12 sm:w-40 w-full mt-3 sm:mt-0 text-white font-bold gap-2 rounded"
                            >
                                Deposit
                                {isDepositLoading && <ReactLoading type={"bubbles"} />}
                            </button>
                        </div>

                    </div>
                </div>
                <TotalInfoPanel />
                <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-start w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div>Amount in <b>JALA</b> You Withdraw:</div>
                            <input
                                type="number"
                                value={withdrawTokenAmountInput}
                                placeholder={"0"}
                                onChange={(e) => {
                                    setWithdrawTokenAmountInput(e.target.value)
                                }}
                                className={`w-full h-[50px] outline-none border remove-arrow p-5 rounded-md  text-lg`}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={onClickWithdrawToken}
                                className="text-center flex justify-center items-center bg-green-600 hover:bg-green-400 h-12 sm:w-40 w-full mt-3 sm:mt-0 text-white font-bold gap-2 rounded"
                            >
                                Withdraw Token
                                {isWithdrawTokenLoading && <ReactLoading type={"bubbles"} />}
                            </button>
                        </div>

                    </div>
                    <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-start w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div>Amount in <b>SOL</b> You Withdraw:</div>
                            <input
                                type="number"
                                value={withdrawSolAmountInput}
                                placeholder={"0"}
                                onChange={(e) => {
                                    setWithdrawSolAmountInput(e.target.value)
                                }}
                                className={`w-full h-[50px] outline-none border remove-arrow p-5 rounded-md  text-lg`}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={onClickWithdrawSol}
                                className="text-center flex justify-center items-center bg-green-600 hover:bg-green-400 h-12 sm:w-40 w-full mt-3 sm:mt-0 text-white font-bold gap-2 rounded"
                            >
                                Withdraw Sol
                                {isWithdrawSolLoading && <ReactLoading type={"bubbles"} />}
                            </button>
                        </div>

                    </div>
                    <hr className="mx-48 border-1 my-10"></hr>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}