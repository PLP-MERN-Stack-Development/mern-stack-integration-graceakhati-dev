import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CommentsSection from '../components/CommentsSection';

function SinglePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await postsAPI.getById(id);
      setPost(data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? 'Post not found'
          : 'Failed to load post. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setDeleting(true);
      await postsAPI.delete(id);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to delete post. Please try again.'
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isAuthor = user && post && user.id === post.author._id;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <div className="text-amber-700 text-lg">Loading post...</div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
        <Link to="/" className="text-pink-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to Home Link */}
      <Link
        to="/"
        className="inline-block mb-6 text-pink-600 hover:text-pink-700 font-medium"
      >
        ← Back to Home
      </Link>

      {error && (
        <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Post Content */}
      <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-amber-100">
        {/* Post Image */}
        {post.image && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={`http://localhost:5000${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {/* Post Title */}
          <h1 className="text-4xl font-bold text-amber-900 mb-4">{post.title}</h1>

          {/* Post Meta */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-200">
            <div className="flex items-center space-x-4 text-sm text-amber-700">
              <span>
                By{' '}
                <span className="font-semibold text-amber-900">
                  {post.author?.username || 'Unknown'}
                </span>
              </span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              {post.updatedAt !== post.createdAt && (
                <>
                  <span>•</span>
                  <span className="text-amber-600">Updated {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>

            {/* Edit/Delete Buttons (Author Only) */}
            {isAuthor && (
              <div className="flex space-x-2">
                <Link
                  to={`/edit/${post._id}`}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm shadow-md"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors text-sm disabled:bg-amber-400 disabled:cursor-not-allowed shadow-md"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="prose max-w-none">
            <p className="text-amber-800 whitespace-pre-wrap leading-relaxed text-lg">
              {post.content}
            </p>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <CommentsSection postId={id} />
    </div>
  );
}

export default SinglePostPage;

