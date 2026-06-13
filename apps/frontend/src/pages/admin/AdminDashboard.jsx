import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/products" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-400">Total Products</div>
            <div className="text-2xl font-extrabold text-gray-900">{stats.totalProducts}</div>
          </div>
        </Link>

        <Link to="/admin/enquiries" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-400">Enquiries</div>
            <div className="text-2xl font-extrabold text-gray-900">{stats.totalEnquiries}</div>
          </div>
        </Link>

        <Link to="/admin/orders" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-400">Total Orders</div>
            <div className="text-2xl font-extrabold text-gray-900">{stats.totalOrders}</div>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-50 text-[var(--color-agri-green)] flex items-center justify-center">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-400">Revenue</div>
            <div className="text-2xl font-extrabold text-gray-900">₹{(stats.totalRevenue || 0).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Enquiries</h3>
          {(!stats.recentEnquiries || stats.recentEnquiries.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Users className="w-12 h-12 mb-2 opacity-20" />
              <p>No recent enquiries found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentEnquiries.map(enq => (
                <div key={enq._id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-gray-800">{enq.companyName}</span>
                    <span className="text-xs text-gray-400">{new Date(enq.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-gray-600 truncate">{enq.message}</div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Link to="/admin/enquiries" className="text-sm font-bold text-[var(--color-agri-green)] hover:underline">View All</Link>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Orders</h3>
          {(!stats.recentOrders || stats.recentOrders.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <ShoppingBag className="w-12 h-12 mb-2 opacity-20" />
              <p>No recent orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map(order => (
                <div key={order._id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-gray-800">{order.customerName}</div>
                    <div className="text-xs font-mono text-gray-400">#{order._id.substring(18)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-[var(--color-agri-green-dark)]">₹{order.totalAmount?.toLocaleString()}</div>
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{order.status}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Link to="/admin/orders" className="text-sm font-bold text-[var(--color-agri-green)] hover:underline">View All</Link>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
