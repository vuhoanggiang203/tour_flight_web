'use client';
import { useState } from 'react';
import { Mail, CheckCircle, AlertTriangle } from 'lucide-react'; // Nếu bạn dùng Lucide icons

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: abc@example.com).');
      setShowErrorModal(true);
      return;
    }

    const res = await fetch('/api/subcribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    setShowModal(true);
    setEmail('');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/image/newsletter-bg.jpg')" }} // Thêm hình nền tùy ý
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-800">Đăng ký nhận tin</h1>
        <p className="text-center text-gray-600 text-sm">Nhận các ưu đãi du lịch và tin tức mới nhất qua email.</p>

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Vui lòng nhập đúng định dạng email (ví dụ: abc@example.com)"
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold cursor-pointer py-3 rounded-lg transition duration-300"
        >
          Đăng ký để nhận ưu đãi mới nhất
        </button>
      </form>

      {/* Modal Thành công */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
            <CheckCircle className="mx-auto text-green-500 w-10 h-10 mb-2" />
            <h2 className="text-2xl font-bold mb-2 text-green-700">Đăng ký thành công!</h2>
            <p className="text-gray-700 mb-4">Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md transition duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Modal Lỗi */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center">
            <AlertTriangle className="mx-auto text-red-500 w-10 h-10 mb-2" />
            <h2 className="text-xl font-bold mb-2 text-red-600">Lỗi</h2>
            <p className="text-gray-700">{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
