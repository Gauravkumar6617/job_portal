import { createContext, useEffect, useMemo, useState } from "react";
import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "../utils/storage.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = ({ accessToken, user: loggedInUser }) => {
    setToken(accessToken);
    setStoredUser(loggedInUser);
    setUser(loggedInUser);
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
