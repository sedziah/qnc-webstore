// components/hero/index.tsx

import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css"; // Import the CSS module
import Link from "next/link";


// Hero Images
import phones from "../../public/images/hero/hero_mobile_phone.png";
import accessories from "../../public/images/hero/hero_accessories.png";
import computers from "../../public/images/hero/hero_computers.png";
import appliances from "../../public/images/hero/hero_appliances.png";

function Hero() {
  return (
    <div className={styles.heroSection}>
      <Link href="/products/electronics" className={styles.heroLink}>
        <div className={styles.heroContainer}>
          <Image
            src={phones}
            alt="phones"
            layout="responsive"
            className={styles.heroImage}
          />
          <h1 className={styles.heroTitle}>Mobile Phones</h1>
        </div>
      </Link>
      <Link href="/products/computers" className={styles.heroLink}>
        <div className={styles.heroContainer}>
          <Image
            src={computers}
            alt="mobile phones"
            layout="responsive"
            className={styles.heroImage}
          />
          <h1 className={styles.heroTitle}>Computers</h1>
        </div>
      </Link>
      <Link href="/products/accessories" className={styles.heroLink}>
        <div className={styles.heroContainer}>
          <Image
            src={accessories}
            alt="mobile phones"
            layout="responsive"
            className={styles.heroImage}
          />
          <h1 className={styles.heroTitle}>Accessories</h1>
        </div>
      </Link>
      <Link
        href="/products/appliances"
        className={` ${styles.heroLink} ${styles.appliancesContainer}`}
      >
        <div className={styles.heroContainer}>
          <Image
            src={appliances}
            alt="mobile phones"
            layout="responsive"
            className={styles.heroImage}
          />
          <h1 className={styles.heroTitle}>Appliances</h1>
        </div>
      </Link>
    </div>
  );
}

export default Hero;
