import React, { useContext, useState, useEffect } from "react";
import styles from "./left.module.css";
import { ChatContext } from "../../Context/ChatProvider";
import Pop from "../popUp/Pop";

function Left({ onGroupClick }) {
  const { setChat } = useContext(ChatContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const LOCAL_STORAGE_KEY_PREFIX = "groupData";
  const CREATED_GROUPS_KEY = "createdGroups";
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 900);

  const saveCreatedGroups = (groupNames) => {
    localStorage.setItem(CREATED_GROUPS_KEY, JSON.stringify(groupNames));
  };

  const loadCreatedGroups = () => {
    const storedGroups =
      JSON.parse(localStorage.getItem(CREATED_GROUPS_KEY)) || [];
    setGroups(storedGroups);
  };

  const handleCreateGroupClick = () => {
    setShowPopUp(true);
  };

  const handleGroupCreate = (newGroupData) => {
    const { groupName, groupColor } = newGroupData;
    if (
      !groupName ||
      groupName.trim() === "" ||
      groupColor === "defaaultColor"
    ) {
      return;
    } else {
      const newGroup = {
        name: groupName,
        color: groupColor,
      };
      const updatedGroups = [...groups, newGroup];

      setGroups(updatedGroups);
      saveCreatedGroups(updatedGroups);

      localStorage.setItem(
        LOCAL_STORAGE_KEY_PREFIX + newGroup.name,
        JSON.stringify({ messages: [] })
      );

      setShowPopUp(false);
    }
  };
  const handleGroupClick = (groupName) => {
    onGroupClick(groupName);
    setChat(groupName);
    setSelectedGroup(groupName);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    loadCreatedGroups();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.leftSide}>
      <div className={styles.contentContainer}>
        <p className={styles.pocNotes}> Pocket Notes</p>
        <button className={styles.createBtn} onClick={handleCreateGroupClick}>
          {" "}
          + Create Notes group
        </button>
      </div>
      <div className={styles.groups}>
        {groups.map((group, index) => (
          <div
            key={index}
            // className={styles.grp1}
            onClick={() => handleGroupClick(group.name)}
            className={
              isMobileView
                ? styles.grp1
                : group.name === selectedGroup
                ? styles.selectedGroup
                : styles.grp1
            }
          >
            <div
              className={styles.groupColor}
              style={{ backgroundColor: group.color }}
            >
              <span className={styles.grpNme}>
                {group.name && group.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            {group.name === selectedGroup && !isMobileView}

            <p className={styles.note1}>{group.name}</p>
          </div>
        ))}
      </div>

      {showPopUp && (
        <div className="overlay" onClick={handleOverlayClick}>
          <Pop
            isOpen={showPopUp}
            onGroupCreate={handleGroupCreate}
            closeModal={() => setShowPopUp(false)}
          />
        </div>
      )}
    </div>
  );
}
export default Left;
