const UserModel = require('../models/user.model');

const CreateUser=(req, res) => {
    const { name, email, bio, profile  } = req.body;
  
    UserModel.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(409).json({ message: 'Email already exists' });
        }
        const newUser = new UserModel(req.body);
        return newUser.save();
      })
      .then(savedUser => {
        res.status(200).json(savedUser);
      })
      .catch(error => res.status(401).json({ message: error }));
  }

  const LoginUser=(req,res)=>{
    const {email} = req.body;
    
    UserModel.find({email:email})
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json(user)
      })
      .catch(error => res.status(401).json({ message: error }));
  }

  const GetUserById = (req, res) => {
    const { id } = req.params;
  
    UserModel.findById(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json(user);
      })
      .catch(error => res.status(401).json({ message: error }));
  }  

  const UpdateUser = (req, res) => {
    const updates = req.body;
    const { id } = req.params;
  
    updates.updated_at = Date.now();
  
    UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    })
    .catch(error => res.status(401).json({ message: error }));
  }

  const DeleteUserById = (req, res) => {
    const { id } = req.params;
  
    UserModel.findByIdAndDelete(id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: 'User Profile Deleted'});
      })
      .catch(error => res.status(401).json({ message: error }));
  }

  const TotalUser =(req, res)=>{
    UserModel.count()
    .then(count => {
      return res.status(200).send({ count });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
  }

  const TopUser=(req, res) => {
    UserModel.aggregate([
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

 
  module.exports = {CreateUser, GetUserById, LoginUser, UpdateUser, DeleteUserById, TotalUser, TopUser}