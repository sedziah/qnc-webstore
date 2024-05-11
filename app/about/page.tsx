// about/page.tsx

import styles from './page.module.css';
import Breadcrumbs from '../../components/breadcrumbs/index';

const Page: React.FC = () => {
  const crumbs = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
  ];

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <br />
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.headingText}>About Us</h1>
        </div>
        <div className={styles.content}>
          <h1>A Home of Premium Products & Exemplary Customer Care!</h1>
          <p>
            At QnC, we're not just a brand; we're a beacon of excellence in a
            world that demands the best. We believe that quality isn't just a
            goal—it's our promise to you. Our shelves are stocked with only the
            finest products, ensuring that every purchase meets the high
            standards our customers have come to expect.
          </p>
          <br />
          <h1>Our Vision</h1>
          <p>
            To be the sanctuary for consumers seeking not only premium products
            but also exceptional service. We envision a world where every
            transaction is a step toward building a lifelong relationship of
            trust and satisfaction.
          </p>
          <br />
          <h1>Our Mission</h1>
          <p>
            Quality n' Care is committed to excellence by providing a curated
            selection of top-tier products accompanied by outstanding customer
            service. We're dedicated to enhancing your lifestyle with goods of
            unparalleled quality, fostering a shopping experience that stands
            out in the realm of retail.
          </p>
          <br />
          <h1>Our Values</h1>
          <ul>
            <li>
              <strong>Trust:</strong> We are devoted to earning your trust
              through unwavering integrity and consistent reliability in every
              product and service we offer.
            </li>
            <br />
            <li>
              <strong>Excellence:</strong> Our pursuit of excellence is
              tireless. We aim to surpass expectations in the quality of our
              products and the standard of our customer service.
            </li>
            <br />
            <li>
              <strong>Loyalty:</strong> Your loyalty is the heartbeat of our
              business. In turn, our loyalty to you is reflected through our
              dedication to providing quality in every aspect of our operation.
            </li>
            <br />
            <li>
              <strong>Quality Service:</strong> Our commitment extends beyond
              transactions; we are passionate about delivering personalized
              service that caters to your unique needs and ensures your utmost
              satisfaction.
            </li>
          </ul>
          <br />
          <br />
          <p>
            Join us at QnC and step into a world where quality products and
            exceptional service are the norm, not the exception. Here, every
            product is a testament to our commitment to excellence, and every
            interaction is an opportunity to demonstrate our dedication to your
            care. Together, let's build a future that's enriched by quality,
            defined by care, and committed to the extraordinary.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
