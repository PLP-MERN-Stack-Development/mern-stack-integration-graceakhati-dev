import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';

function PostForm({ postId = null, initialData = null, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        image: null,
      });
      if (initialData.image) {
        setImagePreview(`http://localhost:5000${initialData.image}`);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (postId) {
        // Update existing post
        response = await postsAPI.update(postId, formData);
      } else {
        // Create new post
        response = await postsAPI.create(formData);
      }

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to save post. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-amber-100">
      {error && (
        <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-amber-900 font-medium mb-2">
          Title <span className="text-pink-600">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-amber-900"
          placeholder="Enter post title"
        />
      </div>

      {/* Content Textarea */}
      <div>
        <label htmlFor="content" className="block text-amber-900 font-medium mb-2">
          Content <span className="text-pink-600">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-vertical bg-white text-amber-900"
          placeholder="Write your post content here..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-amber-900 font-medium mb-2">
          Image (Optional)
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white"
        />
        <p className="text-sm text-amber-700 mt-1">
          Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
        </p>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4 relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border-2 border-amber-200"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600 transition-colors shadow-md"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-pink-400 disabled:cursor-not-allowed transition-colors shadow-md font-medium"
        >
          {loading ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
        </button>
        {onSuccess && (
          <button
            type="button"
            onClick={() => onSuccess(null)}
            className="bg-amber-200 text-amber-900 px-6 py-2 rounded-lg hover:bg-amber-300 transition-colors shadow-md font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PostForm;

