import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { useRef } from 'react';
// import SidebarWhole from './Sidebar';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('http://localhost:3001', {
    pingTimeout: 60000,
  });

  // https://stackoverflow.com/questions/69008820/websocket-connection-error-insufficient-resources

  const chatBodyRef = useRef(null);


  useEffect(() => {
    // Subscribe to "message" event
    socket.on('message', handleMessage);

    // Unsubscribe from "message" event when component unmounts
    return () => {
      socket.off('message', handleMessage);
      // socket.disconnect('message', handleMessage);
    };
  }, []);

  const handleMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('message', input);
    setInput('');
  };

  return (
    // <SidebarWhole>
    <ChatWrapper>
    <Sidebar>  
      <SidebarHeader>Telegram</SidebarHeader>
      <SidebarItem active>Chats</SidebarItem>
      <SidebarItem>Contacts</SidebarItem>
      <SidebarItem>Settings</SidebarItem>
    </Sidebar>
    <ChatContainer>
      <ChatHeader>
        <div>Telegram Chat</div>
        <div>Online</div>
      </ChatHeader>
      <ChatBody>
        {messages.map((message, index) => (
          <ChatMessage key={index}>
            {message}
          </ChatMessage>
        ))}
      </ChatBody>
      <ChatInputArea onSubmit={sendMessage}>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <ChatButton>Send</ChatButton>
      </ChatInputArea>
    </ChatContainer>
  </ChatWrapper>
  // </SidebarWhole>
);
};

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
  height: 100%;
  font-family: sans-serif;
`;

const Sidebar = styled.div`
  width: 20%;
  background-color: #0088cc;
  color: white;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
`;

const SidebarItem = styled.div`
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  ${(props) => props.active && `
    background-color: #0077b3;
    font-weight: bold;
  `}

  &:hover {
    background-color: #0077b3;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #0088cc;
  color: white;
  font-size: 20px;
  /* border-radius: 10px; */
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 25px 20px;
  padding-right: 10px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
`;

const ChatInputArea = styled.form`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 15px 20px;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
`;

const ChatButton = styled.button`
  border: none;
  outline: none;
  background-color: #0088cc;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0077b3;
  }
`;

const ChatMessage = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 20px;
  margin-left: 10%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  background: linear-gradient(#43cdf6,#0087fe)
`;

// const ChatMessage = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   margin-bottom: 10px;
//   padding: 20px;
//   box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
// `;