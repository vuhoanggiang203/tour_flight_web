// components/FlightCard.jsx
'use client'; // Bắt buộc phải là Client Component vì sử dụng useRouter và onClick

import { useRouter } from "next/navigation";
import {
  PlaneTakeoff, // Icon cho điểm đi
  PlaneLanding, // Icon cho điểm đến
  Clock,        // Icon cho thời gian
  CalendarDays, // Icon cho ngày
  Tag,          // Icon cho giá (hoặc DollarSign nếu thích)
  Ticket   , 
  CreditCard,    // Icon cho nút đặt vé
  DollarSign 
} from 'lucide-react'; // Import các icon từ Lucide

export default function FlightCard({ flight }) {
  const router = useRouter();

  const handleBook = () => {
    const query = new URLSearchParams({
      from: flight.from,
      to: flight.to,
      date: flight.date || "",
      time: flight.time || "",
       price: flight.price?.toString() || "0", // thêm dòng này
    }).toString();

    router.push(`/booking?${query}`);
  };

  return (
    <div className="
      relative bg-white border border-gray-200 rounded-xl shadow-lg
      p-5 md:p-6 overflow-hidden
      hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ease-in-out
      flex flex-col
    ">
      {/* Airline Logo/Name - Có thể thêm Image component cho logo */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          {flight.airline}
        </h2>
        {/* Ví dụ icon hãng bay (thay thế bằng logo thật) */}
        <PlaneTakeoff className="w-8 h-8 text-blue-500 transform rotate-45" />
      </div>

      {/* Flight Route */}
      <div className="flex items-center text-gray-700 text-lg font-medium mb-3">
        <PlaneTakeoff className="w-5 h-5 mr-2 text-blue-500" />
        <span>{flight.from}</span>
        <span className="mx-2 text-gray-400">→</span>
        <PlaneLanding className="w-5 h-5 mr-2 text-blue-500" />
        <span>{flight.to}</span>
      </div>

      {/* Flight Details (Time & Date) */}
      <div className="grid grid-cols-2 gap-y-2 mb-4 text-gray-600 text-base">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <span>{flight.time}</span>
        </div>
        {flight.date && (
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
            <span>Ngày: {flight.date}</span>
          </div>
        )}
      </div>

      {/* Price */}
      {flight.price && (
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-green-600 font-bold text-2xl">
            <CreditCard className="w-6 h-6 mr-2 text-green-500" />
            <span>{flight.price.toLocaleString("vi-VN")} VNĐ</span>
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBook}
        className="
          w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg
          mt-4 shadow-md
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-all duration-300 ease-in-out
          flex items-center justify-center space-x-2
        "
      >
        <Ticket className="w-5 h-5" /> {/* Icon vé */}
        <span>Đặt ngay</span>
      </button>
    </div>
  );
}