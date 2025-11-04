const Comment = require('../models/Comment');
const Post = require('../models/Post');

// POST /api/comments/:postId (protected)
async function addComment(req, res) {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: req.user.id,
      post: postId,
    });

    const populated = await comment.populate('author', 'username email');

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create comment', error: error.message });
  }
}

// GET /api/comments/:postId
async function listComments(req, res) {
  try {
    const { postId } = req.params;

    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ post: postId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 }); // Newest first

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to list comments', error: error.message });
  }
}

module.exports = {
  addComment,
  listComments,
};

