import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import authStore from '../store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useSnapshot(authStore);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to authentication page, but save the location they were trying to access
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
