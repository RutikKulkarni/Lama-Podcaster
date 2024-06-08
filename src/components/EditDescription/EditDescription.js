import React, { useState } from "react";
import styles from "./EditDescription.module.css";
import { MdOutlineEdit } from "react-icons/md";

const EditDescription = ({ description, onSave, onCancel }) => {
  const [editDescription, setEditDescription] = useState(description);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = () => {
    onSave(editDescription);
    setShowEditButtons(false);
    setIsEditing(false); 
  };

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.title}>Edit Description</h1>
      {isEditing ? (
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className={styles.textarea}
        />
      ) : (
        <p className={styles.description}>{description}</p>
      )}
      {showEditButtons ? (
        <div>
          <button onClick={handleSaveEdit} className={styles.saveButton}>
            Save
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Discard
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setShowEditButtons(true);
              setIsEditing(true);
            }}
            className={styles.editButton}
          >
            <MdOutlineEdit className={styles.editIcon} />Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditDescription;
