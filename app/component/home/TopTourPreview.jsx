'use client';

import { useEffect, useState } from 'react';
import TourCard from '../tour/TourCard';
import Link from 'next/link';

export default function TopTourPreview() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/tour');
        const data = await res.json();

        // Lấy 3 tour mới nhất (giả sử tour mới nhất nằm cuối mảng)
        const latestTours = data.slice(-3).reverse();
        setTours(latestTours);
      } catch (err) {
        console.error('Lỗi khi fetch tour:', err);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Tour mới nhất</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/tour">
            <button className="px-6 py-3 bg-blue-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
              Xem tất cả tour
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
