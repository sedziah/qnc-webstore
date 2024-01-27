"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/contexts/AuthContext";

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth(); // Destructure isAuthenticated
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");

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
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeading}>My Dashboard</div>
      <div className={styles.tabContainer}>
        {["Overview", "Orders", "Payments", "Store Credits", "My Profile"].map(
          (tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div className={styles.content}>
        {/* Content based on the active tab */}
        {activeTab === "Overview" && <div>Overview Content</div>}
        {activeTab === "Orders" && <div>Orders Content</div>}
        {activeTab === "Payments" && <div>Payments Content</div>}
        {activeTab === "Store Credits" && <div>Store Credits Content</div>}
        {activeTab === "My Profile" && <div>My Profile Content</div>}
      </div>
    </div>
  );
}

{/* <div>
  <div className={styles.cart}>
    <h1 className={styles.cartText}>My Dashboard</h1>
  </div>
  <div className={styles.emptyCart}>
    <span>You have no orders! </span>

    <span>My Account</span>
  </div>
</div>; */}