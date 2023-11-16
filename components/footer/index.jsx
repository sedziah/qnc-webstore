import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import Stack from "@mui/material/Stack";

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
    <footer>
      <div className={styles.container}>
        <div className={styles.desktopFooter}>
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
              <span>{footerText}</span>
              <span>{contact}</span>
              <span>{address}</span>
            </Stack>
          </div>
          <div className={styles.footerColumn}>
            <Stack className={styles.footerQuickLinks}>
              <h1>Quick Links</h1>
              <Link href="/about">{quickLink1}</Link>
              <Link href="#">{quickLink2}</Link>
              <Link href="#">{quickLink3}</Link>
            </Stack>
          </div>
          <div className={styles.footerColumn}>
            <Stack className={styles.footerDeals}>
              <h1>{dealsHeading}</h1>
              <span>{dealsText}</span>
              <div>
                <input type="text" placeholder="  Type Email here" required />
                <button>Submit</button>
              </div>
            </Stack>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className={styles.container}>
        <div className={styles.mobileFooter}>
          <Stack>
            <br></br>
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
              <Stack className={styles.footerContact}>
                <span>{footerText}</span>
                <span>{contact}</span>
                <span>{address}</span>
              </Stack>
            </div>
            <br></br>
            <div>
              <Stack className={styles.footerQuickLinks}>
                <h1>Quick Links</h1>
                <br></br>
                <Link href="#">{quickLink1}</Link>
                <Link href="#">{quickLink2}</Link>
                <Link href="#">{quickLink3}</Link>
              </Stack>
            </div>
            <br></br>
            <br></br>
            <div>
              <Stack className={styles.footerDeals}>
                <h1>{dealsHeading}</h1>
                <span>{dealsText}</span>
                <div>
                  <input type="text" placeholder="  Type Email here" required />
                  <button>Submit</button>
                </div>
              </Stack>
            </div>
            <br></br>
          </Stack>
        </div>
      </div>

      {/* Tablet View */}
      <div className={styles.container}>
        <div className={styles.tabletFooter}>
          <Stack>
            <br></br>
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
              <Stack className={styles.footerContact}>
                <span>{footerText}</span>
                <span>{contact}</span>
                <span>{address}</span>
              </Stack>
            </div>
            <br></br>
            <div>
              <Stack className={styles.footerQuickLinks}>
                <h1>Quick Links</h1>
                <br></br>
                <Link href="#">{quickLink1}</Link>
                <Link href="#">{quickLink2}</Link>
                <Link href="#">{quickLink3}</Link>
              </Stack>
            </div>
            <br></br>
            <br></br>
            <div>
              <Stack className={styles.footerDeals}>
                <h1>{dealsHeading}</h1>
                <span>{dealsText}</span>
                <div>
                  <input type="text" placeholder="  Type Email here" required />
                  <button>Submit</button>
                </div>
              </Stack>
            </div>
          </Stack>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
