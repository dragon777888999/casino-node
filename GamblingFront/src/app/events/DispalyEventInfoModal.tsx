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
  eventData: EventsInfo[];
  onRequestClose: () => void;
}
const DispalyEventInfoModal: React.FC<DispalyEventInfoModalProps> = ({
  showModal,
  eventData,
  onRequestClose,
}) => {
  // const {siteInfo, loginStep } = useAppContext();
  const { accessToken, userInfo, loginStep } = useAppContext();
  const [eventtData, setEventData] = useState<EventInfo[]>([]);

  useEffect(() => {
    const fetchEventData = async () => {
      if (loginStep < 3)
        return;
      try {

        console.log("events start")

        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "X-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GetEvent",
            currencyCode: userInfo.selectedCoinType
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result.data)
        setEventData(result.data);

      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchEventData(); // Fetch for original games
  }, []);

  
  return(
    <>
      {/* {eventtData.map((event, index) => {
        return (
        
            <Modal id="modal" className="modal" isOpen={showModal} style={{overlay: {backgroundColor: "#141a2b", zIndex: 1000, marginTop : 300 }}}>

              <div className="custom-modal" style={{zIndex: "1000"}}>
              
                  <div
                    className="custom-modal-wrapper"
                    style={{
                      padding: "25px",
                      backgroundColor: "#141a2b",
                      maxWidth: "400px",
                    }}
                  >
                    <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4" style={{ marginBottom: "10px", width: "100%" }}>
                      <div className="row">
                        <h3 style={{fontSize: "18px", fontWeight: "700",  color: "white", }}>Event</h3>
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
                  
                    <div className="BetResult-detail-content">{event.nickName}</div>
                </div>
                <div className="fixed inset-0 z-40 opacity-25"></div>
              </div>

            </Modal>
        
        )
      })} */}


      <Modal id="modal" className="modal" isOpen={showModal} style={{overlay: {backgroundColor: "#141a2b", zIndex: 1000, marginTop : 300 }}}>

        <div className="custom-modal" style={{zIndex: "1000"}}>

            <div
              className="custom-modal-wrapper"
              style={{
                padding: "25px",
                backgroundColor: "#141a2b",
                maxWidth: "400px",
              }}
            >
              <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4" style={{ marginBottom: "10px", width: "100%" }}>
                <div className="row">
                  <h3 style={{fontSize: "18px", fontWeight: "700",  color: "white", }}>Event</h3>
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
            
              <div className="BetResult-detail-content">{event.nickName}</div>
          </div>
          <div className="fixed inset-0 z-40 opacity-25"></div>
        </div>

      </Modal>
    </>
  )

  
};

export default DispalyEventInfoModal;
