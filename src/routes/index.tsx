import { Route, Routes } from 'react-router-dom';
import { lazyImport } from '../utils/lazyImport';
import { ProtectedRoutes } from './ProtectedRoutes';

const { Login } = lazyImport(
  () => import('features/auth/components/Login'),
  'Login',
);
const { Profile } = lazyImport(
  () => import('features/profile/components/Profile'),
  'Profile',
);

const { Dashboard } = lazyImport(
  () => import('features/dashboard'),
  'Dashboard',
);

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
