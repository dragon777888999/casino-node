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
      {tableData.map((info, index) => {
        if (!info.id)
          info.title = `{"en":"unknown"}`;

        if (info.status == 0){
          var status = "Pending"
        }
        else if(info.status == 1){
          status = "End"
        }
        else if (info.status == 2){
          status = "Cancel"
        }
        else {
          status = "Fake"
        }
        
        return (
          <div onClick={() => EventClick(info)} className="box-border my-5 p-4 border-1 rounded-md shadow-2xl shadow-blue-500/50 cursor-pointer">
            <div className="text-center underline">
              {info.title}
            </div>   
            <div className="text-center border-b-1 my-5">
              {info.content}
            </div>
            <div className="columns-2 text-center my-5 border-b-1">
              <div>Start Time: {info.startTime.toLocaleString()}</div>
              <div>End Time: {info.endTime.toLocaleString()}</div>
            </div>    
            <div className="text-center columns-3 my-5">
              <div>
                Status : {status}
              </div>
              <div>
                Created Time : {info.createdAt.toLocaleString()}
              </div>
              <div>
                Bonus List : {info.result}
              </div>
            </div>      
          </div>
        );
      })}

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
