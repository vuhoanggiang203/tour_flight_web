export default function FlightSearchForm() {
    return (
      <form className="grid md:grid-cols-4 gap-4 bg-white shadow p-6 rounded">
        <input type="text" placeholder="Nơi đi" className="border p-2 rounded" />
        <input type="text" placeholder="Nơi đến" className="border p-2 rounded" />
        <input type="date" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white rounded hover:bg-blue-700 p-2">
          Tìm chuyến bay
        </button>
      </form>
    );
  }
  