"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/contexts/AuthContext";

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth(); // Destructure isAuthenticated
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect to Sign In if not authenticated
    if (!isAuthenticated) {
      router.push("/signin"); // Redirect to the home page
    }
  }, [isAuthenticated, router]); // Depend on isAuthenticated and router

  // If the user is not authenticated, you could also return null or a loading spinner
  if (!isAuthenticated) {
    return null; // Or return a loading spinner or some other placeholder
  }

  return (
    <div>
      <div className={styles.cart}>
        <h1 className={styles.cartText}>My Dashboard</h1>
      </div>
      <div className={styles.emptyCart}>
        <span>You have no orders! </span>

        <span>My Account</span>
      </div>
    </div>
  );
}
