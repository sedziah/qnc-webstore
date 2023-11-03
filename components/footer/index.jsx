import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.footerColumn}>
          Column 1
          <div className={styles.logo}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="QnC Logo"
                width={121}
                height={51.5}
              />
            </Link>
          </div>
          <span>
            At QnC, Affordability Meets Excellence. Discover the Best Deals
            Today!
          </span>
          <br></br>
          <span>+230 54 324 771</span>
          <br></br>
          <span>Banana Street, East Legon</span>
        </div>
        <div className={styles.footerColumn}>
          <span>Quick Links</span>
          <br></br>
          <span>Appliances</span>
          <br></br>
          <span>Accessories</span>
          <br></br>
          <span>Computers</span>
          <br></br>
          <span>Mobile Phones</span>
        </div>
        <div className={styles.footerColumn}>
          <span>Receive daily deals</span>
          <br></br>
          <span>
            Be the first to unlock incredible savings every day! Subscribe to
            start saving now
          </span>
          <br></br>
          <div></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
