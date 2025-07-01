// app/blog/page.jsx
import connectDB from '@/app/lib/db'
import Link from 'next/link'

export default async function BlogPage({ searchParams }) {
  const currentPage = parseInt(searchParams.page) || 1
  const limit = 6
  const offset = (currentPage - 1) * limit

  const pool = await connectDB()

  // Lấy tổng số bài viết
  const [countRows] = await pool.query('SELECT COUNT(*) as total FROM blogposts')
  const totalBlogs = countRows[0].total
  const totalPages = Math.ceil(totalBlogs / limit)

  // Lấy danh sách bài viết theo trang
  const [blogs] = await pool.query(
    'SELECT id, title, slug, content, image_url, created_at FROM blogposts ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Tất cả bài viết</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {blogs.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl hover:ring-2 hover:ring-blue-400"
          >
            <img
              src={`/image/${blog.image_url}`}
              alt={blog.title}
              className="w-full h-48 object-cover hover:opacity-90 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.content.slice(0, 100)}...
              </p>
              <Link
                href={`/blog/${blog.id}`}
                className="inline-block mt-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 transition-colors duration-300 px-4 py-2 rounded-md shadow-sm hover:shadow-md"
              >
                Xem chi tiết →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}`}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
