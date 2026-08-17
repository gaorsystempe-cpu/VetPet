import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Pages
import Home from './pages/Home';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAppointments from './pages/admin/Appointments';
import AdminServices from './pages/admin/Services';
import AdminProducts from './pages/admin/Products';
import AdminClients from './pages/admin/Clients';
import AdminSales from './pages/admin/Sales';
import AdminLayout from './components/admin/AdminLayout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('vetpet_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = () => {
    localStorage.setItem('vetpet_admin_session', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('vetpet_admin_session');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            <Route 
              path="/admin/login" 
              element={!isAuthenticated ? <AdminLogin onLogin={login} /> : <Navigate to="/admin/dashboard" />} 
            />
            
            <Route 
              path="/admin" 
              element={isAuthenticated ? <AdminLayout onLogout={logout} /> : <Navigate to="/admin/login" />}
            >
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="sales" element={<AdminSales />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
