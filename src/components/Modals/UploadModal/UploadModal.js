import React, { useState } from "react";
import styles from "./UploadModal.module.css";

const UploadModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setErrorMessage("Name is required");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Description is required");
      return;
    }
    onSave(name, description);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Upload</h2>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <div className={styles.modalButtons}>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
