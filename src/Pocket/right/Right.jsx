import React from "react";
import styles from "./right.module.css";
import PocketImg from "../../assets/PocketImg.png";
import Lock from "../../assets/lock.png";

function Right() {
  return (
    <div className={styles.rightContainer}>
      <div className={styles.rightSide}>
        <img src={PocketImg} alt="" />
      </div>
      <h1>Pocket Notes</h1>
      <div>
        Send and receive messages without keeping your phone online.
        <br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </div>
      <p className={styles.lockText}>
        <img src={Lock} alt="" className={styles.lock} />
        <span className={styles.endend}>end-to-end encrypted</span>
      </p>
    </div>
  );
}

export default Right;
