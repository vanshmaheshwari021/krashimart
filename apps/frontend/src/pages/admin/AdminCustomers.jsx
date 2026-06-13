import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users } from 'lucide-react';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setCustomers(data);
      }
    } catch (err) {
      console.error('Failed to fetch customers', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading customers...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-[var(--color-agri-green)]" />
          Registered Customers
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Email Address</th>
              <th className="p-4 font-semibold text-gray-600">Account Type</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((user) => (
              <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 text-gray-500 font-mono text-sm">{user._id.substring(18)}</td>
                <td className="p-4 font-bold text-gray-900">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">
                  <select 
                    value={user.role} 
                    onChange={async (e) => {
                      const newRole = e.target.value;
                      if(window.confirm(`Change role to ${newRole}?`)) {
                        try {
                          const res = await fetch(`http://localhost:5000/api/auth/users/${user._id}/role`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ role: newRole })
                          });
                          if(res.ok) fetchCustomers();
                        } catch (err) { console.error(err); }
                      }
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold outline-none cursor-pointer border ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                      user.role === 'b2b' ? 'bg-[var(--color-agri-brown-light)]/20 text-[var(--color-agri-brown-dark)] border-orange-200' : 
                      'bg-green-100 text-green-700 border-green-200'
                    }`}
                  >
                    <option value="b2c">Retail (B2C)</option>
                    <option value="b2b">Wholesale (B2B)</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No customers registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
