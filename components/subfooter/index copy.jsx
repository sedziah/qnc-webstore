import React from "react";
import styles from "./SubFooter.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function SubFooter() {
  return (
    <footer className={styles.container}>
      <div className={styles.desktopSubFooter}>
        <span>©2023 Quality ‘n’ Cheap</span>
        <div className={styles.icons}>
          <span>Follow us</span>
          <TwitterIcon />
          <InstagramIcon />
          <FacebookIcon />
        </div>
      </div>

      <div className={styles.mobileSubFooter}>
        <span>©2023 Quality ‘n’ Cheap</span>
        <div className={styles.icons}>
          <span>Follow us</span>
          <TwitterIcon />
          <InstagramIcon />
          <FacebookIcon />
        </div>
      </div>

      <div className={styles.tabletSubFooter}>
        <span>©2023 Quality ‘n’ Cheap</span>
        <div className={styles.icons}>
          <span>Follow us</span>
          <TwitterIcon />
          <InstagramIcon />
          <FacebookIcon />
        </div>
      </div>
    </footer>
  );
}

export default SubFooter;
