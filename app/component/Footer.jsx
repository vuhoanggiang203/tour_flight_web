'use client'
import { instagram,facebook,youtube,twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-white to-pink-100 text-gray-700 py-10 border-t">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-start">
        
        {/* Logo + Mô tả */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-black mb-4">Jadoo</h2>
          <p className="text-sm text-gray-500">
          Khám phá những chuyến đi trong mơ của bạn cùng chúng tôi — đặt vé nhanh chóng, tận hưởng những
           chuyến đi tuyệt vời và tiết kiệm thời gian và tiền bạc
          </p>
        </div>

        {/* Company */}
        <div className="w-1/2 sm:w-1/4 mb-8 md:mb-0">
          <h3 className="font-semibold text-gray-900 mb-4">Côny ty chúng tôi</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:underline">Về chúng tôi</Link></li>
            <li><Link href="/mobile" className="hover:underline">Điện Thoại</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-1/2 sm:w-1/4 mb-8 md:mb-0">
          <h3 className="font-semibold text-gray-900 mb-4">Liên Hệ</h3>
          <ul className="space-y-2">
            <li><Link href="/help" className="hover:underline">Trợ giúp</Link></li>
            <li><Link href="/press" className="hover:underline">Nhấn</Link></li>
            <li><Link href="/affiliates" className="hover:underline">Các chi nhánh</Link></li>
          </ul>
        </div>

        
          {/* Mạng xã hội */}
          <div className="flex space-x-4 mt-6">
            <Link href="https://www.facebook.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  ><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </Link>
            <Link href="https://www.instagram.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"   ><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </Link>
            <Link href="https://www.youtube.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"   ><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </Link>
            <Link href="https://www.twitter.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"   ><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Link>
          </div>

          

        </div>
        <div className="container mx-auto text-center mt-10 mb-0 ">
        <p className="text-sm">
          © {new Date().getFullYear()} Trang web của tôi. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  )
}
