import { useState } from 'react';
import { CheckCircle2, Copy, FileCheck2, Heart, MapPin, Phone, Share2 } from 'lucide-react';
import PropertyCard from './PropertyCard';

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50/90 p-4 sm:p-5 border border-slate-200 transition-all duration-200 hover:bg-emerald-50/30 hover:border-emerald-300 shadow-2xs">
      <span className="block text-[11px] sm:text-xs text-gray-500 mb-1.5 font-medium">{label}</span>
      <span className="text-xs sm:text-sm font-bold text-gray-900">{value || 'তথ্য পাওয়া যায়নি'}</span>
    </div>
  );
}

export default function PropertyDetailsPage({ property, properties, navigateTo, wishlist, toggleWishlist }) {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [idCopied, setIdCopied] = useState(false);
  const images = property.images || [];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const activeImage = images[selectedImageIdx] || images[0];
  // Dynamic filtering for related properties: same category (type) and matching location/area context
  const relatedProperties = properties
    .filter((item) => {
      if (item.id === property.id) return false;
      // Must match category/type (e.g. land or flat)
      if (item.type !== property.type) return false;
      return true;
    })
    .sort((a, b) => {
      // Prioritize items with matching location/area context if possible
      const aMatchLocation = a.location && property.location && a.location.toLowerCase().includes(property.location.toLowerCase()) ? 1 : 0;
      const bMatchLocation = b.location && property.location && b.location.toLowerCase().includes(property.location.toLowerCase()) ? 1 : 0;
      return bMatchLocation - aMatchLocation;
    })
    .slice(0, 4);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/?property=${property.id}`;
    const shareData = { title: property.title, text: property.location, url: shareUrl };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // ignore
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      alert('প্রপার্টির লিংক কপি করা হয়েছে!');
    }
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
        <section className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Image/Video Gallery (approx 60% / 7 cols) */}
            <div className="lg:col-span-7 relative">
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button onClick={() => toggleWishlist(property.id)} aria-label="প্রপার্টি সেভ করুন" className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-red-500 shadow-sm transition">
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button onClick={handleShare} aria-label="প্রপার্টি শেয়ার করুন" className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-[#00875A] shadow-sm transition">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden bg-black/5 aspect-[16/10]">
                  {activeImage && (
                    <img src={activeImage} alt={property.title} className="w-full h-full object-cover transition-all duration-300" />
                  )}
                  {property.video && selectedImageIdx === images.length && (
                    <video src={property.video} controls className="w-full h-full object-cover" />
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`relative rounded-lg overflow-hidden w-20 h-14 shrink-0 border-2 transition-all ${selectedImageIdx === idx ? 'border-[#00875A] ring-2 ring-emerald-500/20 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Core Info Side-by-Side (approx 40% / 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-50/70 p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={copyPropertyId} className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-[#00875A] hover:bg-emerald-200 transition" title="Property ID copy করুন">
                    {idCopied ? 'কপি হয়েছে' : property.propertyId}
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  {property.verificationStatus === 'Verified' && (
                    <span className="flex items-center gap-1.5 bg-emerald-50 text-[#00875A] text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ভেরিফাইড
                    </span>
                  )}
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">২ দিন আগে</span>
                </div>
                
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">{property.title}</h1>
                
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs sm:text-sm text-[#00875A] font-medium hover:underline">
                  <MapPin className="w-4 h-4 shrink-0" /> {property.location} · ম্যাপে দেখুন
                </a>

                <div className="border-t border-gray-200 pt-4 space-y-3.5 bg-white p-4 rounded-xl shadow-2xs border-slate-200/80">
                  <div className="grid grid-cols-2 items-center pb-2.5 border-b border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">মোট মূল্য</span>
                    <strong className="text-xl sm:text-2xl text-[#00875A] font-black text-right">{property.formattedPrice}</strong>
                  </div>
                  <div className="grid grid-cols-2 items-center pb-2.5 border-b border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">মূল্যের ধরণ</span>
                    <span className="text-xs font-semibold text-gray-800 text-right">আলোচনা সাপেক্ষ</span>
                  </div>
                  <div className="grid grid-cols-2 items-center">
                    <span className="text-xs text-gray-500 font-medium">{property.type === 'land' ? 'প্রতি শতক' : 'প্রতি বর্গফুট'}</span>
                    <span className="text-xs font-bold text-gray-800 text-right">{property.type === 'land' ? property.pricePerDecimal : property.pricePerSqft}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <a href="tel:+8801903431174" className="w-full bg-[#00875A] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#006644] transition active:scale-95">
                  <Phone className="w-4 h-4" /> সরাসরি কল করুন
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

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
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3">বিস্তারিত বিবরণ</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{property.description}</p>
        </div>
      </section>

      {/* 5. Contact / Lead Form at the bottom */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-extrabold text-xl sm:text-2xl text-gray-900 mb-1.5 text-center">ভিজিট বা তথ্যের জন্য যোগাযোগ</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 text-center">আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
          
          {inquirySubmitted ? (
            <div className="bg-emerald-50 text-[#00875A] p-4 rounded-xl text-sm font-semibold text-center border border-emerald-200">
              আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে।
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setInquirySubmitted(true); }} className="space-y-4">
              <div>
                <input type="text" placeholder="আপনার নাম" required className="w-full text-sm p-3.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00875A] focus:border-transparent transition" />
              </div>
              <div>
                <input type="tel" placeholder="মোবাইল নম্বর" required className="w-full text-sm p-3.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00875A] focus:border-transparent transition" />
              </div>
              <div>
                <textarea placeholder="বার্তা বা প্রশ্ন (ঐচ্ছಿಕ)" rows="3" className="w-full text-sm p-3.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00875A] focus:border-transparent transition" />
              </div>
              <button type="submit" className="w-full bg-[#00875A] text-white font-bold py-3.5 rounded-xl text-sm shadow-sm hover:bg-[#006644] transition active:scale-98">
                সাইট ভিজিটের অনুরোধ দিন
              </button>
            </form>
          )}

          <a href="tel:+8801903431174" className="mt-3.5 w-full bg-emerald-50 text-[#00875A] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 border border-emerald-200 transition hover:bg-emerald-100 active:scale-98">
            <Phone className="w-4 h-4" /> সরাসরি কল করুন
          </a>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProperties.map((item) => (
              <PropertyCard key={item.id} property={item} navigateTo={navigateTo} isWishlisted={wishlist.includes(item.id)} toggleWishlist={toggleWishlist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
