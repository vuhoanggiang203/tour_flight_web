"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalComfirmDeleteTour from '@/app/component/ModalComfirmDeleteTour';


const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      {children}
    </table>
  </div>
);

const Button = ({ children, onClick, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50'
  };
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default function TourManagement() {
  const router = useRouter();
 
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/tour');
        const data = await res.json();

        
        if (Array.isArray(data)) {
          setTours(data);
        } else {
          console.error('Dữ liệu trả về không phải mảng:', data);
          setTours([]); 
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu tour:', error);
        setTours([]); 
      }
    };

    fetchTours();
  }, []);

  
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    duration: '',
    status: 'active'
  });
  const toggleTourStatus = async (tour) => {
 const updatedStatus = tour.status === 'active' ? 'inactive' : 'active';

  try {
    const res = await fetch(`/api/tour/${tour.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: updatedStatus }),
    });

    const data = await res.json();

    if (res.ok) {
       
      window.location.reload(); 
    } else {
      alert('Lỗi cập nhật trạng thái: ' + data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Lỗi server khi cập nhật trạng thái');
  }
};

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentTour) {
      
      setTours(tours.map(t => t.id === currentTour.id ? { ...formData, id: currentTour.id } : t));
    } else {
      
      const newTour = { ...formData, id: tours.length + 1 };
      setTours([...tours, newTour]);
    }
    
    setIsModalOpen(false);
    setCurrentTour(null);
    setFormData({
      title: '',
      location: '',
      price: '',
      duration: '',
      status: 'active'
    });
  };

  const handleEdit = (tour) => {
    setCurrentTour(tour);
    setFormData({
      title: tour.title,
      location: tour.location,
      price: tour.price,
      duration: tour.duration,
      status: tour.status
    });
    setIsModalOpen(true);
  };

 const handleDelete = async (id) => {

  try {
    const res = await fetch(`/api/tour/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      alert('Xoá tour thành công!');
      router.refresh();
      // Cập nhật danh sách tour sau khi xoá
      // Gợi ý: Gọi lại API hoặc cập nhật danh sách tour tại đây
      // Ví dụ: fetchTours(); hoặc setTours(tours.filter(t => t.id !== id))
    } else {
      console.error('Xoá thất bại:', data.error);
      alert(`Xoá thất bại: ${data.error || 'Lỗi không xác định'}`);
    }
  } catch (error) {
    console.error('Lỗi khi xoá:', error);
    alert('Đã xảy ra lỗi khi xoá tour');
  }
};


  // State cho modal xác nhận xóa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Tour</h1>
          <Link href="/admin/tour/addtour">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
          Thêm mới Tour
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Table>
            <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Tên Tour</th>
            <th className="py-3 px-4 text-left">Địa điểm</th>
            <th className="py-3 px-4 text-left">Giá</th>
            <th className="py-3 px-4 text-left">Thời lượng</th>
            <th className="py-3 px-4 text-left">Giảm giá</th>
            <th className="py-3 px-4 text-left">Hành động</th>
            <th className="py-3 px-4 text-left">Trạng thái</th>
          </tr>
            </thead>
            <tbody>
          {tours.map(tour => (
            <tr key={tour.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{tour.id}</td>
              <td className="py-3 px-4 font-medium">{tour.title}</td>
              <td className="py-3 px-4">{tour.location}</td>
              <td className="py-3 px-4">{Number(tour.price).toLocaleString('vi-VN')} VNĐ</td>
              <td className="py-3 px-4">{tour.duration}</td>
              <td className="py-3 px-4">
            {tour.discount_percentage ? `${tour.discount_percentage}%` : 'Không có'}
              </td>
              <td className="py-3 px-4 space-x-2">
            <Link href={`/admin/tour/${tour.id}`}>
              <Button variant="outline">Sửa</Button>
            </Link>
              </td>
              <td className="py-3 px-4">
            <button
              onClick={() => toggleTourStatus(tour)}
              className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200
                ${tour.status === 'active'
              ? 'bg-red-500 hover:bg-red-600 text-white border border-red-600'
              : 'bg-green-500 hover:bg-green-600 text-white border border-green-600'
                }
              `}
            >
              {tour.status === 'active' ? 'Vô hiệu hóa' : 'Bật lại'}
            </button>
              </td>
            </tr>
          ))}
            </tbody>
          </Table>
            {showStatusModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
      <h2 className="text-lg font-semibold text-green-600 mb-2">Cập nhật trạng thái thành công!</h2>
      <p className="text-gray-600 mb-4">Trạng thái của tour đã được thay đổi.</p>
      <button
        onClick={() => setShowStatusModal(false)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Đóng
      </button>
    </div>
  </div>
)}

        </div>

       
   

    </div>
  );
}