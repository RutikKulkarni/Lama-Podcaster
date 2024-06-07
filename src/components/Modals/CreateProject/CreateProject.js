import React, { useState } from "react";
import Modal from "../Modal";
import styles from "./CreateProject.module.css";

function CreateProject({ onClose, user, onCreate }) {
  const [projectName, setProjectName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateProject = () => {
    if (!projectName) {
      setErrorMessage("Project Name is required.");
      return;
    }
    onCreate(projectName);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2>Create New Project</h2>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <button className={styles.modalButtons} onClick={handleCreateProject}>
        Create Project
      </button>
    </Modal>
  );
}

export default CreateProject;
