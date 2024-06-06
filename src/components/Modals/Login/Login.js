import React, { useState } from "react";
import styles from "../Modals.module.css";
import Card from "../../Card/Card";

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.email === email &&
      userData.password === password
    ) {
      onLogin(userData.username);
      onClose();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.modal}>
      <Card>
        <div className={styles.modalHeader}>
          <h2>Login</h2>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
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
        <button className={styles.modalbuttons} onClick={handleLogin}>
          Login
        </button>
      </Card>
    </div>
  );
}

export default LoginModal;
