import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Edit, Trash2, Plus, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', price: '', category: '', visibility: 'Both', stock: 0, image: '', description: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        price: product.price,
        category: product.category ? product.category._id : '',
        visibility: product.visibility,
        stock: product.stock,
        image: product.image,
        description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', slug: '', price: '', category: categories[0]?._id || '', visibility: 'Both', stock: 0, image: '', description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProduct 
      ? `http://localhost:5000/api/products/${editingProduct._id}`
      : `${API_URL}/api/products`;
    
    const method = editingProduct ? 'PUT' : 'POST';

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
        fetchProducts();
        handleCloseModal();
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          fetchProducts();
        } else {
          alert('Failed to delete product');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Manage Products</h3>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-[var(--color-agri-green)] text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-[var(--color-agri-green-dark)] transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl font-bold">Product Name</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Price</th>
              <th className="px-6 py-4 font-bold">Stock</th>
              <th className="px-6 py-4 font-bold">Visibility</th>
              <th className="px-6 py-4 rounded-tr-xl text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                  {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />}
                  {p.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{p.category?.name || 'Uncategorized'}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">₹{p.price}</td>
                <td className="px-6 py-4 text-gray-600">{p.stock}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded border ${
                    p.visibility === 'B2B' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                    p.visibility === 'B2C' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-green-100 text-green-800 border-green-200'
                  }`}>
                    {p.visibility}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleOpenModal(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No products found. Click "Add Product" to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input type="text" required value={formData.name} onChange={e => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setFormData({...formData, name, slug: editingProduct ? formData.slug : slug})
                  }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL friendly)</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Visibility</label>
                  <select value={formData.visibility} onChange={e => setFormData({...formData, visibility: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none">
                    <option value="Both">Both (B2B & B2C)</option>
                    <option value="B2B">B2B Only</option>
                    <option value="B2C">B2C Only</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" placeholder="https://images.unsplash.com/..." />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-xl font-bold text-white bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] transition-colors">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
