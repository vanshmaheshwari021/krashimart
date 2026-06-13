import { API_URL } from '../config/api';
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Send, CheckCircle } from 'lucide-react';

const EnquiryModal = () => {
  const { isEnquiryOpen, toggleEnquiry } = useStore();
  const [formData, setFormData] = useState({
    contactPerson: '',
    companyName: '',
    phone: '',
    email: '',
    productOfInterest: '',
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isEnquiryOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format message to include product of interest
    const finalMessage = formData.productOfInterest 
      ? `Product of Interest: ${formData.productOfInterest}\n\n${formData.message}`
      : formData.message;

    try {
      const res = await fetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactPerson: formData.contactPerson,
          companyName: formData.companyName,
          phone: formData.phone,
          email: formData.email,
          quantity: formData.quantity,
          message: finalMessage
        })
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          toggleEnquiry();
        }, 3000);
      } else {
        alert('Failed to submit enquiry');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <button onClick={toggleEnquiry} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-10 md:p-12">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Enquiry Sent!</h2>
              <p className="text-gray-500">Our team will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center sm:text-left">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center justify-center sm:justify-start gap-3">
                  <span>📋</span> Submit Business Enquiry
                </h2>
                <p className="text-gray-500">Our team will contact you within 24 hours with pricing and availability.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                    <input required type="text" name="contactPerson" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input required type="text" name="companyName" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all" placeholder="Your company" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input required type="tel" pattern="[0-9]*" name="phone" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all" placeholder="Numbers only (e.g. 9876543210)" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input required type="email" name="email" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all" placeholder="you@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product of Interest</label>
                    <select name="productOfInterest" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all text-gray-700">
                      <option value="">Select a product...</option>
                      <option value="Premium Wheat Seeds">Premium Wheat Seeds</option>
                      <option value="Organic Compost Manure">Organic Compost Manure</option>
                      <option value="General Bulk Enquiry">General Bulk Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Required</label>
                    <input type="number" min="1" name="quantity" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all" placeholder="e.g. 500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea required rows="3" name="message" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-agri-brown-dark)] outline-none bg-gray-50 transition-all resize-none" placeholder="Describe your requirements, delivery location..."></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={toggleEnquiry} className="flex-1 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 rounded-xl font-bold text-white bg-[var(--color-agri-brown-dark)] hover:bg-[var(--color-agri-brown-light)] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Submit Enquiry'} <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
