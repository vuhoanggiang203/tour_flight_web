'use client'

export default function TourNote() {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl shadow-md space-y-6 text-gray-800 mt-8">
      <h2 className="text-xl font-bold text-green-700">🌿 Lưu ý khi đặt Tour du lịch</h2>

      <div>
        <h3 className="font-semibold mb-1 text-green-800">1. Điều kiện đăng ký Tour</h3>
        <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
          <li>Khách phải cung cấp đầy đủ <span className="font-medium text-black">Họ tên, số CMND/CCCD/hộ chiếu</span>.</li>
          <li>Trẻ em <span className="font-medium text-black">dưới 14 tuổi</span> cần đi cùng cha/mẹ hoặc có giấy ủy quyền.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-green-800">2. Thanh toán và hoàn hủy</h3>
        <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
          <li>Đặt cọc tối thiểu <span className="font-semibold text-black">30%</span> tổng giá trị tour khi đăng ký.</li>
          <li>Hoàn tất thanh toán <span className="font-medium text-black">trước ngày khởi hành 7 ngày</span>.</li>
          <li className="text-red-600 font-medium">Hủy tour trong vòng 7 ngày sẽ mất toàn bộ tiền cọc.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1 text-green-800">3. Các lưu ý khi tham gia</h3>
        <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
          <li>Chuẩn bị giấy tờ tùy thân hợp lệ khi tham gia tour.</li>
          <li>Tuân thủ giờ giấc và quy định của hướng dẫn viên.</li>
          <li>Không mang theo vật dụng cấm/hàng dễ cháy nổ trong hành lý.</li>
        </ul>
      </div>
    </div>
  )
}
