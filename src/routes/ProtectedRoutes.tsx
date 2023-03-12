import { useAuthState } from 'hooks/useAuthState';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuthState();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ redirectTo: location }} />
  );
};
