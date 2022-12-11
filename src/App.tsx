import './App.css';
import Dashboard from './containers/Dashboard';
import { Routes, Route, Link } from 'react-router-dom';
import { Profile } from './containers/Profile';
import { Button } from '@mui/material';
import { useAuthDispatch } from './hooks/useAuthDispatch';
import { Login } from './features/auth/components/Login';
import { logout } from './providers/AuthProvider';
import { useAuthState } from './hooks/useAuthState';

function App() {
  const { isLoggedIn } = useAuthState();
  const dispatch = useAuthDispatch();

  return (
    <>
      {!isLoggedIn ? (
        <Link to="/login">Login</Link>
      ) : (
        <Button onClick={() => logout(dispatch)}>Logout</Button>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
