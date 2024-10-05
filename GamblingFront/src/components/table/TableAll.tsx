import { useEffect, useState } from "react";
import Image from "next/image";
import DispalyGameInfoModal from "../modal/DispalyGameInfoModal";
// Adjust import as needed
import { useAppContext } from "@/hooks/AppContext";
import { WagerInfo } from "@/types/gameListInfo";

const displayLength = 10;
interface TableAllProps {
  tableData: WagerInfo[];
}

// other language properties..
const TableAll: React.FC<TableAllProps> = ({ tableData }) => {
  const { siteInfo } = useAppContext();
  const [selectedRow, setSelectedRow] = useState<WagerInfo | null>(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRowClick = (info: WagerInfo) => {
    setSelectedRow(info);
    openModal();
  };
  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";
  const currencyDir = siteInfo.themeMap.currency ? siteInfo.themeMap.currency : "default";
  return (
    <>
      {/* <div
        className="ktable-row rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark"
        style={{ fontSize: "14px", color: "#7b808e" }}
      > */}
      <div
        className="style-table-row rounded-sm   dark:border-strokedark dark:bg-boxdark"
        style={{ fontSize: "14px", color: "#7b808e" }}
      >
        {/* Table Header */}
        <div className="style-th-row flex grid grid-cols-6 justify-around border-t border-stroke px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p>Game </p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:flex">
            <p>User</p>
          </div>
          <div className="col-span-2 flex hidden items-center justify-center md:flex">
            <p>Bet Amount</p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:flex">
            <p>Multiplier</p>
          </div>
          <div className="col-span-3 flex items-center justify-end md:col-span-2 ">
            <p>Payout</p>
          </div>
        </div>
        {/* Table Rows */}
        {/* {!isAll && tableData.length == 0 && (
          <div>
            <div
              className="flex items-center justify-center"
              style={{ height: "200px" }}
            >
              You have not made any recent bets
            </div>
          </div>
        )} */}
        {tableData.map((info, index) => {
          if (!info.vendorName)
            info.vendorName = `{"en":"unknown"}`;
          if (!info.gameName)
            info.gameName = `{"en":"unknown"}`;

          return (
            <div
              className={`flex grid grid-cols-6  gap-1 px-4  py-3 sm:grid-cols-8 sm:justify-between md:px-6 2xl:px-7.5`}
              key={index}
            >
              {/* <div
            className={`${style}-tbody-row flex grid grid-cols-6  gap-1 px-4  py-3 sm:grid-cols-8 sm:justify-between md:px-6 2xl:px-7.5`}
            key={index}
          > */}
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Render vendor image if you have a URL */}
                  {/* {info.gameName.en && (
                  <div className="h-5 w-5 rounded-md">
                    <Image src={""} width={60} height={50} alt={"info"} />
                  </div>
                )} */}
                  <p className="text-black dark:text-white">
                    <a
                      type="button"
                      onClick={() => handleRowClick(info)}
                      style={{ cursor: "pointer" }}
                    >
                      {JSON.parse(info.gameName).en}
                      {/* Render the English name */}
                    </a>
                    {/* Render the English name or switch based on locale */}
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.nickName}
                </p>
              </div>
              <div className="col-span-2 flex hidden items-center justify-center gap-2 md:flex">
                <div>
                  <Image
                    src={`/${currencyDir}/images/currency/${info.currencyCode}.png`} // Adjust path and naming if needed
                    width={20}
                    height={20}
                    alt={info.currencyCode}
                  />
                </div>
                <p className="text-black dark:text-white">{info.betAmount}</p>
              </div>
              <div className="col-span-1 flex hidden items-center justify-center md:flex">
                <p className=" text-black dark:text-white">
                  {info.payoutAmount !== 0
                    ? (info.payoutAmount / info.betAmount).toFixed(2)
                    : "0.00"}{" "}
                  x
                </p>
              </div>
              <div className="col-span-3 flex items-center justify-end md:col-span-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="">
                    <Image
                      src={`/${currencyDir}/images/currency/${info.currencyCode}.png`} // Adjust path and naming if needed
                      width={20}
                      height={20}
                      alt={info.currencyCode}
                    />
                  </div>
                  <div>
                    <p
                      style={info.payoutAmount >= info.betAmount ? { color: "#7DD934" }:{ color: "gray" }}
                    >
                      {info.payoutAmount.toFixed(2)}
                    </p>
                  </div>
                  {/* SVG icons or other elements */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedRow && (
        <DispalyGameInfoModal
          showModal={showModal}
          gameData={selectedRow}
          onRequestClose={closeModal}
        />
      )}
    </>
  );
};

export default TableAll;
