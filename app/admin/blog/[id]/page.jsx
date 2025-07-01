'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        setBlog(data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu blog:', err);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  if (!blog) return (
    <div className="text-center py-20 text-gray-500">
      Đang tải bài viết...
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">
        {blog.title}
      </h1>

      <p className="text-sm text-gray-500 mb-4 italic">
        Slug: <span className="text-blue-600">{blog.slug}</span>
      </p>

      {blog.image_url && (
        <img
          src={`/image/${blog.image_url}`}
          alt="Ảnh bài viết"
          loading="lazy"
          className="mb-6 w-full h-auto rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
        />
      )}

      <article className="prose prose-blue prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
}
