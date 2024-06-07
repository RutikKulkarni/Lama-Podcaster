import React, { useState } from "react";
import Modal from "../Modal";
import styles from "./Signup.module.css";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

function SignupModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    if (!username || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
      setErrorMessage("Username or Email already exists.");
      return;
    }

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    onClose();
    window.alert("Signup successful!");
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2>Sign Up</h2>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
    </Modal>
  );
}

export default SignupModal;
