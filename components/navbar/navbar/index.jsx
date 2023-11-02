// Navbar.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

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
        <div className={styles.logo}>
          <Link href="/">Logo</Link>
        </div>

        {/* Mobile Navigation Menu (Hamburger Menu) */
        /* Hidden on tablet and desktop views */}
        <div
          className={`${styles.mobileNav} ${
            isMobileNavOpen ? styles.active : ""
          }`}
          onClick={toggleMobileNav}
        >
          ☰
        </div>

        {/* Tablet Navigation Menu (Hamburger Menu) */
        /* Hidden on desktop view */}
        <div
          className={`${styles.tabletNav} ${
            isTabletNavOpen ? styles.active : ""
          }`}
          onClick={toggleTabletNav}
        >
          ☰
        </div>

        {/* Desktop Navigation Links */
        /* Shown on desktop view */}
        <ul
          className={`${styles.navLinks} ${
            isMobileNavOpen || isTabletNavOpen ? styles.hidden : ""
          }`}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Navigation Links Overlay (Mobile and Tablet) */
      /* Shown when the respective Hamburger Menu is open */}
      {(isMobileNavOpen || isTabletNavOpen) && (
        <div className={styles.overlay}>
          <div className={styles.closeButton} onClick={closeOverlay}>
            &#10005; {/* Close button (X) */}
          </div>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
