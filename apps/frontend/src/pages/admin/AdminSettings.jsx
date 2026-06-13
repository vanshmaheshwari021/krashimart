import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Globe, FileText, Image as ImageIcon, Share2, PhoneCall, LayoutTemplate } from 'lucide-react';

const AdminSettings = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    websiteName: '',
    logoUrl: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    defaultMode: 'B2C',
    socialLinks: { facebook: '', twitter: '', instagram: '' }
  });

  // CMS State
  const [cmsHome, setCmsHome] = useState({ title: 'Home', content: { heroTitle: '', heroSubtitle: '' }, seoTitle: '', seoDescription: '' });
  const [cmsAbout, setCmsAbout] = useState({ title: 'About Us', content: { mission: '', vision: '' }, seoTitle: '', seoDescription: '' });
  const [cmsPolicies, setCmsPolicies] = useState({ title: 'Policies', content: { privacyText: '', termsText: '' }, seoTitle: '', seoDescription: '' });
  const [cmsBanners, setCmsBanners] = useState({ title: 'Banners', content: { topBanner: '', promotionalBanner: '' }, seoTitle: '', seoDescription: '' });
  const [cmsTestimonials, setCmsTestimonials] = useState({ title: 'Testimonials', content: { list: [] }, seoTitle: '', seoDescription: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch Settings
      const setRes = await fetch(`${API_URL}/api/settings`);
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings({
          ...settings,
          ...setData,
          socialLinks: { ...settings.socialLinks, ...(setData.socialLinks || {}) }
        });
      }

      // Fetch CMS Pages
      const fetchCMS = async (slug, setter, state) => {
        const res = await fetch(`${API_URL}/api/cms/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setter({ ...state, ...data, content: { ...state.content, ...(data.content || {}) } });
        }
      };

      await Promise.all([
        fetchCMS('home', setCmsHome, cmsHome),
        fetchCMS('about', setCmsAbout, cmsAbout),
        fetchCMS('policies', setCmsPolicies, cmsPolicies),
        fetchCMS('banners', setCmsBanners, cmsBanners),
        fetchCMS('testimonials', setCmsTestimonials, cmsTestimonials)
      ]);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching settings/CMS", err);
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  const handleSaveCMS = async (pageSlug, dataObj) => {
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/cms/${pageSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataObj)
      });
      alert(`${dataObj.title} CMS saved successfully!`);
    } catch (err) {
      console.error(err);
      alert('Failed to save CMS.');
    }
    setSaving(false);
  };

  if (loading) return <div>Loading settings...</div>;

  const tabs = [
    { id: 'general', label: 'General & Contact', icon: <Globe className="w-4 h-4" /> },
    { id: 'home', label: 'Homepage Content', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'about', label: 'About Us Content', icon: <FileText className="w-4 h-4" /> },
    { id: 'policies', label: 'Policy Pages', icon: <FileText className="w-4 h-4" /> },
    { id: 'banners', label: 'Banners', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <FileText className="w-4 h-4" /> },
    { id: 'social', label: 'Social & SEO', icon: <Share2 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-300 min-h-[600px]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-100 pr-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === tab.id 
                  ? 'bg-[var(--color-agri-green)] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">General Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Website Name</label>
                  <input type="text" value={settings.websiteName} onChange={e => setSettings({...settings, websiteName: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Default Market Mode</label>
                  <select value={settings.defaultMode} onChange={e => setSettings({...settings, defaultMode: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="B2C">Retail (B2C)</option>
                    <option value="B2B">Wholesale (B2B)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email</label>
                  <input type="email" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Phone</label>
                  <input type="text" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Physical Address (Footer)</label>
                  <textarea rows="3" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button disabled={saving} onClick={handleSaveSettings} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition flex items-center gap-2">
                  <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save General Settings'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">Homepage Editor</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Section Title</label>
                  <input type="text" value={cmsHome.content.heroTitle || ''} onChange={e => setCmsHome({...cmsHome, content: {...cmsHome.content, heroTitle: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="E.g., Cultivating Progress" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Section Subtitle</label>
                  <textarea rows="3" value={cmsHome.content.heroSubtitle || ''} onChange={e => setCmsHome({...cmsHome, content: {...cmsHome.content, heroSubtitle: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="E.g., Bridging the gap..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Section Background Image URL</label>
                  <input type="text" value={cmsHome.content.heroImage || ''} onChange={e => setCmsHome({...cmsHome, content: {...cmsHome.content, heroImage: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://..." />
                  {cmsHome.content.heroImage && (
                    <div className="mt-2 h-32 w-full rounded-xl bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url(${cmsHome.content.heroImage})` }} />
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button disabled={saving} onClick={() => handleSaveCMS('home', cmsHome)} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition flex items-center gap-2">
                  <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Homepage'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">About Us Editor</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mission Statement</label>
                  <textarea rows="4" value={cmsAbout.content.mission || ''} onChange={e => setCmsAbout({...cmsAbout, content: {...cmsAbout.content, mission: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vision Statement</label>
                  <textarea rows="4" value={cmsAbout.content.vision || ''} onChange={e => setCmsAbout({...cmsAbout, content: {...cmsAbout.content, vision: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button disabled={saving} onClick={() => handleSaveCMS('about', cmsAbout)} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition flex items-center gap-2">
                  <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save About Page'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">Legal & Policies</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Privacy Policy Text</label>
                  <textarea rows="6" value={cmsPolicies.content.privacyText || ''} onChange={e => setCmsPolicies({...cmsPolicies, content: {...cmsPolicies.content, privacyText: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Terms of Service Text</label>
                  <textarea rows="6" value={cmsPolicies.content.termsText || ''} onChange={e => setCmsPolicies({...cmsPolicies, content: {...cmsPolicies.content, termsText: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
                </div>
              </div>

              <div className="pt-6">
                <button disabled={saving} onClick={() => handleSaveCMS('policies', cmsPolicies)} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition flex items-center gap-2">
                  <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Policies'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">Banners & Promotions</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Top Announcement Banner</label>
                  <input type="text" value={cmsBanners.content.topBanner || ''} onChange={e => setCmsBanners({...cmsBanners, content: {...cmsBanners.content, topBanner: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="E.g., Free shipping on orders over ₹5000!" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Promotional Banner Image URL</label>
                  <input type="text" value={cmsBanners.content.promotionalBanner || ''} onChange={e => setCmsBanners({...cmsBanners, content: {...cmsBanners.content, promotionalBanner: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://..." />
                </div>
              </div>

              <div className="pt-6">
                <button disabled={saving} onClick={() => handleSaveCMS('banners', cmsBanners)} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition flex items-center gap-2">
                  <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Banners'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">Customer Testimonials</h3>
              <p className="text-gray-500 text-sm">Add or edit testimonials shown on the homepage.</p>
              
              <div className="space-y-4">
                <textarea rows="5" value={JSON.stringify(cmsTestimonials.content.list || [], null, 2)} onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setCmsTestimonials({...cmsTestimonials, content: {...cmsTestimonials.content, list: parsed}});
                  } catch(err) {
                    // Just ignore if it's currently invalid JSON while typing
                  }
                }} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none font-mono text-xs"></textarea>
                <p className="text-xs text-gray-400">Note: Must be valid JSON format. e.g., <br/>[ {`{"name": "John", "text": "Great service!"}`} ]</p>
              </div>

              <div className="pt-6">
                <button disabled={saving} onClick={() => handleSaveCMS('testimonials', cmsTestimonials)} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition flex items-center gap-2">
                  <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Testimonials'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="font-extrabold text-2xl text-gray-900 mb-6 border-b pb-4">Social Links & Global SEO</h3>
              
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800">Social Media</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Facebook URL</label>
                    <input type="text" value={settings.socialLinks.facebook || ''} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, facebook: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Twitter URL</label>
                    <input type="text" value={settings.socialLinks.twitter || ''} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, twitter: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Instagram URL</label>
                    <input type="text" value={settings.socialLinks.instagram || ''} onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                  </div>
                </div>

                <h4 className="font-bold text-gray-800 mt-8">Homepage SEO</h4>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title</label>
                  <input type="text" value={cmsHome.seoTitle || ''} onChange={e => setCmsHome({...cmsHome, seoTitle: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description</label>
                  <textarea rows="3" value={cmsHome.seoDescription || ''} onChange={e => setCmsHome({...cmsHome, seoDescription: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none"></textarea>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button disabled={saving} onClick={handleSaveSettings} className="px-6 py-3 bg-[var(--color-agri-brown-dark)] text-white rounded-xl font-bold shadow-md hover:bg-opacity-90 transition">
                  {saving ? 'Saving...' : 'Save Social Links'}
                </button>
                <button disabled={saving} onClick={() => handleSaveCMS('home', cmsHome)} className="px-6 py-3 bg-[var(--color-agri-green)] text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">
                  {saving ? 'Saving...' : 'Save SEO Data'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
