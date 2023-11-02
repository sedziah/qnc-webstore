"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import cart from "../assets/icons/cart.svg";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  return (
    <div>
      {/*Mobile Overlay */}
      <nav className={styles.overlay}>
        <div className={styles.close_button}>
          <CloseIcon />
        </div>
        <div>
          <ul>
            <Link href="#" className={styles.mobileNavLinks}>
              <li>featured</li>
            </Link>
            <Link href="#" className={styles.mobileNavLinks}>
              <li>deals</li>
            </Link>
            <Link href="#" className={styles.mobileNavLinks}>
              <li>categories</li>
            </Link>
          </ul>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.nav_items}>
          <div>
            <Link href="/">
              <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
            </Link>
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
            <Link href="#" className={styles.links}>
              <PermIdentityIcon />
            </Link>
            <Link href="#" className={styles.links}>
              <AddShoppingCartIcon />
            </Link>
            <Link href="#" className={styles.links}>
              <MenuIcon />
            </Link>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={styles.mobileNavItems}>
            <Link href="#" className={styles.links}>
              <PermIdentityIcon />
            </Link>
            <Link href="#" className={styles.links}>
              <AddShoppingCartIcon />
            </Link>
            <Link href="#" className={styles.links}>
              <MenuIcon />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
