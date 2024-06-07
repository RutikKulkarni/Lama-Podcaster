import React, { useMemo } from "react";
import styles from "./ProjectCard.module.css";
import { formatDistanceToNow } from "date-fns";

const ProjectCard = ({
  projectName = "",
  episodeName = "Episode 1",
  creationTime,
}) => {
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    const initials = words.slice(0, 2).map((word) => word[0]);
    return initials.join("").toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ["rgba(126, 34, 206, 1)", "#ffc800", "#007bff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const backgroundColor = useMemo(getRandomColor, []);

  return (
    <div className={styles.card}>
      <div className={styles.square} style={{ backgroundColor }}>
        {getInitials(projectName)}
      </div>
      <div className={styles.projectDetails}>
        <h2>{projectName}</h2>
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
