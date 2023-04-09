const PostModel = require('../models/post.model');
const LikeModel = require('../models/like.model');

const CreatePost=(req, res) => {
    const { user_id, content } = req.body;

    const newPost = new PostModel({
      user_id, content
    });

    newPost
    .save()
    .then(savedPost => {
      res.status(200).json(savedPost);
    })
    .catch(error => res.status(401).json({ message: error }));
  }


  const GetPost=(req, res)=>{
    PostModel.find().then(post =>{
      res.status(200).json(post);
    })
    .catch(error => res.status(401).json({ message: error }));
  }


  const GetpostById = (req, res) => {
    const { id } = req.params;
  
    PostModel.findById(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
  
        res.status(200).json(post);
      })
      .catch(error => res.status(401).json({ message: error }));
  }  

  const UpdatePost = (req, res) => {
    const updates = req.body;
    const { id } = req.params;
  
    updates.updated_at = Date.now();
  
    PostModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    })
    .catch(error => res.status(401).json({ message: error }));
  }

  const DeletePostById = (req, res) => {
    const { id } = req.params;
  
    PostModel.findByIdAndDelete(id)
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
  
        res.status(200).json({ message: 'User Post Deleted'});
      })
      .catch(error => res.status(401).json({ message: error }));
  }

  const TotalPost =(req, res)=>{
    PostModel.count()
    .then(count => {
      return res.status(200).send({ count });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
  }

  const TopUser=(req, res) => {
    PostModel.aggregate([
      { $lookup: { from: 'posts', localField: '_id', foreignField: 'user_id', as: 'posts' } },
      { $project: { _id: 1, name: 1, email: 1, bio: 1, created_at: 1, updated_at: 1, post_count: { $size: '$posts' } } },
      { $sort: { post_count: -1 } },
      { $limit: 5 }
    ])
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  }

  const LikePost=(req, res)=>{
    const { id } = req.params;
    const userId = req.body.user_id;
  
    LikeModel.findOne({ post_id: id, user_id: userId })
      .then(like => {
        if (like) {
          return LikeModel.findByIdAndDelete(like._id).then(() => {
            return PostModel.findByIdAndUpdate(
              id,
              { $inc: { likes: -1 } },
              { new: true, runValidators: true }
            );
          });
        } else {
          const newLike = new LikeModel({ post_id: id, user_id: userId });
          return newLike.save().then(() => {
            return PostModel.findByIdAndUpdate(
              id,
              { $inc: { likes: 1 } },
              { new: true, runValidators: true }
            );
          });
        }
      })
      .then(post => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
      })
      .catch(error => res.status(500).json({ message: error.message }));
  };

  const TopLike=(req, res)=>{

    PostModel.find().sort({ likes: -1 }).limit(5)
    .then(posts=>{
      res.status(200).json(posts);
    })
    .catch(error => res.status(500).json({ message: error.message }));
  }

 
  module.exports = {CreatePost, GetpostById, GetPost, UpdatePost, DeletePostById, TotalPost, LikePost, TopLike}