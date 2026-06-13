import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sprout, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [siteName, setSiteName] = useState('');
  const location = useLocation();
  const { mode, toggleMode, toggleCart } = useStore();

  React.useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.websiteName) setSiteName(data.websiteName);
      })
      .catch(err => console.error("Error fetching site name", err));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-[var(--color-agri-green)] font-bold' : 'text-gray-600 hover:text-[var(--color-agri-green)]';
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-[var(--color-agri-green)]" />
              <span className="text-2xl font-bold text-[var(--color-agri-brown-dark)] tracking-tight">
                {siteName ? siteName : (
                  <>Krishi<span className="text-[var(--color-agri-green)]">Mart</span></>
                )}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors font-medium`}>Home</Link>
            <Link to="/products" className={`${isActive('/products')} transition-colors font-medium`}>Products</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors font-medium`}>About</Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors font-medium`}>Contact</Link>
          </div>

          {/* Icons and Mode Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Mode Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-full relative">
              <button
                onClick={toggleMode}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${mode === 'retail' ? 'text-white' : 'text-gray-500'}`}
              >
                🛒 Retail
              </button>
              <button
                onClick={toggleMode}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${mode === 'wholesale' ? 'text-white' : 'text-gray-500'}`}
              >
                🏭 Wholesale
              </button>
              {/* Sliding background */}
              <div 
                className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-transform duration-300 ease-in-out ${mode === 'retail' ? 'bg-[var(--color-agri-green)] translate-x-0' : 'bg-[var(--color-agri-brown-dark)] translate-x-full'} shadow-sm`}
              />
            </div>
            
            {mode === 'retail' && (
              <button onClick={toggleCart} className="bg-[var(--color-agri-green)] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[var(--color-agri-green-dark)] transition-colors shadow-md">
                <ShoppingCart className="h-4 w-4" />
                <span className="bg-white text-[var(--color-agri-green)] rounded-full w-5 h-5 flex items-center justify-center text-[10px]">0</span>
              </button>
            )}

            <Link to="/profile" className="text-gray-400 hover:text-[var(--color-agri-green)] transition-colors p-2 bg-gray-50 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[var(--color-agri-green)] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={toggleMenu} className={isActive('/')}>Home</Link>
            <Link to="/products" onClick={toggleMenu} className={isActive('/products')}>Products</Link>
            <Link to="/about" onClick={toggleMenu} className={isActive('/about')}>About</Link>
            <Link to="/contact" onClick={toggleMenu} className={isActive('/contact')}>Contact</Link>
            <div className="pt-4 border-t border-gray-100">
              <button onClick={() => { toggleMode(); toggleMenu(); }} className="w-full text-left font-bold text-[var(--color-agri-green)]">
                Switch to {mode === 'retail' ? 'Wholesale' : 'Retail'} Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
