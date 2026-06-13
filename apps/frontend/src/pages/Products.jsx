import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Search, ShoppingCart } from 'lucide-react';

import { API_URL } from '../config/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Products = () => {
  const { mode, toggleEnquiry, addToCart } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = ['All', 'Seeds', 'Spices', 'Pulses', 'Organic', 'Tools'];

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    if (!user) {
      navigate('/register');
    } else {
      addToCart(product);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || (p.category && (p.category.name || p.category) === activeCategory);
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex-grow bg-gray-50 pb-20">
      
      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products — wheat, turmeric, manure..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-agri-green)] focus:border-transparent outline-none transition bg-gray-50 hover:bg-white text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap border ${
                  activeCategory === cat 
                    ? 'bg-[var(--color-agri-green)] text-white border-[var(--color-agri-green)] shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <div className="mb-10">
          <span className="text-[var(--color-agri-green)] font-bold tracking-wider text-xs uppercase">Featured Products</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Farm-Fresh, Quality Assured</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col hover:-translate-y-1">
              {/* Product Image Area */}
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badge === 'organic' && (
                    <span className="bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-green-100">
                      🌿 Organic
                    </span>
                  )}
                  {product.badge === 'bulk' && mode === 'wholesale' && (
                    <span className="bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-amber-100">
                      📦 Bulk Available
                    </span>
                  )}
                  {product.badge === 'new' && (
                    <span className="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-blue-100">
                      ✨ New Arrival
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{product.category?.name || product.category}</div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-[var(--color-agri-green)] transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-grow">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-500 ml-1">/ {product.unit}</span>
                  </div>
                  
                  {mode === 'retail' ? (
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] text-white p-2.5 rounded-xl transition-transform hover:scale-105 shadow-md flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => { e.preventDefault(); toggleEnquiry(); }}
                      className="bg-[var(--color-agri-brown-dark)] hover:bg-[var(--color-agri-brown-light)] text-white px-4 py-2 rounded-xl text-xs font-bold transition-transform hover:scale-105 shadow-md"
                    >
                      Enquire
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
