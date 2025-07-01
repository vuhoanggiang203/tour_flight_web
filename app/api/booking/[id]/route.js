import  connectDB  from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const db = await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Thiếu booking id' }, { status: 400 });
    }

    // Lấy chi tiết booking + JOIN tour nếu là tour
    const [bookingRows] = await db.query(
      `SELECT b.*, 
              t.title AS tour_title, 
              t.location AS tour_location, 
              t.duration AS tour_duration 
       FROM bookings b
       LEFT JOIN tours t ON b.tour_id = t.id
       WHERE b.id = ?`,
      [id]
    );

    if (bookingRows.length === 0) {
      return NextResponse.json({ error: 'Không tìm thấy booking này.' }, { status: 404 });
    }

    const booking = bookingRows[0];

    // Lấy danh sách passenger theo booking_id
    const [passengers] = await db.query(
      `SELECT full_name, gender, dob 
       FROM passenger_info 
       WHERE booking_id = ?`,
      [id]
    );

    booking.passengers = passengers;

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking detail:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { type, tour_id, flight_ticket_id, total_price, status } = await req.json();
  const db = await connectDB();
  await db.query(
    'UPDATE Bookings SET type = ?, tour_id = ?, flight_ticket_id = ?, total_price = ?, status = ? WHERE id = ?',
    [type, tour_id || null, flight_ticket_id || null, total_price, status, params.id]
  );
  return NextResponse.json({ message: 'Booking updated' }, { status: 200 });
}

export async function DELETE(_, { params }) {
  const db = await connectDB();
  await db.query('DELETE FROM Bookings WHERE id = ?', [params.id]);
  return NextResponse.json({ message: 'Booking deleted' }, { status: 200 });
}

export async function PATCH(req, { params }) {
  const id = params.id;
  const { status } = await req.json();
  const db = await connectDB(); // Initialize db

  // Validate status
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return NextResponse.json({ error: 'Trạng thái không hợp lệ' }, { status: 400 });
  }

  try {
    // Check if booking exists and is pending
    const [rows] = await db.query('SELECT status FROM Bookings WHERE id = ?', [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Không tìm thấy booking' }, { status: 404 });
    }
    if (rows[0].status !== 'pending') {
      return NextResponse.json({ error: 'Chỉ có thể cập nhật booking ở trạng thái pending' }, { status: 403 });
    }

    // Update status
    const [result] = await db.execute(
      'UPDATE Bookings SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Không thể cập nhật booking' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Cập nhật trạng thái thành công' }, { status: 200 });
  } catch (error) {
    console.error('Lỗi cập nhật booking:', error);
    return NextResponse.json({ error: `Lỗi máy chủ: ${error.message}` }, { status: 500 });
  }
}