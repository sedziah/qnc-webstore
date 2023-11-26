// SignIn.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/contexts/AuthContext";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, error, login } = useAuth(); // Destructure isAuthenticated
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
   const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard"); // Use replace to prevent going back to the sign-in page
    }
  }, [isAuthenticated, router]); // Depend on isAuthenticated and router

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(""); // Clear previous errors before trying to log in

    try {
      await login(emailOrUsername, password);
      // Check if isAuthenticated is updated before redirecting
      if (isAuthenticated) {
        console.log("Login successful, redirecting...");
        router.push("/dashboard"); // Redirect to dashboard instead of home
      }
    } catch (error) {
      if (error instanceof Error) {
        // If the error is an instance of Error, we can safely assume it has a message property
        setLoginError(error.message);
      } else {
        // If it's not an Error, we handle it as an unknown error
        setLoginError("An unknown error occurred.");
      }
      console.log(`This is a test: ${error}`);
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
          {/* Display error message here */}
          {/* Always display this div to check if it's rendered */}
          {loginError && (
            <div
              style={{
                color: "red",
                marginTop: "10px",
              }}
            >
              {loginError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
