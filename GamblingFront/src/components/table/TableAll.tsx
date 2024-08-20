import { useEffect, useState } from "react";
import Image from "next/image";
import DispalyGameInfoModal from "../modal/DispalyGameInfoModal";
// Adjust import as needed
import { useAppContext } from "@/hooks/AppContext";
const displayLength = 6;

interface TableAllProps {
  isAll: boolean;
}
const TableAll = ({isAll}: TableAllProps) => {
  const { socketData, userInfo } = useAppContext();
  const [tableData, setTableData] = useState<InfoList[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // alert(isAll);

  useEffect(() => {
    const buffer = tableData;

    if (socketData) {
      if (buffer.length == displayLength) {
        buffer.pop();
      }

      try {
        const newData: InfoList = JSON.parse(socketData); // Parse the incoming JSON data

        console.log("table", tableData);

        const parsedData: InfoList = {
          ...newData,
          vendorName: JSON.parse(newData.vendorName),
          gameName: JSON.parse(newData.gameName),
        };
        console.log("new", parsedData);

        if (!isAll) {
          // isAll true:: get all data; false :: get only userdata
          if (parsedData.userCode == userInfo?.userCode)
            buffer.unshift(parsedData);
        } else {
          buffer.unshift(parsedData);
        }

        setTableData(buffer);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [socketData]);
  const handleRowClick = (info: InfoList) => {
    setSelectedRow(info);
    openModal();
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        {/* Table Header */}
        <div className="flex grid grid-cols-6 justify-around border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Game Name</p>
          </div>
          <div className="col-span-1 hidden items-center md:flex">
            <p className="font-medium">User</p>
          </div>
          <div className="col-span-2 flex hidden items-center justify-center md:flex">
            <p className="font-medium">Bet Amount</p>
          </div>
          <div className="col-span-1 flex hidden items-center justify-center md:flex">
            <p className="font-medium">Multiplier</p>
          </div>
          <div className="col-span-3 flex items-center justify-end md:col-span-2 ">
            <p className="font-medium">Payout</p>
          </div>
        </div>
        {/* Table Rows */}
        {!isAll && tableData.length == 0 && (
          <div>
            <div
              className="flex items-center justify-center"
              style={{ height: "200px" }}
            >
              You have not made any recent bets
            </div>
          </div>
        )}
        {tableData.map((info, index) => (
          <div
            className="flex grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 sm:justify-between md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Render vendor image if you have a URL */}
                {info.vendorName.en && (
                  <div className="h-12.5 w-15 rounded-md">
                    <Image
                      src={`/images/vendor/${info.vendorName.en.replace(/\s+/g, "-").toLowerCase()}.png`} // Adjust path and naming if needed
                      width={60}
                      height={50}
                      alt={info.vendorName.en}
                    />
                  </div>
                )}
                <p className="text-sm text-black dark:text-white">
                  <a
                    type="button"
                    onClick={() => handleRowClick(info)}
                    style={{ cursor: "pointer" }}
                  >
                    {info.gameName.en} {/* Render the English name */}
                  </a>
                  {/* Render the English name or switch based on locale */}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center md:flex">
              <p className="text-sm text-black dark:text-white">
                {info.userCode}
              </p>
            </div>
            <div className="col-span-2 flex hidden items-center justify-center gap-2 md:flex">
              <div>
                <Image
                  src={`/images/currency/${info.currencyCode.toLowerCase()}.png`} // Adjust path and naming if needed
                  width={20}
                  height={20}
                  alt={info.currencyCode}
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {info.betAmount}
              </p>
            </div>
            <div className="col-span-1 flex hidden items-center justify-center md:flex">
              <p className="text-sm text-black dark:text-white">
                {info.payoutAmount.toFixed(2)} X
              </p>
            </div>
            <div className="col-span-3 flex items-center justify-end md:col-span-2">
              <div className="flex items-center justify-center gap-2">
                <div className="">
                  <Image
                    src={`/images/currency/${info.currencyCode.toLowerCase()}.png`} // Adjust path and naming if needed
                    width={20}
                    height={20}
                    alt={info.currencyCode}
                  />
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{
                      color: "#7DD934",
                    }}
                  >
                    {info.payoutAmount.toFixed(2)}
                  </p>
                </div>
                {/* SVG icons or other elements */}
              </div>
            </div>
          </div>
        ))}{" "}
      </div>
      <DispalyGameInfoModal
        showModal={showModal}
        gameData={selectedRow}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default TableAll;
