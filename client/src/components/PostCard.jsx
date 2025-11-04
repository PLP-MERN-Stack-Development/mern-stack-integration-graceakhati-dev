import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Truncate content
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100">
      {/* Post Image */}
      {post.image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Post Title */}
        <Link to={`/posts/${post._id}`}>
          <h2 className="text-2xl font-bold text-amber-900 mb-2 hover:text-pink-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Post Content Preview */}
        <p className="text-amber-800 mb-4 line-clamp-3">{truncateContent(post.content)}</p>

        {/* Post Meta Info */}
        <div className="flex items-center justify-between text-sm text-amber-700">
          <div className="flex items-center space-x-4">
            {/* Author */}
            <span>
              By{' '}
              <span className="font-semibold text-amber-900">
                {post.author?.username || 'Unknown'}
              </span>
            </span>
            {/* Date */}
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Read More Link */}
        <Link
          to={`/posts/${post._id}`}
          className="inline-block mt-4 text-pink-600 hover:text-pink-700 font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;

