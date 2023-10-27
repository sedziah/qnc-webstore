import Image from "next/image";
import logo from "../assets/images/logo.png";
import cart from "../assets/icons/cart.svg";
import styles from "../styles/Navbar.module.css";
import hamburger from "../assets/icons/hamburger.png";
import Link from "next/link";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_items}>
        <div>
          <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
        </div>

        {/* Desktop Navigation Menu */}
        <div className={styles.desktopNavItems}>
          <ul>
            <div className={styles.nav_links}>
              <Link href="#" className={styles.links}>
                <li>featured</li>
              </Link>
              <Link href="#" className={styles.links}>
                <li>deals</li>
              </Link>
              <Link href="#" className={styles.links}>
                <li>categories</li>
              </Link>
              <Link href="#" className={styles.links}>
                <li>
                  <Image src={cart} alt="QnC Logo" width={25} />
                </li>
              </Link>
            </div>
            <div className={styles.nav_buttons}>
              <Link href="#" className={styles.links}>
                <li className={styles.signin_button}>Sign in</li>
              </Link>
              <Link href="#" className={styles.links}>
                <li className={styles.signup_button}>Sign up</li>
              </Link>
            </div>
          </ul>
        </div>

        {/* Tablet and Smaller Desktop Navigation Menu */}
        <div className={styles.tabletNavItems}>
          <Image src={hamburger} alt="QnC Logo" width={25} />
        </div>

        {/* Mobile Navigation Menu */}
        <div className={styles.mobileNavItems}>
          <Image src={hamburger} alt="QnC Logo" width={25} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
