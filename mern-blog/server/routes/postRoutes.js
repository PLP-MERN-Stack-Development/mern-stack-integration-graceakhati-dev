const express = require('express');
const { listPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postsController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', listPosts);
router.get('/:id', getPostById);

// Protected routes with upload
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, upload.single('image'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
