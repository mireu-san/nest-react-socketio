import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('http://localhost:3001', {
    pingTimeout: 60000, 
  });

  // https://stackoverflow.com/questions/69008820/websocket-connection-error-insufficient-resources

  useEffect(() => {
    // Subscribe to "message" event
    socket.on('message', handleMessage);

    // Unsubscribe from "message" event when component unmounts
    return () => {
      // socket.off('message', handleMessage);
      socket.disconnect('message', handleMessage);
    };
  }, []);

  const handleMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  const sendMessage = () => {
    socket.emit('message', input);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

