//about/page.tsx
import styles from "./page.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.headingText}>Store Credits</h1>
      </div>
      <div className={styles.content}>
        <h2>What are Store Credits?</h2>
        <p>
          Store credits at QnC are approved lines of credit that allow our
          customers the flexibility to purchase now and pay later. This
          convenient option empowers you to shop for your favorite products
          without immediate payment, giving you the comfort to manage your
          finances and enjoy our quality products stress-free.
        </p>
        <br />

        <h2>How to Apply for Store Credits</h2>
        <ol>
          <li>
            <strong>Submit Your Application:</strong> Begin by filling out our
            credit application form with all the required details.
          </li>
          <li>
            <strong>Approval Process:</strong> Our team will review your
            application. This process is swift, ensuring you don't have to wait
            long.
          </li>
          <li>
            <strong>Start Shopping:</strong> Once approved, you can immediately
            start using your store credits to shop for your favorite products.
          </li>
        </ol>
        <br />

        <h2>How to Use</h2>
        <p>
          It's simple. When you've selected your premium products and you're all
          set to checkout, choose 'Store Credits' as your payment method. Your
          available credits will be applied to your purchase, reducing the total
          cost. Enjoy the convenience of shopping now and paying later with
          Quality n' Care.
        </p>
        <br />

        <h2>Terms and Conditions</h2>
        <p>
          Store credits are subject to terms such as expiration dates and are
          non-transferable. Please refer to our detailed terms and conditions
          for more information.
        </p>
        <br />

        <p>
          Dive into a seamless shopping experience with Quality n' Care where
          your satisfaction is rewarded. Embrace the care that comes with every
          purchase.
        </p>
      </div>
    </div>
  );
};

export default Page;
