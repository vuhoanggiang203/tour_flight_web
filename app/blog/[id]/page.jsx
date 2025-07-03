"use client";
import React from "react";

export default function BlogDetail({ params }) {
  const { id } = React.use(params);
  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Không thể tải bài viết");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-600">
        Đang tải bài viết...
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center text-red-600">
        Lỗi: {error}
      </main>
    );
  }

  // Hàm chuyển đổi ngày giờ sang múi giờ Việt Nam và định dạng đẹp
  function formatVietnamDate(dateString) {
    if (!dateString) return "Không rõ";
    const date = new Date(dateString);
    // Chuyển sang múi giờ Việt Nam (UTC+7)
    const vnDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return vnDate.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">
        {blog.title}
      </h1>

      <img
        src={`/image/` + blog.image_url}
        alt="Ảnh minh họa cho bài viết"
        className="w-full h-64 object-cover rounded-lg mb-6 shadow"
      />

      <p className="text-sm text-gray-500 italic mb-6">
        📅 Ngày đăng: {formatVietnamDate(blog.created_at)}
      </p>

     <article className="prose prose-lg text-gray-800">
  {blog.content
    .split(/\r?\n/)        // Tách theo dòng
    .filter(line => line.trim() !== '') // Bỏ dòng trống
    .map((line, i) => (
      <p key={i}>{line}</p>
    ))
  }
</article>




      <a
        href="/blog"
        className="inline-block mt-8 text-blue-600 hover:underline text-sm"
      >
        ← Quay lại danh sách blog
      </a>
    </main>
  );
}
