// contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { apiService } from "../../../services/apiService";

interface AuthContextType {
  user: any; // Replace 'any' with the type of your user object
  isAuthenticated: boolean; // Add this line to your context type
  login: (email: string, password: string) => Promise<void>;
  logoutUser: () => void; // You should have a logout function as well
}

// Set initial isAuthenticated state based on the presence of a token in local storage
const initialIsAuthenticated = !!localStorage.getItem("token");

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: initialIsAuthenticated, // Provide an initial value
  login: async () => {},
  logoutUser: () => {}, // Stub for logoutUser
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialIsAuthenticated
  );

  const login = async (email: string, password: string) => {
    try {
      const data = await apiService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true); // Update the isAuthenticated state
      localStorage.setItem("token", data.token); // Store the token
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false); // Update the isAuthenticated state
    localStorage.removeItem("token"); // Clear the token from local storage
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
