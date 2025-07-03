'use client';

import { useState, useEffect } from "react";
import NcInputNumber from "./NcInputNumber"; // Đảm bảo đường dẫn đúng
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image"; // Import Image từ Next.js
import FlightNote from "../component/FlightNote";
import {
  PlaneTakeoff, // Icon cho điểm đi
  PlaneLanding, // Icon cho điểm đến
  CalendarDays, // Icon cho ngày
  Clock,        // Icon cho giờ
  User,         // Icon cho tên người liên hệ
  Phone,        // Icon cho số điện thoại
  Users,        // Icon cho số lượng hành khách
  TicketCheck   // Icon cho nút xác nhận
} from 'lucide-react'; // Import các icon từ Lucide

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketClass, setTicketClass] = useState("economy");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  // Lấy thông tin chuyến bay từ URL params
  const flightInfo = {
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    date: searchParams.get("date") || "",
    time: searchParams.get("time") || "", 
    
  };
  const pricePerAdult = parseInt(searchParams.get("price") || "0", 10);
   const priceMultiplier = {
    economy: 1,
    premium: 1.5,
    business: 1.7,
    first: 2,
  };

 const totalPrice = Math.floor(
  (
    adults * pricePerAdult * priceMultiplier[ticketClass] +
    children * pricePerAdult * 0.7 * priceMultiplier[ticketClass]
  ) * (isRoundTrip ? 1.8 : 1)
);
  useEffect(() => {
    if (adults + children > 9) {
      setChildren(9 - adults);
    }
   
    if (infants > adults) {
      setInfants(adults);
    }
  }, [adults]); 

  const handleChildrenChange = (val) => {
    if (val + adults > 9) {
      setChildren(9 - adults);
    } else {
      setChildren(val);
    }
  };

  const handleInfantsChange = (val) => {
    if (val > adults) {
      setInfants(adults);
    } else {
      setInfants(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


  if (!name || !phone) {
    setShowModal(true);
    return;
  }
    if (adults + children > 9) {
      alert("Tổng số người lớn và trẻ em không được vượt quá 9.");
      return;
    }

    if (infants > adults) {
      alert("Số lượng em bé không được nhiều hơn số người lớn.");
      return;
    }

  const query = new URLSearchParams({
    type: "flight" ,
  from: flightInfo.from,
  to: flightInfo.to,
  date: flightInfo.date,
  time: flightInfo.time,
  adults: adults.toString(),
  children: children.toString(),
  infants: infants.toString(),
  name: name,
  phone: phone,
  totalPrice: totalPrice.toString() ,
  ticketClass: ticketClass,
}).toString();

router.push(`/passenger-info?${query}`);

  };

  return (<>
 
    <div className="
      min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8
      bg-gradient-to-br from-blue-50 to-indigo-50
    ">
      <div className="
        max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden
        grid grid-cols-1 lg:grid-cols-2
      ">
        {/* Left Side: Image Section */}
        <div className="relative h-64 lg:h-auto flex items-center justify-center bg-blue-700">
          <Image
            src="/image/flight2.jpg" // Thay thế bằng đường dẫn ảnh của bạn
            alt="Flight Booking Banner"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="absolute inset-0 object-cover opacity-70" // Đảm bảo ảnh phủ đầy và mờ đi một chút
          />
         
        </div>

        {/* Right Side: Booking Form */}
        <div className="p-6 md:p-8 lg:p-10 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Thông tin đặt vé
          </h1>

          {/* Flight Info Box */}
          {flightInfo.from && flightInfo.to && flightInfo.date && (
            <div className="
              bg-blue-50 border border-blue-200 text-blue-800
              p-4 rounded-lg text-left shadow-sm
            ">
              <h3 className="text-xl font-bold mb-2">Chi tiết chuyến bay</h3>
              <p className="flex items-center text-base mb-1">
                <PlaneTakeoff className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">{flightInfo.from}</span>
                <span className="mx-2 text-gray-500">→</span>
                <PlaneLanding className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">{flightInfo.to}</span>
              </p>
              <p className="flex items-center text-base mb-1">
                <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                Ngày bay: <span className="ml-1 font-semibold">{flightInfo.date}</span>
              </p>
              <p className="flex items-center text-base">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Giờ bay: <span className="ml-1 font-semibold">{flightInfo.time}</span>
              </p>
               <p className="flex items-center text-base mt-2">
                💰 Giá vé: <span className="ml-1 font-semibold">{pricePerAdult.toLocaleString("vi-VN")} VNĐ/người lớn</span>
              </p>
            </div>
            
          )}
          {(adults + children > 0) && (
        <p className="flex items-center text-base mt-1">
          🧾 Tổng cộng:{" "}
          <span className="ml-1 font-bold text-green-600 text-lg">
            {totalPrice.toLocaleString("vi-VN")} VNĐ
          </span>
        </p>
      )}
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
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Name Input */}
            <div>
              <label htmlFor="contactName" className=" text-base font-medium text-gray-700 mb-2 flex  items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                Họ tên người liên hệ
              </label>
              <input
                type="text"
                id="contactName"
                maxLength={50}
                
                className="
                  w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition duration-200 ease-in-out
                "
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="contactPhone" className=" text-base font-medium text-gray-700 mb-2 flex  items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-500" />
                Số điện thoại
              </label>
              <input
                type="tel"
               maxLength={11}
                pattern="[0-9]{10,11}"
                id="contactPhone"
                
                className="
                  w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition duration-200 ease-in-out
                "
                value={phone}
                onChange={(e) => {
                const value = e.target.value;
                // Chỉ cho phép số, không chữ hoặc ký tự đặc biệt
                if (/^\d*$/.test(value)) {
                  setPhone(value);
                }
              }}
                placeholder="Ví dụ: 0912345678"
              />
               <div>
        <label className="block text-base font-medium text-gray-700 mb-2">
          🎟️ Loại vé
        </label>
        <select
          value={ticketClass}
          onChange={(e) => setTicketClass(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="economy">Vé thường (100%)</option>
          <option value="premium">Phổ thông đặc biệt (150%)</option>
          <option value="business">Hạng thương gia (170%)</option>
          <option value="first">Hạng nhất (200%)</option>
        </select>
      {/*Khứ hồi*/}
       <label className=" text-base font-medium text-gray-700 mt-4 mb-2 flex items-center">Khứ hồi
        </label>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isRoundTrip}
            onChange={(e) => {setIsRoundTrip(e.target.checked)}}
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        <span className="text-gray-600">Chọn nếu bạn muốn đặt vé khứ hồi</span>
        </div>
      </div>
            </div>

            {/* Passenger Count Section */}
            <div className="border-t border-gray-200 pt-5 space-y-4">
                <p className="text-lg font-semibold text-gray-800 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-gray-500" />
                    Số lượng hành khách:
                </p>
                <NcInputNumber
                    label="Người lớn"
                    defaultValue={adults}
                    min={1}
                    max={9}
                    onChange={(val) => setAdults(val)}
                    className="py-2" 
                />
                <NcInputNumber
                    label="Trẻ em"
                    defaultValue={children}
                    min={0}
                    max={9 - adults}
                    onChange={handleChildrenChange}
                    className="py-2"
                />
                <NcInputNumber
                    label="Em bé (<2 tuổi)"
                    defaultValue={infants}
                    min={0}
                    max={adults}
                    onChange={handleInfantsChange}
                    className="py-2"
                />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full bg-blue-600 text-white font-bold
                py-3 px-4 rounded-lg mt-6 shadow-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition duration-300 ease-in-out transform hover:-translate-y-0.5
                flex items-center justify-center space-x-2
              "
            >
              <TicketCheck className="w-6 h-6" />
              <span>Xác nhận đặt vé</span>
            </button>
          </form>
        </div>
      </div>
    </div>
     <FlightNote />
    </>
  );
}