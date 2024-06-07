import React from "react";
import styles from "./ProjectCard.module.css";
import { formatDistanceToNow } from "date-fns"; // Using date-fns for formatting time

const ProjectCard = ({
  projectName = "",
  episodeName = "Episode 1",
  creationTime,
}) => {
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={styles.card}>
      <div className={styles.square}>{getInitials(projectName)}</div>
      <div className={styles.projectDetails}>
        <h3>{projectName}</h3>
        <p>{episodeName}</p>
        <p className={styles.creationTime}>
          {creationTime
            ? formatDistanceToNow(new Date(creationTime), { addSuffix: true })
            : "Unknown time"}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
