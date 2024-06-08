import React from "react";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
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

        <li>
            <span className={styles.circleforsetting}><IoSettingsOutline className={styles.settingIcon} /></span> Setting
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
