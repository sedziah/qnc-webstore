import Image from "next/image";
import logo from "../assets/images/logo.png";
import search from "../assets/icons/cart.svg";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_items}>
        <div>
          <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
        </div>
        <div>
          <ul className={styles.nav_links}>
            <li>featured</li>
            <li>deals</li>
            <li>categories</li>
            <li>
              <Image src={search} alt="QnC Logo" width={20} height={20} />
            </li>
            <li className={styles.nav_buttons}>Sign in</li>
            <li className={styles.nav_buttons}>Sign up</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
