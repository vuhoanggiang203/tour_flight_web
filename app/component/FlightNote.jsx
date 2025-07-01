'use client'

export default function FlightNote() {
return (
    <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md space-y-6 text-gray-800">
        <h2 className="text-xl font-bold text-yellow-700">✈️ Ghi chú quan trọng khi đặt vé máy bay</h2>

        <div>
            <h3 className="font-semibold mb-1 text-yellow-800">1. Thời gian làm thủ tục (Check-in)</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
                <li><strong>Nội địa:</strong> Có mặt trước <span className="font-medium text-black">90 phút</span>, đóng quầy trước <span className="font-medium text-black">40 phút</span>.</li>
                <li><strong>Quốc tế:</strong> Có mặt trước <span className="font-medium text-black">3 tiếng</span>, đóng quầy trước <span className="font-medium text-black">50 phút</span>.</li>
                <li className="text-red-600 font-medium">Trễ giờ check-in sẽ bị từ chối bay và không hoàn vé.</li>
            </ul>
        </div>

        <div>
            <h3 className="font-semibold mb-1 text-yellow-800">2. Hành lý</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
                <li><strong>Hành lý xách tay:</strong> Tối đa <span className="font-medium text-black">7kg</span>, phải đúng kích thước quy định.</li>
                <li><strong>Hành lý ký gửi:</strong> Phụ thuộc vào hạng vé (thường <span className="font-medium">20kg</span>, <span className="font-medium">30kg</span>,...).</li>
                <li className="text-red-500">Vượt quá cân nặng sẽ bị tính phụ phí.</li>
                <li className="text-red-500">Không mang theo vật cấm như: <span className="font-semibold">dao, kéo, pin sạc quá dung lượng, chất dễ cháy nổ</span>...</li>
            </ul>
        </div>

        <div>
            <h3 className="font-semibold mb-1 text-yellow-800">3. Giấy tờ cần mang theo</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
                <li><strong>Nội địa:</strong> CCCD hoặc Giấy khai sinh (trẻ em).</li>
                <li><strong>Quốc tế:</strong> Hộ chiếu còn hạn + visa (nếu yêu cầu).</li>
                <li>Một số nước yêu cầu khai báo y tế hoặc hộ chiếu vaccine.</li>
            </ul>
        </div>

        <div>
            <h3 className="font-semibold mb-1 text-yellow-800">4. Đổi/hoàn vé</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
                <li>Đổi/hoàn vé phải thực hiện trước giờ bay, không hoàn sau giờ khởi hành.</li>
            </ul>
        </div>

        <div>
            <h3 className="font-semibold mb-1 text-yellow-800">5. Trẻ em &amp; Người già</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
                <li>Trẻ dưới 2 tuổi cần mua vé infant (ngồi cùng người lớn).</li>
                <li>Trẻ từ 2-12 tuổi mua vé trẻ em, phải đi cùng người lớn.</li>
                <li>Người cao tuổi/khuyết tật có thể yêu cầu hỗ trợ đặc biệt.</li>
            </ul>
        </div>

        <div>
            <h3 className="font-semibold mb-1 text-yellow-800">6. Lưu ý đặc biệt</h3>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
                <li>Đọc kỹ quy định hãng bay trước khi đặt.</li>
                <li>Nếu bị từ chối bay do thông tin sai hoặc vi phạm quy định, hãng không chịu trách nhiệm hoàn tiền.</li>
            </ul>
        </div>
    </div>
)
}
