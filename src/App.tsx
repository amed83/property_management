import './App.css';
import Dashboard from './containers/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { Profile } from './containers/Profile';
import { Button } from '@mui/material';
import { useAuthDispatch } from './hooks/useAuthDispatch';
import { useAuthState } from './hooks/useAuthState';

function App() {
  const { isLoggedIn } = useAuthState();
  const dispatch = useAuthDispatch();

  return (
    <>
      {!isLoggedIn ? (
        <Button onClick={() => dispatch({ type: 'LOGIN' })}>Login</Button>
      ) : (
        <Button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Button>
      )}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
