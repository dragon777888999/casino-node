import { useEffect, useState } from "react";
import Image from "next/image";
import DispalyGameInfoModal from "../modal/DispalyGameInfoModal";
// Adjust import as needed
import { useAppContext } from "@/hooks/AppContext";
import { ReferralInfo } from "@/types/referralInfo";

const displayLength = 10;
interface AffiliateTableProps {
  data: ReferralInfo[] | null;
}

const AffiliateTable: React.FC<AffiliateTableProps> = ({ data }) => {
  const { userInfo, siteInfo } = useAppContext();

  const [tableData, setTableData] = useState<ReferralInfo[] | null>([]);
  useEffect(() => {
    // Initialize with the passed data
    setTableData(data);
  }, [data]);

  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";
  const currencyDir = siteInfo.themeMap.currency
    ? siteInfo.themeMap.currency
    : "default";
  console.log("table", tableData);
  return (
    <>
      <div
        className="style-table-row rounded-sm   dark:border-strokedark dark:bg-boxdark"
        style={{ fontSize: "14px", color: "#7b808e" }}
      >
        {/* Table Header */}
        <div className="style-th-row flex grid w-full grid-cols-2 justify-around border-t border-stroke px-4 py-3 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p>Affiliate Code </p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:flex">
            <p>UserCode</p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:flex">
            <p>BetCount</p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:flex">
            <p>BetAmount</p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:col-span-1  md:flex">
            <p>Payout</p>
          </div>
          <div className="col-span-1 flex items-center justify-end md:col-span-1  ">
            <p>Income</p>
          </div>
        </div>
        {tableData ? (
          tableData.map((info, index) => (
            <div
              className="flex grid grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
              key={index}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-black dark:text-white">
                    <a type="button" style={{ cursor: "pointer" }}>
                      {info.affiliaterCode}
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate text-black dark:text-white">
                  {info.userCode ? `${info.userCode.slice(0, 4)}...` : "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex hidden items-center justify-center md:flex">
                <p className="text-black dark:text-white">
                  {" "}
                  {info.betCount !== undefined
                    ? info.betCount.toString().slice(0, 6)
                    : "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex hidden items-center justify-center gap-1 md:flex">
                <Image
                  src={`/default/images/currency/${info.currencyCode}.png`} // Adjust path and naming if needed
                  width={15}
                  height={15}
                  alt={userInfo.selectedCoinType}
                />
                <p className="text-black dark:text-white">
                  {info.betAmount !== undefined
                    ? info.betAmount.toString().slice(0, 6)
                    : "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex hidden items-center justify-center gap-1 md:flex">
                <Image
                  src={`/default/images/currency/${info.currencyCode}.png`} // Adjust path and naming if needed
                  width={15}
                  height={15}
                  alt={userInfo.selectedCoinType}
                />
                <p className="text-black dark:text-white">
                  {info.payoutAmount !== undefined
                    ? info.payoutAmount.toString().slice(0, 6)
                    : "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end md:col-span-1">
                <div className="flex items-center justify-center gap-2">
                  <div></div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={`/default/images/currency/${info.currencyCode}.png`} // Adjust path and naming if needed
                      width={15}
                      height={15}
                      alt={userInfo.selectedCoinType}
                    />
                    <p className="text-black dark:text-white">
                      {info.income !== undefined
                        ? info.income.toString().slice(0, 6)
                        : "N/A"}
                    </p>
                  </div>
                  {/* SVG icons or other elements */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default AffiliateTable;
