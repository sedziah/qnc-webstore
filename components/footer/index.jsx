import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.footerColumn}>
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
            <br></br>
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
            <h1>Quick Links</h1>
            <br></br>
            <br></br>
            <Link href="#">About Us</Link>
            <br></br>
            <Link href="#">Terms and Conditions</Link>
            <br></br>
            <Link href="#">Our Team</Link>
            <br></br>
          </div>
          <div className={styles.footerColumn}>
            <h1>Receive daily deals</h1>
            <br></br>
            <br></br>
            <span>
              Be the first to unlock incredible savings every day! Subscribe to
              start saving now
            </span>
            <br></br>
            <div>
              <input type="text" placeholder="  Type Email here" required />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
