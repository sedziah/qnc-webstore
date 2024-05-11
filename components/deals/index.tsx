// components/deals/index.tsx

'use client';
import styles from './deals.module.css';
import React, { useState, useEffect } from 'react';

// Define a type for the state
interface TimeLeft {
  hours: string;
  minutes: string;
  seconds: string;
}

function DealsHeader() {
  // Initialize the state with the expected structure
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    const difference = endOfDay.getTime() - now.getTime();

    let timeLeft: TimeLeft = {
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      timeLeft = {
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24),
        ).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          '0',
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  }

  return (
    <div className={styles.dealsHeaderContainer}>
      <div className={styles.dealsTitleSection}>
        <div className={styles.dealsTitle}>Today's Deals</div>
        <div className={styles.seeAllLink}>See all →</div>
      </div>
      <div className={styles.dealsSubTitle}>Offers expire in</div>
      <div className={styles.timerContainer}>
        <div className={styles.timeBox}>
          {timeLeft.hours} <span className={styles.timeLabel}>Hrs</span>
        </div>
        <div className={styles.timeBox}>
          {timeLeft.minutes} <span className={styles.timeLabel}>Min</span>
        </div>
        <div className={styles.timeBox}>
          {timeLeft.seconds} <span className={styles.timeLabel}>Sec</span>
        </div>
      </div>
    </div>
  );
}

export default DealsHeader;
