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
          Facilis fringilla malesuada et aliquam nunc. Egestas consetetur et eos
          odio aliquam et. Expedita veniam, nunc, ea.
        </p>
        <br></br>
        <br></br>
        <p>+233 54 1234 567</p>
        <p>Banana Street, East Legon</p>
      </div>
      <div className={styles.linksSection}>
        <h2>Quick Links</h2>
        <br></br>
        <Link href="/about-us">About Us</Link>
        <Link href="/mobile-phones">Mobile Phones</Link>
        <Link href="/appliances">Appliances</Link>
        <Link href="/computers">Computers</Link>
      </div>
      <div className={styles.dealsSection}>
        <h2>Receive daily deals</h2>
        <br></br>
        <p>
          Facilis fringilla malesuada et aliquam nunc. Egestas consetetur et eos
          odio aliquam.
        </p>
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
