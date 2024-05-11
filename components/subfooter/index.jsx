import styles from './SubFooter.module.css';

function SubFooter() {
  return (
    <footer className={styles.container}>
      <div className={styles.subFooter}>
        <p>©2024 QnC. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default SubFooter;
