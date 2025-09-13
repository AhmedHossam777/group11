const express = require('express');
const { createPost, getAllPosts, getOnePost, updatePost, deletePost } = require('../controllers/postController');
const { auth } = require('../middlewares/authMiddleware');

const postRouter = express.Router();

postRouter.route('/')
	.get(getAllPosts)
	.post(createPost);

postRouter.route('/:id')
	.get( getOnePost)
	.patch( updatePost)
	.delete( deletePost);

module.exports = postRouter;