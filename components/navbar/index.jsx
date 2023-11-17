"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../app/auth/contexts/AuthContext";
import { useCart } from "../../app/cart/CartContext";

function Navbar() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isTabletNavOpen, setTabletNavOpen] = useState(false);
  const { isAuthenticated, logoutUser } = useAuth();
  const { cartCount } = useCart();

  const handleSignOut = () => {
    logoutUser();
  };

  console.log("Is Authenticated:", isAuthenticated);

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
              <Link href="/products">
                <li>featured</li>
              </Link>
              <Link href="/products">
                <li>deals</li>
              </Link>
              <Link href="/products">
                <li>categories</li>
              </Link>
              <Link href="/cart">
                <li>
                  <AddShoppingCartIcon />
                  {cartCount > 0 && (
                    <span className={styles.cartCount}>{cartCount}</span>
                  )}
                </li>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <li className={styles.myAccount}>My Account</li>
                  </Link>
                  <li onClick={handleSignOut} className={styles.signoutButton}>
                    Sign Out
                  </li>
                </>
              ) : (
                <>
                  <Link href="/signin" className={styles.links}>
                    <li className={styles.signin_button}>Sign in</li>
                  </Link>
                  <Link href="/signup" className={styles.links}>
                    <li className={styles.signup_button}>Sign up</li>
                  </Link>
                </>
              )}
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
              <Link href="/products">featured</Link>
            </li>
            <li>
              <Link href="/products">deals</Link>
            </li>
            <li>
              <Link href="/products">categories</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
