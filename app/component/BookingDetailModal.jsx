'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function BookingDetailModal({ isOpen, onClose, booking }) {
  // 🔒 Các hook luôn được gọi đầu tiên, không nằm trong điều kiện
  const [passengers, setPassengers] = useState([]);
  const [tourTitle, setTourTitle] = useState('');
  const [duration, setDuration] = useState('');

  
  useEffect(() => {
    if (isOpen && booking?.id) {
      fetch(`/api/passenger-info?booking_id=${booking.id}`)
        .then(res => res.json())
        .then(data => setPassengers(data))
        .catch(err => console.error('Lỗi lấy thông tin hành khách:', err));
    }
  }, [isOpen, booking]);

  useEffect(() => {
    if (booking?.type === 'tour' && booking.tour_id) {
      fetch(`/api/tour/${booking.tour_id}`)
        .then(res => res.json())
        .then(data => {
          setTourTitle(data.title || '');
          setDuration(data.duration || '');
        })
        .catch(() => {
          setTourTitle('');
          setDuration('');
        });
    } else {
      // Đặt lại khi không phải tour
      setTourTitle('');
      setDuration('');
    }
  }, [booking]);

  const statusMap = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    cancelled: 'Đã hủy',
    completed: 'Hoàn thành',
    paid: 'Đã thanh toán',
    unpaid: 'Chưa thanh toán',
    processing: 'Đang xử lý',
  };

  // 👉 Điều kiện hiển thị được kiểm tra sau khi hook đã được khai báo
  if (!isOpen || !booking) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Chi tiết đơn đặt</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>Họ tên:</strong> {booking.full_name}</li>
          <li><strong>SĐT:</strong> {booking.phone_number}</li>
          <li><strong>Loại:</strong> {booking.type === 'flight' ? 'Vé máy bay' : 'Tour'}</li>
          {booking.type === 'tour' ? (
            <>
              <li><strong>Tour ID:</strong> {booking.tour_id}</li>
              <li><strong>Tiêu đề tour:</strong> {tourTitle || 'Không có thông tin'}</li>
              <li><strong>Thời gian:</strong> {duration}</li>
              <li><strong>Ngày khởi hành:</strong> {format(new Date(booking.start_tour_date), 'PPP', { locale: vi })}</li>
            </>
          ) : (
            <>
              <li><strong>Chuyến bay:</strong> {booking.departure} → {booking.arrival}</li>
              <li><strong>Ngày bay:</strong> {format(new Date(booking.flight_date), 'PPP', { locale: vi })}</li>
              <li><strong>Giờ bay:</strong> {booking.flight_time}</li>
            </>
          )}
          <li>
            <strong>Tổng giá:</strong> {Number(booking.total_price).toLocaleString('vi-VN')} VNĐ
          </li>
          <li><strong>Trạng thái:</strong> {statusMap[booking.status] || booking.status}</li>
          <li><strong>Ngày đặt:</strong> {format(new Date(booking.booking_date), 'PPPp', { locale: vi })}</li>
        </ul>

        {/* Thông tin khách */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Danh sách hành khách</h3>
          {passengers.length === 0 ? (
            <p className="text-gray-500 text-sm">Không có dữ liệu.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {passengers.map((p, index) => (
                <li key={index} className="py-2 text-sm">
                  👤 <strong>{p.full_name}</strong> | {p.gender === 'male' ? 'Nam' : 'Nữ'} | Ngày sinh: {format(new Date(p.dob), 'dd/MM/yyyy')}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
