import React, { useContext, useState } from "react";
import Left from "../Pocket/left/Left";
import Right from "../Pocket/right/Right";
import { ChatContext } from "../Context/ChatProvider.jsx";
import Chats from "../Pocket/chats/Chats";

function Group() {
  const { chat } = useContext(ChatContext);
  const [currentChat, setCurrentChat] = useState(chat);

  const handleArrowClick = () => {
    setCurrentChat(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        maxHeight: "100vh",
        overflow: "hidden",
        justifyContent: "space-between",
      }}
    >
      <Left onGroupClick={setCurrentChat} />
      {currentChat ? (
        <Chats groupName={currentChat} onArrowClick={handleArrowClick} />
      ) : (
        <Right />
      )}
    </div>
  );
}
export default Group;
