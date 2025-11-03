const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [1, 'Content cannot be empty'],
    },
    image: {
      type: String,
      default: null, // Optional image URL
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create index on author for faster queries
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 }); // Index for sorting by newest first

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

