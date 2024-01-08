// components/hero/index.tsx

import Link from "next/link";
import styles from "./Hero.module.css";
import Image from "next/image";

// Hero Images
import appliances from "../../public/images/hero/hero_accessories.png";

// Define a type that covers static image imports
type StaticRequire = ReturnType<typeof require>;

type HeroImageProps = {
  imageUrl: string | StaticRequire; // Renamed from Image to imageUrl
};

const HeroImage: React.FC<HeroImageProps> = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      alt="hero_image"
      layout="responsive"
      width={1}
      height={1}
      objectFit="cover"
      quality={100}
    />
  );
};

function Hero() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.flexContainer}>
        <Link href="#">
          <div className={`${styles.imageContainer} ${styles.mobilePhones}`}>
            {/* <HeroImage imageUrl={appliances} /> */}
            <Link href="/categories/mobile-phones">Mobile Phones</Link>
          </div>
        </Link>

        <div className={`${styles.imageContainer} ${styles.computers}`}>
          <Link href="/categories/computers">Computers</Link>
        </div>
        <div className={`${styles.imageContainer} ${styles.accessories}`}>
          <Link href="/categories/accessories">Accessories</Link>
        </div>
        <div className={`${styles.imageContainer} ${styles.mobile_appliances}`}>
          <Link href="/categories/appliances">Appliances</Link>
        </div>
      </div>

      <div
        className={`${styles.imageContainer} ${styles.fullWidth} ${styles.appliances}`}
      >
        <Link href="/categories/appliances">Appliances</Link>
      </div>
    </div>
  );
}

export default Hero;
