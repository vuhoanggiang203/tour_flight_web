
import connectDB  from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url, `http://${req.headers.get('host')}`);
  const bookingId = url.searchParams.get('booking_id');

  if (!bookingId) {
    return Response.json({ error: 'Thiếu booking_id' }, { status: 400 });
  }

  const db = await connectDB();
  const [rows] = await db.query('SELECT full_name, gender, dob FROM passenger_info WHERE booking_id = ?', [bookingId]);

  return Response.json(rows);
}
export async function POST(req) {
  try {
     const db = await connectDB();
    const body = await req.json();
    const { booking_id, passengers } = body;
    console.log("BODY RECEIVED:", body);
    if (!booking_id || !Array.isArray(passengers)) {
      return NextResponse.json({ message: "Missing or invalid data" }, { status: 400 });
    }

    const values = passengers.map(p => [
  booking_id,
               
  p.full_name,         
  p.gender,
  p.dob,
   p.type, 
  p.cccd || null,
  p.cccd_expired || null
]);


    await db.query(`
      INSERT INTO passenger_info 
      (booking_id,  full_name,gender, dob,type, cccd, cccd_expired)
      VALUES ?
    `, [values]);

    return NextResponse.json({ message: "Passenger info saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving passenger info:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
