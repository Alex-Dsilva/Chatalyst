const express = require('express')
const {TotalUser, TopUser} = require('../controllers/user.controller')
const {TotalPost, TopLike} = require('../controllers/post.controller')

const AnalyticsRouter =express.Router()

AnalyticsRouter.get('/users', TotalUser );
AnalyticsRouter.get('/users/top-active', TopUser );
AnalyticsRouter.get('/posts', TotalPost );
AnalyticsRouter.get('/posts/top-liked', TopLike );

module.exports = AnalyticsRouter