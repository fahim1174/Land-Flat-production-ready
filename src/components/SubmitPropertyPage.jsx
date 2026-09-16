import { useState } from 'react';
import { CheckCircle2, Upload, MapPin, Phone, User, FileText, Building2 } from 'lucide-react';
import { BARISAL_LOCATIONS } from '../data/properties';

export default function SubmitPropertyPage({ navigateTo }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-md border border-gray-100">
        <div className="mb-6 p-4 sm:p-0 rounded-2xl bg-gradient-to-b from-emerald-50/80 via-emerald-50/30 to-transparent sm:bg-none text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00875A] font-semibold text-xs mb-2">
            <Building2 className="w-3.5 h-3.5" /> সহজ ও নিরাপদ লিস্টিং
          </span>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">বরিশাল শহরে প্রপার্টির তথ্য দিন</h1>
          <p className="text-xs sm:text-sm text-gray-500">আপনার জমা দেওয়া তথ্য সুরক্ষিত থাকবে। আমরা পর্যালোচনা করে আপনার সাথে যোগাযোগ করব।</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 text-[#00875A] p-6 rounded-xl text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#00875A]" />
            <h3 className="font-bold text-lg mb-1">তথ্য জমা সফল হয়েছে!</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">আমাদের প্রতিনিধি শীঘ্রই আপনার প্রপার্টি পরিদর্শনের জন্য কল করবেন।</p>
            <button
              onClick={() => navigateTo('home')}
              className="bg-[#00875A] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md"
            >
              হোমে ফিরে যান
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 sm:space-y-6 text-sm">
            
            {/* Section 1: Property Information */}
            <div className="bg-slate-50/70 p-3 sm:p-5 rounded-xl border border-gray-200/60 space-y-3.5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#00875A]" /> প্রপার্টির বিবরণ
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">প্রপার্টি টাইপ</label>
                  <select className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm">
                    <option>জমি</option>
                    <option>ফ্ল্যাট</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00875A]" /> বরিশালের এলাকা
                  </label>
                  <select className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm">
                    {BARISAL_LOCATIONS.map((loc) => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">আনুমানিক মূল্য (টাকায়)</label>
                  <input type="number" placeholder="যেমন: 5000000" required className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">আয়তন</label>
                  <input type="text" required placeholder="যেমন: ১০ শতক / ১৪৫০ বর্গফুট" className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00875A]" /> ঠিকানা / ল্যান্ডমার্ক
                  </label>
                  <input type="text" required placeholder="রোড, landmark বা প্রধান সড়ক থেকে দূরত্ব" className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm" />
                </div>
              </div>
            </div>

            {/* Section 2: Owner / Contact Information */}
            <div className="bg-slate-50/70 p-3 sm:p-5 rounded-xl border border-gray-200/60 space-y-3.5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#00875A]" /> মালিক ও যোগাযোগের তথ্য
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">আপনার নাম (মালিক/প্রতিনিধি)</label>
                  <input type="text" required placeholder="আপনার পূর্ণ নাম" className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#00875A]" /> ফোন নম্বর
                  </label>
                  <input type="tel" required placeholder="01XXXXXXXXX" className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">মালিকানার ধরন</label>
                  <select className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-800 text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm">
                    <option>আমি নিজে মালিক</option>
                    <option>আমি প্রতিনিধি / এজেন্ট</option>
                    <option>রিয়েল এস্টেট ডেভেলপার</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Media & Details */}
            <div className="bg-slate-50/70 p-3 sm:p-5 rounded-xl border border-gray-200/60 space-y-3.5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#00875A]" /> ছবি, কাগজপত্র ও বিবরণ
              </h3>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">ছবি বা কাগজপত্র আপলোড</label>
                  <label className="flex items-center gap-3 w-full p-3.5 bg-white border border-dashed border-emerald-300 rounded-xl text-gray-500 cursor-pointer hover:border-[#00875A] hover:bg-emerald-50/20 transition shadow-sm">
                    <div className="p-2 bg-emerald-50 text-[#00875A] rounded-lg">
                      <Upload className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-gray-800 truncate">প্রপার্টি ছবি, খতিয়ান বা দলিল বাছাই করুন</span>
                      <span className="block text-[11px] text-gray-400">PNG, JPG, PDF (সর্বোচ্চ ১০টি)</span>
                    </div>
                    <input type="file" multiple accept="image/*,.pdf" className="sr-only" />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">বিবরণ (ঐচ্ছিক)</label>
                  <textarea rows="3" placeholder="জমির আকার, রাস্তা, ফ্ল্যাটের ঘর সংখ্যা বা অন্যান্য তথ্য" className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#00875A] shadow-sm"></textarea>
                </div>
              </div>
            </div>

            {/* Support / Trust Banner */}
            <div className="bg-[#E6F4EA] p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#00875A] text-white p-2 rounded-lg shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-emerald-800 font-medium">সরাসরি কথা বলতে কল করুন</span>
                  <a href="tel:01903431174" className="text-xs sm:text-sm font-bold text-[#00875A] hover:underline">01903431174</a>
                </div>
              </div>
              <a 
                href="https://wa.me/8801903431174" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm hover:opacity-90 transition shrink-0 flex items-center gap-1"
              >
                WhatsApp
              </a>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer pt-1">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#00875A]" />
              <span>আমি Land&amp;Flat-এর <button type="button" className="font-semibold text-[#00875A] hover:underline" onClick={() => navigateTo('privacy')}>প্রাইভেসি পলিসি</button> এবং <button type="button" className="font-semibold text-[#00875A] hover:underline" onClick={() => navigateTo('terms')}>টার্মস অ্যান্ড কন্ডিশন</button> মেনে নিচ্ছি।</span>
            </label>

            <button type="submit" className="w-full bg-[#00875A] hover:bg-[#006644] text-white font-bold py-3.5 rounded-xl transition shadow-lg active:scale-95 text-sm sm:text-base">
              তথ্য জমা দিন
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
