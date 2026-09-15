import { useState } from 'react';
import { CheckCircle2, Copy, FileCheck2, Heart, MapPin, Phone, Share2 } from 'lucide-react';
import PropertyCard from './PropertyCard';

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3 sm:p-4">
      <span className="block text-[10px] sm:text-[11px] text-gray-400 mb-1">{label}</span>
      <span className="text-xs sm:text-sm font-semibold text-gray-800">{value || 'তথ্য পাওয়া যায়নি'}</span>
    </div>
  );
}

export default function PropertyDetailsPage({ property, properties, navigateTo, wishlist, toggleWishlist }) {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [idCopied, setIdCopied] = useState(false);
  const relatedProperties = properties
    .filter((item) => item.id !== property.id && item.type === property.type)
    .slice(0, 3);

  const handleShare = async () => {
    const shareData = { title: property.title, text: property.location, url: window.location.href };
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) await navigator.clipboard.writeText(window.location.href);
  };

  const copyPropertyId = async () => {
    if (!property.propertyId || !navigator.clipboard) return;
    await navigator.clipboard.writeText(property.propertyId);
    setIdCopied(true);
    window.setTimeout(() => setIdCopied(false), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 space-y-4 sm:space-y-6">
      {/* 1. Image Gallery at the very top with Overlay Action Icons */}
      {((property.images || []).length > 0 || property.video) && (
        <section className="bg-white rounded-xl p-3 sm:p-6 shadow-sm relative">
          <div className="absolute top-5 right-5 sm:top-8 sm:right-8 flex items-center gap-2 z-20">
            <button onClick={() => toggleWishlist(property.id)} aria-label="প্রপার্টি সেভ করুন" className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-red-500 shadow-sm transition">
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button onClick={handleShare} aria-label="প্রপার্টি শেয়ার করুন" className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-[#00875A] shadow-sm transition">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(property.images || []).slice(0, 3).map((image) => (
              <img key={image} src={image} alt={property.title} className="h-56 sm:h-64 w-full rounded-xl object-cover" />
            ))}
            {property.video && (
              <video src={property.video} controls className="h-56 sm:h-64 w-full rounded-xl bg-gray-100 object-cover" />
            )}
          </div>
        </section>
      )}

      {/* 2. Title / Price / Location Info */}
      <section className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <button type="button" onClick={copyPropertyId} className="flex items-center gap-1 rounded bg-emerald-100 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-[#00875A] hover:bg-emerald-200" title="Property ID copy করুন">
              {idCopied ? 'কপি হয়েছে' : property.propertyId}
              <Copy className="h-3 w-3" />
            </button>
            {property.verificationStatus === 'Verified' && (
              <span className="flex items-center gap-1 bg-emerald-50 text-[#00875A] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded">
                <CheckCircle2 className="w-3 h-3" /> ভেরিফাইড
              </span>
            )}
            <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded">পোস্ট করা হয়েছে: ২ দিন আগে</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 leading-snug">{property.title}</h1>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-1 text-xs sm:text-sm text-[#00875A] hover:underline">
            <MapPin className="w-4 h-4" /> {property.location} · ম্যাপে দেখুন
          </a>
        </div>
        <div className="mt-4 sm:mt-5 flex flex-wrap items-end gap-x-8 gap-y-3 pt-4">
          <div><span className="block text-[11px] sm:text-xs text-gray-400">মোট মূল্য</span><strong className="text-xl sm:text-2xl text-[#00875A]">{property.formattedPrice}</strong></div>
          <div><span className="block text-[11px] sm:text-xs text-gray-400">মূল্যের ধরণ</span><strong className="text-xs sm:text-sm text-gray-800">আলোচনা সাপেক্ষ</strong></div>
          <div><span className="block text-[11px] sm:text-xs text-gray-400">{property.type === 'land' ? 'প্রতি শতক' : 'প্রতি বর্গফুট'}</span><strong className="text-xs sm:text-sm text-gray-800">{property.type === 'land' ? property.pricePerDecimal : property.pricePerSqft}</strong></div>
        </div>
      </section>

      {/* 3. Specifications Grid */}
      <section className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
        <h2 className="font-bold text-base sm:text-lg text-gray-900 mb-3">মূল স্পেসিফিকেশন</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {property.type === 'land' ? <>
            <InfoItem label="আয়তন" value={property.landSize} />
            <InfoItem label="সামনের রাস্তা" value={property.roadWidth} />
            <InfoItem label="জমির ধরণ" value={`উঁচু ${property.landCategory === 'Residential' ? 'আবাসিক' : 'বাণিজ্যিক'}`} />
            <InfoItem label="মুখী" value={property.facing} />
            <InfoItem label="মৌজা" value={property.mouza} />
            <InfoItem label="মালিকানা" value="একক মালিকানা" />
          </> : <>
            <InfoItem label="ফ্ল্যাটের সাইজ" value={property.flatSize} />
            <InfoItem label="বেডরুম" value={`${property.bedrooms} টি`} />
            <InfoItem label="বাথরুম" value={`${property.bathrooms} টি`} />
            <InfoItem label="তলার অবস্থান" value={property.floor} />
            <InfoItem label="পার্কিং" value={property.parking} />
            <InfoItem label="প্রকল্প" value={property.projectName} />
          </>}
        </div>
      </section>

      {/* 4. Legal Documents */}
      <section className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
        <h2 className="font-bold text-base sm:text-lg text-gray-900 mb-3">আইনি ও কাগজপত্রের তথ্য</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-3">
          <InfoItem label="খতিয়ান / নামজারি" value="নামজারি ও খতিয়ান সম্পন্ন" />
          <InfoItem label="রেজিস্ট্রেশন" value={property.verificationStatus === 'Verified' ? 'নিষ্কণ্টক ও ভেরিফাইড' : property.verificationStatus} />
          <InfoItem label="অনুমোদন" value="প্রাথমিকভাবে যাচাইকৃত" />
        </div>
        <div className="flex items-center gap-2 text-xs text-[#00875A] font-semibold"><FileCheck2 className="w-4 h-4 shrink-0" /> কাগজপত্রের বিস্তারিত রিপোর্ট প্রতিনিধি যাচাইয়ের পর দেওয়া হবে।</div>
      </section>

      {/* Location & Description */}
      <section className="bg-white rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="font-bold text-base sm:text-lg text-gray-900 mb-3">লোকেশন ও আশেপাশের সুবিধা</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            <InfoItem label="ল্যান্ডমার্ক" value={property.location} />
            <InfoItem label="প্রধান সড়ক" value="প্রায় ২০০ মিটার দূরে" />
            <InfoItem label="বাজার / যাতায়াত" value="কাছাকাছি বাজার ও পরিবহন" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-2">বিস্তারিত বিবরণ</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{property.description}</p>
        </div>
      </section>

      {/* 5. Contact / Lead Form at the bottom */}
      <section className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-lg text-gray-900 mb-1 text-center">ভিজিট বা তথ্যের জন্য যোগাযোগ</h2>
          <p className="text-xs text-gray-500 mb-5 text-center">আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
          
          {inquirySubmitted ? (
            <div className="bg-emerald-50 text-[#00875A] p-4 rounded-lg text-sm font-semibold text-center">
              আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে।
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setInquirySubmitted(true); }} className="space-y-3">
              <input type="text" placeholder="আপনার নাম" required className="w-full text-sm p-3 bg-gray-50 border rounded-lg" />
              <input type="tel" placeholder="মোবাইল নম্বর" required className="w-full text-sm p-3 bg-gray-50 border rounded-lg" />
              <textarea placeholder="বার্তা বা প্রশ্ন (ঐচ্ছিক)" rows="3" className="w-full text-sm p-3 bg-gray-50 border rounded-lg" />
              <button type="submit" className="w-full bg-[#00875A] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#006644] transition">
                সাইট ভিজিটের অনুরোধ দিন
              </button>
            </form>
          )}

          <a href="tel:+8801903431174" className="mt-3 w-full bg-emerald-50 text-[#00875A] font-semibold py-3 rounded-lg text-sm flex items-center justify-center gap-2 border border-emerald-200 transition hover:bg-emerald-100">
            <Phone className="w-4 h-4" /> সরাসরি কল করুন
          </a>

          <div className="mt-5 pt-4 text-center">
            <p className="text-xs text-gray-400">পোস্টকারী</p>
            <p className="font-bold text-gray-900 text-sm">Land&Flat Barisal প্রতিনিধি</p>
            <span className="text-xs text-[#00875A] font-semibold">ভেরিফাইড এজেন্ট</span>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="pt-4">
          <h2 className="font-bold text-xl text-gray-900 mb-4">সম্পর্কিত প্রপার্টি</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {relatedProperties.map((item) => (
              <PropertyCard key={item.id} property={item} navigateTo={navigateTo} isWishlisted={wishlist.includes(item.id)} toggleWishlist={toggleWishlist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
