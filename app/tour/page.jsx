// app/tours/page.jsx
"use client"; // Đây là Client Component

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image'; // Sử dụng Image component của Next.js
import Link from 'next/link';   // Sử dụng Link component của Next.js
import { Search, DollarSign, MapPin, Clock, Eye } from 'lucide-react'; // Lucide Icons
import LoadingSpinner from '../component/LoadingSpinner'; // Giả sử bạn đã tạo component LoadingSpinner
// Import các component con
import TourCard from '../component/tour/TourCard'; // Giả sử bạn đã tạo component TourCard
import TourFilters from '../component/tour/TourFilters'; // Giả sử bạn đã tạo component TourFilters
// Đây là trang chính hiển thị danh sách tour

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(3); // Ban đầu hiển thị 3 item
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Sử dụng useCallback để ghi nhớ hàm fetch, tránh re-render không cần thiết
  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Xây dựng query string cho bộ lọc và tìm kiếm
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('searchTerm', searchTerm);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      const url = `/api/publictour?${queryParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTours(data);
      setLimit(3); // Reset limit khi filter/search
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, minPrice, maxPrice]); // Dependencies cho useCallback

  // Fetch API khi component mount hoặc khi bộ lọc/tìm kiếm thay đổi
  useEffect(() => {
    fetchTours();
  }, [fetchTours]); // Phụ thuộc vào fetchTours đã được ghi nhớ
  
  // Các tour sẽ hiển thị dựa trên limit (sau khi đã lọc)
  const toursToShow = useMemo(() => {
    return tours.slice(0, limit);
  }, [tours, limit]); // Đã bỏ filteredTours vì việc lọc đã được đẩy xuống API

  const hasMoreTours = tours.length > limit;

  const handleShowMore = () => {
    setLimit(prevLimit => prevLimit + 3);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-red-500">Lỗi: {error}. Vui lòng thử lại sau.</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Khám Phá Các Tour Du Lịch Hấp Dẫn
      </h1>

      {/* Bộ lọc và tìm kiếm */}
      <TourFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Danh sách tour */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toursToShow.length > 0 ? (
          toursToShow.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 p-8 text-lg bg-gray-50 rounded-lg shadow-inner">
            <Search className="inline-block mr-2 text-gray-500" size={24} />
            Không tìm thấy tour nào phù hợp với tiêu chí tìm kiếm của bạn.
          </div>
        )}
      </div>

      {/* Nút "Hiển thị thêm" */}
      {hasMoreTours && (
        <div className="text-center mt-12">
          <button
            onClick={handleShowMore}
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <Eye className="mr-2" size={20} />
            Hiển thị thêm Tour
          </button>
        </div>
      )}
    </div>
  );
};

export default ToursPage;