'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
      <h2 className="text-3xl font-bold mb-6 text-center">Bài viết nổi bật</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden">
            <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{blog.content.slice(0, 100)}...</p>
              <Link href={`/blog/${blog.slug}`} className="text-blue-600 hover:underline text-sm">
                Đọc thêm →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/blog" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Xem tất cả bài viết
        </Link>
      </div>
    </section>
  )
}
