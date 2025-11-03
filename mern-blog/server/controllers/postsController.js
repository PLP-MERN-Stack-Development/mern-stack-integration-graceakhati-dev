const Post = require('../models/Post');

// GET /api/posts
async function listPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to list posts', error: error.message });
  }
}

// GET /api/posts/:id
async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author', 'username email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get post', error: error.message });
  }
}

// POST /api/posts (protected)
async function createPost(req, res) {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : (image || null);

    const post = await Post.create({
      title,
      content,
      image: imageUrl,
      author: req.user.id,
    });

    const populated = await post.populate('author', 'username email');

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
}

// PUT /api/posts/:id (author only)
async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    } else if (image !== undefined) {
      post.image = image;
    }

    await post.save();

    const populated = await post.populate('author', 'username email');

    return res.status(200).json(populated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
}

// DELETE /api/posts/:id (author only)
async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await post.deleteOne();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
}

module.exports = {
  listPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
