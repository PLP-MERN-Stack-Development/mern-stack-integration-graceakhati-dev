import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { commentsAPI } from '../services/api';

function CommentsSection({ postId }) {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Fetch comments on mount and when postId changes
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setFetching(true);
      const data = await commentsAPI.getByPostId(postId);
      setComments(data);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setError('');
    setLoading(true);

    try {
      const comment = await commentsAPI.create(postId, newComment.trim());
      setComments([comment, ...comments]); // Add new comment at the beginning
      setNewComment('');
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to add comment. Please try again.'
      );
    } finally {
      setLoading(false);
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

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6 text-amber-900">Comments ({comments.length})</h3>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-amber-100">
          {error && (
            <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="flex space-x-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="flex-1 px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-vertical bg-white text-amber-900"
              required
            />
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-pink-400 disabled:cursor-not-allowed transition-colors self-start shadow-md font-medium"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-center text-amber-800">
          <p>
            Please{' '}
            <a href="/login" className="text-pink-600 hover:underline font-medium">
              login
            </a>{' '}
            to add a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      {fetching ? (
        <div className="text-center text-amber-700 py-8">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center text-amber-700 py-8 bg-white rounded-xl p-6 border border-amber-100">No comments yet. Be the first to comment!</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-amber-900">
                    {comment.author?.username || 'Unknown'}
                  </span>
                  {comment.author?.email && (
                    <span className="text-amber-600 text-sm ml-2">
                      ({comment.author.email})
                    </span>
                  )}
                </div>
                <span className="text-amber-600 text-sm">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-amber-800 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsSection;

