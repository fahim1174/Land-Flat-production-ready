import { useState } from 'react';
import { ArrowRight, ChevronDown, FileText, MapPin, Search, ShieldCheck, UserCheck } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { BARISAL_LOCATIONS } from '../data/properties';
import heroImage from '../assets/hero.png.jpg';

export default function HomePage({ properties, navigateTo, wishlist, toggleWishlist, searchFilters, setSearchFilters }) {
  const [openFaq, setOpenFaq] = useState(0);
  const popularAreas = BARISAL_LOCATIONS;
  const faqs = [
    ['কাগজপত্র কীভাবে ভেরিফাই করা হয়?', 'আমাদের প্রতিনিধি প্রাথমিক দলিল, খতিয়ান ও নামজারির তথ্য পর্যালোচনা করে listing প্রকাশ করেন। চূড়ান্ত সিদ্ধান্তের আগে নিজস্ব আইনজীবীর মাধ্যমে যাচাই করার পরামর্শ দেওয়া হয়।'],
    ['বিক্রি করতে কতদিন সময় লাগে?', 'সময়টি property type, location, price এবং buyer demand-এর ওপর নির্ভর করে। Listing live হওয়ার পর আমাদের team interested buyers-এর সঙ্গে যোগাযোগ করিয়ে দেয়।'],
    ['আপনাদের সার্ভিস চার্জ কত?', 'প্রপার্টি ও service scope অনুযায়ী চার্জ পরিবর্তিত হতে পারে। বিস্তারিত জানতে আমাদের contact page থেকে প্রতিনিধি দলের সঙ্গে কথা বলুন।']
  ];

  return (
    <div>
     <section
      className="relative overflow-hidden text-white py-12 sm:py-20 lg:rounded-[15px]"
      style={{
        backgroundImage:
          `linear-gradient(120deg, rgba(3, 24, 18, 0.68), rgba(3, 24, 18, 0.6)), url('${heroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight text-center drop-shadow-md mb-3 sm:mb-6 px-2 lg:whitespace-nowrap">
          বরিশালে আপনার <span className="text-emerald-400 font-black">স্বপ্নের জমি ও ফ্ল্যাট</span>
        </h1>


        <div className="bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl text-white max-w-5xl mx-auto border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1 text-left drop-shadow-md">প্রপার্টি টাইপ</label>
              <select
                value={searchFilters.type}
                onChange={(e) => setSearchFilters({ ...searchFilters, type: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#00875A]"
              >
                <option value="all">সব টাইপ (জমি ও ফ্ল্যাট)</option>
                <option value="land">শুধুমাত্র জমি</option>
                <option value="flat">শুধুমাত্র ফ্ল্যাট</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1 text-left drop-shadow-md">বরিশালের এলাকা</label>
              <select
                value={searchFilters.area}
                onChange={(e) => setSearchFilters({ ...searchFilters, area: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#00875A]"
              >
                <option value="all">বরিশালের সকল এলাকা</option>
                {BARISAL_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1 text-left drop-shadow-md">সর্বোচ্চ বাজেট</label>
              <input
                type="number"
                min="0"
                value={searchFilters.maxPrice}
                onChange={(e) => setSearchFilters({ ...searchFilters, maxPrice: e.target.value })}
                placeholder="যেমন: 5000000"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs font-semibold text-gray-800 placeholder:text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#00875A]"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => navigateTo(searchFilters.type === 'flat' ? 'flat' : 'land')}
                className="w-full bg-[#00875A] text-white font-medium py-2.5 px-4 rounded-xl hover:bg-[#006644] transition flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <Search className="w-4 h-4" /> প্রপার্টি খুঁজুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">সর্বশেষ যুক্ত হওয়া প্রপার্টি</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">বরিশাল শহরের সম্প্রতি যুক্ত হওয়া জমি ও ফ্ল্যাট</p>
          </div>
          <button onClick={() => navigateTo('area')} className="text-[#00875A] font-semibold text-xs sm:text-sm hover:underline flex items-center gap-1">
            সব দেখুন <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              navigateTo={navigateTo}
              isWishlisted={wishlist.includes(property.id)}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      <section className="bg-emerald-50/40 py-10 border-y border-emerald-100/50 shadow-sm my-6 rounded-2xl max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#00875A] transition group">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#00875A] transition">
              <ShieldCheck className="w-6 h-6 text-[#00875A] group-hover:text-white transition" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">কাগজপত্র ভেরিফাইড</h4>
            <p className="text-xs text-gray-500">নিষ্কন্ঠক জমির নিশ্চয়তা</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#00875A] transition group">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#00875A] transition">
              <UserCheck className="w-6 h-6 text-[#00875A] group-hover:text-white transition" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">গোপনীয়তা সুরক্ষা</h4>
            <p className="text-xs text-gray-500">মালিকের নম্বর জনসম্মুখে প্রকাশ পায় না</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#00875A] transition group">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#00875A] transition">
              <MapPin className="w-6 h-6 text-[#00875A] group-hover:text-white transition" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">লোকাল সাপোর্ট</h4>
            <p className="text-xs text-gray-500">বরিশালে নিজস্ব প্রতিনিধি দল</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#00875A] transition group">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#00875A] transition">
              <FileText className="w-6 h-6 text-[#00875A] group-hover:text-white transition" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">সহজ প্রসেসিং</h4>
            <p className="text-xs text-gray-500">সাইট ভিজিট থেকে রেজিস্ট্রেশন</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6"><div><h2 className="text-xl sm:text-2xl font-bold text-gray-900">এলাকা অনুযায়ী প্রপার্টি দেখুন</h2><p className="text-xs sm:text-sm text-gray-500 mt-1">আপনার পছন্দের বরিশাল location থেকে শুরু করুন</p></div></div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {popularAreas.map((area) => {
            const count = properties.filter((p) => p.location.includes(area)).length;
            return (
              <div
                key={area}
                onClick={() => {
                  setSearchFilters({ ...searchFilters, area });
                  navigateTo('land');
                }}
                className="group cursor-pointer bg-white rounded-xl p-3.5 sm:p-5 border border-gray-200 shadow-sm hover:border-[#00875A] transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="bg-emerald-50 text-[#00875A] p-2 sm:p-3 rounded-lg group-hover:bg-[#00875A] group-hover:text-white transition">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-[#00875A] transition">{area}</h3>
                    <span className="text-[11px] sm:text-xs text-gray-500">{count} টি প্রপার্টি</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#00875A] group-hover:translate-x-1 transition hidden sm:block" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#00875A] text-white py-8 sm:py-12 px-4 my-8 max-w-7xl mx-auto lg:rounded-2xl shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">আপনি কি বরিশাল শহরের প্রপার্টি বিক্রি করতে চান?</h3>
            <p className="text-emerald-50 text-xs sm:text-sm leading-relaxed">
              সঠিক ক্রেতার কাছে পৌঁছাতে এবং দ্রুত ও নিরাপদ লেনদেনের জন্য আজই আপনার জমি বা ফ্ল্যাটের তথ্য আমাদের দিন।
            </p>
          </div>
          <button
            onClick={() => navigateTo('submit')}
            className="bg-white text-[#00875A] font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-emerald-50 transition shadow-lg shrink-0"
          >
            জমি বা ফ্ল্যাটের তথ্য জমা দিন
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-6">
        <div className="max-w-2xl mb-6"><h2 className="text-xl sm:text-2xl font-bold text-gray-900">সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)</h2><p className="text-xs sm:text-sm text-gray-500 mt-1">আমাদের সেবা ও প্রক্রিয়া সম্পর্কে সাধারণ কিছু প্রশ্নের উত্তর</p></div>
        <div className="space-y-3 max-w-4xl">
          {faqs.map(([q, a], idx) => (
            <div key={q} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full text-left p-4 sm:p-5 font-semibold text-gray-900 flex justify-between items-center text-sm sm:text-base hover:bg-gray-50"
              >
                <span>{q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180 text-[#00875A]' : ''}`} />
              </button>
              {openFaq === idx && <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">{a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
