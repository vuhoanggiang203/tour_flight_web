'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import BookingDetailModal from '../../component/BookingDetailModal';
import { vi } from 'date-fns/locale';

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('booking_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingStatus, setEditingStatus] = useState({});
  const [updateStatus, setUpdateStatus] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/booking');
      const data = await response.json();
      setBookings(data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings');
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setEditingStatus(prev => ({
      ...prev,
      [bookingId]: newStatus,
    }));
  };

  const updateBookingStatus = async (bookingId) => {
    const newStatus = editingStatus[bookingId];
    if (!newStatus || newStatus === bookings.find(b => b.id === bookingId).status) {
      setUpdateStatus(prev => ({ ...prev, [bookingId]: 'No changes to save' }));
      setTimeout(() => setUpdateStatus(prev => ({ ...prev, [bookingId]: null })), 3000);
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateStatus(prev => ({ ...prev, [bookingId]: null }));
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const contentType = response.headers.get('content-type');
      let errorData = {};
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json().catch(() => ({}));
      } else {
        const text = await response.text();
        errorData = { error: text || 'Invalid response from server' };
      }

      if (!response.ok) {
        throw new Error(errorData.error || `Failed to update status: ${response.statusText}`);
      }

      await fetchBookings();
      setEditingStatus(prev => ({ ...prev, [bookingId]: null }));
      setUpdateStatus(prev => ({ ...prev, [bookingId]: 'Status updated successfully' }));
      setTimeout(() => setUpdateStatus(prev => ({ ...prev, [bookingId]: null })), 3000);
    } catch (err) {
      console.error('Update error:', err);
      setUpdateStatus(prev => ({ ...prev, [bookingId]: `Error: ${err.message}` }));
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredBookings = bookings
    .filter(booking => 
      (!filterType || booking.type === filterType) &&
      (!filterStatus || booking.status === filterStatus)
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'booking_date') {
        return multiplier * (new Date(a.booking_date) - new Date(b.booking_date));
      }
      if (sortField === 'total_price') {
        return multiplier * (parseFloat(a.total_price) - parseFloat(b.total_price));
      }
      return multiplier * (a[sortField] - b[sortField]);
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Lịch sử đặt hàng</h1>

      <div className="mb-6 flex gap-4">
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Loại</option>
          <option value="tour">Tour</option>
          <option value="flight">Vé máy bay</option>
        </select>

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Trạng thái</option>
          <option value="pending">Chờ </option>
          <option value="confirmed">Xác nhận</option>
          <option value="cancelled">Hủy</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Đang tải ...</div>
      ) : error ? (
        <div className="text-red-500 text-center font-medium">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                {['Loại', 'Ngày khởi hành', 'Tổng giá', 'Trạng thái', 'Ngày đặt', 'Chi tiết'].map((header, idx) => (
                  <th 
                    key={idx}
                    className="px-6 py-3 text-left text-sm font-medium cursor-pointer hover:bg-blue-700 transition duration-200"
                  >
                    {header} {sortField === header.toLowerCase().replace(' ', '_') && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, index) => (
                <tr 
                  key={booking.id} 
                  className={`border-b border-gray-200 transition duration-200 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4 text-gray-800 capitalize">
                    {booking.type === 'flight' ? 'Vé máy bay' : 'Tour'}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {booking.type === 'tour'
                      ? booking.start_tour_date
                        ? format(new Date(booking.start_tour_date), 'PPP', { locale: vi })
                        : '—'
                      : booking.flight_date
                        ? format(new Date(booking.flight_date), 'PPP', { locale: vi })
                        : '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {Number(booking.total_price).toLocaleString('vi-VN')} VNĐ
                  </td>
                 <td className="px-6 py-4 text-sm">
  <div className="flex items-center gap-2">
    <select
      value={editingStatus[booking.id] ?? booking.status}
      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
      className={`
        px-2 py-1 rounded-md border text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${
          (editingStatus[booking.id] ?? booking.status) === 'confirmed'
            ? 'bg-green-100 text-green-800 border-green-300'
            : (editingStatus[booking.id] ?? booking.status) === 'pending'
            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
            : 'bg-red-100 text-red-800 border-red-300'
        }
      `}
    >
      <option value="pending">Chờ</option>
      <option value="confirmed">Xác nhận</option>
      <option value="cancelled">Hủy</option>
    </select>

    <button
      onClick={() => updateBookingStatus(booking.id)}
      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
      disabled={isUpdating}
    >
      Lưu
    </button>
  </div>

  {updateStatus[booking.id] && (
    <p className="mt-1 text-xs text-gray-500 italic">{updateStatus[booking.id]}</p>
  )}
</td>

                  <td className="px-6 py-4 text-gray-800">
                    {format(new Date(booking.booking_date), 'PPp', { locale: vi })}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      )}
      <BookingDetailModal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />
    </div>
  );
}
