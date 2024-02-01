import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.png"; // Make sure this path is correct

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
        <br></br>
        <br></br>
        <p>
          At QnC, we're not just a brand; we're a beacon of excellence in a
          world that demands the best. We believe that quality isn't just a
          goal—it's our promise to you.
        </p>
        <br></br>
        <br></br>
        <p>+233 54 1234 567</p>
        <p>Banana Street, East Legon</p>
      </div>
      <div className={styles.linksSection}>
        <h2>Quick Links</h2>
        <br></br>
        <Link href="/about">About Us</Link>
        <Link href="/store-credits">Store Credits</Link>
        <Link href="/appliances">Appliances</Link>
        <Link href="/computers">Computers</Link>
      </div>
      <div className={styles.dealsSection}>
        <h2>Receive daily deals</h2>
        <br></br>
        <p>Sign up for exclusive offers and savings straight to your inbox.</p>
        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter email here"
            className={styles.emailInput}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
