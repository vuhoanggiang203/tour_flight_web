// components/FlightHero.jsx
'use client'; // Mặc dù chủ yếu là UI, nếu sau này bạn muốn thêm tương tác nhỏ, 'use client' sẽ cần

import React from 'react';
import Image from 'next/image'; // Để sử dụng hình ảnh tối ưu hóa bởi Next.js

const FlightHero = () => {
  return (
    <div className="
      relative bg-blue-200
      text-white py-16 md:py-24 lg:py-32
      flex items-center justify-center overflow-hidden
      min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh]
      shadow-lg
    ">
      
       <Image
        src="/image/flighthero.jpg" // Thay đổi đường dẫn đến ảnh của bạn
        alt="Background image of an airplane taking off"
        layout="fill" // Chiếm toàn bộ không gian của div cha
        objectFit="cover" // Đảm bảo ảnh bao phủ toàn bộ, cắt bớt nếu cần
        quality={80} // Chất lượng ảnh
        className="opacity-20 z-0" // Làm mờ ảnh và đưa xuống lớp dưới
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="
          text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4
          drop-shadow-lg
        ">
          Tìm kiếm chuyến bay dễ dàng, đặt chỗ nhanh chóng
        </h1>
        <p className="
          text-lg sm:text-xl lg:text-2xl font-light opacity-90
          max-w-2xl mx-auto mb-8
        ">
          Khám phá những điểm đến tuyệt vời với giá vé phải chăng. Bắt đầu hành trình của bạn ngay hôm nay!
        </p>
        
        {/* Nút Call-to-action (Tùy chọn) - Nếu bạn muốn nút này đưa tới phần tìm kiếm */}
        {/* <a
          href="#flight-search-section" // Liên kết đến ID của phần tìm kiếm chuyến bay
          className="
            inline-block bg-white text-blue-700 font-bold py-3 px-8
            rounded-full shadow-xl hover:bg-blue-100 transition duration-300
            transform hover:-translate-y-1
          "
        >
          Bắt đầu tìm kiếm
        </a> */}
      </div>
    </div>
  );
};

export default FlightHero;