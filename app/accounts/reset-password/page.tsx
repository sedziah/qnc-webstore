// app/accounts/reset-password/page.tsx

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../../services/apiService';
import styles from './page.module.css';
import Image from 'next/image';
import Head from 'next/head';

interface ApiResponse {
  message: string;
}

const PasswordResetRequestForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response: ApiResponse =
        await apiService.resetPasswordRequest(email);
      setMessage(response.message);

      setTimeout(() => {
        router.push('/accounts/signin');
      }, 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Reset Password Page</title>
      </Head>

      <div className={styles.formSide}>
        <form
          className={styles.loginForm}
          onSubmit={(e) => {
            handleSubmit(e).catch(console.error);
          }}
        >
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
          <br />
          {message !== '' && <p className={styles.message}>{message}</p>}
          {error !== '' && <p className={styles.error}>{error}</p>}
        </form>
      </div>
      <div className={styles.imageSide}>
        <Image
          src='/images/login.png'
          alt='Workspace Background'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
    </div>
  );
};

export default PasswordResetRequestForm;
