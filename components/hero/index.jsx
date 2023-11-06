import React from "react";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.desktopHero}>Hero Desktop</div>
      <div className={styles.mobileHero}>Hero Mobile</div>
      <div className={styles.tabletHero}>Hero Table</div>
    </div>
  );
}

export default Hero;
