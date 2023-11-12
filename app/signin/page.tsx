// SignIn.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/contexts/AuthContext";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth(); // Destructure isAuthenticated
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard"); // Use replace to prevent going back to the sign-in page
    }
  }, [isAuthenticated, router]); // Depend on isAuthenticated and router

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Clear any existing errors

    // if (!emailOrUsername || !password) {
    //   setError("Please enter both email and password");
    //   return; // Exit early if fields are empty
    // }

    try {
      console.log("Attempting login...");
      await login(emailOrUsername, password);
      console.log("Login successful, redirecting...");
      router.push("/"); // Redirect only if login is successful
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "An error occurred during login.");
    }
  };

  if (isAuthenticated) {
    // If user is authenticated, do not render the sign-in form.
    // Optionally, render null or a loading spinner instead.
    return null;
  }


  return (
    <div className={styles.container}>
      {/* Optionally include your image container here */}

      <div className={styles.formContainer}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <br></br>

          <input
            type="text"
            className={styles.inputField}
            placeholder="Email"
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
        </form>
      </div>
    </div>
  );
};

export default Page;
