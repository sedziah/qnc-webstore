"use client";
import { useState, useEffect  } from "react";
import styles from "./test.module.css";
// import Image from "next/image";
// import logo from "../assets/images/logo.png";
// import cart from "../assets/icons/cart.svg";
// import styles from "../styles/Navbar.module.css";
// import Link from "next/link";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import MenuIcon from "@mui/icons-material/Menu";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import CloseIcon from "@mui/icons-material/Close";

// function Navbar() {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to control mobile menu

//   // Function to open the mobile menu
//   const openMobileMenu = () => {
//     setMobileMenuOpen(true);
//   };

//   // Function to close the mobile menu
//   const closeMobileMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div>
//       {/*Mobile Overlay */}
//       <nav
//         className={`${styles.overlay} ${
//           isMobileMenuOpen ? styles.mobileMenuOpen : ""
//         }`}
//       >
//         <div className={styles.close_button} onClick={closeMobileMenu}>
//           <CloseIcon />
//         </div>
//         <div>
//           <ul>
//             <Link href="#" className={styles.mobileNavLinks}>
//               <li>featured</li>
//             </Link>
//             <Link href="#" className={styles.mobileNavLinks}>
//               <li>deals</li>
//             </Link>
//             <Link href="#" className={styles.mobileNavLinks}>
//               <li>categories</li>
//             </Link>
//           </ul>
//         </div>
//       </nav>

//       {/* Desktop Navigation */}
//       <nav className={styles.navbar}>
//         <div className={styles.nav_items}>
//           <div>
//             <Link href="/">
//               <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
//             </Link>
//           </div>

//           {/* Desktop Navigation Menu */}
//           <div className={styles.desktopNavItems}>
//             <ul>
//               <div className={styles.nav_links}>
//                 <Link href="#" className={styles.links}>
//                   <li>featured</li>
//                 </Link>
//                 <Link href="#" className={styles.links}>
//                   <li>deals</li>
//                 </Link>
//                 <Link href="#" className={styles.links}>
//                   <li>categories</li>
//                 </Link>
//                 <Link href="#" className={styles.links}>
//                   <li>
//                     <Image src={cart} alt="QnC Logo" width={25} />
//                   </li>
//                 </Link>
//               </div>
//               <div className={styles.nav_buttons}>
//                 <Link href="#" className={styles.links}>
//                   <li className={styles.signin_button}>Sign in</li>
//                 </Link>
//                 <Link href="#" className={styles.links}>
//                   <li className={styles.signup_button}>Sign up</li>
//                 </Link>
//               </div>
//             </ul>
//           </div>

//           {/* Tablet and Smaller Desktop Navigation Menu */}
//           <div className={styles.tabletNavItems}>
//             <Link href="#" className={styles.links}>
//               <PermIdentityIcon />
//             </Link>
//             <Link href="#" className={styles.links}>
//               <AddShoppingCartIcon />
//             </Link>
//             <Link href="#" className={styles.links}>
//               <MenuIcon />
//             </Link>
//           </div>

//           {/* Mobile Navigation Menu */}
//           <div className={styles.mobileNavItems}>
//             <Link href="#" className={styles.links}>
//               <PermIdentityIcon />
//             </Link>
//             <Link href="#" className={styles.links}>
//               <AddShoppingCartIcon />
//             </Link>
//             <div className={styles.links} onClick={openMobileMenu}>
//               <MenuIcon />
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;



function Navbar() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    // Toggle the value of showOverlay when the button is clicked
    setShowOverlay(!showOverlay);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>

      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <p>This is an overlay.</p>
            <button onClick={handleClick}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

