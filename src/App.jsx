import { useEffect, useState } from 'react';
import { Building2, Heart, Mail, MapPin, Menu, Phone, PlusCircle, X } from 'lucide-react';
import HomePage from './components/HomePage';
import DirectoryPage from './components/DirectoryPage';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import SubmitPropertyPage from './components/SubmitPropertyPage';
import AdminCRM from './components/AdminCRM';
import { AboutPage, ContactPage, PrivacyPolicyPage, TermsPage, WishlistPage } from './components/OtherPages';
import { INITIAL_PROPERTIES } from './data/properties';
import whatsappIcon from './assets/whatsapp.png';
import messengerIcon from './assets/messenger.png';

function createUniquePropertyId(properties, type) {
  const prefix = type === 'land' ? 'LF-BRL-' : 'LF-BRF-';
  const usedIds = new Set(properties.map((property) => property.propertyId));
  let sequence = 1;
  let propertyId = `${prefix}${String(sequence).padStart(3, '0')}`;
  while (usedIds.has(propertyId)) {
    sequence += 1;
    propertyId = `${prefix}${String(sequence).padStart(3, '0')}`;
  }
  return propertyId;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      return 'admin';
    }
    return 'home';
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem('land-flat-properties');
    if (!savedProperties) return INITIAL_PROPERTIES;
    const saved = JSON.parse(savedProperties);
    const restored = [];
    return saved.map((property) => {
      const initialProperty = INITIAL_PROPERTIES.find((item) => item.id === property.id);
      const preferredId = property.propertyId || initialProperty?.propertyId;
      const propertyId = preferredId && !restored.some((item) => item.propertyId === preferredId)
        ? preferredId
        : createUniquePropertyId(restored, property.type);
      const restoredProperty = {
        ...property,
        propertyId,
        leadCount: property.leadCount ?? initialProperty?.leadCount ?? 0,
        viewCount: property.viewCount ?? initialProperty?.viewCount ?? 0
      };
      restored.push(restoredProperty);
      return {
        ...restoredProperty
      };
    });
  });
  const publishedProperties = properties.filter((property) => property.status === 'Published');
  const [wishlist, setWishlist] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPin, setAdminPin] = useState('');

  useEffect(() => {
    localStorage.setItem('land-flat-properties', JSON.stringify(properties));
  }, [properties]);

  const [searchFilters, setSearchFilters] = useState({
    type: 'all',
    area: 'all',
    category: 'all',
    maxPrice: ''
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const navigateTo = (page, property = null) => {
    setCurrentPage(page);
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (page === 'home') {
      window.history.pushState({}, '', '/');
    }
    if (property) {
      setSelectedProperty(property);
      if (page === 'details') {
        setProperties((current) => current.map((item) => item.id === property.id ? { ...item, viewCount: (item.viewCount || 0) + 1 } : item));
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800 font-sans">
      <header className="sticky top-0 z-[160] bg-white opacity-100 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#00875A] text-white p-2 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 block leading-none">Land&Flat</span>
              <span className="text-[10px] text-[#00875A] font-semibold tracking-wide">বরিশাল সিটি</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className={currentPage === 'home' ? 'text-[#00875A] font-bold' : 'hover:text-[#00875A]'}>হোম</button>
            <button onClick={() => navigateTo('land')} className={currentPage === 'land' ? 'text-[#00875A] font-bold' : 'hover:text-[#00875A]'}>জমি</button>
            <button onClick={() => navigateTo('flat')} className={currentPage === 'flat' ? 'text-[#00875A] font-bold' : 'hover:text-[#00875A]'}>ফ্ল্যাট</button>
            <button onClick={() => navigateTo('about')} className={currentPage === 'about' ? 'text-[#00875A] font-bold' : 'hover:text-[#00875A]'}>আমাদের সম্পর্কে</button>
            <button onClick={() => navigateTo('contact')} className={currentPage === 'contact' ? 'text-[#00875A] font-bold' : 'hover:text-[#00875A]'}>যোগাযোগ</button>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <button onClick={() => navigateTo('wishlist')} className="p-2 text-gray-600 hover:text-[#00875A] relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button onClick={() => navigateTo('submit')} className="bg-[#00875A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#006644] transition flex items-center gap-1.5 shadow-sm">
              <PlusCircle className="w-4 h-4" /> জমি/ফ্ল্যাট দিন
            </button>


          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button onClick={() => navigateTo('wishlist')} className="p-2 text-gray-600 relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 top-[64px] bg-black/40 backdrop-blur-sm z-[140] md:hidden animate-fade-in" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="md:hidden absolute top-full right-0 left-0 w-full bg-white shadow-xl rounded-b-2xl border-t border-gray-100 z-[150] animate-slide-down">
              <nav className="flex flex-col">
                <button onClick={() => navigateTo('home')} className={`text-left py-3 px-5 border-b border-gray-50 font-medium transition-colors active:scale-95 ${currentPage === 'home' ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-gray-800 hover:bg-emerald-50 hover:text-emerald-600'}`}>হোম</button>
                <button onClick={() => navigateTo('land')} className={`text-left py-3 px-5 border-b border-gray-50 font-medium transition-colors active:scale-95 ${currentPage === 'land' ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-gray-800 hover:bg-emerald-50 hover:text-emerald-600'}`}>জমি</button>
                <button onClick={() => navigateTo('flat')} className={`text-left py-3 px-5 border-b border-gray-50 font-medium transition-colors active:scale-95 ${currentPage === 'flat' ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-gray-800 hover:bg-emerald-50 hover:text-emerald-600'}`}>ফ্ল্যাট</button>
                <button onClick={() => navigateTo('about')} className={`text-left py-3 px-5 border-b border-gray-50 font-medium transition-colors active:scale-95 ${currentPage === 'about' ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-gray-800 hover:bg-emerald-50 hover:text-emerald-600'}`}>আমাদের সম্পর্কে</button>
                <button onClick={() => navigateTo('contact')} className={`text-left py-3 px-5 border-b border-gray-50 font-medium transition-colors active:scale-95 ${currentPage === 'contact' ? 'text-emerald-600 bg-emerald-50 font-bold' : 'text-gray-800 hover:bg-emerald-50 hover:text-emerald-600'}`}>যোগাযোগ</button>
              </nav>

              <div className="p-4 bg-gray-50 rounded-b-2xl">
                <button onClick={() => navigateTo('submit')} className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-emerald-700 transition active:scale-95">
                  <PlusCircle className="w-5 h-5" /> জমি/ফ্ল্যাট দিন
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 min-h-0">
        {currentPage === 'home' && (
          <HomePage
            properties={publishedProperties}
            navigateTo={navigateTo}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
        )}

        {currentPage === 'land' && (
          <DirectoryPage type="land" properties={publishedProperties.filter((p) => p.type === 'land')} navigateTo={navigateTo} wishlist={wishlist} toggleWishlist={toggleWishlist} searchFilters={searchFilters} />
        )}

        {currentPage === 'flat' && (
          <DirectoryPage type="flat" properties={publishedProperties.filter((p) => p.type === 'flat')} navigateTo={navigateTo} wishlist={wishlist} toggleWishlist={toggleWishlist} searchFilters={searchFilters} />
        )}

        {currentPage === 'area' && (
          <DirectoryPage type="all" properties={publishedProperties} navigateTo={navigateTo} wishlist={wishlist} toggleWishlist={toggleWishlist} searchFilters={searchFilters} />
        )}

        {currentPage === 'details' && selectedProperty && (
          <PropertyDetailsPage property={selectedProperty} properties={publishedProperties} navigateTo={navigateTo} wishlist={wishlist} toggleWishlist={toggleWishlist} />
        )}

        {currentPage === 'submit' && <SubmitPropertyPage navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'wishlist' && (
          <WishlistPage properties={publishedProperties.filter((p) => wishlist.includes(p.id))} navigateTo={navigateTo} toggleWishlist={toggleWishlist} />
        )}
        {currentPage === 'admin' && (
          <AdminCRM
            properties={properties}
            setProperties={setProperties}
            navigateTo={navigateTo}
            isLoggedIn={isAdminLoggedIn}
            setIsLoggedIn={setIsAdminLoggedIn}
            pin={adminPin}
            setPin={setAdminPin}
          />
        )}
      </main>

      <footer className="bg-gray-900 text-gray-300 pt-10 pb-20 md:pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 gap-x-4 gap-y-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base mb-2">
              <div className="bg-[#00875A] p-1.5 rounded">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              Land&Flat Barisal
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              বরিশাল শহরের আমতলা, সিএন্ডবি রোড, বগুড়া রোড ও রুপাতলীতে শতভাগ ভেরিফাইড জমি ও ফ্ল্যাট কেনাবেচার বিশ্বস্ত মাধ্যম।
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-2">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">হোম</button></li>
              <li><button onClick={() => navigateTo('land')} className="hover:text-white transition-colors">আমতলার জমি</button></li>
              <li><button onClick={() => navigateTo('flat')} className="hover:text-white transition-colors">বগুড়া রোডের ফ্ল্যাট</button></li>
              <li><button onClick={() => navigateTo('submit')} className="hover:text-white transition-colors">জমি বা ফ্ল্যাট দিন</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-2">জরুরি সেবা</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">আমাদের সম্পর্কে</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">যোগাযোগ ও হেল্পলাইন</button></li>
              <li><button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">প্রাইভেসি পলিসি</button></li>
              <li><button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">টার্মস অ্যান্ড কন্ডিশন</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-2">বরিশাল অফিস</h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00875A] shrink-0 mt-0.5" />
                সদর রোড, বরিশাল সদর, বরিশাল।
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00875A] shrink-0" />
                01903431174
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00875A] shrink-0" />
                fahimukil49@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 mt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
          &copy; 2026 Land&Flat Barisal. All rights reserved.
        </div>
      </footer>

      <div className="fixed right-5 bottom-20 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/8801903-431174"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp-এ যোগাযোগ করুন"
          title="WhatsApp-এ যোগাযোগ করুন"
          className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#25D366] shadow-lg transition-transform duration-150 active:scale-95 hover:scale-105 animate-pulse"
        >
          <img src={whatsappIcon} alt="WhatsApp" className="h-10 w-10 object-contain" />
        </a>
        <a
          href="https://m.me/washim.akramfahim.9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Messenger-এ যোগাযোগ করুন"
          title="Messenger-এ যোগাযোগ করুন"
          className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#0084FF] shadow-lg transition-transform duration-150 active:scale-95 hover:scale-105 animate-pulse"
        >
          <img src={messengerIcon} alt="Messenger" className="h-10 w-10 object-contain" />
        </a>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center py-2 px-1">
        <button onClick={() => navigateTo('home')} className={`flex flex-col items-center justify-center w-1/3 text-[11px] ${currentPage === 'home' ? 'text-[#00875A] font-bold' : 'text-gray-600'}`}>
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>হোম</span>
        </button>
        <button onClick={() => navigateTo('land')} className={`flex flex-col items-center justify-center w-1/3 text-[11px] ${currentPage === 'land' ? 'text-[#00875A] font-bold' : 'text-gray-600'}`}>
          <MapPin className="w-5 h-5 mb-0.5" />
          <span>জমি</span>
        </button>
        <button onClick={() => navigateTo('flat')} className={`flex flex-col items-center justify-center w-1/3 text-[11px] ${currentPage === 'flat' ? 'text-[#00875A] font-bold' : 'text-gray-600'}`}>
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>ফ্ল্যাট</span>
        </button>
      </div>
    </div>
  );
} 