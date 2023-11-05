import React from "react";
import { useState } from "react";
import styles from "./pop.module.css";
import ReactModal from "react-modal";

function Pop({ isOpen, onGroupCreate, closeModal }) {
  const [groupData, setGroupData] = useState({
    groupName: "",
    groupColor: "defaultColor",
  });

  const [selectedColor, setSelectedColor] = useState("defaultColor");

  const popUpClass = isOpen ? "popWrapper showPopup" : "popWrapper";

  const handleGroupNameChange = (e) => {
    const updatedGroupData = { ...groupData, groupName: e.target.value };
    setGroupData(updatedGroupData);
  };

  const handleGroupColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleCreateGroup = () => {
    const updatedGroupData = { ...groupData, groupColor: selectedColor };
    onGroupCreate(updatedGroupData);

    closeModal();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Create Notes Group Popup"
      className={popUpClass}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <div className={styles.popWrapper}>
        <p className={styles.noteGrp}>Create New Notes group</p>
        <div className={styles.grpName}>
          <p>Group Name</p>
          <input
            type="text"
            placeholder="Enter your group name...."
            className={styles.inputField}
            value={groupData.groupName}
            onChange={handleGroupNameChange}
          />
        </div>
        <div className={styles.grpColor} value={handleGroupColorChange}>
          <p>Choose colour</p>
          <div
            className={styles.div1}
            onClick={() => handleGroupColorChange("#B38BFA")}
          ></div>
          <div
            className={styles.div2}
            onClick={() => handleGroupColorChange("#FF79F2")}
          ></div>
          <div
            className={styles.div3}
            onClick={() => handleGroupColorChange("#43E6FC")}
          ></div>
          <div
            className={styles.div4}
            onClick={() => handleGroupColorChange("#F19576")}
          ></div>
          <div
            className={styles.div5}
            onClick={() => handleGroupColorChange("#0047FF")}
          ></div>
          <div
            className={styles.div6}
            onClick={() => handleGroupColorChange("#6691FF")}
          ></div>
        </div>
        <button className={styles.button} onClick={handleCreateGroup}>
          Create
        </button>
      </div>
    </ReactModal>
  );
}
export default Pop;
