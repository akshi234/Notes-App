import React, { useEffect, useState, useRef } from "react";
import styles from "./chats.module.css";
import enterBtn from "../../assets/enter.png";
import arrow from "../../assets/arrow.png";

function Chats({ groupName, onArrowClick }) {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      currentDate
    );
    const year = currentDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const saveChatMessages = (groupName, messages) => {
    const chatMessagesData =
      JSON.parse(localStorage.getItem("chatMessagesData")) || {};
    chatMessagesData[groupName] = messages;
    localStorage.setItem("chatMessagesData", JSON.stringify(chatMessagesData));
  };

  // Retrieve chat messages from local storage
  const getChatMessages = (groupName) => {
    const chatMessagesData =
      JSON.parse(localStorage.getItem("chatMessagesData")) || {};
    return chatMessagesData[groupName] || [];
  };

  const handleSubmit = () => {
    if (inputText) {
      const newMessage = {
        time: getCurrentTime(),
        date: getCurrentDate(),
        text: inputText,
      };

      setMessages([...messages, newMessage]);
      saveChatMessages(groupName, [...messages, newMessage]);
      setInputText("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const storedMessages = getChatMessages(groupName);
    setMessages(storedMessages);
  }, [groupName]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatNav}>
        <img
          src={arrow}
          alt=""
          className={styles.arrowImg}
          onClick={onArrowClick}
        />
        <span className={styles.CU}>{groupName.slice(0, 2)}</span>
        <p className={styles.groupTxt}>{groupName}</p>
      </div>
      <div className={styles.msg}>
        {messages.map((messages, index) => (
          <div className={styles.msgPara} key={index}>
            <p className={styles.dateTime}>
              {messages.time} <br /> {messages.date}
            </p>
            <p className={styles.text}>{messages.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputWrapper}>
        <textarea
          type="text"
          placeholder="Enter you text here..."
          className={styles.inputField}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <img
          src={enterBtn}
          alt=""
          className={styles.enterBtn}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
export default Chats;
