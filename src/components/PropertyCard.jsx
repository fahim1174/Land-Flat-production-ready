import {
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Heart,
  MapPin,
  Share2
} from 'lucide-react';

export default function PropertyCard({ property, navigateTo, isWishlisted, toggleWishlist }) {
  const handleShare = async () => {
    const shareData = { title: property.title, text: property.location, url: window.location.href };

    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-44 object-cover"
          />
          <span
            className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-md ${
              property.type === 'land' ? 'bg-[#00875A]' : 'bg-blue-600'
            }`}
          >
            {property.type === 'land' ? 'জমি' : 'ফ্ল্যাট'}
          </span>
          <button
            onClick={() => toggleWishlist(property.id)}
            aria-label="প্রপার্টি সেভ করুন"
            className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full text-gray-600 hover:text-red-500 transition"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="প্রপার্টি শেয়ার করুন"
            className="absolute top-3 right-12 bg-white/90 p-1.5 rounded-full text-gray-600 hover:text-[#00875A] transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {property.verificationStatus === 'Verified' && (
              <span className="bg-emerald-50 text-[#00875A] border border-emerald-200 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ভেরিফাইড
              </span>
            )}
            <span className="bg-sky-50 text-sky-700 border border-sky-100 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
              <FileCheck2 className="w-3 h-3" /> কাগজপত্র প্রস্তুত
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2">
            {property.title}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#00875A] shrink-0" /> {property.location}
          </p>

          <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-2 mb-3 border border-gray-100">
            {property.type === 'land' ? (
              <>
                <div className="flex justify-between text-gray-600">
                  <span>আয়তন:</span> <span className="font-semibold text-gray-800">{property.landSize}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>রাস্তা:</span> <span className="font-semibold text-gray-800">{property.roadWidth}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>জমির ধরণ:</span> <span className="font-semibold text-gray-800">উঁচু {property.landCategory === 'Residential' ? 'আবাসিক' : 'বাণিজ্যিক'}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-gray-600">
                  <span>সাইজ:</span> <span className="font-semibold text-gray-800">{property.flatSize}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>বেড/বাথ:</span>{' '}
                  <span className="font-semibold text-gray-800">
                    {property.bedrooms} বেড, {property.bathrooms} বাথ
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-gray-400 block">মোট মূল্য</span>
              <span className="text-base font-extrabold text-[#00875A]">{property.formattedPrice}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">{property.type === 'land' ? 'প্রতি শতক' : 'প্রতি বর্গফুট'}</span>
              <span className="text-xs font-bold text-gray-700">{property.type === 'land' ? property.pricePerDecimal : property.pricePerSqft}</span>
            </div>
          </div>
          <p className="text-[10px] text-[#00875A] font-semibold mt-2">আলোচনা সাপেক্ষ</p>

        </div>
      </div>

      <div className="px-4 pb-4 pt-0">
        <button
          onClick={() => navigateTo('details', property)}
          className="w-full bg-gray-900 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-1"
        >
          বিস্তারিত দেখুন <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
