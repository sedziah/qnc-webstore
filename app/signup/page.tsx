// SignIn.js
import styles from "./page.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      {/* Optionally include your image container here */}

      <div className={styles.formContainer}>
        <h1>Sign in to QnC or create an account</h1>

        <input
          type="text"
          className={styles.inputField}
          placeholder="First Name"
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Last Name"
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Email"
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Password"
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Repeat Password"
        />
        <button className={styles.submitButton}>Continue</button>

        <div className={styles.separator}>
          <span className={styles.separatorLine}>or</span>
        </div>

        <button className={`${styles.submitButton} ${styles.socialButton}`}>
          Continue with Facebook
        </button>
        <button className={`${styles.submitButton} ${styles.socialButton}`}>
          Continue with Google
        </button>
        <button className={`${styles.submitButton} ${styles.socialButton}`}>
          Continue with Apple
        </button>

        <label className={styles.rememberMe}>
          <input type="checkbox" /> Stay signed in
        </label>
        <p>
          Using a public or shared device? Uncheck to protect your account.
          <a href="#">Learn more</a>
        </p>
      </div>
    </div>
  );
};

export default Page;
