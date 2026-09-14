import { useState } from 'react';
import { CheckCircle2, Copy, FileCheck2, Heart, MapPin, Phone, Share2 } from 'lucide-react';
import PropertyCard from './PropertyCard';

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <span className="block text-[11px] text-gray-400 mb-1">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value || 'তথ্য পাওয়া যায়নি'}</span>
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
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <button type="button" onClick={copyPropertyId} className="flex items-center gap-1 rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold text-[#00875A] hover:bg-emerald-200" title="Property ID copy করুন">
                {idCopied ? 'কপি হয়েছে' : property.propertyId}
                <Copy className="h-3 w-3" />
              </button>
              {property.verificationStatus === 'Verified' && (
                <span className="flex items-center gap-1 bg-emerald-50 text-[#00875A] text-[10px] font-bold px-2 py-1 rounded">
                  <CheckCircle2 className="w-3 h-3" /> ভেরিফাইড
                </span>
              )}
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">পোস্ট করা হয়েছে: ২ দিন আগে</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{property.title}</h1>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-1 text-sm text-[#00875A] hover:underline">
              <MapPin className="w-4 h-4" /> {property.location} · ম্যাপে দেখুন
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleWishlist(property.id)} aria-label="প্রপার্টি সেভ করুন" className="p-2 border rounded-lg text-gray-600 hover:text-red-500">
              <Heart className={`w-5 h-5 ${wishlist.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button onClick={handleShare} aria-label="প্রপার্টি শেয়ার করুন" className="p-2 border rounded-lg text-gray-600 hover:text-[#00875A]">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3 border-t pt-4">
          <div><span className="block text-xs text-gray-400">মোট মূল্য</span><strong className="text-2xl text-[#00875A]">{property.formattedPrice}</strong></div>
          <div><span className="block text-xs text-gray-400">মূল্যের ধরণ</span><strong className="text-sm text-gray-800">আলোচনা সাপেক্ষ</strong></div>
          <div><span className="block text-xs text-gray-400">{property.type === 'land' ? 'প্রতি শতক' : 'প্রতি বর্গফুট'}</span><strong className="text-sm text-gray-800">{property.type === 'land' ? property.pricePerDecimal : property.pricePerSqft}</strong></div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {((property.images || []).length > 0 || property.video) && <div>
            <h2 className="font-bold text-lg text-gray-900 mb-3">ছবি ও ভিডিও</h2>
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {(property.images || []).slice(0, 3).map((image) => <img key={image} src={image} alt={property.title} className="h-64 w-full rounded-lg object-cover" />)}
                {property.video && <video src={property.video} controls className="h-64 w-full rounded-lg bg-gray-100 object-cover" />}
              </div>
            </section>
          </div>}

          <div>
            <h2 className="font-bold text-lg text-gray-900 mb-3">মূল স্পেসিফিকেশন</h2>
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-4">আইনি ও কাগজপত্রের তথ্য</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoItem label="খতিয়ান / নামজারি" value="নামজারি ও খতিয়ান সম্পন্ন" />
              <InfoItem label="রেজিস্ট্রেশন স্ট্যাটাস" value={property.verificationStatus === 'Verified' ? 'নিষ্কণ্টক ও ভেরিফাইড' : property.verificationStatus} />
              <InfoItem label="অনুমোদন" value="প্রাথমিকভাবে যাচাই করা হয়েছে" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#00875A] font-semibold"><FileCheck2 className="w-4 h-4" /> কাগজপত্রের বিস্তারিত রিপোর্ট প্রতিনিধি যাচাইয়ের পর দেওয়া হবে।</div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-4">লোকেশন ও আশেপাশের সুবিধা</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoItem label="ল্যান্ডমার্ক" value={property.location} />
              <InfoItem label="প্রধান সড়ক" value="প্রায় ২০০ মিটার দূরে" />
              <InfoItem label="বাজার / যাতায়াত" value="স্থানীয় বাজার ও গণপরিবহন কাছে" />
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-3">বিস্তারিত বিবরণ</h2>
            <p className="text-sm text-gray-600 leading-7">{property.description}</p>
          </section>
        </div>

        <aside>
          <div>
            <h2 className="font-bold text-lg text-gray-900 mb-3">ভিজিট বা তথ্যের জন্য যোগাযোগ</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm lg:sticky lg:top-20">
              <p className="text-xs text-gray-500 mb-4">আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
            {inquirySubmitted ? <div className="bg-emerald-50 text-[#00875A] p-4 rounded-lg text-sm font-semibold">আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে।</div> : <form onSubmit={(event) => { event.preventDefault(); setInquirySubmitted(true); }} className="space-y-3">
              <input type="text" placeholder="আপনার নাম" required className="w-full text-sm p-3 bg-gray-50 border rounded-lg" />
              <input type="tel" placeholder="মোবাইল নম্বর" required className="w-full text-sm p-3 bg-gray-50 border rounded-lg" />
              <textarea placeholder="বার্তা" rows="4" className="w-full text-sm p-3 bg-gray-50 border rounded-lg" />
              <button type="submit" className="w-full bg-[#00875A] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#006644]">সাইট ভিজিটের অনুরোধ দিন</button>
            </form>}
            <a href="tel:01749646441" className="mt-3 w-full bg-emerald-50 text-[#00875A] font-semibold py-3 rounded-lg text-sm flex items-center justify-center gap-2 border border-emerald-200"><Phone className="w-4 h-4" /> সরাসরি কল করুন</a>
            <div className="mt-5 pt-4 border-t"><p className="text-xs text-gray-400">পোস্টকারী</p><p className="font-bold text-gray-900">Land&Flat Barisal প্রতিনিধি</p><span className="text-xs text-[#00875A] font-semibold">ভেরিফাইড এজেন্ট</span></div>
            </div>
          </div>
        </aside>
      </div>

      {relatedProperties.length > 0 && <section><h2 className="font-bold text-xl text-gray-900 mb-4">সম্পর্কিত প্রপার্টি</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{relatedProperties.map((item) => <PropertyCard key={item.id} property={item} navigateTo={navigateTo} isWishlisted={wishlist.includes(item.id)} toggleWishlist={toggleWishlist} />)}</div></section>}
    </div>
  );
}
