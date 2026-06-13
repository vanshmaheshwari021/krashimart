import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, passwordlessLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        window.open('/admin', '_blank');
        navigate('/profile'); // Redirect current tab to profile
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await passwordlessLogin(name, email);
    setIsLoading(false);
    
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-agri-green)] to-[var(--color-agri-blue-light)]" />
        
        <h2 className="text-3xl font-extrabold text-center text-[var(--color-agri-brown-dark)] mb-2">
          {isAdminMode ? 'Admin Login' : 'Welcome'}
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          {isAdminMode ? 'Sign in with your admin credentials' : 'Enter your details to track orders and checkout securely.'}
        </p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 font-medium">{error}</div>}

        {!isAdminMode ? (
          <form onSubmit={handleCustomerLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="john@example.com"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-brown-dark)] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Log In Securely'
              )}
            </button>
            
            <div className="text-center mt-6 flex flex-col gap-3">
              <div className="text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="text-[var(--color-agri-green)] font-bold hover:underline">Sign Up</Link>
              </div>
              <button 
                type="button"
                onClick={() => setIsAdminMode(true)}
                className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                Log in as Admin
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Username</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-brown-dark)] text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Sign In to Dashboard
            </button>
            
            <div className="text-center mt-6">
              <button 
                type="button"
                onClick={() => setIsAdminMode(false)}
                className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Back to Customer Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
