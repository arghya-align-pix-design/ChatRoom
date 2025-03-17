// src/components/ChatRoom.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ChatRoom.module.css";
import MessageList from "../MessageList/MessageList";
import InputForm from "../InputForm/InputForm";

const socket = io("http://localhost:4000");

const ChatRoom = ( ) => {
  const location = useLocation();
    const shortName = location.state?.shortName || "Unknown"; // ✅ Extract safely

    console.log("Received shortName:", shortName); // Debug log


  const [messages, setMessages] = useState([]);
  //const senderName=
  //const room = "room1"; // Define the room name here
  // const [newMessage, setNewMessage] = useState('');
  // const [error, setError] = useState('');

  // const maxMessageLength = 255; // Set character limit

    useEffect(() => {
      // Join a specific room (e.g., "room1")
      socket.emit("join room", "room1");


    // Listen for messages from the server
      socket.on("chatmessage", (data) => {
        setMessages((prevMessages) => 
        {
         return [...prevMessages,
           {text:data.text,
          isSender:data.sender === socket.id ? "You" : shortName }];
        }
    );
    });

   // return () => {
    socket.on("disconnect",()=>{
      socket.disconnect();
    })

    return () => {
      socket.off("chatmessage");
    }
      
   // };
  }, []);

  const sendMessage = (msg) => {
    // Emit the message to the server
     const senderInitials =  shortName; 
    //senderName
    // .split(" ")
    // .map((name) => name.charAt(0).toUpperCase())
    // .join("");

    socket.emit("chatmessage", { 
      room:"room1",
       text:msg.toString(),
       sender: senderInitials
      });

      console.log( "Room1 FE", `${msg} `,  );
      console.log(senderInitials);

    // Add the message to the local state immediately
    setMessages((prevMessages) => { return [
      ...prevMessages,
      {text:msg, isSender:"You"}
     ]}
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.head}>Chatroom</h1>
      <MessageList messages={messages} />
      <InputForm onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatRoom;
