import { useState } from 'react';
import { BadgeCheck, Clock3, Coins, Copyright, FileCheck, FileCheck2, HandCoins, HeartHandshake, Mail, MapPin, MessageCircle, Phone, PlayCircle, Scale, Send, ShieldAlert, Users } from 'lucide-react';
import PropertyCard from './PropertyCard';

export function AboutPage() {
  return (
    <div className="bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#00875A]">Land&Flat Barisal</span>
            <h1 className="mt-2 text-2xl sm:text-5xl font-extrabold leading-tight text-gray-900">বরিশালে সম্পত্তি কেনাবেচায় নির্ভরতার নতুন ঠিকানা</h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Land&Flat বরিশাল শহরের ক্রেতা ও বিক্রেতাদের জন্য একটি সহজ, স্বচ্ছ এবং স্থানীয়ভাবে সহায়ক প্রপার্টি প্ল্যাটফর্ম। সঠিক তথ্য, যাচাই করা listing এবং অভিজ্ঞ প্রতিনিধির সহায়তায় আমরা সম্পত্তি খোঁজার পথটি সহজ করি।
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00875A]"><BadgeCheck className="w-5 h-5 shrink-0" /> স্থানীয়ভাবে যাচাই করা প্রপার্টি</div>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85" alt="আধুনিক আবাসিক ভবন" className="w-full h-60 sm:h-96 object-cover rounded-2xl shadow-md" />
            <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"><p className="text-xs text-gray-500 font-medium">আমাদের অঙ্গীকার</p><p className="mt-1 text-sm sm:text-base font-bold text-gray-900">স্বচ্ছ তথ্য, নিশ্চিন্ত সিদ্ধান্ত</p></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-8 sm:pb-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"><HeartHandshake className="w-7 h-7 sm:w-8 sm:h-8 text-[#00875A] mb-3" /><h2 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5">আমাদের লক্ষ্য</h2><p className="text-xs sm:text-sm text-gray-600 leading-relaxed">ক্রেতাকে যাচাই করা তথ্য ও বাস্তবসম্মত options দেওয়া, যাতে নিজের প্রয়োজন অনুযায়ী আত্মবিশ্বাসের সঙ্গে সিদ্ধান্ত নেওয়া যায়।</p></div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"><Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#00875A] mb-3" /><h2 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5">আমাদের উদ্দেশ্য</h2><p className="text-xs sm:text-sm text-gray-600 leading-relaxed">স্থানীয় মালিক ও বিক্রেতাদের কাছে পৌঁছে তাদের সম্পত্তি সঠিকভাবে উপস্থাপন করা এবং নিরাপদ যোগাযোগ তৈরি করা।</p></div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4"><div className="max-w-2xl mb-6"><h2 className="text-xl sm:text-3xl font-bold text-gray-900">কেন Land&Flat বেছে নেবেন?</h2><p className="mt-1.5 text-xs sm:text-sm text-gray-500">প্রপার্টি খোঁজার প্রতিটি গুরুত্বপূর্ণ ধাপে আমাদের স্থানীয় team আপনার পাশে থাকে।</p></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <ValueCard icon={BadgeCheck} title="ভেরিফাইড প্রপার্টি" text="প্রাথমিক কাগজপত্র ও listing তথ্য যাচাই করে প্রকাশ করা হয়।" />
            <ValueCard icon={Scale} title="আইনি সহায়তা" text="প্রয়োজনীয় দলিল ও যাচাইয়ের ধাপ বুঝতে প্রতিনিধি সহায়তা করেন।" />
            <ValueCard icon={HandCoins} title="স্বচ্ছ লেনদেন" text="মূল্য ও শর্ত পরিষ্কারভাবে জানানো হয়, লুকানো খরচ নয়।" />
            <ValueCard icon={HeartHandshake} title="বিশ্বস্ত ব্রোকারেজ" text="বরিশালের স্থানীয় market সম্পর্কে বাস্তব অভিজ্ঞতার সহায়তা।" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-4 my-2 bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Stat icon={BadgeCheck} value="৫০+" label="রেজিস্টার্ড প্রপার্টি" />
          <Stat icon={Users} value="১০০+" label="সন্তুষ্ট কাস্টমার" />
          <Stat icon={MapPin} value="৪" label="প্রধান লোকেশন" />
          <Stat icon={Clock3} value="৫+" label="বছরের স্থানীয় অভিজ্ঞতা" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16"><div className="grid lg:grid-cols-2 gap-8 items-center"><div className="relative"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="প্রপার্টি পরামর্শ দিচ্ছে Land&Flat টিম" className="w-full h-60 sm:h-80 object-cover rounded-2xl shadow-sm" /><div className="absolute inset-0 flex items-center justify-center z-10"><div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 text-[#00875A] flex items-center justify-center shadow-lg"><PlayCircle className="w-7 h-7 sm:w-8 sm:h-8" /></div></div></div><div><span className="text-xs font-bold text-[#00875A] uppercase tracking-[0.2em]">আমাদের টিম</span><h2 className="mt-2 text-xl sm:text-3xl font-bold text-gray-900">আপনার property journey-তে স্থানীয় সহায়তা</h2><p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">সাইট ভিজিট, তথ্য যাচাই এবং seller-এর সঙ্গে যোগাযোগের প্রতিটি ধাপে আমাদের প্রতিনিধি দল আপনাকে গাইড করে। বরিশাল শহরকে কাছ থেকে চেনা একটি responsive team-এর সঙ্গে সিদ্ধান্ত নিন।</p><div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00875A]"><FileCheck2 className="w-5 h-5 shrink-0" /> যাচাই থেকে site visit পর্যন্ত সহায়তা</div></div></div></section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, text }) {
  return <div className="bg-slate-50 rounded-xl p-3.5 sm:p-5 shadow-sm"><Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#00875A] mb-2 sm:mb-4" /><h3 className="text-xs sm:text-base font-bold text-gray-900 mb-1">{title}</h3><p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">{text}</p></div>;
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 shadow-sm text-center flex flex-col items-center justify-center transition-transform duration-200 hover:scale-[1.02]">
      {Icon && (
        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <strong className="block text-2xl font-extrabold text-emerald-700 tracking-tight my-1">{value}</strong>
      <span className="block text-xs font-semibold text-emerald-900/80">{label}</span>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 pb-20">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00875A]">Land&Flat Barisal</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">আপনার প্রপার্টি নিয়ে কথা বলুন</h1>
          <p className="mt-3 text-sm text-gray-600 leading-7">জমি, ফ্ল্যাট, site visit বা listing সংক্রান্ত যেকোনো প্রশ্নে আমাদের বরিশাল টিমের সঙ্গে যোগাযোগ করুন।</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">বার্তা পাঠান</h2>
            <p className="text-xs text-gray-500 mb-6">আপনার তথ্য দিয়ে পাঠালে একজন প্রতিনিধি যোগাযোগ করবেন।</p>
            {submitted ? (
              <div className="rounded-xl bg-emerald-50 p-6 text-center text-[#00875A]"><Send className="mx-auto w-8 h-8 mb-3" /><h3 className="font-bold">বার্তা সফলভাবে পাঠানো হয়েছে</h3><p className="mt-2 text-xs text-gray-600">আমাদের প্রতিনিধি শীঘ্রই আপনার সঙ্গে যোগাযোগ করবেন।</p></div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div><label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 mb-1">নাম</label><input id="contact-name" type="text" required placeholder="আপনার পূর্ণ নাম" className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#00875A]" /></div>
                <div><label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-700 mb-1">মোবাইল নম্বর</label><input id="contact-phone" type="tel" required placeholder="01XXXXXXXXX" className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#00875A]" /></div>
                <div><label htmlFor="contact-subject" className="block text-xs font-semibold text-gray-700 mb-1">বিষয়</label><select id="contact-subject" className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 focus:outline-none focus:border-[#00875A]"><option>জমি কিনতে চাই</option><option>ফ্ল্যাট কিনতে চাই</option><option>জমি/ফ্ল্যাট বিক্রি করতে চাই</option><option>সাধারণ তথ্য</option></select></div>
                <div><label htmlFor="contact-message" className="block text-xs font-semibold text-gray-700 mb-1">বার্তা</label><textarea id="contact-message" required rows="5" placeholder="আপনার প্রয়োজন বা প্রশ্ন লিখুন" className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm focus:outline-none focus:border-[#00875A]" /></div>
                <button type="submit" className="w-full rounded-lg bg-[#00875A] py-3 text-sm font-bold text-white transition hover:bg-[#006644] flex items-center justify-center gap-2"><Send className="w-4 h-4" /> বার্তা পাঠান</button>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-5">যোগাযোগের বিস্তারিত</h2>
              <div className="space-y-5">
                <ContactItem icon={MapPin} label="অফিসের ঠিকানা" value="সদর রোড, বরিশাল সদর, বরিশাল" />
                <ContactItem icon={Phone} label="ফোন" value="01903431174" href="tel:+8801903431174" />
                <ContactItem icon={MessageCircle} label="WhatsApp" value="WhatsApp-এ মেসেজ করুন" href="https://wa.me/8801903431174" />
                <ContactItem icon={Mail} label="ইমেইল" value="fahimukil49@gmail.com" href="mailto:fahimukil49@gmail.com" />
                <ContactItem icon={Clock3} label="অফিস সময়" value="শনি - বৃহস্পতি, সকাল ৯টা - সন্ধ্যা ৬টা" />
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <span className="text-xs font-semibold text-gray-500">সামাজিক যোগাযোগ</span>
                <a href="https://business.facebook.com/latest/inbox/all/?nav_ref=manage_page_ap_plus_inbox_message_button&asset_id=1228252993699966" target="_blank" rel="noreferrer" aria-label="Facebook page" className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube channel" className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100 transition"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram page" className="rounded-full bg-pink-50 p-2 text-pink-600 hover:bg-pink-100 transition"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4"><h2 className="text-2xl font-bold text-gray-900">আমাদের অফিস কোথায়?</h2><p className="mt-1 text-sm text-gray-500">সদর রোড, বরিশাল সদর, বরিশাল</p></div>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"><iframe title="Land and Flat Barisal office location" src="https://www.google.com/maps?q=Sadar%20Road%2C%20Barishal%20Sadar%2C%20Barishal&output=embed" className="h-80 w-full border-0" loading="lazy" /></div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  const content = <><Icon className="w-5 h-5 text-[#00875A] shrink-0" /><span><span className="block text-xs text-gray-400 mb-1">{label}</span><span className="block text-sm font-semibold text-gray-800">{value}</span></span></>;
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-start gap-3 hover:opacity-80">{content}</a> : <div className="flex items-start gap-3">{content}</div>;
}

export function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-full pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
        <div className="bg-white rounded-2xl p-5 sm:p-10 shadow-sm border border-gray-100">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00875A]">Land&amp;Flat Barisal</span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">প্রাইভেসি পলিসি</h1>
          <p className="pb-6 border-b border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">Land&Flat আপনার ব্যক্তিগত তথ্যের গোপনীয়তা এবং নিরাপত্তাকে গুরুত্ব দেয়।</p>
          <div className="mt-6 space-y-3.5">
            <LegalCard title="তথ্য সংগ্রহ" text="সেবা দেওয়ার প্রয়োজনে আমরা নাম, ফোন নম্বর, ইমেইল, প্রপার্টির ঠিকানা এবং আপলোড করা ছবি বা কাগজপত্র সংগ্রহ করতে পারি।" />
            <LegalCard title="তথ্যের ব্যবহার" text="এই তথ্য ক্রেতা ও বিক্রেতার যোগাযোগ করিয়ে দেওয়া, প্রপার্টি যাচাই, site visit সমন্বয় এবং customer support-এর জন্য ব্যবহার করা হয়।" />
            <LegalCard title="গোপনীয়তা সুরক্ষা" text="বিক্রেতার ব্যক্তিগত ফোন নম্বর বা NID তথ্য publicly প্রকাশ করা হয় না। প্রয়োজন অনুযায়ী শুধু অনুমোদিত admin বা প্রতিনিধি যাচাই করতে পারেন।" />
            <LegalCard title="তৃতীয় পক্ষের সাথে শেয়ার" text="আপনার অনুমতি ছাড়া আমরা আপনার তথ্য কোনো third-party বা marketing agency-এর কাছে বিক্রি করি না। আইনি প্রয়োজন হলে প্রযোজ্য কর্তৃপক্ষের সঙ্গে তথ্য শেয়ার করা হতে পারে।" />
            <LegalCard title="কুকিজ" text="সাইটের ব্যবহার অভিজ্ঞতা উন্নত করতে browser cookies বা অনুরূপ প্রযুক্তি ব্যবহার করা হতে পারে।" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LegalCard({ title, text }) {
  return (
    <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 shadow-sm">
      <h2 className="text-sm font-bold text-emerald-800 mb-1.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00875A]"></span>
        {title}
      </h2>
      <p className="text-xs leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-full">
      <div className="max-w-4xl mx-auto px-4 py-6 mb-6">
        <div className="bg-white rounded-2xl p-5 sm:p-10 shadow-sm border border-gray-100">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00875A]">Land&amp;Flat Barisal</span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">টার্মস অ্যান্ড কন্ডিশন</h1>
          <p className="pb-6 border-b border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">Land&Flat ব্যবহার করার আগে নিচের শর্তগুলো মনোযোগ দিয়ে পড়ুন।</p>
          <div className="mt-6 space-y-3.5">
            <TermsCard icon={FileCheck} title="লিস্টিংয়ের সত্যতা" text="বিক্রেতাকে প্রপার্টির সঠিক, সম্পূর্ণ এবং আইনসম্মত তথ্য দিতে হবে। ভুয়া, বিভ্রান্তিকর বা জাল তথ্য পাওয়া গেলে listing বাতিল করা হতে পারে।" />
            <TermsCard icon={ShieldAlert} title="প্ল্যাটফর্মের দায়বদ্ধতা" text="Land&Flat একটি marketplace ও brokerage মাধ্যম। চূড়ান্ত বায়না বা রেজিস্ট্রেশনের আগে ক্রেতাকে নিজের দায়িত্বে দলিল, মালিকানা ও আইনি বিষয় যাচাই করতে হবে।" />
            <TermsCard icon={Copyright} title="কপিরাইট ও ছবি ব্যবহার" text="ওয়েবসাইটে upload করা ছবি ও তথ্য ব্যবহারের অধিকার বিক্রেতার থাকতে হবে। প্ল্যাটফর্মে প্রকাশিত content Land&Flat-এর অনুমতি ছাড়া কপি বা পুনঃব্যবহার করা যাবে না।" />
            <TermsCard icon={Coins} title="সার্ভিস চার্জ বা কমিশন" text="কোনো service charge বা commission প্রযোজ্য হলে deal বা verification-এর আগে তা পরিষ্কারভাবে জানানো হবে।" />
            <TermsCard icon={Scale} title="অ্যাকাউন্ট বাতিল" text="প্রতারণা, জাল তথ্য বা platform misuse-এর ক্ষেত্রে Land&Flat কোনো account বা listing সাময়িকভাবে স্থগিত বা স্থায়ীভাবে বন্ধ করার অধিকার রাখে।" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 shadow-sm mb-3.5">
      <h2 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-1.5">
        {Icon && <Icon className="w-4 h-4 shrink-0 text-[#00875A]" />}
        {title}
      </h2>
      <p className="text-xs leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export function WishlistPage({ properties, navigateTo, toggleWishlist }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">আপনার পছন্দের প্রপার্টি ({properties.length})</h1>
      {properties.length === 0 ? (
        <p className="text-xs text-gray-500">আপনার উইশলিস্টে কোনো প্রপার্টি নেই।</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} navigateTo={navigateTo} isWishlisted={true} toggleWishlist={toggleWishlist} />
          ))}
        </div>
      )}
    </div>
  );
}
