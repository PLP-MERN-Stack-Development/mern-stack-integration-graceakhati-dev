import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await postsAPI.getById(id);
      
      // Check if user is the author
      if (user && user.id !== data.author._id) {
        setError('You do not have permission to edit this post');
        return;
      }
      
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

  const handleSuccess = (updatedPost) => {
    if (updatedPost) {
      // Navigate to the updated post
      navigate(`/posts/${id}`);
    } else {
      // Cancel - navigate back
      navigate(`/posts/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center py-12">
          <div className="text-amber-700 text-lg">Loading post...</div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-pink-600 hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-amber-900">Edit Post</h1>
      
      {error && (
        <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <PostForm
        postId={id}
        initialData={post}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default EditPostPage;

