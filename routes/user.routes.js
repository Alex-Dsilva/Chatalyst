const express = require('express')
const { GetUserById, CreateUser, LoginUser, UpdateUser, DeleteUserById, TotalUser} = require('../controllers/user.controller')



//router object 
const UserRouter =express.Router()

UserRouter.post('/', CreateUser );
UserRouter.get('/login', LoginUser );
UserRouter.get('/:id', GetUserById);
UserRouter.put('/:id', UpdateUser);
UserRouter.delete('/:id', DeleteUserById)

module.exports = UserRouter