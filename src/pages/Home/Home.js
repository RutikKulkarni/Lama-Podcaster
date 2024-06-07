import React, { useState } from "react";
import styles from "./Home.module.css";
import projectImage from "../../assets/Home-img.png";
import CreateProjectButton from "../../components/Buttons/CreateProject/createProject";
import { MdAddCircle } from "react-icons/md";
import CreateProject from "../../components/Modals/CreateProject/CreateProject";
import { createProject } from "../../utility/createProject "; 
import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateUserClick = () => {
    if (!user) {
      setShowMessage(true);
    } else {
      setShowCreateProjectModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCreateProjectModal(false);
  };

  const handleCreateProject = (projectName) => {
    createProject(user, projectName);
    navigate("/projects");
    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create the project</h1>
      <img src={projectImage} alt="Project Image" className={styles.image} />
      <p className={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <CreateProjectButton
        className={styles.button}
        onClick={handleCreateUserClick}
      >
        {" "}
        <MdAddCircle className={styles.plusIcon} /> Create New Project{" "}
      </CreateProjectButton>
      {showMessage && !user && (
        <p className={styles.message}>Please log in to create a project.</p>
      )}
      {showCreateProjectModal && (
        <CreateProject
          onClose={handleCloseModal}
          user={user}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
};

export default Home;
