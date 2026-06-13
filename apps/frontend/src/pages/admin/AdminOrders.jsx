import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, MapPin, Truck, CheckCircle } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <h3 className="font-bold text-lg text-gray-800 mb-6">Manage Retail Orders</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl font-bold">Order ID & Date</th>
              <th className="px-6 py-4 font-bold">Customer Info</th>
              <th className="px-6 py-4 font-bold">Total Amount</th>
              <th className="px-6 py-4 font-bold">Payment</th>
              <th className="px-6 py-4 font-bold">Delivery</th>
              <th className="px-6 py-4 rounded-tr-xl text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8">No orders found.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-gray-400 mb-1">{order._id}</div>
                    <div className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{order.customerName || 'Unknown'}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {order.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ₹{order.totalAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-y-2">
                    {order.status !== 'Delivered' && (
                      <button onClick={() => updateStatus(order._id, 'Delivered')} className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-1 px-3 rounded text-xs transition-colors">
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
