import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Setting.module.css";
import profileImage from "../../assets/user-avatar.png";

const Setting = ({ user }) => {
  //const { username, email } = user;
  const { username, email } = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(username, email, "JSONN");

  const location = useLocation();

  const routePath = location.pathname.split("/").slice(1).join("/");

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.profileContainer}>
        <div className={styles.breadcrumb}>
          <Link to="/"> Home </Link> / {routePath}{" "}
        </div>{" "}
        <h1 className={styles.title}> Account Settings </h1>{" "}
        <div className={styles.cardsContainer}>
          <div className={styles.horizontalContainer}>
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />{" "}
            <div className={styles.userInfo}>
              <h1> {username} </h1>{" "}
              <div className={styles.settingItem}>
                <label htmlFor="username"> Username: </label>{" "}
                <span> {username} </span>{" "}
              </div>{" "}
              <div className={styles.settingItem}>
                <label htmlFor="email"> Email: </label> <span> {email} </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Setting;
