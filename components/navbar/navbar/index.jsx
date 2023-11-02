"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/images/logo.png";
import Image from "next/image";

function Navbar() {
  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
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
          <div className={styles.mobileNav}>☰</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
