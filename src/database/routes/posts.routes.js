const { Router } = require('express');
const blogPosts = require('../controllers/post.controller');
const {
  authenticationController: { tokenValidation } } = require('../controllers/login.controller');

const posts = Router();

//  posts.get('/', tokenValidation, blogPosts.post.);
posts.post('/', tokenValidation, blogPosts.post.create);

module.exports = posts;
