// contexts/AuthContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { apiService } from '../../../services/apiService';

interface AuthContextType {
  user: any; // Replace 'any' with the type of your user object
  isAuthenticated: boolean; // Add this line to your context type
  error: string; // Add an error state
  login: (email: string, password: string) => Promise<void>;
  logoutUser: () => void; // You should have a logout function as well
}

// Set initial isAuthenticated state based on the presence of a token in local storage
// const initialIsAuthenticated = !!localStorage.getItem("token");

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false, // Provide an initial value
  error: '', // Add an error state
  login: async () => {},
  logoutUser: () => {}, // Stub for logoutUser
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(''); // Add an error state

  useEffect(() => {
    // Since localStorage is not available on the server, we perform this check on the client side
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    setError(''); // Clear previous errors
    try {
      const data = await apiService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true); // Update the isAuthenticated state
      localStorage.setItem('token', data.token); // Store the token
    } catch (error) {
      setError('An error occurred during login.'); // Set a generic error message
      console.error(error);
      throw error; // You can still throw the error if you want to handle it elsewhere
    }
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false); // Update the isAuthenticated state
    localStorage.removeItem('token'); // Clear the token from local storage
  };

  return (
    <AuthContext.Provider
      value={{ user, error, isAuthenticated, login, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
