const { Router } = require('express');
const blogPosts = require('../controllers/post.controller');
const {
  authenticationController: { tokenValidation } } = require('../controllers/login.controller');

const posts = Router();

posts.post('/', tokenValidation, blogPosts.post.create);
posts.get('/', tokenValidation, blogPosts.get.all);
posts.get('/search', tokenValidation, blogPosts.get.search);
posts.get('/:id', tokenValidation, blogPosts.get.one);
posts.put('/:id', tokenValidation, blogPosts.put.edit);
posts.delete('/:id', tokenValidation, blogPosts.delete.one);

module.exports = posts;
