"use client";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
  if (!blog) {
    return null; // Return null if blog data is not available
  }
  

  return (
    <Link href={`/blog/${blog.slug}`} className="block rounded shadow hover:shadow-lg transition overflow-hidden bg-white">
      <Image
        src="/image/halong-blog.jpg"
        alt={blog.title}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 text-blue-700">{blog.title}</h2>
        <p className="text-gray-600 text-sm">{blog.excerpt}</p>
        <p className="text-sm text-gray-400 mt-2">{new Date(blog.date).toLocaleDateString()}</p>
      </div>
      
    </Link>
  );
}
