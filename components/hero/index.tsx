// components/hero/index.tsx

import Link from "next/link";
import styles from "./Hero.module.css";
import Image from "next/image";
import Stack from "@mui/material/Stack";

function Hero() {
  //Hero Images
  const hero_accesories = "/images/hero/hero_accessories.png";
  const hero_computers = "/images/hero/hero_computers.png";
  const hero_appliances = "/images/hero/hero_appliances.png";
  const hero_mobile_phone = "/images/hero/hero_mobile_phone.png";

  return (
    <div className={styles.heroSection}>
      <div className={styles.flexContainer}>
        <div className={`${styles.imageContainer} ${styles.mobilePhones}`}>
          Mobile Phones
        </div>
        <div className={`${styles.imageContainer} ${styles.computers}`}>
          Computer
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
