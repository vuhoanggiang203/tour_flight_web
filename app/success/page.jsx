'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-white px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />
        <h1 className="text-2xl font-bold mt-4 text-gray-800">Đặt chỗ thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn tin tưởng và sử dụng {` `}
          <span className="font-medium text-blue-600">dịch vụ của chúng tôi. </span> 
           Thông tin chi tiết đã được gửi tới email của bạn.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  )
}
