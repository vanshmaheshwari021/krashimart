import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, Trash2, Star } from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchReviews(); // Refresh the list
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update review status');
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Manage Customer Reviews</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl font-bold">Product</th>
              <th className="px-6 py-4 font-bold">Customer</th>
              <th className="px-6 py-4 font-bold text-center">Rating</th>
              <th className="px-6 py-4 font-bold w-1/3">Comment</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 rounded-tr-xl text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r._id} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-[var(--color-agri-green)]">{r.product?.name || 'Unknown Product'}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{r.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center text-amber-400">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-gray-900 font-bold">{r.rating}/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 line-clamp-2" title={r.comment}>{r.comment}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                    r.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                    r.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                    'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {r.status === 'Pending' && (
                    <>
                      <button onClick={() => updateStatus(r._id, 'Approved')} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors mr-2" title="Approve">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button onClick={() => updateStatus(r._id, 'Rejected')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {r.status !== 'Pending' && (
                    <button onClick={() => updateStatus(r._id, r.status === 'Approved' ? 'Rejected' : 'Approved')} className="text-xs font-bold text-blue-500 hover:underline">
                      Toggle Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No reviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
