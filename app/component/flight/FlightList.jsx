'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import FlightCard from "./FlightCard";

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("from")?.toLowerCase();
  const toQuery = searchParams.get("to")?.toLowerCase();
  const dateQuery = searchParams.get("date");

  useEffect(() => {
    fetch("/api/aviation")
      .then((res) => res.json())
      .then((data) => {
        const formattedFlights = (data.data || []).map((f) => {
          const departureTime = f.departure?.scheduled;
          const arrivalTime = f.arrival?.scheduled;
          const date = departureTime ? departureTime.slice(0, 10) : "N/A";
          const time = `${departureTime?.slice(11, 16) || "?"} - ${arrivalTime?.slice(11, 16) || "?"}`;

          return {
            from: f.departure?.airport || "N/A",
            to: f.arrival?.airport || "N/A",
            from_iata: f.departure?.iata?.toLowerCase() || "",
            to_iata: f.arrival?.iata?.toLowerCase() || "",
            date,
            time,
            airline: f.airline?.name || "Không rõ",
            price: Math.floor(Math.random() * (5000000 - 1000000 + 1)) + 1000000,
          };
        });

        const filteredFlights = formattedFlights.filter((flight) => {
          const matchFrom = !fromQuery || flight.from.toLowerCase().includes(fromQuery) || flight.from_iata === fromQuery;
          const matchTo = !toQuery || flight.to.toLowerCase().includes(toQuery) || flight.to_iata === toQuery;
          const matchDate = !dateQuery || flight.date === dateQuery;
          return matchFrom && matchTo && matchDate;
        });

        setFlights(filteredFlights);
        setPage(1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chuyến bay:", error);
        setLoading(false);
      });
  }, [fromQuery, toQuery, dateQuery]);

  if (loading) return <p className="text-center text-gray-600">Đang tải chuyến bay...</p>;

  if (flights.length === 0)
    return <p className="text-center text-gray-500">Không tìm thấy chuyến bay phù hợp.</p>;

  const totalPages = Math.ceil(flights.length / itemsPerPage);
  const currentFlights = flights.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const renderPagination = () => {
    const pages = [];

    const showPages = 2; // số trang gần current page
    const start = Math.max(2, page - showPages);
    const end = Math.min(totalPages - 1, page + showPages);

    pages.push(
      <button
        key="first"
        onClick={() => setPage(1)}
        className={`px-3 py-1 rounded ${page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
      >
        1
      </button>
    );

    if (start > 2) pages.push(<span key="dots1" className="px-2">...</span>);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${page === i ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages - 1) pages.push(<span key="dots2" className="px-2">...</span>);

    if (totalPages > 1) {
      pages.push(
        <button
          key="last"
          onClick={() => setPage(totalPages)}
          className={`px-3 py-1 rounded ${page === totalPages ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-6 gap-2">
        {page > 1 && (
          <button
            onClick={() => setPage(1)}
            className="p-2 text-gray-600 hover:text-black"
            title="Trang đầu"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
        )}

        {pages}

        {page < totalPages && (
          <button
            onClick={() => setPage(totalPages)}
            className="p-2 text-gray-600 hover:text-black"
            title="Trang cuối"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {currentFlights.map((flight, idx) => (
          <FlightCard key={idx} flight={flight} />
        ))}
      </div>

      {totalPages > 1 && renderPagination()}
    </div>
  );
}
