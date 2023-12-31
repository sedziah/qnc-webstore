// components/hero/index.tsx

import Link from "next/link";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.flexContainer}>
        <div className={`${styles.imageContainer} ${styles.mobilePhones}`}>
          <Link href="#">Mobile Phones</Link>
        </div>

        <div className={`${styles.imageContainer} ${styles.computers}`}>
          <Link href="#">Computers</Link>
        </div>
        <div className={`${styles.imageContainer} ${styles.accessories}`}>
          <Link href="#">Accessories</Link>
        </div>
        <div className={`${styles.imageContainer} ${styles.mobile_appliances}`}>
          <Link href="#">Appliances</Link>
        </div>
      </div>

      <div
        className={`${styles.imageContainer} ${styles.fullWidth} ${styles.appliances}`}
      >
        <Link href="#">Appliances</Link>
      </div>
    </div>
  );
}

export default Hero;
