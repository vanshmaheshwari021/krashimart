import { API_URL } from '../config/api';
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPanel = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, clearCart } = useStore();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      toggleCart();
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);
    try {
      const orderData = {
        orderItems: cart.map(item => ({
          product: String(item.id || item._id), // Force string
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        customerDetails: {
          name: user.name,
          email: user.email,
          phone: 'N/A'
        },
        shippingAddress: {
          address: 'Default Shipping Address',
          city: 'Default City'
        },
        paymentMethod: 'COD',
        totalPrice: total
      };

      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setCheckoutSuccess(true);
        clearCart();
      } else {
        alert("Checkout failed. Server returned " + res.status);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Network error during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleContinueShopping = () => {
    setCheckoutSuccess(false);
    toggleCart();
  };

  const handleTrackOrder = () => {
    setCheckoutSuccess(false);
    toggleCart();
    navigate('/profile');
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 transition-opacity backdrop-blur-sm"
          onClick={toggleCart}
        />
      )}
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <span>🛒</span> Your Cart ({checkoutSuccess ? 0 : cart.reduce((acc, i) => acc + i.quantity, 0)})
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed!</p>
              <p className="text-gray-500 font-medium mb-8">Thank you for your purchase.</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={handleTrackOrder}
                  className="w-full bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] text-white font-bold py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Track Your Order
                </button>
                <button 
                  onClick={handleContinueShopping}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4 opacity-50">🛍️</div>
              <p className="text-gray-500 font-medium text-lg">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add some farm-fresh products to get started.</p>
              <button onClick={toggleCart} className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                    <div className="text-sm text-gray-500 mt-1">Qty: {item.quantity} × ₹{item.price}</div>
                    <div className="font-extrabold text-[var(--color-agri-green-dark)] mt-1">₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && !checkoutSuccess && (
          <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-semibold text-lg">Total</span>
              <span className="text-3xl font-extrabold text-[var(--color-agri-green-dark)]">₹{total.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={isCheckingOut}
              className="w-full bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-lg disabled:opacity-50"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout →'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;
