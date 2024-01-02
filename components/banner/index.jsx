// components/banner/index.jsx
import Image from "next/image";
import styles from "./banner.module.css";


const Banner = ({ src, alt }) => {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        quality={100} // Adjust the quality as needed
      />
      {/* Add any additional content you want on top of the banner image here */}
    </div>
  );
};

export default Banner;
