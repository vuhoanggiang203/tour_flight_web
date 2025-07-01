// components/PaymentForm.jsx
'use client';
import React from 'react';
import Image from 'next/image'; // Sử dụng Image từ next/image nếu bạn có hình ảnh local

const CheckoutForm = () => {

  const handlePayment = (e) => {
    e.preventDefault();
    // Xử lý thanh toán ở đây
    alert('Thanh toán thành công!');
    setTimeout(() => {
      // Chuyển hướng về trang chủ sau khi thanh toán thành công
      window.location.href = '/';
    }, 1000); // Thời gian chờ 1 giây trước khi chuyển hướng
  }
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center text-gray-700 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3.75h15m-1.5-12.75a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 18V6.75A2.25 2.25 0 012.25 4.5h19.5z"
          />
        </svg>
        <h2 className="text-lg font-semibold">Thanh toán bằng thẻ tín dụng</h2>
      </div>

      {/* Card number */}
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-2">
          Số thẻ tín dụng
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 1234 1234 1234"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-32" // pr-32 để tạo khoảng trống cho icon thẻ
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
            {/* Sử dụng Image component nếu bạn có file ảnh local cho logo các thẻ */}
            {/* Ví dụ: Bạn cần tải các logo này và đặt trong thư mục public */}
            
          </div>
        </div>
      </div>

      {/* Expiration date and Security code */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="expirationDate" className="block text-gray-700 text-sm font-medium mb-2">
            Ngày hết hạn
          </label>
          <input
            type="text"
            id="expirationDate"
            placeholder="MM / YY"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="securityCode" className="block text-gray-700 text-sm font-medium mb-2">
            Mã bảo mật (CVC)
          </label>
          <div className="relative">
            <input
              type="text"
              id="securityCode"
              placeholder="CVC"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // pr-10 cho icon
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* Icon CVC (tượng trưng) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3.75h15m-1.5-12.75a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 18V6.75A2.25 2.25 0 012.25 4.5h19.5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Country */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-2">
          Quốc gia
        </label>
        <select
          id="country"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-8" // appearance-none để tùy chỉnh mũi tên dropdown
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 class=%22feather feather-chevron-down%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="Vietnam">Vietnam</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          {/* Thêm các quốc gia khác nếu cần */}
        </select>
      </div>
       <button
        type="submit" // Mặc dù là giao diện, type="submit" là chuẩn cho nút trong form
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        Thanh toán
      </button>
      {/* Nút thanh toán hoặc các element khác có thể được thêm ở đây */}
    </div>
  );
};

export default CheckoutForm;