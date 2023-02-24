const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  time: {
    type: String,
  },
  like: {
    type: Number,
    default: 0,
  },
  disLike: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    required: [true, 'Please provide a valid comment'],
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
