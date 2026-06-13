import { API_URL } from '../config/api';
import React, { useState, useEffect } from 'react';
import { Target, Users, Globe, Leaf, ShieldCheck, Sprout, TrendingUp } from 'lucide-react';

const About = () => {
  const [cmsAbout, setCmsAbout] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/cms/about`)
      .then(res => res.json())
      .then(data => setCmsAbout(data))
      .catch(err => console.error(err));
  }, []);

  const mission = cmsAbout?.content?.mission || "We recognized that farmers, businesses, and everyday consumers were struggling with highly fragmented systems to buy and sell produce, seeds, and equipment.";
  const vision = cmsAbout?.content?.vision || "To be the most trusted, transparent, and efficient agricultural marketplace on the internet for the next 100 years.";

  return (
    <div className="flex-grow bg-white overflow-hidden">
      
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfefcb19?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase mb-6 shadow-2xl">
            <Leaf className="w-4 h-4 text-green-400" />
            Our Story
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
            Cultivating <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">Progress</span><br/>Rooted in Tradition
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-12">
            We are bridging the gap between traditional farming and modern digital commerce, bringing premium agricultural products to the world.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="px-8 py-4 bg-[var(--color-agri-green)] hover:bg-[var(--color-agri-green-dark)] text-white rounded-xl font-bold shadow-lg shadow-green-900/50 transition-all hover:-translate-y-1">
              Join Our Network
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1 flex items-center gap-2">
              Explore Our Story
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
          <div className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">Scroll Down</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. Impact Stats Banner */}
      <section className="relative z-20 -mt-16 container mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl shadow-green-900/10 border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[var(--color-agri-green)] mb-2">10k+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Partner Farms</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[var(--color-agri-brown-dark)] mb-2">50+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Countries Served</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-[var(--color-agri-blue)] mb-2">100%</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quality Assured</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">5M+</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tons Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Problem & Solution (Split Layout) */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-100 to-amber-100 rounded-[3rem] transform rotate-3 scale-105 opacity-50 blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000" 
              alt="Farmer working" 
              className="relative rounded-[2.5rem] shadow-2xl object-cover h-[600px] w-full"
            />
            {/* Floating UI Element */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-[var(--color-agri-green)]" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Certified</div>
                  <div className="text-xl font-black text-gray-900">100% Organic</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="text-[var(--color-agri-green)] font-black uppercase tracking-[0.2em] mb-4 text-sm flex items-center gap-2">
              <div className="w-8 h-1 bg-[var(--color-agri-green)] rounded-full"></div>
              Our Mission
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-[1.15]">
              Redefining the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-agri-brown-dark)] to-amber-600">Supply Chain</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-8 font-medium">
              {mission}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 border-l-4 border-amber-400 pl-6 bg-gray-50 py-4 pr-4 rounded-r-2xl">
              By offering a dual-mode platform, we cater directly to <strong className="text-[var(--color-agri-green)]">Retail consumers</strong> looking for fresh supplies, and <strong className="text-[var(--color-agri-brown-dark)]">Wholesale B2B partners</strong> who need reliable bulk sourcing—all under one seamless roof.
            </p>
            
            <div className="flex gap-4">
              <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                <TrendingUp className="text-green-600 w-6 h-6" />
                <span className="font-bold text-gray-900">Fair Trade Pricing</span>
              </div>
              <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                <Sprout className="text-amber-600 w-6 h-6" />
                <span className="font-bold text-gray-900">Sustainable Practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values (Glassmorphism Cards) */}
      <section className="py-32 bg-[var(--color-agri-brown-dark)] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-agri-green)] rounded-full mix-blend-screen filter blur-[150px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Our Core Values</h2>
          <p className="text-[var(--color-agri-brown-light)] text-lg max-w-2xl mx-auto mb-20 font-medium">The principles that guide everything we do, from farm to table.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-left">Global Reach</h3>
              <p className="text-white/70 text-left leading-relaxed">{mission}</p>
            </div>
            
            {/* Card 2 */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-left">Community First</h3>
              <p className="text-white/70 text-left leading-relaxed">Supporting local farmers through fair pricing models, empowering rural growth, and creating a sustainable ecosystem.</p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-left">Our Vision</h3>
              <p className="text-white/70 text-left leading-relaxed">{vision}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
