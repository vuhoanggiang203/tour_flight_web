// components/ReviewSlider.jsx
'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviewservice')
      .then(res => res.json())
      .then(data => {
        const visibleReviews = data.filter(review => review.is_visible);
        setReviews(visibleReviews);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Swiper spaceBetween={30} slidesPerView={1} loop>
        {reviews.map(review => (
          <SwiperSlide key={review.id}>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <p className="mt-2 text-gray-600 italic">"{review.content}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
