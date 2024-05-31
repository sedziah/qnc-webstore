// SignIn.tsx
'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'; // Remove 'FormEvent' from the import statement
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../auth/contexts/AuthContext';
import Head from 'next/head';
import Image from 'next/image';

const Page: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  useEffect((): void => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>, // Update the type of 'event' to 'React.FormEvent<HTMLFormElement>'
  ): Promise<void> => {
    event.preventDefault();
    setLoginError('');

    try {
      await login(emailOrUsername, password);
      if (isAuthenticated) {
        router.push('/dashboard');
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unknown error occurred.');
      }
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className={styles.formSide}>
        <form
          className={styles.loginForm}
          onSubmit={(e): void => {
            handleSubmit(e).catch(console.error);
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor='username'>Username or Email address *</label>
            <input
              type='text'
              id='username'
              name='username'
              onChange={(e): void => {
                setEmailOrUsername(e.target.value);
              }}
              value={emailOrUsername}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='password'>Password *</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={(e): void => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </div>
          <div className={styles.options}>
            <label>
              <input type='checkbox' id='rememberMe' name='rememberMe' />
              Remember me
            </label>
            <Link
              className={styles.forgotPassword}
              href='/accounts/reset-password'
              passHref
            >
              Forgot password
            </Link>
          </div>
          <button type='submit' className={styles.loginButton}>
            Login
          </button>

          {loginError !== '' && (
            <div
              style={{
                color: 'red',
                marginTop: '10px',
              }}
            >
              {loginError}
            </div>
          )}
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

export default Page;
