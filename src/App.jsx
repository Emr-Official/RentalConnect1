import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import BrokerDashboard from './pages/BrokerDashboard';
import AddEditListing from './pages/AddEditListing';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedRoute({ children, roles }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<PropertyDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/favorites" element={<ProtectedRoute roles={['client']}><FavoritesPage /></ProtectedRoute>} />
          <Route path="/broker" element={<ProtectedRoute roles={['broker']}><BrokerDashboard /></ProtectedRoute>} />
          <Route path="/broker/add" element={<ProtectedRoute roles={['broker']}><AddEditListing /></ProtectedRoute>} />
          <Route path="/broker/edit/:id" element={<ProtectedRoute roles={['broker']}><AddEditListing /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return <AppProvider><AppRoutes /></AppProvider>;
}
