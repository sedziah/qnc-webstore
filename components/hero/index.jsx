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
  var mobileWidth = 331.5;
  var mobileHeight = 195;

  //Desktop Dimensions
  var desktopWidth = 510;
  var desktopHeight = 300;

  //Tablet Dimensions
  var tabletWidth = 331.5;
  var tabletHeight = 195;

  return (
    <div className={styles.container}>
      <div className={styles.desktopHero}>
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
            height={mobileHeight}
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
      <div className={styles.tabletHero}>Hero Table</div>
    </div>
  );
}

export default Hero;
