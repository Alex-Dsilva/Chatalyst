const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const LikeModel = mongoose.model('Like', likeSchema);

module.exports = LikeModel;
