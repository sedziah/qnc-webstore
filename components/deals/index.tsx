// components/deals/index.tsx

import styles from "./deals.module.css";

function DealsHeader() {
  // Placeholder for the countdown logic
  const hours = "04";
  const minutes = "54";
  const seconds = "26";

  return (
    <div className={styles.dealsHeaderContainer}>
      <div className={styles.dealsTitleSection}>
        <div className={styles.dealsTitle}>Today's Deals</div>
        <div className={styles.seeAllLink}>See all →</div>
      </div>
      <div className={styles.dealsSubTitle}>Offers expire in</div>
      <div className={styles.timerContainer}>
        <div className={styles.timeBox}>
          {hours} <span className={styles.timeLabel}>Hrs</span>
        </div>
        <div className={styles.timeBox}>
          {minutes} <span className={styles.timeLabel}>Min</span>
        </div>
        <div className={styles.timeBox}>
          {seconds} <span className={styles.timeLabel}>Sec</span>
        </div>
      </div>
    </div>
  );
}

export default DealsHeader;
