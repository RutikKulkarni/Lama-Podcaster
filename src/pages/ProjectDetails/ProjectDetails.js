import React from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = ({ user }) => {
  const { projectName } = useParams();
  const storedProjects = JSON.parse(localStorage.getItem(user));
  const project = storedProjects ? storedProjects.find((p) => p.name === projectName) : null;

  if (!storedProjects || !project) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> /{" "}
          {projectName}
        </nav>
        <h1 className={styles.title} >Uplode</h1>
        <p>{project.episodeName}</p>
        <p>Created: {new Date(project.creationTime).toLocaleString()}</p>
      </main>
    </div>
  );
};

export default ProjectDetails;
