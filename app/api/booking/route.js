// File: app/api/booking/route.js

import connectDB from '@/app/lib/db';

export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM bookings');
    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error('GET /api/booking error:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const {
      full_name,
      phone_number,
      type,
      tour_id,
      flight_ticket_id,
      total_price,
      departure,
      arrival,
      flight_date,
      flight_time,
      start_tour_date, 
    } = await req.json();

    const db = await connectDB();
    const [result] = await db.query(
  `INSERT INTO bookings 
    (full_name, phone_number, type, tour_id, start_tour_date, flight_ticket_id, total_price, departure, arrival, flight_date, flight_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    full_name,
    phone_number,
    type,
    tour_id || null,
    start_tour_date || null,
    flight_ticket_id || null,
    total_price,
    departure || null,
    arrival || null,
    flight_date || null,
    flight_time || null,
  ]
);


    return Response.json({ message: 'Booking created successfully', booking_id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
