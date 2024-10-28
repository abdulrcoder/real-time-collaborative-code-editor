import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // Check if a token exists in session storage
  const token = sessionStorage.getItem("token");

  // If the token exists, redirect to the dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children; // If no token, render the child component
};

export default PublicRoute;
