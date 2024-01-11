import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.png"

function Footer() {
  // Footer content
  var footerText =
    "At QnC, we believe affordability and excellence can go hand in hand. Explore our curated selection of quality products and services that won't break the bank. Discover the best deals today and enjoy the perfect balance of savings and satisfaction!";
  var contact = "+233 (0) 207-597-903";
  var address = "Banana Street, East Legon";
  var dealsHeading = "Receive daily deals";
  var dealsText =
    "Be the first to unlock incredible savings every day. Subscribe to start saving now!";
  var quickLink1 = "About Us";
  var quickLink2 = "Terms and Conditions";
  var quickLink3 = "Our Team";

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerItems}>
        <Link href="/">
          <div>
            <Image src={logo} alt="QnC Logo" width={121} height={51.5} />
          </div>
        </Link>
        <br></br>
        <p>{footerText}</p>
        <br></br>
        <p>{contact}</p>
        <br></br>
        <p>{address}</p>
        <br></br>
        <br></br>
        <h1>Quick Links</h1>
        <br />
        <p>{quickLink1} </p>
        <br />
        <p>{quickLink2} </p>
        <br />
        <p>{quickLink3} </p>
      </div>
    </footer>
  );
}

export default Footer;
