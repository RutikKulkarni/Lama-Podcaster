import React, { useState } from "react";
import Modal from "../Modal";
import styles from "./Login.module.css";
import { loginUser } from "../../../utility/auth";

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const user = loginUser(email, password);

    if (user) {
      onLogin(user.username, email);
      onClose();
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2>Login</h2>
      </div>
      <div className={styles.inputWrapper}>
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
      <button className={styles.modalbuttons} onClick={handleLogin}>
        Login
      </button>
    </Modal>
  );
}

export default LoginModal;
