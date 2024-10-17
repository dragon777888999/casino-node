import { useEffect, useState } from "react";
import Image from "next/image";
import DispalyEventInfoModal from "./DispalyEventInfoModal";
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
    setSelectedRow(info);
    openModal();
  };
  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";
  const currencyDir = siteInfo.themeMap.currency ? siteInfo.themeMap.currency : "default";
  if (!tableData)
    return (<></>);
  return (
    <>
      {tableData.map((info, index) => {
        if (!info.id)
          info.title = `{"en":"unknown"}`;

        if (info.status == 0){
          var status = "~" //pending
        }
        else if(info.status == 1){
          status = "#" //End
        }
        else if (info.status == 2){
          status = "X"  //Cancel
        }
        else {
          status = "Fake"
        }
       
        return (
          <div key={index} onClick={() => EventClick(info)} className="box-border my-5 p-4 rounded-md shadow-2xl cursor-pointer bg-black">
            <div className="text-lg p-1 font-bold">
              {info.title}
            </div>
            <div className="text-md p-2">
              {info.content}
            </div>
            <div className="text-sm p-2">
              <div className="float-left mr-5">{status}</div>
              <div>{info.startTime.toLocaleString()} ~ {info.endTime.toLocaleString()}</div> 
              
            </div>
          </div>
        );
      })}

      {selectedRow && (
        <DispalyEventInfoModal
          showModal={showModal}
          eventData={selectedRow}
          onRequestClose={closeModal}
        />
      )}
    </>
  );
};

export default EventList;
