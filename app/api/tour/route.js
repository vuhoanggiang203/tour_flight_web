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
      WHERE 
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
// POST: create new tour
export async function POST(req) {
  try {
    const db = await connectDB();
    const data = await req.json();
    const {
      title, slug, description, location,
      price, duration, image, discount_percentage
    } = data;

    // Kiểm tra dữ liệu cần thiết
    if (!title || !slug || !description || !location || price === undefined || !duration || !image) {
      return NextResponse.json({ error: 'Thiếu dữ liệu bắt buộc để tạo tour.' }, { status: 400 });
    }

    const [result] = await db.query(
      `INSERT INTO tours
         (title, slug, description, location, price, duration, image, discount_percentage, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        title,
        slug,
        description,
        location,
        parseFloat(price), // Đảm bảo price là số
        duration,
        image,
        discount_percentage !== undefined ? parseFloat(discount_percentage) : 0 // Giá trị mặc định 0 nếu không có discount
      ]
    );

    return NextResponse.json(
      { message: 'Tour đã được tạo thành công!', id: result.insertId },
      { status: 201 } // Status 201 cho Created
    );
  } catch (error) {
    console.error("Error creating tour:", error); // Log lỗi chi tiết hơn
    return NextResponse.json(
      { error: 'Lỗi khi tạo tour mới.' },
      { status: 500 }
    );
  }
}