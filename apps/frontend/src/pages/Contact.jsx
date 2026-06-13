import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex-grow bg-gray-50 py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600">
            Whether you have a retail inquiry or want to discuss a bulk wholesale partnership, we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          
          {/* Contact Info */}
          <div className="bg-[var(--color-agri-green)] text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[var(--color-agri-blue-light)] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Our Office</h3>
                    <p className="text-[var(--color-agri-bg)]/80">123 Harvest Blvd, Green Valley, AG 45678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[var(--color-agri-blue-light)] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-[var(--color-agri-bg)]/80">+1 (800) 555-AGRI</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[var(--color-agri-blue-light)] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-[var(--color-agri-bg)]/80">support@karshimart.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-white/20">
              <p className="text-sm font-medium opacity-90">
                Developed by <span className="font-bold text-[var(--color-agri-blue-light)] text-base">Vansh</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none transition" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-agri-green)] outline-none transition resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-[var(--color-agri-brown-dark)] hover:bg-[var(--color-agri-brown-light)] text-white font-bold py-4 rounded-lg flex justify-center items-center space-x-2 transition shadow-md">
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
