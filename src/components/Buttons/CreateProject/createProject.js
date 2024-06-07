import React from 'react';
import styles from './createProject.module.css';

const createProjectButton = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default createProjectButton;
