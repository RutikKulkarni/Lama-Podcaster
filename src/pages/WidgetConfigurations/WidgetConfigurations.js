import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./WidgetConfigurations.module.css";

const WidgetConfigurations = () => {
  const location = useLocation();

  const routePath = location.pathname.split("/").slice(1).join("/");
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> / {routePath}
        </div>
        <h1 className={styles.title}>Configuration</h1>
        <p>All files are processed! Your widget is ready to go!</p>
        <button className={styles.tryButton}>Try it out!</button>
      </main>
    </div>
  );
};

export default WidgetConfigurations;
