import React from "react";
// import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { TbSmartHome } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
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
      <a href="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
        <p>LAMA.</p>
      </a>
      <div className={styles.elements}>
        <p className={styles.homeElement}>
          <a href="/" className={styles.homeElement}>
            <TbSmartHome className={styles.homeIcon} />
            Home
          </a>
          {loggedInUser ? (
            <>
              <p className={styles.userInfo}>
                <AiOutlineUser className={styles.userIcon} />
                <span>{loggedInUser}</span>
              </p>
              <button className={styles.logout} onClick={handleLogout}>
                <FiLogOut className={styles.logoutIcon} />
              </button>
            </>
          ) : (
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
          <p className={styles.homeIcons}>
            <IoSettingsOutline className={styles.settingIcon} />
            <IoMdNotificationsOutline className={styles.notificationIcon} />
          </p>
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
