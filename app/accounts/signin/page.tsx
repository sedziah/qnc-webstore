// SignIn.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../../auth/contexts/AuthContext";
import Head from "next/head";
import Image from "next/image";

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
    }
  };

  if (isAuthenticated) {
    // If user is authenticated, do not render the sign-in form.
    // Optionally, render null or a loading spinner instead.
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className={styles.formSide}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username or Email address *</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setEmailOrUsername(e.target.value)}
              value={emailOrUsername}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className={styles.options}>
            <label>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              Remember me
            </label>
            <Link
              className={styles.forgotPassword}
              href="/accounts/reset-password"
              passHref
            >
              Forgot password
            </Link>
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>

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
