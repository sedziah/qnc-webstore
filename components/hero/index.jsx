import Link from "next/link";
import styles from "./Hero.module.css";
import Image from "next/image";

function Hero() {
  //Hero Images
  const hero_accesories = "/images/hero/hero_accessories.png";
  const hero_computers = "/images/hero/hero_computers.png";
  const hero_appliances = "/images/hero/hero_appliances.png";
  const hero_mobile_phone = "/images/hero/hero_mobile_phone.png";

  return (
    <div className={styles.heroSection}>
      <div className={styles.imageContainer}>
        <Link href="#">
          <Image
            src="/images/hero/hero_mobile_phone.png"
            alt="Mobile Phones"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <Link href="#">
          <Image
            src="/images/hero/hero_computers.png"
            alt="Computers"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <Link href="#">
          <Image
            src="/images/hero/hero_accessories.png"
            alt="Accessories"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className={styles.imageContainerFullWidth}>
        <Link href="#">
          <Image
            src="/images/hero/hero_appliances.png"
            alt="Appliances"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
    </div>
  );
}

export default Hero;
