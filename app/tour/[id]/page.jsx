// app/tour/[id]/page.jsx

"use client";
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { MapPin, Clock, DollarSign, Percent, Info, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewSection from '@/app/component/ReviewSection';
export default function TourDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await fetch(`/api/tour/${id}`);
        if (!res.ok) {
          const message = await res.text();
          console.error("Error response:", message);
          setError(`Lỗi: ${res.status}`);
          return;
        }
        const data = await res.json();
        setTour(data);
      } catch (err) {
        console.error("Lỗi fetch:", err);
        setError("Lỗi kết nối tới server");
      }
    }

    if (id) fetchTour();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!tour) return <p>Đang tải...</p>;
  if (!tour) notFound();

  const finalPrice = tour.discount_percentage
    ? tour.price * (1 - tour.discount_percentage / 100)
    : tour.price;

  const handleBookingClick = () => {
    const query = new URLSearchParams({
      id: tour.id,
      name: tour.title,
      destination: tour.location,
      date: new Date(tour.created_at).toISOString().split('T')[0],
      price: finalPrice.toString(),
    }).toString();
    router.push(`/bookingTour?${query}`);
  };

  return (<>
 
    <div className="container mx-auto p-4 md:p-8 mt-10">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
          <Image
            src={`/image/` + tour.image}
            alt={tour.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="rounded-t-xl"
          />
          {tour.discount_percentage > 0 && (
            <div className="absolute top-6 right-6 bg-red-600 text-white text-xl font-bold px-4 py-2 rounded-full shadow-lg">
              -{tour.discount_percentage}% OFF
            </div>
          )}
        </div>

        <div className="p-6 md:p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {tour.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg text-gray-700 mb-8">
            <p className="flex items-center">
              <MapPin size={22} className="mr-3 text-blue-600" />
              <span className="font-semibold">Địa điểm:</span> {tour.location}
            </p>
            <p className="flex items-center">
              <Clock size={22} className="mr-3 text-purple-600" />
              <span className="font-semibold">Thời lượng: </span> {tour.duration}
            </p>
            <p className="flex items-center">
              <Calendar size={22} className="mr-3 text-green-600" />
              <span className="font-semibold">Ngày tạo:</span> {new Date(tour.created_at).toLocaleDateString('vi-VN')}
            </p>
          </div>

          <div className="prose max-w-none text-gray-800 leading-relaxed mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Info size={24} className="mr-3 text-gray-700" />
              Mô tả Tour
            </h2>

            {tour.description
              .split(/(?=NGÀY\s+\d+)/g) // Regex giữ "NGÀY 1", "NGÀY 2" ở đầu mỗi đoạn
              .map((section, index) => (
                <p key={index} className="mb-4 whitespace-pre-line">{section.trim()}</p>
              ))}
          </div>


          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <DollarSign size={24} className="mr-3 text-yellow-600" />
              Thông tin giá
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              {tour.discount_percentage > 0 && (
                <p className="text-gray-500 line-through text-2xl font-medium mb-2 sm:mb-0">
                  Giá gốc: {tour.price.toLocaleString('vi-VN')} VNĐ
                </p>
              )}
              <p className="text-4xl font-extrabold text-green-700">
                Giá cuối cùng: {finalPrice.toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
            {tour.discount_percentage > 0 && (
              <p className="text-red-600 font-bold text-lg mt-2 flex items-center">
                <Percent size={20} className="mr-2" />
                Bạn tiết kiệm được {tour.discount_percentage}%
              </p>
            )}
          </div>

          <div className="text-center">
            <Link href="/tour" passHref>
              <button className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-md">
                <span className="mr-2">&larr;</span> Quay lại danh sách Tour
              </button>
            </Link>
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-md ml-4"
            >
              Đặt Tour Ngay <span className="ml-2">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
    <div className="max-w-5xl mx-auto p-6">
   
      <ReviewSection tourId={id} />
    </div>
      </>
  );
}