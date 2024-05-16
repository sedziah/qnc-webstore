// app/accounts/reset-password/page.tsx

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../../services/apiService';
import styles from './page.module.css';
import Image from 'next/image';
import Head from 'next/head';

const PasswordResetRequestForm = async (
  event: React.FormEvent<HTMLFormElement>,
): Promise<void> => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Added state for error message
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setMessage(''); // Clear previous success message
    setError(''); // Clear previous error message
    // Remove the unused variable 'isLoading'
    try {
      const response = await apiService.resetPasswordRequest(email);
      setMessage(response.message);
      setIsLoading(false); // Hide the spinner before starting the delay

      setTimeout(() => {
        router.push('/accounts/signin');
      }, 4000); // Delay before redirection
    } catch (error: unknown) {
      // Catch clause has type 'unknown'
      setIsLoading(false); // Ensure spinner is hidden in case of an error
      if (error instanceof Error) {
        setError(error.message); // TypeScript knows error is an Error object
      } else {
        setError('Details no found'); // Generic error message for unknown types
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Reset Password Page</title>
      </Head>

      <div className={styles.formSide}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor='email' className={styles.label}>
              Email:
            </label>
            <input
              type='email'
              id='email'
              className={styles.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <button type='submit' className={styles.loginButton}>
            Send Reset Link
          </button>
          <br></br>
          {message !== '' && <p className={styles.message}>{message}</p>}
          {error !== '' && <p className={styles.error}>{error}</p>}
        </form>
      </div>
      <div className={styles.imageSide}>
        <Image
          src='/images/login.png' // Replace with the path to your actual image
          alt='Workspace Background'
          layout='fill'
          objectFit='cover'
          priority // This will prioritize loading of the image
        />
      </div>
    </div>
  );
};

export default PasswordResetRequestForm;
