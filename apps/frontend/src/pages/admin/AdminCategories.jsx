import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Edit, Trash2, Plus, X } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', displayOrder: 0, image: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        displayOrder: category.displayOrder || 0,
        image: category.image || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', displayOrder: categories.length + 1, image: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingCategory 
      ? `http://localhost:5000/api/categories/${editingCategory._id}`
      : `${API_URL}/api/categories`;
    
    const method = editingCategory ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchCategories();
        handleCloseModal();
      } else {
        alert('Failed to save category');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? Make sure no products are using it.')) {
      try {
        const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          fetchCategories();
        } else {
          alert('Failed to delete category');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Manage Categories</h3>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[var(--color-agri-green)] text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-[var(--color-agri-green-dark)] transition-colors">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl font-bold">Category Name</th>
              <th className="px-6 py-4 font-bold">Slug</th>
              <th className="px-6 py-4 font-bold text-center">Order</th>
              <th className="px-6 py-4 rounded-tr-xl text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c._id} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{c.name}</td>
                <td className="px-6 py-4 text-gray-600">{c.slug}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 text-center">{c.displayOrder}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenModal(c)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                  <input type="text" required value={formData.name} onChange={e => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setFormData({...formData, name, slug: editingCategory ? formData.slug : slug})
                  }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                  <input type="number" required value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-xl font-bold text-white bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] transition-colors">
                  {editingCategory ? 'Save' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
