// app/api/tour/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db'; // Đảm bảo đường dẫn này đúng với file db.js của bạn

// GET all tours with optional filters (search, min/max price)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm') || '';
    const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
    const maxPrice = parseFloat(searchParams.get('maxPrice')) || Infinity;

    const db = await connectDB();

    // Xây dựng query
    const query = `
      SELECT *, 
        ROUND(price * (1 - discount_percentage / 100)) AS final_price 
      FROM tours 
      WHERE status = 'active' AND
        (title LIKE ? OR location LIKE ?) AND 
        ROUND(price * (1 - discount_percentage / 100)) >= ? AND 
        ROUND(price * (1 - discount_percentage / 100)) <= ?
      ORDER BY created_at DESC
    `;

    const values = [`%${searchTerm}%`, `%${searchTerm}%`, minPrice, maxPrice];
    const [rows] = await db.execute(query, values);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi truy vấn tours:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}
