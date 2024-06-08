import React from 'react';
import styles from './Card.module.css';

const Card = ({ imgSrc, title }) => {
  return (
    <div className={styles.card}>
      <div className={styles.square}>
        <img src={imgSrc} alt={title} className={styles.icon} />
      </div>
      <div className={styles.projectDetails}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Card;
