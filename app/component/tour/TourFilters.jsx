// components/TourFilters.jsx
import React from 'react';
import { Search, DollarSign } from 'lucide-react'; // Lucide Icons

const TourFilters = ({
  searchTerm,
  setSearchTerm,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-10 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Bộ Lọc & Tìm Kiếm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
            <Search size={16} className="inline-block mr-2 text-gray-500" />
            Tìm kiếm theo tên:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Nhập tên tour..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="minPrice" className="block text-gray-700 text-sm font-bold mb-2">
            <DollarSign size={16} className="inline-block mr-2 text-green-500" />
            Giá từ:
          </label>
          <input
          min={0}
          step={100000}
            type="number"
            id="minPrice"
            placeholder="Giá tối thiểu"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-gray-700 text-sm font-bold mb-2">
            <DollarSign size={16} className="inline-block mr-2 text-red-500" />
            Giá đến:
          </label>
          <input
            type="number"
            id="maxPrice"
            min={0}
            step={100000}
            placeholder="Giá tối đa"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:blue-400 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default TourFilters;