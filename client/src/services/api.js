import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to check if data is FormData
const isFormData = (data) => data instanceof FormData;

// Request interceptor - attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // If FormData, let axios set Content-Type with boundary
    if (isFormData(config.data)) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optionally redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

// ==================== POSTS API ====================

export const postsAPI = {
  // Get all posts
  getAll: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Get single post by ID
  getById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create new post (requires auth)
  create: async (postData) => {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    // Don't set Content-Type manually - let axios set it with boundary
    const response = await api.post('/posts', formData);
    return response.data;
  },

  // Update post (requires auth, author only)
  update: async (id, postData) => {
    const formData = new FormData();
    if (postData.title !== undefined) {
      formData.append('title', postData.title);
    }
    if (postData.content !== undefined) {
      formData.append('content', postData.content);
    }
    if (postData.image) {
      formData.append('image', postData.image);
    }

    // Don't set Content-Type manually - let axios set it with boundary
    const response = await api.put(`/posts/${id}`, formData);
    return response.data;
  },

  // Delete post (requires auth, author only)
  delete: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};

// ==================== COMMENTS API ====================

export const commentsAPI = {
  // Get all comments for a post
  getByPostId: async (postId) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  },

  // Add comment to a post (requires auth)
  create: async (postId, content) => {
    const response = await api.post(`/comments/${postId}`, { content });
    return response.data;
  },
};

export default api;
