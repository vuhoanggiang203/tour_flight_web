// components/booking/TourBookingForm.js
import { useState } from 'react';
import { User, Calendar, Mail, Home, MessageSquare } from 'lucide-react'; // Ví dụ các icon

const TourBookingForm = ({ tourDetails }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [departureDate, setDepartureDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi dữ liệu lên backend ở đây
    const bookingData = {
      tourId: tourDetails.id, // Giả sử bạn truyền tourDetails vào component
      tourName: tourDetails.name,
      adults,
      children,
      infants,
      departureDate,
      fullName,
      dob,
      citizenId,
      email,
      address,
      notes,
    };
    console.log('Dữ liệu đặt tour:', bookingData);
    // Gọi API để lưu thông tin đặt tour
    // Ví dụ: fetch('/api/book-tour', { method: 'POST', body: JSON.stringify(bookingData) });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Đặt Tour: {tourDetails?.name || 'Chi Tiết Tour'}</h2>

      {/* Thông tin số lượng người */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-4">Số lượng người tham gia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Người lớn</label>
            <input
              type="number"
              id="adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Trẻ em (2-12 tuổi)</label>
            <input
              type="number"
              id="children"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="infants" className="block text-sm font-medium text-gray-700 mb-1">Trẻ sơ sinh (0-2 tuổi)</label>
            <input
              type="number"
              id="infants"
              value={infants}
              onChange={(e) => setInfants(Number(e.target.value))}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Thông tin Tour */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-4">Thông tin Tour</h3>
        <div className="mb-4">
          <label htmlFor="tourType" className="block text-sm font-medium text-gray-700 mb-1">Loại Tour</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2 bg-gray-100">
            <Calendar size={20} className="text-gray-500 mr-2" />
            <span id="tourType" className="block w-full">{tourDetails?.name || 'Tour Đã Chọn'}</span>
          </div>
        </div>
        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">Ngày xuất phát</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Thông tin người đặt */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Thông tin người đặt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Ngày tháng năm sinh</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="citizenId" className="block text-sm font-medium text-gray-700 mb-1">Căn cước công dân</label>
            <input
              type="text"
              id="citizenId"
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
          <div className="relative">
            <Home size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
          <div className="relative">
            <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Đặt Tour
      </button>
    </form>
  );
};

export default TourBookingForm;