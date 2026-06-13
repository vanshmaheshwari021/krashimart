import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Tags, Settings, LogOut, Menu, X, Star, Sprout, ShoppingBag, Users, ListTree, ShoppingCart, MessageSquare } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Categories', path: '/admin/categories', icon: <ListTree className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <Star className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-[var(--color-agri-green)]" />
            <span className="text-xl font-bold text-[var(--color-agri-brown-dark)] tracking-tight">
              Admin<span className="text-[var(--color-agri-green)]">Panel</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                  isActive 
                    ? 'bg-[var(--color-agri-green)] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-green-50 hover:text-[var(--color-agri-green)]'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-2xl font-extrabold text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.name || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-agri-green-dark)] text-white flex items-center justify-center font-bold shadow-md">
              A
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-900">Super Admin</div>
              <div className="text-xs text-gray-500">admin@karshimart.com</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
