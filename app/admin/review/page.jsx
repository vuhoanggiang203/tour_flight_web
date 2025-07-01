'use client';

import { useEffect, useState } from 'react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch('/api/reviewservice')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        const visible = data.find(r => r.is_visible);
        if (visible) setSelectedId(visible.id);
      });
  }, []);

  const handleSelect = async (id) => {
    setSelectedId(id);

    // Đặt tất cả review is_visible = false, sau đó bật cái được chọn
    await fetch('/api/reviewservice/set-visible', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    // Làm mới danh sách
    const res = await fetch('/api/reviewservice');
    const data = await res.json();
    setReviews(data);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý Review hiển thị ngoài trang chủ</h1>
      <ul className="space-y-4">
        {reviews.map(review => (
          <li key={review.id} className="flex items-start gap-4 p-4 border rounded-lg">
            <input
              type="radio"
              name="selectedReview"
              value={review.id}
              checked={selectedId === review.id}
              onChange={() => handleSelect(review.id)}
              className="mt-1"
            />
            <div>
              <h3 className="font-semibold">{review.name}</h3>
              <p className="text-gray-700">{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
