export default function FlightCard({ flight }) {
    return (
      <div className="border rounded shadow hover:shadow-lg p-4 transition">
        <div className="flex justify-between font-semibold mb-2">
          <span>{flight.from} → {flight.to}</span>
          <span className="text-blue-600">{flight.price}đ</span>
        </div>
        <p className="text-sm text-gray-600">Giờ bay: {flight.time}</p>
        <p className="text-sm text-gray-500">Hãng: {flight.airline}</p>
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Đặt ngay
        </button>
      </div>
    );
  }
  