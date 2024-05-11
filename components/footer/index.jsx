// components/footer/index.jsx

'use client';
import { useState } from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo.png'; // Make sure this path is correct
import { apiService } from '../../services/apiService'; // Adjust the import path as needed

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscription = async (event) => {
    event.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setMessage('Subscribing...');

    try {
      await apiService.subscribeToNewsletter(email);
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage(error.message || 'Failed to subscribe, please try again.');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <Image src={logo} alt='QnC Logo' width={121} height={51.5} />
        <p>
          At QnC, we're not just a brand; we're a beacon of excellence in a
          world that demands the best. We believe that quality isn't just a
          goal—it's our promise to you.
        </p>
        <br />
        <p>+233 20 7597 903</p>
        <p>17 Hill Street, Accra New Town</p>
      </div>
      <div className={styles.linksSection}>
        <h2>Quick Links</h2>
        <br />
        <Link href='/about'>About Us</Link>
        <Link href='/store-credits'>Q&C Credit</Link>
        <Link href='/products/appliances'>Appliances</Link>
        <Link href='/products/computers'>Computers</Link>
      </div>
      <div className={styles.dealsSection}>
        <h2>Receive daily deals</h2>
        <p>Sign up for exclusive offers and savings straight to your inbox.</p>
        <form onSubmit={handleSubscription} className={styles.newsletterForm}>
          <input
            type='email'
            placeholder='Enter email here'
            className={styles.emailInput}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <button type='submit' className={styles.sendButton}>
            Send
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </footer>
  );
}

export default Footer;
