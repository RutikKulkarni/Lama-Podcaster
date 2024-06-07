import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProject from "../../components/Modals/CreateProject/CreateProject";
import { createProject } from "../../utility/createProject "; // Import the utility function

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedProjects = JSON.parse(localStorage.getItem(user)) || [];
    setProjects(fetchedProjects);
  }, [user]);

  const handleCreateProject = (projectName) => {
    // Use the utility function to create and store the project
    const updatedProjects = createProject(user, projectName);
    setProjects(updatedProjects);
    setShowCreateProjectModal(false);
  };

  const openCreateProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const closeCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  return (
    <div>
      <h1>Projects</h1>
      <button onClick={openCreateProjectModal}>Create New Project</button>
      {projects.length === 0 ? (
        <p>No projects available. Create a new project to get started!</p>
      ) : (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      )}

      {showCreateProjectModal && (
        <CreateProject
          onClose={closeCreateProjectModal}
          user={user}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
};

export default Projects;
