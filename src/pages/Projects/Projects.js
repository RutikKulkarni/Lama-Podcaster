import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProject from "../../components/Modals/CreateProject/CreateProject";
import { createProject } from "../../utility/createProject ";
import ProjectCard from "../../components/Cards/ProjectCard/ProjectCard";
import styles from "./Projects.module.css";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchedProjects = JSON.parse(localStorage.getItem(user)) || [];
  //   setProjects(fetchedProjects);
  // }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://lama-podcaster.onrender.com/projects/${user}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [user]);

  const handleCreateProject = async (projectName) => {
    const updatedProjects = await createProject(user, projectName);
    setProjects((prev) => [...prev, updatedProjects]);

    setShowCreateProjectModal(false);
  };

  const openCreateProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const closeCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  const handleProjectClick = (projectName) => {
    navigate(`/projects/${projectName}`);
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.headerContainer}>
        <h1> Projects </h1>{" "}
        <button className={styles.button} onClick={openCreateProjectModal}>
          <MdAddCircle className={styles.plusIcon} /> Create New Project{" "}
        </button>{" "}
      </div>{" "}
      {projects.length === 0 ? (
        <p> No projects available.Create a new project to get started! </p>
      ) : (
        <div className={styles.projectsGrid}>
          {" "}
          {projects?.map((project, index) => (
            <div key={index} onClick={() => handleProjectClick(project.name)}>
              <ProjectCard
                projectName={project.name}
                episodeName={project.episodeName}
                creationTime={project.creationTime}
              />{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
      {showCreateProjectModal && (
        <CreateProject
          onClose={closeCreateProjectModal}
          user={user}
          onCreate={handleCreateProject}
        />
      )}{" "}
    </div>
  );
};

export default Projects;
