// app/api/reviewservice/route.js
import { NextResponse } from 'next/server';
import connectDB  from '@/app/lib/db';

export async function GET() {
  try {
    const pool = await connectDB();
    const [rows] = await pool.query('SELECT * FROM reviewservice');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
