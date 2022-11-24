import './App.css';
import Dashboard from './containers/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { Profile } from './containers/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
