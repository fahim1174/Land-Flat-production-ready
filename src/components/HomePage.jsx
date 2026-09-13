import { useState } from 'react';
import { ArrowRight, ChevronDown, FileText, MapPin, Search, ShieldCheck, UserCheck } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { BARISAL_LOCATIONS } from '../data/properties';
import heroImage from '../assets/hero.png.jpg';

export default function HomePage({ properties, navigateTo, wishlist, toggleWishlist, searchFilters, setSearchFilters }) {
  const [openFaq, setOpenFaq] = useState(0);
  const popularAreas = ['আমতলা', 'বগুড়া রোড', 'সিএন্ডবি রোড', 'রুপাতলী'];
  const testimonials = [
    { name: 'সাব্বির আহমেদ', role: 'জমি ক্রেতা, আমতলা', text: 'সঠিক তথ্য ও site visit-এর সহায়তায় খুব সহজে আমাদের পরিবারের জন্য জমি বেছে নিতে পেরেছি।' },
    { name: 'তানজিলা রহমান', role: 'ফ্ল্যাট ক্রেতা, বগুড়া রোড', text: 'প্রপার্টির details এক জায়গায় পাওয়া এবং প্রতিনিধি দলের দ্রুত response আমার জন্য দারুণ helpful ছিল।' },
    { name: 'মোঃ রফিকুল ইসলাম', role: 'বিক্রেতা, বরিশাল সদর', text: 'আমার property-টি সঠিক buyer-এর কাছে পৌঁছেছে এবং পুরো যোগাযোগ প্রক্রিয়াটি স্বচ্ছ ছিল।' }
  ];
  const faqs = [
    ['কাগজপত্র কীভাবে ভেরিফাই করা হয়?', 'আমাদের প্রতিনিধি প্রাথমিক দলিল, খতিয়ান ও নামজারির তথ্য পর্যালোচনা করে listing প্রকাশ করেন। চূড়ান্ত সিদ্ধান্তের আগে নিজস্ব আইনজীবীর মাধ্যমে যাচাই করার পরামর্শ দেওয়া হয়।'],
    ['বিক্রি করতে কতদিন সময় লাগে?', 'সময়টি property type, location, price এবং buyer demand-এর ওপর নির্ভর করে। Listing live হওয়ার পর আমাদের team interested buyers-এর সঙ্গে যোগাযোগ করিয়ে দেয়।'],
    ['আপনাদের সার্ভিস চার্জ কত?', 'প্রপার্টি ও service scope অনুযায়ী চার্জ পরিবর্তিত হতে পারে। বিস্তারিত জানতে আমাদের contact page থেকে প্রতিনিধি দলের সঙ্গে কথা বলুন।']
  ];

  return (
    <div>
      <section
        className="relative overflow-hidden text-white py-16 px-4"
        style={{
          backgroundImage:
            `linear-gradient(120deg, rgba(3, 24, 18, 0.58), rgba(3, 24, 18, 0.52)), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom'
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              বরিশালে আপনার স্বপ্নের <span className="text-emerald-300">জমি ও ফ্ল্যাট</span>
          </h1>
            <p className="text-white font-semibold text-sm sm:text-base mt-2 mb-8 max-w-xl mx-auto leading-relaxed drop-shadow-md">
            আমতলা, বগুড়া রোড, সিএন্ডবি রোড ও রুপাতলীর সঠিক কাগজপত্রের ভেরিফাইড প্রপার্টি বেছে নিন সরাসরি ল্যান্ড অ্যান্ড ফ্ল্যাটের মাধ্যমে।
          </p>

          <div className="bg-black/40 p-4 sm:p-6 rounded-2xl text-white max-w-3xl mx-auto border border-white/20 shadow-xl backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  className="w-full bg-[#00875A] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#006644] transition flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <Search className="w-4 h-4" /> প্রপার্টি খুঁজুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">সর্বশেষ যুক্ত হওয়া প্রপার্টি</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">বরিশাল শহরের সম্প্রতি যুক্ত হওয়া জমি ও ফ্ল্যাট</p>
          </div>
          <button onClick={() => navigateTo('land')} className="text-[#00875A] font-semibold text-xs sm:text-sm hover:underline flex items-center gap-1">
            সব দেখুন <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <section className="bg-[#E6F4EA] py-12 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#00875A] mx-auto mb-2" />
            <h4 className="font-bold text-sm text-gray-900 mb-1">কাগজপত্র ভেরিফাইড</h4>
            <p className="text-xs text-gray-500">নিষ্কন্ঠক জমির নিশ্চয়তা</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
            <UserCheck className="w-8 h-8 text-[#00875A] mx-auto mb-2" />
            <h4 className="font-bold text-sm text-gray-900 mb-1">গোপনীয়তা সুরক্ষা</h4>
            <p className="text-xs text-gray-500">মালিকের নম্বর জনসম্মুখে প্রকাশ পায় না</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
            <MapPin className="w-8 h-8 text-[#00875A] mx-auto mb-2" />
            <h4 className="font-bold text-sm text-gray-900 mb-1">লোকাল সাপোর্ট</h4>
            <p className="text-xs text-gray-500">বরিশালে নিজস্ব প্রতিনিধি দল</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
            <FileText className="w-8 h-8 text-[#00875A] mx-auto mb-2" />
            <h4 className="font-bold text-sm text-gray-900 mb-1">সহজ প্রসেসিং</h4>
            <p className="text-xs text-gray-500">সাইট ভিজিট থেকে রেজিস্ট্রেশন</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 my-16">
        <div className="bg-gradient-to-r from-[#00875A] to-emerald-800 rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="mb-6 md:mb-0 max-w-lg">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">আপনি কি বরিশাল শহরের প্রপার্টি বিক্রি করতে চান?</h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              আপনার জমি বা ফ্ল্যাটের সঠিক তথ্য দিন। আমাদের টিম সরেজমিনে ভেরিফাই করে ক্রেতার সাথে যোগাযোগ করিয়ে দেবে।
            </p>
          </div>
          <button
            onClick={() => navigateTo('submit')}
            className="bg-white text-[#00875A] font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition shadow-md whitespace-nowrap text-sm"
          >
            প্রপার্টি তথ্য জমা দিন &rarr;
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6"><div><h2 className="text-xl sm:text-2xl font-bold text-gray-900">এলাকা অনুযায়ী প্রপার্টি দেখুন</h2><p className="text-xs sm:text-sm text-gray-500 mt-1">আপনার পছন্দের বরিশাল location থেকে শুরু করুন</p></div></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {popularAreas.map((area) => <button key={area} onClick={() => { setSearchFilters({ ...searchFilters, area }); navigateTo('area'); }} className="group text-left bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"><MapPin className="w-7 h-7 text-[#00875A] mb-4" /><span className="block font-bold text-gray-900 group-hover:text-[#00875A]">{area}</span><span className="text-xs text-gray-500">জমি ও ফ্ল্যাট দেখুন <ArrowRight className="inline w-3 h-3" /></span></button>)}
        </div>
      </section>

      <section className="bg-slate-50 py-12"><div className="max-w-7xl mx-auto px-4"><div className="mb-6"><h2 className="text-xl sm:text-2xl font-bold text-gray-900">আমাদের গ্রাহকের অভিজ্ঞতা</h2><p className="text-xs sm:text-sm text-gray-500 mt-1">বরিশালের ক্রেতা ও বিক্রেতাদের কিছু কথা</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{testimonials.map((testimonial) => <article key={testimonial.name} className="bg-white rounded-xl p-5 shadow-sm"><div className="flex gap-1 text-amber-400 mb-4">★★★★★</div><p className="text-sm text-gray-600 leading-6">“{testimonial.text}”</p><div className="mt-5 pt-4 border-t border-gray-100"><p className="font-bold text-gray-900 text-sm">{testimonial.name}</p><p className="text-xs text-gray-500 mt-1">{testimonial.role}</p></div></article>)}</div></div></section>

      <section className="max-w-3xl mx-auto px-4 py-12"><div className="text-center mb-7"><h2 className="text-xl sm:text-2xl font-bold text-gray-900">সচরাচর জিজ্ঞাসা</h2><p className="text-xs sm:text-sm text-gray-500 mt-1">প্রপার্টি কেনাবেচা নিয়ে সাধারণ কিছু প্রশ্ন</p></div><div className="space-y-3">{faqs.map(([question, answer], index) => <div key={question} className="bg-white rounded-xl shadow-sm overflow-hidden"><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm text-gray-900"><span>{question}</span><ChevronDown className={`w-4 h-4 shrink-0 text-[#00875A] transition ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="px-5 pb-5 text-sm text-gray-600 leading-6">{answer}</p>}</div>)}</div></section>
    </div>
  );
}
