const express = require('express');
const { addComment, listComments } = require('../controllers/commentsController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/comments/:postId (protected)
router.post('/:postId', auth, addComment);

// GET /api/comments/:postId (public)
router.get('/:postId', listComments);

module.exports = router;

