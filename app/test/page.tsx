"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

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
};

export default Dashboard;

