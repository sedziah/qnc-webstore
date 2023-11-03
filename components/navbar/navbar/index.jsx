"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isTabletNavOpen, setTabletNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  const toggleTabletNav = () => {
    setTabletNavOpen(!isTabletNavOpen);
  };

  const closeOverlay = () => {
    setMobileNavOpen(false);
    setTabletNavOpen(false);
  };

  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.navbar}>
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
          <div>
            <ul className={styles.navLinks}>
              <Link href="#">
                <li>featured</li>
              </Link>
              <Link href="#">
                <li>deals</li>
              </Link>
              <Link href="#">
                <li>categories</li>
              </Link>
              <Link href="#">
                <li>
                  <Image
                    src="/icons/cart.svg"
                    alt="cart"
                    width={25}
                    height={51.5}
                  />
                </li>
              </Link>
              <Link href="#" className={styles.links}>
                <li className={styles.signin_button}>Sign in</li>
              </Link>
              <Link href="#" className={styles.links}>
                <li className={styles.signup_button}>Sign up</li>
              </Link>
            </ul>
          </div>

          {/* Mobile Navigation Menu (Hamburger Menu) */
          /* Hidden on desktop views */}
          <div
            className={`${styles.mobileNav} ${
              isMobileNavOpen ? styles.active : ""
            }`}
            onClick={toggleMobileNav}
          >
            <MenuIcon />
          </div>

          {/* Tablet Navigation Menu (Hamburger Menu) */
          /* Hidden on desktop views */}
          <div className={styles.tabletNav}>
            <ul>
              <li>
                <PermIdentityIcon />
              </li>
              <li>
                <AddShoppingCartIcon />
              </li>
              <li
                className={`${styles.tabletNav} ${
                  isTabletNavOpen ? styles.active : ""
                }`}
                onClick={toggleTabletNav}
              >
                <MenuIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Navigation Overlay */
      /* Shown when the respective Hamburger Menu is open */}
      {(isMobileNavOpen || isTabletNavOpen) && (
        <div className={styles.overlay} onClick={closeOverlay}>
          {/* Close button (X) */
          /* Clicking on the overlay will also close it */}
          <div className={styles.closeButton} onClick={closeOverlay}>
            &#10005;
          </div>
          <ul className={styles.mobileLinks}>
            <li>
              <Link href="#">featured</Link>
            </li>
            <li>
              <Link href="#">deals</Link>
            </li>

            <li>
              <Link href="#">categories</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
