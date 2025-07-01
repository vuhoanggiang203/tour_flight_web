'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlaneTakeoff, PlaneLanding, CalendarDays, Search } from 'lucide-react';

export default function FlightSearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      from,
      to,
      date,
    }).toString();

    router.push(`/flights?${query}`); // Điều hướng tới trang kết quả
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Tìm chuyến bay</h2>

      {/* From*/}
      <div className="flex items-center gap-3">
        <PlaneTakeoff className="w-5 h-5 text-blue-500" />
        <input
          type="text"
          placeholder="Điểm đi"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>

      {/* To */}
      <div className="flex items-center gap-3">
        <PlaneLanding className="w-5 h-5 text-blue-500" />
        <input
          type="text"
          placeholder="Điểm đến"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

      {/* Ngày */}
      <div className="flex items-center gap-3">
        <CalendarDays className="w-5 h-5 text-blue-500" />
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Nút tìm kiếm */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        Tìm chuyến bay
      </button>
    </form>
  );
}
