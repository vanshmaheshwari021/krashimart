import { API_URL } from '../config/api';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck, Star, Minus, Plus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode, toggleEnquiry, addToCart } = useStore();
  const { user } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  
  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // In real app, fetch product from API using id (which is now a mongo ObjectID likely, but for now we mix mock data & API).
  // Wait, our backend uses ObjectId. If the user clicks from home, it uses mockProducts which have integer IDs. 
  // Let's check if the ID is numeric (mock data) or MongoDB ObjectId.
  // We'll try to find it in mockProducts first, otherwise we would fetch it.
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductAndReviews();
  }, [id]);

  const fetchProductAndReviews = async () => {
    let foundProduct = null;
    let allProducts = [];
    try {
      const res = await fetch(`${API_URL}/api/products`);
      allProducts = await res.json();
      foundProduct = allProducts.find(p => p._id === id || p.slug === id);
    } catch (err) {
      console.error("Error fetching products", err);
    }
    
    setProduct(foundProduct);

    if (foundProduct && allProducts.length > 0) {
      // Find related products
      const categoryId = typeof foundProduct.category === 'object' ? foundProduct.category._id : foundProduct.category;
      const related = allProducts.filter(p => {
        const pCat = typeof p.category === 'object' ? p.category._id : p.category;
        return pCat === categoryId && p._id !== foundProduct._id;
      }).slice(0, 4);
      setRelatedProducts(related);
    }

    // Fetch approved reviews from backend for this product
    if (foundProduct) {
      // Use the ID we have (either string or int)
      const productId = foundProduct._id || foundProduct.id;
      try {
        const res = await fetch(`${API_URL}/api/reviews/product/${productId}`);
        const data = await res.json();
        if (res.ok) {
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-agri-green)] mb-4"></div>
        <h2 className="text-xl font-bold text-gray-500">Loading Product...</h2>
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'inc' && quantity < 50) setQuantity(q => q + 1);
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const productId = String(product._id || product.id);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productId,
          name: reviewName,
          rating: reviewRating,
          comment: reviewComment
        })
      });
      if (res.ok) {
        setReviewSubmitted(true);
        setReviewName('');
        setReviewComment('');
        setReviewRating(5);
      } else {
        alert('Failed to submit review: Server returned ' + res.status);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        {/* Product Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="bg-gray-100 relative h-[400px] lg:h-auto">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge === 'organic' && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-green-700 px-4 py-1.5 rounded-full font-bold shadow-lg border border-green-100 flex items-center gap-2">
                  🌿 Certified Organic
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="text-sm font-bold text-[var(--color-agri-green)] uppercase tracking-widest mb-2">
                {typeof product.category === 'object' ? product.category.name : product.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-2 mb-6 cursor-pointer hover:underline" onClick={() => document.getElementById('reviews').scrollIntoView({behavior:'smooth'})}>
                <div className="flex text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current opacity-50" />
                </div>
                <span className="text-sm text-gray-500 font-medium">4.8 ({reviews.length} reviews)</span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                {product.desc || product.description || "Sourced directly from verified farmers ensuring the highest quality standards."}
              </p>

              <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <div className="text-gray-500 font-medium mb-1">Total Price</div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-gray-900">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                    <span className="text-lg text-gray-500 mb-1">({product.price} / {product.unit || 'unit'})</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                {mode === 'retail' && (
                  <div>
                    <div className="text-gray-500 font-medium mb-1">Quantity (Max 50)</div>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                      <button onClick={() => handleQuantityChange('dec')} className="p-3 hover:bg-gray-200 text-gray-600 transition-colors">
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="w-16 text-center font-bold text-lg">{quantity}</div>
                      <button onClick={() => handleQuantityChange('inc')} className="p-3 hover:bg-gray-200 text-gray-600 transition-colors">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {mode === 'retail' ? (
                  <button 
                    onClick={() => {
                      if (!user) {
                        navigate('/register');
                      } else {
                        addToCart(product, quantity);
                      }
                    }}
                    className="flex-1 bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                  >
                    <ShoppingCart className="w-6 h-6" /> Add to Cart
                  </button>
                ) : (
                  <button 
                    onClick={toggleEnquiry}
                    className="flex-1 bg-[var(--color-agri-brown-dark)] hover:bg-[var(--color-agri-brown-light)] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-1 text-lg"
                  >
                    Request Bulk Quote
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">100% Quality Assured</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-gray-700">Pan-India Delivery</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-12 mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Reviews List */}
            <div className="col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-gray-500 italic">No reviews yet. Be the first to review this product!</div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-gray-900">{review.name}</div>
                      <div className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex text-amber-400 mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-current' : 'opacity-30'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave a Review Form */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Write a Review</h3>
              {reviewSubmitted ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200">
                  Thanks for your feedback! Your review has been submitted and is pending admin approval.
                </div>
              ) : (
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                    <input type="text" required value={reviewName} onChange={e => setReviewName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                    <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none">
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Comment</label>
                    <textarea required rows="3" value={reviewComment} onChange={e => setReviewComment(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none" placeholder="What did you think of the quality?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[var(--color-agri-brown-dark)] hover:bg-[var(--color-agri-brown-light)] text-white font-bold py-2 rounded-lg transition-colors shadow-md">
                    Submit Review
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link to={`/product/${relProduct._id}`} key={relProduct._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col hover:-translate-y-1">
                  <div className="h-40 relative overflow-hidden bg-gray-100">
                    <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-[var(--color-agri-green)] transition-colors line-clamp-1">{relProduct.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">₹{relProduct.price} / {relProduct.unit}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
