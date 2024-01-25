// pages/login.js
import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.css"; // Ensure this is the correct path to your CSS module

const Page = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className={styles.formSide}>
        <form className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username or Email address *</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password *</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={styles.options}>
            <label>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              Remember me
            </label>
            <a href="#" className={styles.forgotPassword}>
              Forgot password
            </a>
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
      <div className={styles.imageSide}>
        <Image
          src="/images/login.png" // Replace with the path to your actual image
          alt="Workspace Background"
          layout="fill"
          objectFit="cover"
          priority // This will prioritize loading of the image
        />
      </div>
    </div>
  );
};

export default Page;
