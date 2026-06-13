import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [role, setRole] = useState('b2c');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `${firstName} ${lastName}`.trim(), 
          email, 
          password: 'nopasswordneeded', 
          role,
          location: locationStr
        })
      });

      const data = await res.json();
      
      if (!res.ok && data.message !== 'User already exists') {
        throw new Error(data.message || 'Registration failed');
      }

      // Log them in immediately
      const loginRes = await login(email, 'nopasswordneeded');
      setIsLoading(false);

      if (!loginRes.success) {
        setError(loginRes.message);
      }

    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-agri-green)] to-[var(--color-agri-blue-light)]" />
        
        <h2 className="text-3xl font-extrabold text-center text-[var(--color-agri-brown-dark)] mb-2">
          Create Profile
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Join KarshiMart as a Retail Customer or Wholesale Partner
        </p>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 font-medium">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location (City, Country)</label>
              <input 
                type="text" 
                value={locationStr}
                onChange={(e) => setLocationStr(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50"
                placeholder="Mumbai, India"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-[var(--color-agri-green)] transition outline-none bg-gray-50 text-gray-700"
            >
              <option value="b2c">Retail Consumer</option>
              <option value="b2b">Wholesale Business Partner</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-brown-dark)] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-[var(--color-agri-green)] font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
