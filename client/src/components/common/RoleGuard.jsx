// src/components/common/RoleGuard.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

/**
 * Restricts access to routes based on user.role.
 * Must be used inside <ProtectedRoute /> so that user is guaranteed to exist.
 */
const RoleGuard = ({ allowedRoles }) => {
  const { user } = useAuthContext();

  // Safety: if somehow not logged in, send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // You can route to a dedicated Unauthorized page if you prefer
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;