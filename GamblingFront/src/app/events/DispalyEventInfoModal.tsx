import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/AppContext";
import { EventsInfo } from "@/types/eventListInfo";
import { EventInfo} from "@/types/eventInfo";
import { backendUrl } from "@/anchor/global";
import { env } from "process";

interface VendorName {
  en: string;
}

interface DispalyEventInfoModalProps {
  showModal: boolean;
  eventData: EventsInfo;
  onRequestClose: () => void;
}

const DispalyEventInfoModal: React.FC<DispalyEventInfoModalProps> = ({showModal, eventData, onRequestClose}) => {
  const { accessToken, loginStep } = useAppContext();
  const [eData, setEData] = useState<EventInfo[]>([]);

  const [res, setRes] = useState<number>(1); // Default to mobile case

  
  let i = 1;
  // var ratio:number[];
  let ratio;
  let bonuslist;
  let unit;
  
  useEffect(() => {
    const updateRes = () => {
      if (window.innerWidth >= 768) {
        setRes(2); // Windows (desktop) case
      } else {
        setRes(1); // Mobile case
      }
    };

    // Initial check on load
    updateRes();

    // Add event listener to track window resize
    window.addEventListener('resize', updateRes);

    
    const fetchEventData = async () => {
      if (loginStep < 3)
        return;
      try {
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "X-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GetEvent",
            eventId: eventData.id
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        
        if (eventData.type == "type1"){
          setEData(result.data.type1);
        }
        else if (eventData.type == "type2"){
          setEData(result.data.type2);
        }
        else {
          console.log("No Fetch Data")
        }

      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchEventData(); // Fetch for original games
  }, [eventData]);

  if (!showModal) return null;

  if (eventData.type == "type1" && res == 2){
    return(
      <Modal id="modal" className="modal" isOpen={showModal} onRequestClose={onRequestClose} contentLabel="Example Modal" ariaHideApp={false} style={{overlay: {backgroundColor: "#141a2b", zIndex: 1000}, }}>
      <div className="custom-modal" style={{zIndex: "1000"}}>
        <div className="wallet-adapter-modal-container">
          <div className="custom-modal-wrapper" style={{padding: "25px", backgroundColor: "#141a2b",}}>
  
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4" style={{ marginBottom: "10px", width: "100%" }}>
              <div className="row">
                <div className="float-left ml-1 w-10 text-center">
                  <p>Rank</p>
                </div>
                
                <div className="float-left ml-5 w-100 text-center">
                  <h3>
                    Name
                  </h3>
                </div>
  
                <div className="float-left ml-5 text-center">
                  <h3>
                    VendorName
                  </h3>
                </div>
  
                <div className="float-left ml-5 w-40 text-center">
                  <h3>
                    GameName
                  </h3>
                </div>
  
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Bet
                  </h3>
                </div>
  
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Payout
                  </h3>
                </div>
  
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Ratio
                  </h3>
                </div>
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Bonus
                  </h3>
                </div>
                
                <div className="ml-10">
                  <button className="wallet-adapter-modal-button-close" style={{ backgroundColor: "#181f33" }} onClick={() => {onRequestClose();}}>
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
               
              </div>
            </div>
  
            
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4">             
              { eData.map((event, index) =>{
                ratio = event.payoutAmount /event.betAmount;
                if (event.bonus){
                  bonuslist = event.bonus.value;
                  unit = event.bonus.currencyCode;
                }
                else{
                  bonuslist = "NO";
                  unit = "";
                }
                               
                return (                  
                  <div key={index} className="flex flex-nowrap overflow-scroll no-scrollbar bg-black border-b-1 mb-2">
                    <div className="ml-1 w-10 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {i++}
                      </p>
                    </div>
                    <div className="ml-5 w-100 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.nickName}
                      </p>
                    </div>
                    <div className="ml-5 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {JSON.parse(event.vendorName).en}
                      </p>
                    </div>
                    <div className="ml-5 w-40 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {JSON.parse(event.gameName).en}
                      </p>
                    </div>
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.betAmount}
                      </p>
                    </div>
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.payoutAmount}
                      </p>
                    </div>
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {ratio.toFixed(2)}
                      </p>
                    </div>
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {bonuslist} {unit}
                      </p>
                    </div>          
                  </div>
                  
                )
                
              })}   
              
            </div>
           
          </div>
        </div>
        <div className="fixed inset-0 z-40 opacity-25"></div>
      </div>
      </Modal>
    )
  }
  else if(eventData.type == "type1" && res == 1){
    return(
      <Modal id="modal" className="modal" isOpen={showModal} onRequestClose={onRequestClose} contentLabel="Example Modal" ariaHideApp={false} style={{overlay: {backgroundColor: "#141a2b", zIndex: 1000}}}>
      <div className="custom-modal" style={{zIndex: "1000"}}>
        <div className="wallet-adapter-modal-container">
          <div className="custom-modal-wrapper" style={{padding: "25px", backgroundColor: "#141a2b"}}>
  
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4" w-100 style={{ marginBottom: "10px"}}>
              <div className="row">
                <div className="float-left ml-1 w-10 text-center">
                  <h3>Rank</h3>
                </div>
                
                
  
                <div className="float-left ml-5 w-25 text-center">
                  <h3>
                    UserName
                  </h3>
                </div>

                <div className="float-left ml-1 w-20 text-center">
                  <h3>
                    XXX
                  </h3>
                </div>
  
                
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Bonus
                  </h3>
                </div>
                
                <div className="ml-10">
                  <button className="wallet-adapter-modal-button-close" style={{ backgroundColor: "#181f33" }} onClick={() => {onRequestClose();}}>
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
               
              </div>
            </div>
  
            
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4 w-90">             
              { eData.map((event, index) =>{
                ratio = event.payoutAmount /event.betAmount;
                if (event.bonus){
                  bonuslist = event.bonus.value;
                  unit = event.bonus.currencyCode;
                }
                else{
                  bonuslist = "NO";
                  unit = "";
                }
                               
                return (                  
                  <div key={index} className="flex flex-nowrap overflow-scroll no-scrollbar bg-black border-b-1 mb-2">
                    <div className="ml-1 w-10 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {i++}
                      </p>
                    </div>
                   
                    <div className="ml-5 w-25 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.nickName.slice(0, 10)}...
                      </p>
                    </div>

                    <div className="ml-1 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        ...
                      </p>
                    </div>
                    
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {bonuslist} {unit}
                      </p>
                    </div>          
                  </div>
                  
                )
                
              })}   
              
            </div>
           
          </div>
        </div>
        <div className="fixed inset-0 z-40 opacity-25"></div>
      </div>
      </Modal>
    )
    
  }
  else if (eventData.type == "type2" && res == 2){
    return(
      <Modal
      id="modal"
      className="modal"
      isOpen={showModal}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "#141a2b",
          zIndex: 1000,
        },
      }}
    >
      <div
        className="custom-modal"
        style={{
          zIndex: "1000",
  
        }}
      >
        <div className="wallet-adapter-modal-container">
          <div
            className="custom-modal-wrapper"
            style={{
              padding: "25px",
              backgroundColor: "#141a2b",
            }}
          >
  
            <div
              className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4"
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <div className="row">
                <div className="float-left ml-1 w-10 text-center">
                  <h3>
                    Rank
                  </h3>
                </div>
                <div className="float-left ml-5 w-100 text-center">
                  <h3>
                    UserCode
                  </h3>
                </div>
               
  
                <div className="float-left ml-5 w-50 text-center">
                  <h3>
                    Bet
                  </h3>
                </div>
  
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Payout
                  </h3>
                </div>
               
                
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Bonus
                  </h3>
                </div>
                
                <div className="ml-10">
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
            </div>
  
            
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4">
             
              
              { eData.map((event, index) =>{
                ratio = event.payoutAmount /event.betAmount;
                if (event.bonus){
                  bonuslist = event.bonus.value;
                  unit = event.bonus.currencyCode;
                }
                else{
                  bonuslist = "NO";
                  unit = "";
                }
  
                return (
                  <div  key={index} className="flex flex-nowrap overflow-scroll no-scrollbar bg-black border-b-1 mb-2">
                    <div className="ml-1 w-10 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {i++}
                      </p>
                    </div>

                    <div className="ml-1 w-100 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.nickName}
                      </p>
                    </div>
                    
                    <div className="ml-5 w-50 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.betAmount}
                      </p>
                    </div>
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.payoutAmount}
                      </p>
                    </div>

                   
                    
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {bonuslist} {unit}
                      </p>
                    </div>
                    
                  </div>
                )
                
              })}   
              
            </div>
           
          </div>
        </div>
        <div className="fixed inset-0 z-40 opacity-25"></div>
      </div>
    </Modal>
    )
  }
  else if (eventData.type == "type2" && res == 1){
    return(
      <Modal id="modal" className="modal" isOpen={showModal} onRequestClose={onRequestClose} contentLabel="Example Modal" ariaHideApp={false} style={{overlay: {backgroundColor: "#141a2b", zIndex: 1000}}}>
      <div className="custom-modal" style={{zIndex: "1000"}}>
        <div className="wallet-adapter-modal-container">
          <div className="custom-modal-wrapper" style={{padding: "25px", backgroundColor: "#141a2b"}}>
  
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4" w-100 style={{ marginBottom: "10px"}}>
              <div className="row">
                <div className="float-left ml-1 w-10 text-center">
                  <h3>Rank</h3>
                </div>
                
                
  
                <div className="float-left ml-5 w-45 text-center">
                  <h3>
                    UserName
                  </h3>
                </div>
  
                
                <div className="float-left ml-5 w-20 text-center">
                  <h3>
                    Bonus
                  </h3>
                </div>
                
                <div className="ml-10">
                  <button className="wallet-adapter-modal-button-close" style={{ backgroundColor: "#181f33" }} onClick={() => {onRequestClose();}}>
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
               
              </div>
            </div>
  
            
            <div className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4 w-90">             
              { eData.map((event, index) =>{
                ratio = event.payoutAmount /event.betAmount;
                if (event.bonus){
                  bonuslist = event.bonus.value;
                  unit = event.bonus.currencyCode;
                }
                else{
                  bonuslist = "NO";
                  unit = "";
                }
                               
                return (                  
                  <div key={index} className="flex flex-nowrap overflow-scroll no-scrollbar bg-black border-b-1 mb-2">
                    <div className="ml-1 w-10 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {i++}
                      </p>
                    </div>
                   
                    <div className="ml-5 w-70 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {event.nickName.slice(0, 10)}...
                      </p>
                    </div>
                    
                    <div className="ml-5 w-20 text-center">
                      <p className="truncate  text-white dark:text-white">
                        {bonuslist} {unit}
                      </p>
                    </div>          
                  </div>
                  
                )
                
              })}   
              
            </div>
           
          </div>
        </div>
        <div className="fixed inset-0 z-40 opacity-25"></div>
      </div>
      </Modal>
    )
  } 
  else {
    return(
      <div>NO Data Coming</div>
    )
  }
  
};

export default DispalyEventInfoModal;
