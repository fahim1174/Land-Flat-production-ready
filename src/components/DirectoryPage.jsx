import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { BARISAL_LOCATIONS } from '../data/properties';
import PropertyCard from './PropertyCard';

export default function DirectoryPage({ type, properties, navigateTo, wishlist, toggleWishlist, searchFilters }) {
  const [selectedArea, setSelectedArea] = useState(searchFilters?.area || 'all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(searchFilters?.maxPrice || '');
  const [sortBy, setSortBy] = useState('newest');

  // Draft filter state inside modal before applying
  const [draftArea, setDraftArea] = useState(selectedArea);
  const [draftCategory, setDraftCategory] = useState(selectedCategory);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);
  const [draftSortBy, setDraftSortBy] = useState(sortBy);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProperties = properties.filter((p) => {
    const matchesArea = selectedArea === 'all' || p.area.includes(selectedArea);
    const matchesCategory = selectedCategory === 'all' || (p.landCategory && p.landCategory.toLowerCase() === selectedCategory.toLowerCase());
    const numericMaxPrice = Number(maxPrice);
    const matchesBudget = !numericMaxPrice || p.price <= numericMaxPrice;
    return matchesArea && matchesCategory && matchesBudget;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // default newest
  });

  const handleOpenModal = () => {
    setDraftArea(selectedArea);
    setDraftCategory(selectedCategory);
    setDraftMaxPrice(maxPrice);
    setDraftSortBy(sortBy);
    setIsFilterOpen(true);
  };

  const handleApply = () => {
    setSelectedArea(draftArea);
    setSelectedCategory(draftCategory);
    setMaxPrice(draftMaxPrice);
    setSortBy(draftSortBy);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setDraftArea('all');
    setDraftCategory('all');
    setDraftMaxPrice('');
    setDraftSortBy('newest');
    setSelectedArea('all');
    setSelectedCategory('all');
    setMaxPrice('');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {type === 'land' ? 'বরিশালের জমি সমূহ' : type === 'flat' ? 'বরিশালের ফ্ল্যাট সমূহ' : 'এলাকার সব প্রপার্টি'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {type === 'land' ? 'বরিশাল সদরের সেরা আবাসিক ও বাণিজ্যিক জমি' : type === 'flat' ? 'বরিশালের তৈরি ও নির্মীয়মাণ ফ্ল্যাট' : 'নির্বাচিত এলাকার জমি ও ফ্ল্যাট'}
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-emerald-50 text-[#00875A] border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-emerald-100 transition shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" /> ফিল্টার
        </button>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500 text-sm">দুঃখিত, এই ফিল্টারের সাথে মিলে এমন কোন প্রপার্টি নেই।</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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

      {/* Filter Slide-up Bottom Sheet Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
            <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b bg-white">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">প্রপার্টি ফিল্টার করুন</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="px-4 sm:px-6 py-4 space-y-3 text-xs max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">বরিশালের এলাকা</label>
                <select
                  value={draftArea}
                  onChange={(e) => setDraftArea(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-800 focus:outline-none focus:border-[#00875A]"
                >
                  <option value="all">সকল এলাকা</option>
                  {BARISAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {type === 'land' && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">জমির ক্যাটাগরি</label>
                  <select
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-800 focus:outline-none focus:border-[#00875A]"
                  >
                    <option value="all">সকল ক্যাটাগরি</option>
                    <option value="residential">আবাসিক</option>
                    <option value="commercial">বাণিজ্যিক</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-gray-700 mb-1">সর্বোচ্চ বাজেট (টাকায়)</label>
                <input
                  type="number"
                  min="0"
                  value={draftMaxPrice}
                  onChange={(e) => setDraftMaxPrice(e.target.value)}
                  placeholder="যেমন: 5000000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-800 focus:outline-none focus:border-[#00875A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">সাজিয়ে দেখুন (Sort By)</label>
                <select
                  value={draftSortBy}
                  onChange={(e) => setDraftSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-medium text-gray-800 focus:outline-none focus:border-[#00875A]"
                >
                  <option value="newest">সর্বশেষ সংযোজন</option>
                  <option value="price-low">কম দাম থেকে বেশি</option>
                  <option value="price-high">বেশি দাম থেকে কম</option>
                </select>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 bg-white border-t flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-1/2 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl text-xs hover:bg-gray-200 transition"
              >
                রিসেট
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="w-1/2 bg-[#00875A] text-white font-semibold py-2.5 rounded-xl text-xs hover:bg-[#006644] transition shadow-md"
              >
                ফিল্টার প্রয়োগ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
