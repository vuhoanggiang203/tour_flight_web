'use client';

import { useState, useEffect } from 'react';
import NcInputNumber from "../booking/NcInputNumber"; // Đảm bảo đúng đường dẫn
import { useSearchParams, useRouter } from 'next/navigation';
import TourNote from '../component/TourNote';
import ModalAlert from '../component/ModalAlert';
import {
  CalendarDays,
  Users,Phone,
  User,
  TicketCheck,
  MapPin,
  Tag,
} from 'lucide-react';

export default function BookingTourPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy thông tin tour từ URL
  const tourInfo = {
    id: searchParams.get('id') || '',
    name: searchParams.get('name') || '',
    destination: searchParams.get('destination') || '',
    date: searchParams.get('date') || '',
    price: parseInt(searchParams.get('price') || '0'),
  };
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: '',
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
const [startDate, setStartDate] = useState('');
  const totalPrice = adults * tourInfo.price + children * tourInfo.price * 0.7;

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!startDate) {
    console.log('Vui lòng chọn ngày khởi hành trước khi tiếp tục.');
    setAlert({
      isOpen: true,
      title: 'Ngày khởi hành không hợp lệ',
      message: 'Vui lòng chọn ngày khởi hành trước khi tiếp tục.',
    });
     return;
  }
  if (!name || !phone) {
    setShowModal(true);
    return;
  }
  
  
  
  setShowModal(false);

  const query = new URLSearchParams({
    tourTitle: tourInfo.name,
    tour_id: tourInfo.id,
    name,
    phone,
    adults,
    children,
    infants,
    totalPrice,
    tourDate: startDate,
  }).toString();

  router.push(`/passenger-info?${query}`);
};


  return (<>
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Đặt Tour</h1>

        {/* Thông tin tour */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h2 className="text-xl font-bold mb-2">{tourInfo.name}</h2>
          <p className="flex items-center text-gray-700 mb-1">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Địa điểm: {tourInfo.destination}
          </p>
          <div className="flex items-center text-gray-700 mb-1">
            <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
            <span>Ngày khởi hành:&nbsp;</span>
            <input
              id="myDateInput"
              type="date"
              value={startDate}
              onChange={(e) => {
                const value = e.target.value;
                setStartDate(value);
                // Optional: cập nhật query trên URL nếu bạn cần
                router.replace(`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  date: value
                }).toString()}`);
              }}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 ml-2 outline-none transition duration-150"
              min={new Date().toISOString().split('T')[0]}
              
            />

          </div>
          <p className="flex items-center text-green-700 font-semibold">
            <Tag className="w-5 h-5 mr-2 text-green-500" />
            Giá người lớn: {tourInfo.price.toLocaleString('vi-VN')} VNĐ
          </p>
        </div>

       {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 ">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
      <h3 className="text-lg font-semibold mb-2 text-red-600">Thông báo</h3>
      <p className="mb-4 text-gray-700">
        Vui lòng điền đầy đủ họ tên và số điện thoại trước khi tiếp tục.
      </p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowModal(false)}
      >
        Đóng
      </button>
    </div>
  </div>
)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center mb-1 font-medium text-gray-700">
              <User className="w-5 h-5 mr-2 text-gray-500" />
              Họ tên người liên hệ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
              placeholder="Nhập họ tên"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="flex items-center mb-1 font-medium text-gray-700">
              <Phone className="w-5 h-5 mr-2 text-gray-500" />
              Số điện thoại
            </label>
           <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                // Chỉ cho phép số, không chữ hoặc ký tự đặc biệt
                if (/^\d*$/.test(value)) {
                  setPhone(value);
                }
              }}
              
              placeholder="Nhập số điện thoại"
              className="w-full border px-4 py-2 rounded-lg"
            />

          </div>
          <div className="space-y-3 border-t pt-4">
            <p className="font-medium text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              Số lượng người tham gia:
            </p>

            <NcInputNumber label="Người lớn" min={1} max={9} defaultValue={adults} onChange={setAdults} />
            <NcInputNumber label="Trẻ em (2-12 tuổi)" min={0} max={9 - adults} defaultValue={children} onChange={setChildren} />
            <NcInputNumber label="Trẻ sơ sinh (&lt;2 tuổi)" min={0} max={adults} defaultValue={infants} onChange={setInfants} />
          </div>
          {/* Tổng tiền */}
          <div className="text-lg text-right text-blue-700 font-semibold">
            Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VNĐ
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition text-center flex items-center justify-center"
          >
            <TicketCheck className="inline-block w-5 h-5 mr-2" />
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
    <TourNote />
    <ModalAlert
  isOpen={alert.isOpen}
  onClose={() => setAlert({ ...alert, isOpen: false })}
  title={alert.title}
  message={alert.message}
/>
    </>
  );
}
