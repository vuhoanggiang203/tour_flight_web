import connectDB from '@/app/lib/db'
import { NextResponse } from 'next/server'

// GET /api/tour/[id]/reviews
export async function GET(req, { params }) {
  const { id } = params
  const pool = await connectDB()

  try {
    const [rows] = await pool.query(
      'SELECT id, name, content, created_at FROM reviewservice WHERE tour_id = ?  ORDER BY created_at DESC',
      [id]
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Lỗi khi lấy đánh giá:', error)
    return NextResponse.json({ message: 'Lỗi server khi lấy đánh giá' }, { status: 500 })
  }
}
export async function POST(req, { params }) {
  const { id } = params
  const { name, content } = await req.json()
  const pool = await connectDB()

  try {
    await pool.query(
      'INSERT INTO reviewservice (name, content, tour_id, is_visible, created_at) VALUES (?, ?, ?, 0, NOW())',
      [name, content, id]
    )
    return NextResponse.json({ message: 'Đánh giá đã được gửi. Chờ phê duyệt.' })
  } catch (error) {
    console.error('Lỗi khi gửi đánh giá:', error)
    return NextResponse.json({ message: 'Lỗi khi gửi đánh giá' }, { status: 500 })
  }
}
