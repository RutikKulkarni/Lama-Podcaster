import React from "react";
import styles from "./ModalCard.module.css";

const ModalCard = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default ModalCard;
