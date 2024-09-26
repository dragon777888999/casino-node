import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newSocket = new WebSocket(url);

    setSocket(newSocket);

    newSocket.addEventListener('message', (event) => {
      setMessage(event.data);
    });

    return () => {
      newSocket.close();
    };
  }, [url]);

  const disconnect = () => {
    if (socket) {
      socket.close();
      setSocket(null);
      setMessage('');
    }
  };

  return { socket, message, disconnect };
};

export default useWebSocket;