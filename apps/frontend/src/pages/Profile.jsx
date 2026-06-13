import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Package, LogOut, CheckCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, token, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    fetchMyOrders();
    fetchMyEnquiries();
  }, [token]);

  const fetchMyOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyEnquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/api/enquiries/myenquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32 text-center">
              <div className="w-24 h-24 rounded-full bg-[var(--color-agri-green-dark)] text-white flex items-center justify-center text-4xl font-extrabold mx-auto mb-4 shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-500 mb-2">{user.email}</p>
              {user.location && (
                <p className="text-sm font-semibold text-[var(--color-agri-green)] bg-green-50 px-3 py-1 rounded-full inline-block mb-6">
                  {user.location}
                </p>
              )}
              
              <div className="border-t border-gray-100 pt-6 mt-2 flex flex-col gap-3">
                {user.role === 'admin' && (
                  <button 
                    onClick={() => window.open('/admin', '_blank')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white bg-[var(--color-agri-brown-dark)] font-bold shadow-md hover:bg-orange-900 transition-colors"
                  >
                    Go to Admin Panel ↗
                  </button>
                )}
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-red-500 font-bold hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[500px]">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingBag className="w-8 h-8 text-[var(--color-agri-green)]" />
                <h3 className="text-2xl font-extrabold text-gray-900">My Orders</h3>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-24 bg-gray-100 rounded-xl w-full"></div>
                  <div className="h-24 bg-gray-100 rounded-xl w-full"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <Package className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg font-medium">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400 font-mono mb-1">Order #{order._id}</p>
                          <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex gap-3 items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {order.isPaid ? 'Paid' : 'Cash on Delivery'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-800">{item.name}</span>
                              <span className="text-gray-400">x{item.quantity}</span>
                            </div>
                            <span className="font-bold text-gray-600">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">Total Amount</span>
                        <span className="text-xl font-extrabold text-[var(--color-agri-green-dark)]">₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enquiries Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8 min-h-[400px]">
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle className="w-8 h-8 text-[var(--color-agri-brown-dark)]" />
                <h3 className="text-2xl font-extrabold text-gray-900">My Wholesale Enquiries</h3>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-24 bg-gray-100 rounded-xl w-full"></div>
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
                  <Package className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg font-medium">You haven't submitted any wholesale enquiries yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {enquiries.map((enq) => (
                    <div key={enq._id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400 font-mono mb-1">Enquiry #{enq._id}</p>
                          <p className="font-bold text-gray-900">{new Date(enq.createdAt).toLocaleDateString()} at {new Date(enq.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex gap-3 items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            enq.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                            enq.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            enq.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {enq.status || 'New'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-500">Company Name</span>
                          <span className="font-bold text-gray-800">{enq.companyName || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-500">Target Quantity</span>
                          <span className="font-bold text-gray-800">{enq.quantity ? `${enq.quantity} units` : 'N/A'}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50">
                          <span className="font-medium text-gray-500 block mb-2">Message</span>
                          <p className="text-gray-700 italic border-l-4 border-gray-200 pl-4 py-1">{enq.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
