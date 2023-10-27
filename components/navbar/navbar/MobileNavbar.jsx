import styles from "../styles/MobileNavbar.module.css";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import Link from "next/link";

function MobileNavbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Image
          src={logo}
          alt="Description of your image"
          width={121}
          height={51.5}
        />
      </div>
      <div>Menu</div>
      {/* <div>
        <ul>
          <li>featured</li>
          <li>deals</li>
          <li>categories</li>
          <li>Cart</li>
          <li>Signin</li>
        </ul>
      </div> */}
    </nav>
  );
}

export default MobileNavbar;
