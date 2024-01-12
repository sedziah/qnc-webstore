import React from "react";
import styles from "./SubFooter.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function SubFooter() {
  return (
    <footer className={styles.container}>
      <div className={styles.subFooter}>
        <div>
          <p> ©2023 QnC. All Rights Reserved </p>
        </div>
        {/* <div className={styles.followUs}>
          <h5>Follow us</h5>
          <hr></hr>
          <TwitterIcon />
          <hr></hr>
          <InstagramIcon />
          <hr></hr>
          <FacebookIcon />
        </div> */}
      </div>
    </footer>
  );
}

export default SubFooter;
