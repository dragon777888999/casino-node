import React, { useState, useEffect } from "react";

const WebSocketComponent = ({ websocketUrl }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [message, setMessage] = useState("");

  // Initialize WebSocket
  const ws = new WebSocket(websocketUrl);

  ws.onopen = () => {
    console.log("WebSocket connection established.");
    // You can send a message or perform other actions once connected
  };
  // Define the onmessage event handler
  ws.onmessage = async (e) => {
    try {
      const responseObj = JSON.parse(e.data);
      console.log("here socket");
      console.log(responseObj);
      if (responseObj.signed !== null && responseObj.signed !== undefined) {
        if (responseObj.signed) {
          setMessage("Your payment was successful");
          console.log(message);
        } else {
          setMessage("Your payment failed");
        }
      }
      console.log(responseObj);
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  };

  // Clean up the WebSocket connection when the component unmounts
  return () => {
    ws.close();
  };
};

export default WebSocketComponent;
