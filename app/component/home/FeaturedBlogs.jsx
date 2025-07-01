'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog?limit=3')
        const data = await res.json()
        setBlogs(data)
      } catch (error) {
        console.error('Failed to fetch featured blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center"> Bài viết nổi bật</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <img
              src={`/image/${blog.image_url}`}
              alt={blog.title}
              className="w-full h-48 object-cover transition duration-300 hover:opacity-90"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition duration-200">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {blog.content.slice(0, 100)}...
              </p>
              <Link
                href={`/blog/${blog.id}`}
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition duration-300"
              >
                Đọc thêm →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
        >
          Xem tất cả bài viết
        </Link>
      </div>
    </section>
  )
}
