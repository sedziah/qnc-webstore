import React from "react";
import styles from "./Hero.module.css";
import { Stack } from "@mui/material";
import Image from "next/image";

function Hero() {
  //Hero Images
  const hero_accesories = "/images/hero/hero_accessories.png";
  const hero_computers = "/images/hero/hero_computers.png";
  const hero_appliances = "/images/hero/hero_appliances.png";
  const hero_mobile_phone = "/images/hero/hero_mobile_phone.png";

  //Mobile Dimensions
  var mobileWidth = 200;
  var mobileHeight = 100;

  //Desktop Dimensions
  var desktopWidth = 400;
  var desktopHeight = 210;

  //Tablet Dimensions
  var tabletWidth = 331.5;
  var tabletHeight = 195;

  return (
    <div className={styles.container}>
      <div className={`${styles.categoryBox} ${styles.box1}`}>
        Mobile Phones
      </div>
      <div className={`${styles.categoryBox} ${styles.box2}`}>Computers</div>
      <div className={`${styles.categoryBox} ${styles.box3}`}>Accessories</div>
      <div
        className={`${styles.categoryBox} ${styles.fullWidth} ${styles.box4}`}
      >
        Appliances
      </div>

      {/* Mobile View */}
      <div className={styles.mobileHero}>
        <Stack spacing={1}>
          <Image
            src={hero_mobile_phone}
            alt="QnC Logo"
            width={mobileWidth}
            height={mobileHeight}
          ></Image>
          <Image
            src={hero_computers}
            alt="QnC Logo"
            width={mobileWidth}
            height={mobileHeight}
            t
          ></Image>

          <Image
            src={hero_accesories}
            alt="QnC Logo"
            width={mobileWidth}
            height={mobileHeight}
          ></Image>

          <Image
            src={hero_appliances}
            alt="QnC Logo"
            width={mobileWidth}
            height={mobileHeight}
          ></Image>
        </Stack>
      </div>
      <div className={styles.tabletHero}>
        <Stack spacing={1}>
          <Image
            src={hero_mobile_phone}
            alt="QnC Logo"
            width={desktopWidth}
            height={desktopHeight}
          ></Image>
          <Image
            src={hero_computers}
            alt="QnC Logo"
            width={desktopWidth}
            height={desktopHeight}
          ></Image>

          <Image
            src={hero_accesories}
            alt="QnC Logo"
            width={desktopWidth}
            height={desktopHeight}
          ></Image>

          <Image
            src={hero_appliances}
            alt="QnC Logo"
            width={desktopWidth}
            height={desktopHeight}
          ></Image>
        </Stack>
      </div>
    </div>
  );
}

export default Hero;
