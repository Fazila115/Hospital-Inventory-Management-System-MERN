import React from "react";
import { Navigate } from "react-router-dom";
import { errorToast } from '../helper/toastify.js'

const ProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    errorToast('Please login to continue!');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
