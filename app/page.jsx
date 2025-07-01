'use client';
import './globals.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import TourListPreview from './component/home/TopTourPreview';
import CustomerTestimonials from './component/home/CustomerTestimonials';
import FeatureHighlights from './component/home/FeatureHighlights';
import NewsletterSignup from './component/home/NewsletterSignup';
import FeaturedBlogs from './component/home/FeaturedBlogs';

const bannerImages = [
  '/image/banner1.jpg',
  '/image/banner-2.jpg',
  '/image/bannner-3.jpg',
  '/image/banner-4.jpg',
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval); // Clear on unmount
  }, []);

  return (
    <>
      {/* Hero Section with Auto Banner */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Images with Fade Effect */}
        {bannerImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            width={1920}
            height={1080}
            alt={`Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-20" />

        {/* Text Content */}
        <div className="absolute top-1/3 left-12 max-w-xl text-white z-30">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Lên kế hoạch cho chuyến đi của bạn <br />
          </h1>
          <p className="mb-6 text-lg">Trải nghiệm chỉ có một lần trong đời!</p>
          <a
            href="/tour"
            className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 hover:text-white transition inline-block"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </section>

      <TourListPreview />
      <FeatureHighlights />
      <CustomerTestimonials />
      <FeaturedBlogs />
      <NewsletterSignup />
    </>
  );
};

export default Home;
