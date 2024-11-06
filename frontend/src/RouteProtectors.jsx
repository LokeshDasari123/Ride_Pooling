// RouteProtectors.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./UserContext"; // Ensure this path is correct

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    // Redirect to some default route like dashboard if the user is already logged in
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
