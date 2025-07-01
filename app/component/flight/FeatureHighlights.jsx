// components/FeatureHighlights.jsx
'use client'; // Đảm bảo đây là Client Component nếu bạn muốn hover effects hoặc tương tác khác

import React from 'react';
import {
  CheckCircle, // Icon cho các tính năng được xác nhận
  DollarSign,  // Icon cho giá vé
  Award,       // Icon cho hãng bay uy tín
  Headphones,  // Icon cho hỗ trợ khách hàng
  Star,        // Icon cho đánh giá cao
  ShieldCheck  // Icon cho bảo mật
} from 'lucide-react'; // Import các icon từ Lucide

export default function FeatureHighlights() {
  const features = [
    {
      id: 1,
      icon: DollarSign, // Sử dụng component Icon
      text: "Giá vé cạnh tranh nhất",
      desc: "Luôn cập nhật giá tốt nhất từ hàng trăm hãng bay."
    },
    {
      id: 2,
      icon: Award,
      text: "Nhiều hãng bay uy tín",
      desc: "Hợp tác với các hãng hàng không hàng đầu thế giới."
    },
    {
      id: 3,
      icon: Headphones,
      text: "Hỗ trợ khách hàng 24/7",
      desc: "Đội ngũ chuyên nghiệp luôn sẵn sàng phục vụ bạn."
    },
    {
      id: 4,
      icon: ShieldCheck,
      text: "Thanh toán an toàn & bảo mật",
      desc: "Giao dịch được mã hóa và bảo vệ tuyệt đối."
    },
    {
      id: 5,
      icon: Star,
      text: "Trải nghiệm đặt vé dễ dàng",
      desc: "Giao diện thân thiện, thao tác đơn giản."
    }
  ];

  return (
    <div className="
      bg-gradient-to-br from-blue-50 to-indigo-50
      p-6 md:p-8 rounded-xl shadow-lg
      text-center border border-blue-100
    ">
      <h2 className="
        text-3xl font-extrabold text-blue-800 mb-6
        leading-tight
      ">
        <span className="inline-block relative">
          Vì sao chọn <span className="text-indigo-600">Jadoo</span>?
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-indigo-500 rounded-full"></span>
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="
              flex flex-col items-center p-4 rounded-lg
              bg-white border border-gray-200
              shadow-sm hover:shadow-md transition-all duration-300
              transform hover:-translate-y-1
              text-left
            "
          >
            {/* Icon */}
            <feature.icon className="w-10 h-10 text-blue-600 mb-3 flex-shrink-0" /> {/* Kích thước và màu sắc cho icon */}
            
            {/* Tiêu đề tính năng */}
            <h3 className="text-lg font-bold text-gray-800 mb-1.5 leading-snug">
              {feature.text}
            </h3>
            
            {/* Mô tả tính năng */}
            <p className="text-sm text-gray-600">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}