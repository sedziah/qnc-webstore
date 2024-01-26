// SignUp.jsx
"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/contexts/AuthContext"; // Adjust path as needed
import { apiService } from "../../services/apiService";
import Head from "next/head";
import Image from "next/image";
import SignUpSuccessModal from "../../components/signupModal/signupModal";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [signedUp, setSignedUp] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Proceed with the API call to sign up the user
    try {
      // Call your API service to sign up the user
      // Make sure to only send the necessary fields (not confirmPassword)
      const { confirmPassword, ...signupData } = formData;
      const response = await apiService.register(
        signupData.email,
        signupData.firstName,
        signupData.lastName,
        signupData.password
      );

      // Handle response, store token, etc.

      // router.push("/signin"); // Redirect to signin after sign up completion
      setSignedUp(true); // Set signedUp to true after successful registration
      setError(""); // Clear any previous errors
    } catch (err) {
      // Handle errors, display message to user
      // setError(err.message);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred"); // Generic error message
      }
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResendVerification = async () => {
    try {
      await apiService.resendVerificationEmail(formData.email);
      alert("Verification email resent! Please check your inbox.");
    } catch (err) {
      // setError(err.message);
      if (err instanceof Error) {
        setError(err.message); // Now TypeScript knows err is an Error object
      } else {
        setError("An unexpected error occurred"); // Generic error message for unknown types
      }
    }
  };

  const handleSignInClick = () => {
    router.push("/signin"); // Redirect to sign-in page
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
      </Head>

      <div className={styles.formSide}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastname">Last Name *</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Sign Up
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
      <div className={styles.imageSide}>
        <Image
          src="/images/signup.png"
          alt="Workspace Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      {signedUp && <SignUpSuccessModal onSignInClick={handleSignInClick} />}
    </div>
  );
};

export default Page;

//<div className={styles.container}>
//   <div className={styles.formContainer}>
//     <form onSubmit={handleSubmit}>
//       <h1>Sign Up </h1>
//       <br></br>
//       <input
//         type="text"
//         name="firstName"
//         className={styles.inputField}
//         placeholder="First Name"
//         onChange={handleChange}
//         value={formData.firstName}
//         required
//       />
//       <input
//         type="text"
//         name="lastName"
//         className={styles.inputField}
//         placeholder="Last Name"
//         onChange={handleChange}
//         value={formData.lastName}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         className={styles.inputField}
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         className={styles.inputField}
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="confirmPassword"
//         className={styles.inputField}
//         placeholder="Repeat Password"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         required
//       />
//       <button className={styles.submitButton}>Continue</button>
//       {error && <p className={styles.error}>{error}</p>}
//     </form>
//     <Link href="/signin">Sign In</Link>

//     {/* <div className={styles.separator}>
//       <span className={styles.separatorLine}>or</span>
//     </div>

//     <button className={`${styles.submitButton} ${styles.socialButton}`}>
//       Continue with Facebook
//     </button>
//     <button className={`${styles.submitButton} ${styles.socialButton}`}>
//       Continue with Google
//     </button>
//     <button className={`${styles.submitButton} ${styles.socialButton}`}>
//       Continue with Apple
//     </button> */}
//   </div>
// </div>
