// components/SignUpSuccessModal.tsx
import React from "react";
import styles from "./modal.module.css"; // Ensure this is the correct path to your CSS module

interface SignUpSuccessModalProps {
  onSignInClick: () => void;
}

const SignUpSuccessModal: React.FC<SignUpSuccessModalProps> = ({
  onSignInClick,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Prevents click inside the modal from closing it */}
        <p>
          Account successfully created. Check your email to activate your
          account.
        </p>
        <button onClick={onSignInClick} className={styles.signInButton}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccessModal;
