// src/components/MessageList.js
import React from "react";
import style from "./MessageList.module.css";

//function to create the dp with initials
// const generateInitials = (firstName, lastName) => {
//   if (!firstName || !lastName) return "??";
//   return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
// };

const MessageList = ({ messages }) => {
  return (
    <div className={style.messageList}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${style.message} 
          ${msg.isSender === "You" ? style.sender : style.receiver}`}
        >
          {/* Avatar */}
          <div className={style.avatar}>
            {msg.isSender === "You"
              ? "U".charAt(0) /* Replace with actual user's initials */
              : msg.isSender}
          </div>
          {/* Message */}
          <div className={`${style.message}`}>
            <p> {msg.text} </p>
            {/* <small>{msg.isSender === "You" ? "You" : msg.sender}</small> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
