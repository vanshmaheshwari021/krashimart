import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, Calendar, CheckCircle } from 'lucide-react';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEnquiries(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchEnquiries();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <h3 className="font-bold text-lg text-gray-800 mb-6">Manage Wholesale Enquiries</h3>

      <div className="space-y-4">
        {enquiries.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No enquiries found.</div>
        ) : (
          enquiries.map(enq => (
            <div key={enq._id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-gray-50 flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg text-gray-900">{enq.contactPerson} <span className="text-sm font-normal text-gray-500">({enq.companyName})</span></h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    enq.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                    enq.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1"><Phone className="w-4 h-4" /> {enq.phone}</div>
                  <div className="flex items-center gap-1"><Mail className="w-4 h-4" /> {enq.email}</div>
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(enq.createdAt).toLocaleDateString()}</div>
                </div>

                <div className="mt-3">
                  <span className="text-xs font-bold uppercase text-gray-400">Requirements/Message:</span>
                  <p className="text-gray-700 bg-white p-3 rounded-lg border border-gray-100 mt-1">
                    {enq.quantity ? <strong className="block mb-1">Quantity: {enq.quantity}</strong> : null}
                    {enq.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-start items-end min-w-[140px]">
                {enq.status !== 'Resolved' && (
                  <button onClick={() => updateStatus(enq._id, 'Resolved')} className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg font-bold transition-colors text-sm">
                    <CheckCircle className="w-4 h-4" /> Mark Resolved
                  </button>
                )}
                {enq.status === 'New' && (
                  <button onClick={() => updateStatus(enq._id, 'Contacted')} className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold transition-colors text-sm">
                    Mark Contacted
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
