import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppContext } from "../../hooks/AppContext";
import { EventsInfo } from "@/types/eventListInfo";
import { EventInfo} from "@/types/eventInfo";
import { backendUrl } from "@/anchor/global";
// Define the WalletModal component

interface VendorName {
  en: string;
}

interface DispalyEventInfoModalProps {
  showModal: boolean;
  eventData: EventsInfo;
  onRequestClose: () => void;
}
const DispalyEventInfoModal: React.FC<DispalyEventInfoModalProps> = ({
  showModal,
  eventData,
  onRequestClose,
}) => {
  // const {siteInfo, loginStep } = useAppContext();
  const { accessToken, userInfo, loginStep } = useAppContext();
  const [eData, setEData] = useState<EventInfo[]>([]);

  
  useEffect(() => {
    const fetchEventData = async () => {
      if (loginStep < 3)
        return;
      try {
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "X-Access-Token": accessToken,
            "Content-Type": "apmxication/json",
          },
          body: JSON.stringify({
            method: "GetEvent",
            eventId: eventData.id
          }),
        });

        console.log(eventData.id)

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
       
        console.log(result.data.type1);
        setEData(result.data.type1)
       
        

      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchEventData(); // Fetch for original games
  }, []);

  if (!showModal) return null;
  return(
    <Modal id="modal" className="modal" isOpen={showModal} style={{overlay: {backgroundColor: "#141a2b", zIndex: 1000 }}}>
             
             <div id="event" className="fixed top-50 right-110 left-100 bg-sky-500/20 rounded-lg overflow-hidden z-1000 shadow-2xl" style={{width : "65rem", display : "block"}}>
      <div className="flex flex-nowrap overflow-scroll no-scrollbar text-white mt-3 mb-1 ml-10 mr-10">
        <div className="w-50">rank</div>
        <div className="w-100">gameCode</div>
        <div className="w-100">vendorCode</div>
        <div className="w-100">betAmount</div>
        <div className="w-100">payoutAmount</div>
        <div className="w-1">
              <button
                className="wallet-adapter-modal-button-close"
                style={{ backgroundColor: "#181f33" }}
                onClick={() => {
                  onRequestClose();
                }}
              >
                <svg width={14} height={14}>
                  <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                </svg>
              </button>
        </div>                    
      </div>
      {eData.map((event, index) => {
              return (
          <div className="flex flex-nowrap overflow-scroll no-scrollbar text-white">
            <div className="w-50">{event.rank}</div>
            <div className="w-100">{event.gameCode}</div>
            <div className="w-100">{event.vendorCode}</div>
            <div className="w-100">{event.betAmount}</div>
            <div className="w-100">{event.payoutAmount}</div>
          </div>
          )
          })}
    </div>
    
  </Modal>
    
  )
};

export default DispalyEventInfoModal;
