import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Leaf, Truck, Star, Factory, Flame, Bean, Wrench, Award, Briefcase, Sprout, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { mode, toggleEnquiry } = useStore();
  const [cmsHome, setCmsHome] = useState(null);
  const [cmsTestimonials, setCmsTestimonials] = useState(null);
  const [cmsBanners, setCmsBanners] = useState(null);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const resHome = await fetch(`${API_URL}/api/cms/home`);
        if (resHome.ok) setCmsHome(await resHome.json());

        const resTesti = await fetch(`${API_URL}/api/cms/testimonials`);
        if (resTesti.ok) setCmsTestimonials(await resTesti.json());

        const resBanners = await fetch(`${API_URL}/api/cms/banners`);
        if (resBanners.ok) setCmsBanners(await resBanners.json());
      } catch (err) {
        console.error("Error fetching CMS", err);
      }
    };
    fetchCMS();
  }, []);

  const heroTitle = cmsHome?.content?.heroTitle || 'Fresh from the Farm, Direct to You';
  const heroSubtitle = cmsHome?.content?.heroSubtitle || 'Premium agricultural products — seeds, spices, pulses, organic manure, and farming tools. Buy retail or source in bulk for your business.';
  const heroBgImage = cmsHome?.content?.heroImage || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Mode Banner */}
      <div className={`py-3 px-6 text-sm font-medium flex items-center justify-center gap-3 transition-colors ${
        mode === 'retail' ? 'bg-green-50 border-b border-green-200' : 'bg-orange-50 border-b border-orange-200'
      }`}>
        <span className={`px-3 py-1 text-xs font-bold rounded-full text-white uppercase tracking-wider ${
          mode === 'retail' ? 'bg-[var(--color-agri-green)]' : 'bg-[var(--color-agri-brown-dark)]'
        }`}>
          {mode === 'retail' ? 'Retail Mode' : 'Wholesale Mode'}
        </span>
        <span className={mode === 'retail' ? 'text-green-800' : 'text-orange-900'}>
          {mode === 'retail' ? 'Browse products, add to cart, and order directly. Prices visible.' : 'Enquiry-based sourcing. Submit bulk enquiries for competitive pricing.'}
        </span>
      </div>

      {/* Top Announcement Banner */}
      {cmsBanners?.content?.topBanner && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4 text-sm font-bold shadow-sm">
          {cmsBanners.content.topBanner}
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-900"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 38, 32, 0.6), rgba(30, 38, 32, 0.8)), url('${heroBgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              🌱 Trusted by 2,000+ Farmers & Businesses
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: heroTitle.replace('Farm', '<span className="text-green-300">Farm</span>') }}>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-md mb-10">
              {heroSubtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/products" className="bg-white text-green-900 px-8 py-3.5 rounded-xl font-bold hover:bg-green-50 transition-all hover:-translate-y-0.5 shadow-xl flex items-center gap-2">
                🛍️ Shop Now
              </Link>
              <button onClick={toggleEnquiry} className="bg-transparent border-2 border-white/40 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 hover:border-white/80 transition-all">
                📋 Request Quote
              </button>
            </div>

            <div className="flex gap-10">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">500+</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">12</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">2000+</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider font-semibold">Customers</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-3">🌾</div>
              <h3 className="text-white font-bold mb-1">Premium Wheat Seeds</h3>
              <p className="text-white/60 text-xs mb-3">High-yield · Disease resistant</p>
              <div className="text-green-300 font-extrabold">₹1,299 / 5kg</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="text-4xl mb-3">🌶️</div>
              <h3 className="text-white font-bold mb-1">Kashmiri Red Chilli</h3>
              <p className="text-white/60 text-xs mb-3">Grade A · Sun-dried</p>
              <div className="text-green-300 font-extrabold">₹899 / kg</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition-transform col-span-2 flex items-center gap-6">
              <div className="text-5xl">🌿</div>
              <div>
                <h3 className="text-white font-bold mb-1 text-lg">Organic Compost Manure</h3>
                <p className="text-white/60 text-sm mb-2">Fully composted · Nitrogen-rich · NPOP Certified</p>
                <div className="text-green-300 font-extrabold text-xl">₹1,800 / 50kg bag</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner Popup */}
      {cmsBanners?.content?.promotionalBanner && showPromo && (
        <div className="fixed bottom-6 right-6 z-50 w-80 shadow-2xl rounded-2xl overflow-hidden border-2 border-white animate-fade-in-up">
          <button 
            onClick={() => setShowPromo(false)} 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 z-10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <img src={cmsBanners.content.promotionalBanner} alt="Promotion" className="w-full h-auto max-h-48 object-cover" />
          <div className="bg-white p-3 text-center">
            <p className="text-sm font-bold text-gray-800">Special Offer!</p>
            <Link to={cmsBanners.content.promotionalLink || "/products"} className="text-xs text-[var(--color-agri-green)] font-bold hover:underline">Shop Now →</Link>
          </div>
        </div>
      )}

      {/* Categories */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-agri-green)] mb-2">Browse by Category</div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Everything for the Farm & Kitchen</h2>
        </div>
          
        <div className="relative flex overflow-hidden group">
          <div className="flex w-max animate-marquee gap-6 px-3">
            {[
              { icon: <Sprout className="w-8 h-8 text-white" />, name: 'Seeds & Grains', target: 'Seeds', count: '48 products', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600' },
              { icon: <Flame className="w-8 h-8 text-white" />, name: 'Spices', target: 'Spices', count: '36 products', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600' },
              { icon: <Bean className="w-8 h-8 text-white" />, name: 'Pulses & Legumes', target: 'Pulses', count: '28 products', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=600' },
              { icon: <Leaf className="w-8 h-8 text-white" />, name: 'Organic Inputs', target: 'Organic', count: '52 products', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfefcb19?q=80&w=600' },
              { icon: <Wrench className="w-8 h-8 text-white" />, name: 'Farming Tools', target: 'Tools', count: '19 products', img: 'https://images.unsplash.com/photo-1416879598555-22709214ae8e?q=80&w=600' },
              // Duplicate the list for seamless loop
              { icon: <Sprout className="w-8 h-8 text-white" />, name: 'Seeds & Grains', target: 'Seeds', count: '48 products', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600' },
              { icon: <Flame className="w-8 h-8 text-white" />, name: 'Spices', target: 'Spices', count: '36 products', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600' },
              { icon: <Bean className="w-8 h-8 text-white" />, name: 'Pulses & Legumes', target: 'Pulses', count: '28 products', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=600' },
              { icon: <Leaf className="w-8 h-8 text-white" />, name: 'Organic Inputs', target: 'Organic', count: '52 products', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfefcb19?q=80&w=600' },
              { icon: <Wrench className="w-8 h-8 text-white" />, name: 'Farming Tools', target: 'Tools', count: '19 products', img: 'https://images.unsplash.com/photo-1416879598555-22709214ae8e?q=80&w=600' }
            ].map((cat, idx) => (
              <Link 
                to={`/products?category=${cat.target}`} 
                key={idx} 
                className="group/card relative rounded-2xl overflow-hidden p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer h-56 flex flex-col justify-end w-64 shrink-0"
              >
                {/* Background Image with Dark Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-110"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover/card:from-[var(--color-agri-green-dark)]/90 transition-colors duration-300" />
                
                {/* Content */}
                <div className="relative z-10 text-left">
                  <div className="text-3xl mb-2 drop-shadow-md bg-white/20 w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-sm border border-white/20">{cat.icon}</div>
                  <div className="font-bold text-white mb-1 text-lg leading-tight">{cat.name}</div>
                  <div className="text-xs text-white/70 font-medium">{cat.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA block */}
      <section className="py-12 container mx-auto px-6">
        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 shadow-sm">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-orange-900 mb-4 flex items-center justify-center md:justify-start gap-3">
              <span>📦</span> Sourcing in Bulk? Let's Talk Business.
            </h3>
            <p className="text-orange-800/80 leading-relaxed text-lg max-w-2xl">
              Get competitive bulk pricing, dedicated account support, and custom packaging for agricultural inputs. Send us an enquiry and our team will respond within 24 hours.
            </p>
          </div>
          <button onClick={toggleEnquiry} className="bg-[var(--color-agri-brown-dark)] hover:bg-[var(--color-agri-brown-light)] text-white px-8 py-4 rounded-xl font-bold whitespace-nowrap transition-transform hover:-translate-y-1 shadow-lg shadow-orange-900/20">
            Submit Bulk Enquiry →
          </button>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-[var(--color-agri-green-dark)] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Why KarshiMart
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Direct from Farm. Trusted by Thousands.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              No middlemen. Certified organic where applicable. Delivered to your door or warehouse with full transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Factory className="w-10 h-10 text-green-600" />, title: 'Direct Farm Sourcing', desc: 'Partnered with 400+ verified farms across India.', color: 'bg-green-50' },
              { icon: <Award className="w-10 h-10 text-amber-600" />, title: 'Quality Certified', desc: 'NPOP certified organic products. FSSAI compliant packaging.', color: 'bg-amber-50' },
              { icon: <Truck className="w-10 h-10 text-blue-600" />, title: 'Pan-India Delivery', desc: 'Cold chain logistics for perishables. Bulk freight for orders.', color: 'bg-blue-50' },
              { icon: <Briefcase className="w-10 h-10 text-purple-600" />, title: 'B2B Dedicated Support', desc: 'Custom quotes, credit terms, and account managers.', color: 'bg-purple-50' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-lg shadow-gray-200/50 group relative overflow-hidden">
                <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto ${item.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-agri-green)] mb-2">Customer Stories</div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-12">Farmers & Businesses Trust Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(cmsTestimonials?.content?.list?.length ? cmsTestimonials.content.list : []).map((t, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <div className="flex text-amber-500 mb-4 gap-1">
                  <Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/><Star className="fill-current w-4 h-4"/>
                </div>
                <p className="text-gray-600 italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center">{t.name ? t.name.substring(0,2).toUpperCase() : 'C'}</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">Customer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
