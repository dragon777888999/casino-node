import { useEffect, useState, useCallback } from "react";
import { wsEndpoints } from "./wsUrls";

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [data, setMessage] = useState("");

  const connect = useCallback(() => {
    if (socket) {
      console.log("WebSocket connection already exists");
      return;
    }

    console.log("Creating new WebSocket connection to", url);

    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    newSocket.addEventListener("message", (event) => {
      console.log("Received message from WebSocket successfully!");
      setMessage(event.data);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    });

    return () => {
      console.log("Closing WebSocket connection");
      newSocket.close();
    };
  }, [url, socket]);

  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  const disconnect = () => {
    if (socket) {
      console.log("Disconnecting from WebSocket");
      socket.close();
      setSocket(null);
      setMessage("");
    }
  };

  return { socket, data, connect, disconnect };
};

export default useWebSocket;