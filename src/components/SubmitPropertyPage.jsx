import { useState } from 'react';
import { CheckCircle2, Upload } from 'lucide-react';
import { BARISAL_LOCATIONS } from '../data/properties';

export default function SubmitPropertyPage({ navigateTo }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">বরিশাল শহরে প্রপার্টির তথ্য দিন</h1>
        <p className="text-sm text-gray-500 mb-8">আপনার জমা দেওয়া তথ্য সুরক্ষিত থাকবে। আমরা পর্যালোচনা করে আপনার সাথে যোগাযোগ করব।</p>

        {submitted ? (
          <div className="bg-emerald-50 text-[#00875A] p-4 rounded-xl text-center">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-[#00875A]" />
            <h3 className="font-bold text-base mb-1">তথ্য জমা সফল হয়েছে!</h3>
            <p className="text-xs text-gray-600">আমাদের প্রতিনিধি শীঘ্রই আপনার প্রপার্টি পরিদর্শনের জন্য কল করবেন।</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">প্রপার্টি টাইপ</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00875A]">
                <option>জমি</option>
                <option>ফ্ল্যাট</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">বরিশালের এলাকা</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00875A]">
                {BARISAL_LOCATIONS.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">আনুমানিক মূল্য (টাকায়)</label>
              <input type="number" placeholder="যেমন: 5000000" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00875A]" />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">আপনার নাম (মালিক/প্রতিনিধি)</label>
              <input type="text" required placeholder="আপনার পূর্ণ নাম" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00875A]" />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">ফোন নম্বর</label>
              <input type="tel" required placeholder="01XXXXXXXXX" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00875A]" />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">আয়তন</label>
              <input type="text" required placeholder="যেমন: ১০ শতক / ১৪৫০ বর্গফুট" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00875A]" />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">মালিকানার ধরন</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#00875A]"><option>আমি নিজে মালিক</option><option>আমি প্রতিনিধি / এজেন্ট</option><option>রিয়েল এস্টেট ডেভেলপার</option></select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">ঠিকানা / ল্যান্ডমার্ক</label>
              <input type="text" required placeholder="রোড, landmark বা প্রধান সড়ক থেকে দূরত্ব" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00875A]" />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">ছবি বা কাগজপত্র আপলোড</label>
              <label className="flex min-w-0 items-center gap-3 w-full p-3 bg-slate-50 border border-dashed border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:border-[#00875A] hover:text-[#00875A]"><Upload className="w-5 h-5 shrink-0" /><span className="min-w-0 truncate">প্রপার্টি ছবি, খতিয়ান বা দলিল বাছাই করুন</span><input type="file" multiple accept="image/*,.pdf" className="sr-only" /></label>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">বিবরণ</label>
              <textarea rows="4" placeholder="জমির আকার, রাস্তা, ফ্ল্যাটের ঘর সংখ্যা বা অন্যান্য তথ্য" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00875A]"></textarea>
            </div>

            <label className="sm:col-span-2 flex items-start gap-3 text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#00875A]" />
              <span>আমি Land&amp;Flat-এর <button type="button" className="font-semibold text-[#00875A] hover:underline" onClick={() => navigateTo('privacy')}>প্রাইভেসি পলিসি</button> এবং <button type="button" className="font-semibold text-[#00875A] hover:underline" onClick={() => navigateTo('terms')}>টার্মস অ্যান্ড কন্ডিশন</button> মেনে নিচ্ছি।</span>
            </label>

            <button type="submit" className="sm:col-span-2 w-full bg-[#00875A] text-white font-bold py-3.5 rounded-lg hover:bg-[#006644] transition">
              তথ্য জমা দিন
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
