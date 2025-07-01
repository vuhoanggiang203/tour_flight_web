// components/TourCard.jsx
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { MapPin, Clock, Tag, DollarSign, Eye } from 'lucide-react'; // Lucide Icons

const TourCard = ({ tour }) => {
  const finalPrice = tour.discount_percentage
    ? tour.price * (1 - tour.discount_percentage / 100)
    : tour.price;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-100">
      <div className="relative w-full h-56">
        <Image
          src={`/image/`+tour.image}
          alt={tour.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-t-xl"
        />
        {tour.discount_percentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            -{tour.discount_percentage}%
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{tour.title}</h3>

        <div className="flex items-center text-gray-700 mb-2">
          <MapPin size={18} className="mr-2 text-blue-500" />
          <p className="text-base">{tour.location}</p>
        </div>
        <div className="flex items-center text-gray-700 mb-4">
          <Clock size={18} className="mr-2 text-purple-500" />
          <p className="text-base">{tour.duration}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-5">
          {tour.discount_percentage > 0 && (
            <span className="text-gray-500 line-through text-lg mb-1 sm:mb-0">
              {tour.price.toLocaleString('vi-VN')} VNĐ
            </span>
          )}
          <span className="text-3xl font-extrabold text-green-700">
            {finalPrice.toLocaleString('vi-VN')} VNĐ
          </span>
        </div>

        <Link href={`/tour/${tour.id}`} passHref>
          <button className="w-full bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300">
            <Eye size={20} className="mr-2" />
            Xem Chi Tiết
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TourCard;