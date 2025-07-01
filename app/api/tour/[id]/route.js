// app/api/tours/[id]/route.js
import { NextResponse } from 'next/server'
import connectDB from '@/app/lib/db'

// GET by ID


export async function GET(request, { params }) {
  try {
    const db = await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'id của tour không được cung cấp.' }, { status: 400 });
    }

    const [rows] = await db.query('SELECT * FROM tours WHERE id = ?', [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Không tìm thấy tour với id này.' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching single tour:", error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy thông tin chi tiết tour từ database.' },
      { status: 500 }
    );
  }
}



// Bạn có thể thêm PUT (cập nhật) hoặc DELETE (xóa) tour ở đây nếu cần
// Ví dụ:
// export async function PUT(request, { params }) { ... }
// export async function DELETE(request, { params }) { ... }

// PUT: Update
export async function PUT(req, { params }) {
  try {
    const db = await connectDB()
    const data = await req.json()
    const {
      title, slug, description, location,
      price, duration, image, discount_percentage
    } = data

    const [result] = await db.query(
      `UPDATE tours SET 
       title=?, slug=?, description=?, location=?, price=?, duration=?, image=?, discount_percentage=?
       WHERE id=?`,
      [title, slug, description, location, price, duration, image, discount_percentage, params.id]
    )

    return NextResponse.json({ message: 'Tour đã được cập nhật' })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi cập nhật tour' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(req, { params }) {
  const tourId = Number(params.id);
  console.log("Tour ID nhận được:", tourId);
  try {
    const db = await connectDB()
    const [rows] = await db.query('DELETE FROM tours WHERE id = ?', [tourId])
    return NextResponse.json({ message: 'Tour đã được xoá' })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xoá tour' }, { status: 500 })
  }
}
export async function PATCH(req, { params }) {
  const tourId = Number(params.id);
  const { status } = await req.json();

  try {
    const db = await connectDB();
    const [result] = await db.query(
      'UPDATE tours SET status = ? WHERE id = ?',
      [status, tourId]
    );

    return NextResponse.json({ message: 'Trạng thái tour đã được cập nhật' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật trạng thái tour' }, { status: 500 });
  }
}

