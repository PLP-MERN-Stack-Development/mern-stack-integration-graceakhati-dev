import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

function CreatePostPage() {
  const navigate = useNavigate();

  const handleSuccess = (post) => {
    if (post) {
      // Navigate to the newly created post
      navigate(`/posts/${post._id}`);
    } else {
      // Cancel - navigate back
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-amber-900 text-center">Create New Post</h1>
      <PostForm onSuccess={handleSuccess} />
    </div>
  );
}

export default CreatePostPage;

