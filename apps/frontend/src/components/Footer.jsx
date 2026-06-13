import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [settings, setSettings] = useState({
    contactEmail: 'support@karshimart.com',
    contactPhone: '+1 (800) 555-AGRI',
    address: '123 Harvest Blvd, \nGreen Valley, AG 45678'
  });

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if(data) setSettings({...settings, ...data});
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className="bg-[var(--color-agri-brown-dark)] text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Description */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Sprout className="h-8 w-8 text-[var(--color-agri-green)]" />
            <span className="text-2xl font-bold tracking-tight">
              {settings.websiteName?.split(' ')[0] || 'Karshi'}<span className="text-[var(--color-agri-green)]">{settings.websiteName?.split(' ')[1] || 'Mart'}</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering global agriculture with premium seeds, tools, and sustainable farming solutions for both retail consumers and wholesale partners.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-[var(--color-agri-green)] transition">Catalogue</Link></li>
            <li><Link to="/about" className="hover:text-[var(--color-agri-green)] transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-agri-green)] transition">Contact</Link></li>
            <li><Link to="/login" className="hover:text-[var(--color-agri-green)] transition">Sign In</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-[var(--color-agri-green)] shrink-0" />
              <span className="whitespace-pre-line">{settings.address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-[var(--color-agri-green)] shrink-0" />
              <span>{settings.contactPhone}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-[var(--color-agri-green)] shrink-0" />
              <span>{settings.contactEmail}</span>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 pb-2">Follow Us</h3>
          <p className="text-sm text-gray-400 mb-2 mt-4">Subscribe to our newsletter</p>
          <div className="flex">
            <input type="email" placeholder="Email address" className="px-3 py-2 w-full bg-gray-800 text-white border border-gray-700 rounded-l focus:outline-none focus:border-[var(--color-agri-green)]" />
            <button className="bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] px-4 py-2 rounded-r text-white transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} KarshiMart. Built by Vansh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
