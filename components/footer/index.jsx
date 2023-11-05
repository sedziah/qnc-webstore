import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import Stack from "@mui/material/Stack";

function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.footerColumn}>
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

            <Stack className={styles.footerContact}>
              <span>
                At QnC, we believe affordability and excellence can go hand in
                hand. Explore our curated selection of quality products and
                services that won't break the bank. Discover the best deals
                today and enjoy the perfect balance of savings and satisfaction!
              </span>
              <span>+233 (0) 207-597-903</span>
              <span>Banana Street, East Legon</span>
            </Stack>
          </div>
          <div className={styles.footerColumn}>
            <Stack className={styles.footerQuickLinks}>
              <h1>Quick Links</h1>
              <Link href="#">About Us</Link>
              <Link href="#">Terms and Conditions</Link>
              <Link href="#">Our Team</Link>
            </Stack>
          </div>
          <div className={styles.footerColumn}>
            <Stack className={styles.footerDeals}>
              <h1>Receive daily deals</h1>
              <span>
                Be the first to unlock incredible savings every day. Subscribe
                to start saving now!
              </span>
              <div>
                <input type="text" placeholder="  Type Email here" required />
                <button>Submit</button>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
