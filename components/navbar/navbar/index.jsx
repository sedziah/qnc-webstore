import Image from "next/image";
import logo from "../assets/images/logo.png";
import cart from "../assets/icons/cart.svg";
import styles from "../styles/Navbar.module.css";
import hamburger from "../assets/icons/hamburger.png";

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
              <li>featured</li>
              <li>deals</li>
              <li>categories</li>
              <li>
                <Image src={cart} alt="QnC Logo" width={25} />
              </li>
            </div>
            <div className={styles.nav_buttons}>
              <li className={styles.signin_button}>Sign in</li>
              <li className={styles.signup_button}>Sign up</li>
            </div>
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={styles.tabletNavItems}>
          <Image src={hamburger} alt="QnC Logo" width={25} />
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
