import { useState } from 'react';
import { BARISAL_LOCATIONS } from '../data/properties';
import PropertyCard from './PropertyCard';

export default function DirectoryPage({ type, properties, navigateTo, wishlist, toggleWishlist, searchFilters }) {
  const [selectedArea, setSelectedArea] = useState(searchFilters?.area || 'all');

  const filteredProperties = properties.filter((p) => {
    const matchesArea = selectedArea === 'all' || p.area.includes(selectedArea);
    const maxPrice = Number(searchFilters?.maxPrice);
    const matchesBudget = !maxPrice || p.price <= maxPrice;
    return matchesArea && matchesBudget;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {type === 'land' ? 'বরিশালের জমি সমুহ' : type === 'flat' ? 'বরিশালের ফ্ল্যাট সমুহ' : 'এলাকার সব প্রপার্টি'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {type === 'land' ? 'বরিশাল সদরের সেরা আবাসিক ও বাণিজ্যিক জমি' : type === 'flat' ? 'বরিশালের তৈরি ও নির্মীয়মাণ ফ্ল্যাট' : 'নির্বাচিত এলাকার জমি ও ফ্ল্যাট'}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        <button
          onClick={() => setSelectedArea('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
            selectedArea === 'all' ? 'bg-[#00875A] text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          সকল এলাকা
        </button>
        {BARISAL_LOCATIONS.map((loc) => (
          <button
            key={loc}
            onClick={() => setSelectedArea(loc)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              selectedArea === loc ? 'bg-[#00875A] text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500 text-sm">দুঃখিত, এই এলাকায় বর্তমানে কোন লিস্টিং নেই।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              navigateTo={navigateTo}
              isWishlisted={wishlist.includes(property.id)}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
