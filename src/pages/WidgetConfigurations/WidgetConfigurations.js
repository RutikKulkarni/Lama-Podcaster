import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./WidgetConfigurations.module.css";

const WidgetConfigurations = () => {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("General");

  const routePath = location.pathname.split("/").slice(1).join("/");

  const renderOptions = () => {
    switch (selectedOption) {
      case "Display":
        return (
          <div className={styles.options}>
            <label htmlFor="newName">Primary Color</label>
            <input type="text" id="newName" />
            <label htmlFor="message">Font Color</label>
            <input type="text" id="message" />
          </div>
        );
      case "Advance":
        return (
          <div className={styles.options}>
            <p>You are in Advance option</p>
          </div>
        );
      default:
        return (
          <div className={styles.options}>
            <label htmlFor="name">ChatBot Name</label>
            <input type="text" id="name" />
            <label htmlFor="message">Welcome Message</label>
            <input type="text" id="message" />
            <label htmlFor="inputPlaceholder">Input Placeholder</label>
            <input type="text" id="inputPlaceholder" />
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> / {routePath}
        </div>
        <h1 className={styles.title}>Configuration</h1>
        <div className={styles.optionsMenu}>
          <p
            className={selectedOption === "General" ? styles.active : ""}
            onClick={() => setSelectedOption("General")}
          >
            General
          </p>
          <p
            className={selectedOption === "Display" ? styles.active : ""}
            onClick={() => setSelectedOption("Display")}
          >
            Display
          </p>
          <p
            className={selectedOption === "Advance" ? styles.active : ""}
            onClick={() => setSelectedOption("Advance")}
          >
            Advance
          </p>
        </div>
        {renderOptions()}
      </main>
    </div>
  );
};

export default WidgetConfigurations;
