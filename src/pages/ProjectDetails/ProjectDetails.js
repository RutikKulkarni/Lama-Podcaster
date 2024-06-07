import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = ({ user }) => {
  const { projectName } = useParams();
  const project = JSON.parse(localStorage.getItem(user)).find(
    (p) => p.name === projectName
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
      <p>Podcast Upload Flow</p>
        <ul>
          <li className={styles.active}>
            <span className={styles.circle}>1</span> Project Details
          </li>
          <li>
            <span className={styles.circle}>2</span> Weight Configuration
          </li>
          <li>
            <span className={styles.circle}>3</span> Deployment
          </li>
          <li>
            <span className={styles.circle}>4</span> Pricing
          </li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> /{" "}
          {projectName}
        </nav>
        <h1>{project.name}</h1>
        <p>{project.episodeName}</p>
        <p>Created: {new Date(project.creationTime).toLocaleString()}</p>
      </main>
    </div>
  );
};

export default ProjectDetails;
