import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const { projectName } = useParams();

  return (
    <aside className={styles.sidebar}>
      <p>Podcast Upload Flow</p>
      <ul>
        <li
          className={
            location.pathname.includes("/projects") ? styles.active : ""
          }
        >
          {projectName ? (
            <Link to={`/projects/${projectName}`} className={styles.link}>
              <span className={styles.circle}>1</span> Project Details
            </Link>
          ) : (
            <Link to="/projects" className={styles.link}>
              <span className={styles.circle}>1</span> Projects
            </Link>
          )}
        </li>
        <li
          className={
            location.pathname.includes("/WeightConfiguration")
              ? styles.active
              : ""
          }
        >
          <Link to="/WeightConfiguration" className={styles.link}>
            <span className={styles.circle}>2</span> Widget Configurations
          </Link>
        </li>
        <li>
          <span className={styles.circle}>3</span> Deployment
        </li>
        <li>
          <span className={styles.circle}>4</span> Pricing
        </li>
        <li
          className={
            location.pathname.includes("/Setting") ? styles.active : ""
          }
        >
          <Link to="/Setting" className={styles.link}>
            <span className={styles.circleforsetting}>
              <IoSettingsOutline className={styles.settingIcon} />
            </span>{" "}
            Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
