// components/hero/index.tsx

import Link from "next/link";
import styles from "./Hero.module.css";

function Hero() {

  return (
    <div className={styles.heroSection}>
      <div className={styles.flexContainer}>
        <div className={`${styles.imageContainer} ${styles.mobilePhones}`}>
          Mobile Phones
        </div>
        <div className={`${styles.imageContainer} ${styles.computers}`}>
          Computers
        </div>
        <div className={`${styles.imageContainer} ${styles.accessories}`}>
          Accessories
        </div>
      </div>

      <div
        className={`${styles.imageContainer} ${styles.fullWidth} ${styles.appliances}`}
      >
        Appliances
      </div>
    </div>
  );
}

export default Hero;
