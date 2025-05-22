import FlightCard from "./FlightCard";

const dummyFlights = [
  { from: "Hà Nội", to: "TP.HCM", time: "08:00 - 10:00", airline: "Vietnam Airlines", price: "1.200.000" },
  { from: "Đà Nẵng", to: "Hà Nội", time: "14:00 - 16:00", airline: "Bamboo Airways", price: "950.000" },
];

export default function FlightList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {dummyFlights.map((flight, idx) => (
        <FlightCard key={idx} flight={flight} />
      ))}
    </div>
  );
}
