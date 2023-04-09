const express = require('express')
const {CreatePost, GetPost,  GetpostById, UpdatePost, DeletePostById, LikePost } = require('../controllers/post.controller')



//router object 
const PostRouter =express.Router()

PostRouter.post('/', CreatePost );
PostRouter.get('/', GetPost );
PostRouter.post('/:id/like', LikePost );
PostRouter.post('/:id/unlike', LikePost );
PostRouter.get('/:id', GetpostById);
PostRouter.put('/:id', UpdatePost);
PostRouter.delete('/:id', DeletePostById);

module.exports = PostRouter