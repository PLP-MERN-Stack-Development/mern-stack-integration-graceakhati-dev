import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import PostCard from '../components/PostCard';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await postsAPI.getAll();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-amber-900">Welcome to Her Blog</h1>
        <p className="text-amber-700">Discover amazing blog posts</p>
      </div>

      {error && (
        <div className="bg-pink-100 border border-pink-400 text-pink-800 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="text-amber-700 text-lg">Loading posts...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-amber-100">
            <div className="text-amber-800 text-lg mb-4 font-semibold">No posts yet.</div>
            <p className="text-amber-600">Be the first to create a post!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;

