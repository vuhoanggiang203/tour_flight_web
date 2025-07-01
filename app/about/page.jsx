// app/about/page.jsx (or pages/about.jsx if you're using the pages directory)
'use client';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: 'url("/image/banner-2.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">Về Chúng Tôi</h1>
          <p className="text-lg md:text-xl max-w-2xl animate-fade-in-up">
            Hành trình của bạn bắt đầu từ đây. Chúng tôi biến ước mơ du lịch thành hiện thực.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Mission Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8 animate-fade-in">Sứ Mệnh Của Chúng Tôi</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center animate-slide-in-left">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <p className="text-lg leading-relaxed mb-4">
                Tại Jadoo, sứ mệnh của chúng tôi là mang đến cho bạn trải nghiệm du lịch và đặt vé máy bay không chỉ thuận tiện mà còn đáng nhớ. Chúng tôi tin rằng mọi hành trình đều nên là một cuộc phiêu lưu, và chúng tôi ở đây để giúp bạn biến những ước mơ đó thành hiện thực.
              </p>
              <p className="text-lg leading-relaxed">
                Chúng tôi cam kết cung cấp các lựa chọn vé máy bay đa dạng, gói tour du lịch hấp dẫn và dịch vụ khách hàng tận tâm, đảm bảo bạn có một chuyến đi suôn sẻ từ lúc lên kế hoạch đến khi trở về nhà.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center max-h-96 ">
              <Image
                src="/image/hans-vivek-v3qpJvlEE4s-unsplash.jpg"
                alt="Our Mission"
                width={350}
                height={150}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Story/History Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8 ">Câu Chuyện Của Chúng Tôi</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col md:flex-row-reverse items-center ">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <p className="text-lg leading-relaxed mb-4">
                Được thành lập vào 2016, Jaddoo bắt đầu với một nhóm những người đam mê du lịch với mong muốn đơn giản: làm cho việc khám phá thế giới trở nên dễ dàng và thú vị hơn cho mọi người. Từ những ngày đầu, chúng tôi đã không ngừng phát triển và đổi mới.
              </p>
              <p className="text-lg leading-relaxed">
                Chúng tôi đã vượt qua nhiều thử thách, học hỏi từ mỗi trải nghiệm và không ngừng cải thiện dịch vụ để trở thành đối tác đáng tin cậy của hàng ngàn du khách trên khắp thế giới.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center max-h-96">
              <Image
                src="/image/pablo-pacheco-mBRFbzDNmNg-unsplash.jpg"
                alt="Our Story"
                width={500}
                height={300}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8 animate-fade-in">Tại Sao Chọn Chúng Tôi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           
            <div className="bg-white rounded-lg shadow-lg p-6 
            transition duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl "> 
              <div className="text-5xl text-blue-500 mb-4">✈️</div>
              <h3 className="text-xl font-semibold mb-2">Giá Tốt Nhất</h3>
              <p className="text-gray-600">Chúng tôi cam kết mang đến những ưu đãi vé máy bay và tour du lịch cạnh tranh nhất.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6  delay-150
            transition duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl ">
              <div className="text-5xl text-green-500 mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Dịch Vụ Tận Tâm</h3>
              <p className="text-gray-600">Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng 24/7 để giúp đỡ bạn.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6  delay-300
            transition duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl ">
              <div className="text-5xl text-purple-500 mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Bảo Mật & Tin Cậy</h3>
              <p className="text-gray-600">Hệ thống thanh toán an toàn và thông tin cá nhân của bạn luôn được bảo vệ.</p>
            </div>
          </div>
        </section>

        {/* Team Section (Optional) */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8 animate-fade-in">Gặp Gỡ Đội Ngũ Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center animate-fade-in-up
            transition duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl hover:bg-blue-50 hover:text-blue-800">
              <Image
                src="/image/avt1.jpg"
                alt="John Doe"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
              />
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-blue-600 font-medium">Giám đốc& Đồng sáng lập</p>
              <p className="text-gray-600 mt-2">Với hơn 15 năm kinh nghiệm trong ngành du lịch.</p>
            </div>
            {/* Example Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center animate-fade-in-up
            transition duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl hover:bg-blue-50 hover:text-blue-800">
              <Image
                src="/image/avt2.jpg"
                alt="Jane Smith"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
              />
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-blue-600 font-medium">Giám đốc điều hành</p>
              <p className="text-gray-600 mt-2">Đảm bảo mọi chuyến đi diễn ra suôn sẻ và hiệu quả.</p>
            </div>
            {/* Example Team Member 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center animate-fade-in-up
            transition duration-300 ease-in-out
            hover:scale-105 hover:shadow-xl hover:bg-blue-50 hover:text-blue-800">
              <Image
                src="/image/avt2.jpg"
                alt="Peter Jones"
                width={150}
               height={150}
                className="rounded-full mx-auto mb-4 object-cover w-32 h-32   " // Giới hạn kích thước ảnh
              />
              <h3 className="text-xl font-semibold mb-2">Peter Jones</h3>
              <p className="text-blue-600 font-medium">Trưởng phòng nhân sự</p>
              <p className="text-gray-600 mt-2">Luôn lắng nghe và giải quyết mọi thắc mắc của khách hàng.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Call to Action Section */}
      <section className="bg-blue-800 text-white py-12 text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn Sàng Cho Chuyến Phiêu Lưu Tiếp Theo?</h2>
        <p className="text-lg md:text-xl mb-8">Hãy để chúng tôi giúp bạn lập kế hoạch cho hành trình đáng nhớ!</p>
        <a
          href="/flight"
          // Thêm hover:bg-blue-600 và hover:text-white để thay đổi màu nền và chữ khi hover
          className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full text-lg
          transition duration-300 ease-in-out
          hover:bg-blue-600 hover:text-white hover:shadow-lg" // Thêm shadow khi hover
        >
          Tìm Chuyến Bay Ngay
        </a>
      </section>

 
    
    </div>
  );
}