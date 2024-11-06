import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const useAuth = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Simulate fetching user data from an API on component mount
  useEffect(() => {
    // Only fetch if the user is not already set
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data); // Assuming the API returns the user object directly
          setReady(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
          setReady(true); // Ensure ready is set even if there is an error
        });
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setReady(true); // Consider setting ready when logging in
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, login, logout, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}
