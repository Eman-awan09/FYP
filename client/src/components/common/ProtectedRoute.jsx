// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

/**
 * Protects private routes. Redirects to /login if not authenticated.
 */
const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;