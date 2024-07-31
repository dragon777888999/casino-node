import { formatUnits } from "ethers"
import { jalaDecimal } from "../anchor/setup"
import { useContext } from "react"
import { DataContext } from "../provider/DataProvider"

export const TotalInfoPanel = () => {
    const  {
        totalTokenClaimed: [totalTokenClaimed, setTotalTokenClaimed],
        totalTokenToSell: [totalTokenToSell, setTotalTokenToSell],
        totalSolRaised: [totalSolRaised, setTotalSolRaised],
        tokenAmountPerSol: [tokenAmountPerSol, setTokenAmountPerSol],
    } = useContext(DataContext);
    return (
        <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-center w-full">
                <div className="font-bold text-2xl md:text-4xl">
                    {`${parseFloat(formatUnits(totalTokenClaimed, jalaDecimal)).toFixed(0)}/${parseFloat(formatUnits(totalTokenToSell, jalaDecimal)).toFixed(0)}`}
            </div>
            <div>Total <b>JALA</b> Sold</div>
        </div>
        <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-center w-full">
            <div className="inline-flex items-end">
                <div className="font-bold text-4xl">
                        {`${parseFloat(formatUnits(BigInt(totalSolRaised), 9)).toFixed(2)}/${(tokenAmountPerSol == "0" ? "0" : parseFloat(formatUnits(BigInt(totalTokenToSell) / BigInt(tokenAmountPerSol), 9)).toFixed(0))}`}<span className="font-bold text-2xl">&nbsp;SOL</span>
                </div>
            </div>
            <div>Total <b>SOL</b> Raised</div>
        </div>
    </div>
    )
}