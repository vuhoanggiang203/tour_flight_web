'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image_url: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/blog/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error('Lỗi khi fetch blog:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setUploading(true);
    setUploadError(null);

    const imageData = new FormData();
    imageData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: imageData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', errorText || 'Unknown error');
        setUploadError('Không thể tải ảnh lên.');
        setUploading(false);
        return;
      }

      const result = await response.json();
      setFormData(prev => ({ ...prev, image_url: result.filename }));
      setUploading(false);
    } catch (err) {
      console.error('Lỗi mạng:', err);
      setUploadError('Lỗi mạng khi tải ảnh.');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cập nhật blog thành công!');
        router.push('/admin/blog');
      } else {
        const errorData = await response.json();
        console.error('Lỗi khi cập nhật blog:', errorData);
        alert('Đã xảy ra lỗi khi cập nhật blog.');
      }
    } catch (err) {
      console.error('Lỗi mạng:', err);
      alert('Lỗi mạng khi cập nhật blog.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tiêu đề</label>
          <input
          maxLength={100}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ảnh</label>
          <input type="file" onChange={handleImageChange} className="w-full"  />
          {uploading && <p className="text-yellow-500 text-sm mt-1">Đang tải ảnh...</p>}
          {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
          {previewImage && !uploadError && (
            <img src={previewImage} alt="Xem trước" className="mt-2 rounded w-full" />
          )}
          {formData.image_url && !previewImage && !uploadError && (
            <img src={`/image/${formData.image_url}`} alt="Hiện tại" className="mt-2 rounded w-full" />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nội dung</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border p-2 rounded min-h-[200px]"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}
