// SignIn.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action

    // Prepare data to be sent to your Django backend
    const credentials = {
      email: emailOrUsername,
      password: password,
    };

    console.log("Form Submitted", { credentials });

    try {
      // Make an API call to your Django backend
      const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Handle response data, store auth tokens, etc.

      // Redirect to another page upon successful sign-in
      router.push("/");
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Optionally include your image container here */}

      <div className={styles.formContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h1>Sign in to QnC or create an account</h1>

          <input
            type="text"
            className={styles.inputField}
            placeholder="Email or username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input
            type="text"
            className={styles.inputField}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </form>
      </div>
    </div>
  );
};

export default Page;
