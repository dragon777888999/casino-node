import { useEffect, useState } from "react";
import Image from "next/image";
// import DispalyGameInfoModal from "./DispalyGameInfoModal";
// Adjust import as needed
import { useAppContext } from "@/hooks/AppContext";
import { EventsInfo } from "@/types/eventListInfo";

interface TableAllProps {
  tableData: EventsInfo[];
}

// other language properties..
const EventList: React.FC<TableAllProps> = ({ tableData }) => {
  const { siteInfo } = useAppContext();
  const [selectedRow, setSelectedRow] = useState<EventsInfo | null>(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const EventClick = (info: EventsInfo) => {
    // setSelectedRow(info);
    // openModal();
    alert("Show each events");
  };
  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";
  const currencyDir = siteInfo.themeMap.currency ? siteInfo.themeMap.currency : "default";
  return (
    <>
      <div className="style-table-row rounded-sm   dark:border-strokedark dark:bg-boxdark" style={{ fontSize: "14px", color: "#7b808e" }}>
    {/* Table Header */}
        <div className="style-th-row flex grid grid-cols-6 justify-around border-t border-stroke px-4 py-3 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center" >
            <p>Id </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p>Title</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p>Content</p>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <p>Created At</p>
          </div> */}
          <div className="col-span-1 flex items-center ">
            <p>Status</p>
          </div>
          <div className="col-span-1 flex items-center ">
            <p>Start Time</p>
          </div>
          <div className="col-span-1 flex items-center ">
            <p>End Time</p>
          </div>
          <div className="col-span-1 flex items-center ">
            <p>Type</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p>BonusList</p>
          </div>
        </div>
       
        {tableData.map((info, index) => {
          if (!info.id)
            info.title = `{"en":"unknown"}`;
         
          return (
            <div className={`flex grid grid-cols-6  gap-1 px-4  py-3 sm:grid-cols-8 sm:justify-between md:px-6 2xl:px-7.5`} key={index}>             
              {/* <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">                
                  <p className="text-black dark:text-white">
                    <a
                      type="button"
                      onClick={() => handleRowClick(info)}
                      style={{ cursor: "pointer" }}
                    >                     
                    </a>
                  </p>
                </div>
              </div> */}
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white" onClick={() => EventClick(info)}>
                  {info.id}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.title}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.content}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.status}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.startTime.toDateString()}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.endTime.toDateString()}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  {info.type}
                </p>
              </div>
              <div className="col-span-1 hidden items-center justify-center md:flex">
                <p className="truncate  text-black dark:text-white">
                  
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* {selectedRow && (
        <DispalyGameInfoModal
          showModal={showModal}
          gameData={selectedRow}
          onRequestClose={closeModal}
        />
      )} */}
    </>
  );
};

export default EventList;
