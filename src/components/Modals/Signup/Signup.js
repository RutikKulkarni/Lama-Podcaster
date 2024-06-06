import React, { useState } from "react";
import styles from "../Modals.module.css";
import Card from "../../Card/Card";

function SignupModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    // Retrieve existing user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    // Check if username or email already exist
    if (userData) {
      if (userData.username === username) {
        setErrorMessage("Username already exists.");
        return;
      }
      if (userData.email === email) {
        setErrorMessage("Email already exists.");
        return;
      }
    }
    // Save new user data to local storage
    localStorage.setItem(
      "userData",
      JSON.stringify({ username, email, password })
    );
    onClose();
    // Show signup success popup
    window.alert("Signup successful!");
  };

  return (
    <div className={styles.modal}>
      <Card>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Sign Up</h2>
            <span className={styles.close} onClick={onClose}>
              &times;
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          <button className={styles.modalbuttons} onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </Card>
    </div>
  );
}

export default SignupModal;
