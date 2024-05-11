// about/page.tsx
import styles from './page.module.css';

const Page = () => {
  return (
    <div>
      <div className={styles.heading}>
        <h1 className={styles.headingText}>About Us</h1>
      </div>
      <div>
        <p>
          Welcome to Quality and Convenience at Your Fingertips! QnC Store is
          dedicated to bringing you the best in both quality and convenience.
          Established in [Year], our store is your go-to destination for a wide
          range of products that meet your daily needs. What We Offer: A diverse
          selection of quality products, from household essentials to the latest
          tech gadgets. An easy and convenient shopping experience, both
          in-store and online. Friendly customer service, always ready to assist
          you. Our Commitment: Supporting the local community and promoting
          sustainable practices. Providing great value through affordable prices
          and exclusive deals. Visit Us: Location: [Insert Address] Hours:
          [Insert Hours] Contact: [Phone Number] | [Email] Thank you for
          choosing QnC Store. We’re excited to be a part of your everyday life!
        </p>
      </div>
    </div>
  );
};

export default Page;
