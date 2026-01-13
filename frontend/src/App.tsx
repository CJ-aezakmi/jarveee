import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Campaigns from './pages/Campaigns';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/*"
        element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
        }
      />
    </Routes>
  );
}

export default App;
