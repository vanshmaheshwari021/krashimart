import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import CartPanel from './components/CartPanel';
import EnquiryModal from './components/EnquiryModal';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminReviews from './pages/admin/AdminReviews';
import AdminOrders from './pages/admin/AdminOrders';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSettings from './pages/admin/AdminSettings';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[var(--color-agri-bg)] font-sans text-gray-900 flex flex-col relative">
            <Routes>
              {/* Public App Routes */}
              <Route path="/" element={<div className="flex flex-col min-h-screen pt-20 relative"><Navbar /><Home /><Footer /><CartPanel /><EnquiryModal /></div>} />
              <Route path="/products" element={<div className="flex flex-col min-h-screen pt-20 relative"><Navbar /><Products /><Footer /><CartPanel /><EnquiryModal /></div>} />
              <Route path="/product/:id" element={<div className="flex flex-col min-h-screen pt-20 relative"><Navbar /><ProductDetail /><Footer /><CartPanel /><EnquiryModal /></div>} />
              <Route path="/about" element={<div className="pt-20"><Navbar /><About /><Footer /></div>} />
              <Route path="/contact" element={<div className="pt-20"><Navbar /><Contact /><Footer /></div>} />
              <Route path="/login" element={<div className="pt-20"><Navbar /><Login /><Footer /></div>} />
              <Route path="/register" element={<div className="pt-20"><Navbar /><Register /><Footer /></div>} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<div className="pt-20"><Navbar /><Profile /><Footer /></div>} />
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="enquiries" element={<AdminEnquiries />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
