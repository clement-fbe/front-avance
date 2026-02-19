import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../src/store/hooks';
import { selectIsAuthenticated } from '../src/store/authSlice';

/**
 * Route guard : redirige vers /login si non authentifié.
 */
export default function RequireAuth() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
