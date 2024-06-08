import React from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Cards/Card/Card";
import styles from "./ProjectDetails.module.css";
import YoutubeImg from "../../assets/Youtube.png";
import SpotifyImg from "../../assets/Spotify.png";
import rssImg from "../../assets/rss.png";
import circleImg from "../../assets/Circle.png";

const ProjectDetails = ({ user }) => {
  const { projectName } = useParams();
  const storedProjects = JSON.parse(localStorage.getItem(user));
  const project = storedProjects
    ? storedProjects.find((p) => p.name === projectName)
    : null;

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
        <h1 className={styles.title}>Upload</h1>
        <div className={styles.cardsContainer}>
          <Card imgSrc={YoutubeImg} title="Upload Youtube Video" />
          <Card imgSrc={SpotifyImg} title="Upload Spotify Podcast" />
          <Card imgSrc={rssImg} title="Upload from RSS Feed" />
          <Card imgSrc={circleImg} title="Upload Media or Text" />{" "}
        </div>
        <div className={styles.widgetBox}>
          <p>All files are processed! Your widget is ready to go!</p>
          <button className={styles.tryButton}>Try it out!</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Upload Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{/* Insert table rows here */}</tbody>
          </table>
        </div>

        {/* <p>Created: {new Date(project.creationTime).toLocaleString()}</p> */}
      </main>
    </div>
  );
};

export default ProjectDetails;
