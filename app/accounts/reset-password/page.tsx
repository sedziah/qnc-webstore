// app/accounts/reset-password/page.tsx

"use client";
import { useState } from "react";
import { apiService } from "../../../services/apiService";

const PasswordResetRequestForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // Added state for error message

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(""); // Clear previous success message
    setError(""); // Clear previous error message
    try {
      const response = await apiService.resetPasswordRequest(email);
      setMessage(response.message); // Set the success message
    } catch (error: unknown) {
      // Catch clause has type 'unknown'
      if (error instanceof Error) {
        setError(error.message); // TypeScript knows error is an Error object
      } else {
        setError("An unexpected error occurred"); // Generic error message for unknown types
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message here */}
    </div>
  );
};

export default PasswordResetRequestForm;
