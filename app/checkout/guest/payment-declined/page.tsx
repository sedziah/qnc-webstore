import React from 'react';
import { useRouter } from 'next/router';
import styles from './payment-declined.module.css'; // Make sure to create this CSS module

const PaymentDeclinedPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.declinedPage}>
      <h1>Payment Declined</h1>
      <p>Unfortunately, your payment could not be processed at this time.</p>
      <button className={styles.button} onClick={() => router.push('/checkout')}>
        Try Again
      </button>
    </div>
  );
};

export default PaymentDeclinedPage;
