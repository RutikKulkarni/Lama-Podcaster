import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { TbSmartHome } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { GoProjectRoadmap } from "react-icons/go";
import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";

function Navbar({
  loggedInUser,
  openLoginModal,
  openSignupModal,
  handleLogout,
}) {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
        <p>LAMA.</p>
      </Link>
      <div className={styles.elements}>
        <Link to="/" className={styles.homeElement}>
          <TbSmartHome className={styles.homeIcon} />
          Home
        </Link>
        {loggedInUser && (
          <>
            <Link to="/projects" className={styles.homeElement}>
              <GoProjectRoadmap className={styles.homeIcon} />
              Projects
            </Link>
            <div className={styles.userInfo}>
              <AiOutlineUser className={styles.userIcon} />
              <span>{loggedInUser}</span>
            </div>
            <button className={styles.logout} onClick={handleLogout}>
              <FiLogOut className={styles.logoutIcon} />
            </button>
            <Link to="/Setting">
              <IoSettingsOutline className={styles.settingIcon} />
            </Link>
          </>
        )}
        {!loggedInUser && (
          <>
            <button className={styles.login} onClick={openLoginModal}>
              <FiLogIn className={styles.loginIcon} />
              Login
            </button>
            <button className={styles.signup} onClick={openSignupModal}>
              Signup
            </button>
          </>
        )}
        <div className={styles.homeIcons}>
          <IoMdNotificationsOutline className={styles.notificationIcon} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
