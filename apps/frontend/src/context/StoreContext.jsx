import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [mode, setMode] = useState('retail'); // 'retail' or 'wholesale'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'retail' ? 'wholesale' : 'retail'));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleEnquiry = () => setIsEnquiryOpen(!isEnquiryOpen);

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prevCart, { ...product, quantity: qty }];
    });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider value={{ 
      mode, toggleMode, 
      isCartOpen, toggleCart,
      isEnquiryOpen, toggleEnquiry,
      cart, addToCart, removeFromCart, clearCart
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
