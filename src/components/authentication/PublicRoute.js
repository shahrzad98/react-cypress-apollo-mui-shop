import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

const PublicRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.isLoggedIn ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
