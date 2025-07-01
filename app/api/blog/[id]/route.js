import connectDB  from '@/app/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params }) {
  const { id } = params;
  const db = await connectDB();
  try {
    const [rows] = await db.execute(
      'SELECT * FROM blogposts WHERE id = ? LIMIT 1',
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  const id = params.id;
    const db = await connectDB();
  try {
    if (!id) {
      return new Response(JSON.stringify({ error: 'Thiếu ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Thực thi truy vấn xoá
    await db.query('DELETE FROM blogposts WHERE id = ?', [id]);

    return new Response(JSON.stringify({ message: 'Xoá thành công' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Lỗi khi xoá blog:', err);
    return new Response(JSON.stringify({ error: 'Lỗi khi xoá blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { title, slug, content, image_url } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Thiếu dữ liệu bắt buộc.' }, { status: 400 });
  }

  try {
    const db = await connectDB();

    const [result] = await db.query(
      'UPDATE blogposts SET title = ?, slug = ?, content = ?, image_url = ? WHERE id = ?',
      [title, slug, content, image_url || null, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Không tìm thấy bài viết để cập nhật.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cập nhật bài viết thành công.' });
  } catch (err) {
    console.error('Lỗi khi cập nhật bài viết:', err);
    return NextResponse.json({ error: 'Lỗi máy chủ.' }, { status: 500 });
  }
}

