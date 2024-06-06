import React, { useState } from "react";
import styles from "./Home.module.css";
import projectImage from "../../assets/Home-img.png";

const Home = ({ user }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleCreateUserClick = () => {
    if (!user) {
      setShowMessage(true);
    } else {
      // Handle create user logic
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create the project</h1>
      <img src={projectImage} alt="Project Image" className={styles.image} />
      <button
        className={styles.button}
        onClick={handleCreateUserClick}
      >
        Create User
      </button>
      {showMessage && !user && (
        <p className={styles.message}>Please log in to create a project.</p>
      )}
    </div>
  );
};

export default Home;
