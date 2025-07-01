'use client'

import { useEffect, useState } from 'react'

export default function ReviewSection({ tourId }) {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/tour/${tourId}/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => setError('Không thể tải đánh giá'))
      .finally(() => setLoading(false))
  }, [tourId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!name || !content) {
      setError('Vui lòng nhập tên và nội dung đánh giá.')
      return
    }

    try {
      const res = await fetch(`/api/tour/${tourId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.message || 'Lỗi gửi đánh giá.')

      setSuccess('🎉 Cảm ơn bạn! Đánh giá của bạn đang chờ xét duyệt.')
      setName('')
      setContent('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl mt-16 border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700">📣 Đánh giá Tour</h2>

      {loading ? (
        <p className="text-gray-500">Đang tải đánh giá...</p>
      ) : reviews.length > 0 ? (
        <ul className="space-y-6 mb-8">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg border border-gray-200"
            >
              <p className="text-gray-800 font-semibold text-base mb-2">👤 {review.name}</p>
              <blockquote className="italic text-gray-600 relative pl-6 before:content-['“'] before:absolute before:left-0 before:text-2xl before:text-blue-400">
                {review.content}
              </blockquote>
              <p className="text-xs text-gray-400 mt-2">
                🕒 {new Date(review.created_at).toLocaleString('vi-VN')}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-6">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        <input
          type="text"
          placeholder="Tên của bạn"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Viết đánh giá của bạn..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow hover:shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
        >
          ✍️ Gửi đánh giá
        </button>
      </form>
    </div>
  )
}
