// app/api/aviation/route.js
import axios from "axios";

export async function GET(a) {
  try {
    // /api/aviation?page=1&size=6&from=hee&to=ádá,jd&date=11/22/25
    console.log("uuiiaa", a)
    // CHỖ này cần lấy ra được query params trên url gửi lên
    // sau đó sẽ truyền nó vào url bên dưới này
    const response = await axios.get("http://api.aviationstack.com/v1/flights", {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY
      },
    });
    
    return Response.json(response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.response?.data || error.message);
    return new Response(JSON.stringify({ error: "Lỗi khi lấy dữ liệu chuyến bay" }), { status: 500 });
  }
}