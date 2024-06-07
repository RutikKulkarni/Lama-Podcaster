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

    if (projectName.length > 20) {
      setErrorMessage("Project Name cannot be more than 20 characters.");
      return;
    }

    onCreate(projectName);
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setProjectName(e.target.value);
    if (e.target.value.length <= 20) {
      setErrorMessage("");
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
          onChange={handleChange}
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
