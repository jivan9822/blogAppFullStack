const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title for blog!'],
    },
    text: {
      type: String,
      required: [true, 'Please provide a text for blog!'],
    },
    url: {
      type: String,
      required: [true, 'Please provide a url for blog!'],
    },
    publishAt: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'blogId',
  localField: '_id',
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
