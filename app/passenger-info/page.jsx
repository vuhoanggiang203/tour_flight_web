'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import ModalAlert from "../component/ModalAlert"; 

import {
  Calendar,
  Phone,
  User,
  Baby,
  CalendarDays,
  CreditCard,
  UserSquare,
  CircleUserRound,
  ChevronDown,
  CheckCircle,
  PlaneTakeoff,
  Clock,
  Info
} from 'lucide-react';

export default function PassengerInfoPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "tour";
  const adults = parseInt(searchParams.get("adults") || "0");
  const children = parseInt(searchParams.get("children") || "0");
  const infants = parseInt(searchParams.get("infants") || "0");
  const contactName = searchParams.get("name") || "";
  const contactPhone = searchParams.get("phone") || "";
  const totalPrice = searchParams.get("totalPrice");
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  // For tour bookings
  const tourId = searchParams.get("tourId") || searchParams.get("tour_id") || "";
  const tourTitle = searchParams.get("tourTitle") || "";
  const tourDate = searchParams.get("tourDate") || "";
  const ticketClass = searchParams.get("ticketClass") ;
  const [passengers, setPassengers] = useState([]);
  const Router = useRouter();
  const [alert, setAlert] = useState({
    isOpen: false,
    title: '',
    message: ''
  });
const getAge = (dobStr) => {
  const today = new Date();
  const dob = new Date(dobStr);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

  useEffect(() => {
    const initialPassengers = [];

    for (let i = 0; i < adults; i++) {
      initialPassengers.push({
        type: "Người lớn",
        full_name: "",
        gender: "",
        dob: "",
        cccd: "",
        cccd_expired: "",
      });
    }

    for (let i = 0; i < children; i++) {
      initialPassengers.push({
        type: "Trẻ em",
        full_name: "",
        gender: "",
        dob: "",
      });
    }

    setPassengers(initialPassengers);
  }, [adults, children, infants]);

  const handleChange = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const p of passengers) {
        const age = getAge(p.dob);
      if (!p.full_name || !p.gender || !p.dob || (p.type === "Người lớn" && (!p.cccd || !p.cccd_expired))) {
            setAlert({
              isOpen: true,
              title: 'Thiếu thông tin',
              message: `Vui lòng điền đầy đủ thông tin cho hành khách ${p.type}.`,
            });
            return;
          }

          if (p.type === "Người lớn" && age < 18) {
            setAlert({
              isOpen: true,
              title: 'Ngày sinh không hợp lệ',
              message: `${p.full_name} phải từ 18 tuổi trở lên để được xác nhận là người lớn.`,
            });
            return;
          }
      if (p.type === "Trẻ em" && age >= 18) {
        setAlert({
          isOpen: true,
          title: 'Ngày sinh không hợp lệ',
          message: `${p.full_name} phải dưới 18 tuổi để được xác nhận là trẻ em.`,
        });
        return;
      }

    }

    try {
      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          type === "flight"
            ? {
                type: "flight",
                full_name: contactName,
                phone_number: contactPhone,
                departure: from,
                arrival: to,
                flight_date: date,
                flight_time: time,
                total_price: totalPrice,
              }
            : {
                type: "tour",
                full_name: contactName,
                phone_number: contactPhone,
                tour_id: tourId,
                total_price: totalPrice,
                start_tour_date: tourDate,
              }
        ),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) {
        throw new Error(bookingData.message || "Không thể tạo booking.");
      }

      const booking_id = bookingData.booking_id;

      const passengerRes = await fetch("/api/passenger-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id,
          passengers,
        }),
      });

      const passengerData = await passengerRes.json();
          console.log("Passenger data:", passengers);
    console.log("Contact Name:", contactName);
    console.log("Contact Phone:", contactPhone);
    console.log("Flight Info:", { from, to, date, time });
      if (!passengerRes.ok) {
        throw new Error(passengerData.message || "Lưu thông tin hành khách thất bại.");
      }

      Router.push("/success");
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi trong quá trình đặt vé. Vui lòng thử lại.");
    }
  };

  // Hàm chuyển đổi loại vé sang tiếng Việt
  const getTicketClassLabel = (ticketClass) => {
    switch (ticketClass) {
      case "economy":
        return "Phổ thông";
      case "business":
        return "Thương gia";
      case "first":
        return "Hạng nhất";
      default:
        return ticketClass || "";
    }
  };

  return (<>
    <div className="
      min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8
      bg-gradient-to-br from-blue-50 to-indigo-50
    ">
      <div className="
        max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden
        p-6 md:p-8 lg:p-10 space-y-8
      ">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Thông tin hành khách
        </h1>

         {type === "flight" ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-left shadow-sm">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <PlaneTakeoff className="w-6 h-6 mr-2 text-blue-600" />
              Chi tiết chuyến bay
            </h3>
            <p className="flex items-center text-base mb-1">
              <span className="font-semibold">{from}</span>
              <span className="mx-2 text-gray-500">→</span>
              <span className="font-semibold">{to}</span>
            </p>
            <p className="flex items-center text-base mb-1">
              <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
              Ngày bay: <span className="ml-1 font-semibold">{date}</span>
            </p>
            <p className="flex items-center text-base">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Giờ bay: <span className="ml-1 font-semibold">{time}</span>
            </p>
            <p className="flex items-center text-base">
              🎟️ Loại vé: <span className="ml-1 font-semibold">{getTicketClassLabel(ticketClass)}</span>
            </p>
            <p className="flex items-center text-base">
              💰 Giá vé: <span className="ml-1 font-semibold">{Intl.NumberFormat("vi-VN").format(totalPrice)} VNĐ</span>
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-left shadow-sm">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <Info className="w-6 h-6 mr-2 text-yellow-600" />
              Chi tiết tour
            </h3>
            <p className="text-base mb-1">
              Tên tour: <span className="font-semibold">{tourTitle}</span>
            </p>
            <p className="text-base">
              Ngày khởi hành: <span className="font-semibold">{tourDate}</span>
            </p>
            <p className="text-base">
              Giá tour: <span className="font-semibold">{Intl.NumberFormat("vi-VN").format(totalPrice)} VNĐ</span>
            </p>
          </div>
        )}

        {/* Contact Info Summary (Optional - if you want to show it here) */}
        <div className="
          bg-green-50 border border-green-200 text-green-800
          p-4 rounded-lg text-left shadow-sm
        ">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            <User className="w-6 h-6 mr-2 text-green-600" />
            Thông tin liên hệ
          </h3>
          <p className="flex items-center text-base mb-1">
            <User className="w-5 h-5 mr-2 text-green-600" />
            Họ tên: <span className="ml-1 font-semibold">{contactName}</span>
          </p>
          <p className="flex items-center text-base">
            <Phone className="w-5 h-5 mr-2 text-green-600" />
            Số điện thoại: <span className="ml-1 font-semibold">{contactPhone}</span>
          </p>
        </div>

        {/* Passenger Forms */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {passengers.map((p, idx) => {
            const passengerCountOfType =
              p.type === "Người lớn"
                ? passengers.slice(0, idx + 1).filter((x) => x.type === "Người lớn").length
                : passengers.slice(0, idx + 1).filter((x) => x.type === "Trẻ em").length;

            const iconForType = p.type === "Người lớn" ? CircleUserRound : Baby;

            return (
              <div
                key={idx}
                className="
                  border border-gray-200 p-6 rounded-xl shadow-sm
                  bg-white hover:shadow-md transition-shadow duration-300
                  relative
                "
              >
                <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
                  {React.createElement(iconForType, { className: "w-7 h-7 mr-3 text-blue-600" })}
                  <h2 className="text-xl font-bold text-gray-800">
                    {p.type} {passengerCountOfType}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Họ và tên */}
                  <div>
                    <label htmlFor={`name-${idx}`} className=" text-sm font-medium text-gray-700 mb-1 flex  items-center">
                      <UserSquare className="w-4 h-4 mr-1.5 text-gray-500" />
                      Họ và tên
                    </label>
                    <input
                      id={`name-${idx}`}
                      type="text"
                      placeholder="Nhập họ và tên đầy đủ"
                      
                      maxLength={50}
                      className="
                        w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-200 ease-in-out
                      "
                      value={p.full_name}
                      onChange={(e) => handleChange(idx, "full_name", e.target.value)}
                    />
                  </div>

                  {/* Giới tính - Sử dụng thẻ select */}
                  <div>
                    <label htmlFor={`gender-${idx}`} className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                      
                      Giới tính
                    </label>
                    <div className="relative">
                      <select
                        id={`gender-${idx}`}
                        
                        className="
                          w-full px-4 py-2 border border-gray-300 rounded-lg bg-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          appearance-none pr-8 cursor-pointer
                          transition duration-200 ease-in-out
                        "
                        value={p.gender}
                        onChange={(e) => handleChange(idx, "gender", e.target.value)}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Ngày sinh - Sử dụng input type="date" */}
                  <div>
                    <label htmlFor={`dob-${idx}`} className=" text-sm font-medium text-gray-700 mb-1 flex  items-center">
                      <CalendarDays className="w-4 h-4 mr-1.5 text-gray-500" />
                      Ngày sinh
                    </label>
                    <input
                      id={`dob-${idx}`}
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      
                      className="
                        w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition duration-200 ease-in-out
                        text-gray-700
                      "
                      value={p.dob}
                      onChange={(e) => handleChange(idx, "dob", e.target.value)}
                    />
                  </div>

                  {/* Hiển thị thêm trường CCCD nếu là người lớn */}
                  {p.type === "Người lớn" && (
                    <>
                      
                      <div>
                        <label htmlFor={`cccd-${idx}`} className=" text-sm font-medium text-gray-700 mb-1 flex  items-center">
                          <CreditCard className="w-4 h-4 mr-1.5 text-gray-500" />
                          Số CCCD
                        </label>
                        <input
                          id={`cccd-${idx}`}
                          type="text"
                          placeholder="Nhập số CCCD"
                          
                          pattern="\d{12}" 
                          maxLength={12} 
                          className="
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition duration-200 ease-in-out
                          "
                          value={p.cccd}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              handleChange(idx, "cccd", value);
                            }
                          }}
                        />

                      </div>

                      {/* Ngày hết hạn CCCD - Sử dụng input type="date" */}
                      <div>
                        <label htmlFor={`cccd_expired-${idx}`} className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <CalendarDays className="w-4 h-4 mr-1.5 text-gray-500" />
                          Ngày hết hạn CCCD
                        </label>
                        <input
                          id={`cccd_expired-${idx}`}
                          type="date"
                          
                          
                          className="
                            w-full px-4 py-2 border border-gray-300 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition duration-200 ease-in-out
                            text-gray-700
                          "
                          value={p.cccd_expired}
                          onChange={(e) => handleChange(idx, "cccd_expired", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Infants Summary (Optional) */}
          {infants > 0 && (
            <div className="
              bg-purple-50 border border-purple-200 text-purple-800
              p-4 rounded-lg shadow-sm flex items-center
            ">
              <Baby className="w-6 h-6 mr-3 text-purple-600" />
              <p className="font-semibold">
                Số lượng em bé đi kèm: {infants}
                <span className="ml-2 text-sm text-purple-700 font-normal"> {`(< 2 tuổi, không yêu cầu kê khai thông tin chi tiết)`}</span>
              </p>
            </div>
          )}


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
            <CheckCircle className="w-6 h-6" />
            <span>Hoàn tất & Thanh toán</span>
          </button>
        </form>
      </div>
    </div>
    <ModalAlert
  isOpen={alert.isOpen}
  onClose={() => setAlert({ ...alert, isOpen: false })}
  title={alert.title}
  message={alert.message}
/>
  </>
  );
}