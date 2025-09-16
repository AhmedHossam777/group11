const express = require( 'express' );
const {
	getMyPosts,
	createPost,
	getAllPosts,
	getOnePost,
	updatePost,
	deletePost,
} = require( '../controllers/postController' );
const {auth} = require( '../middlewares/authMiddleware' );

const postRouter = express.Router();

postRouter.route( '/' )
	.get( getAllPosts )
	.post( auth, createPost );

postRouter.route( '/:id' )
	.get( getOnePost )
	.patch( updatePost )
	.delete( deletePost );

postRouter.route( '/my/posts' ).get( auth, getMyPosts );

module.exports = postRouter;