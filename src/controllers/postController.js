const Post = require( '../model/Post' );
const errorWrapper = require( 'express-async-handler' );
const {AppError} = require( '../config/AppError' );

const createPost = errorWrapper( async ( req, res ) => {
	const data = req.body;
	
	const newPost = await Post.create( data );
	if (!newPost) throw new AppError( 'post is not created', 400 );
	res.status( 201 ).json( {
		message: 'post created successfully',
		post: newPost,
	} );
} );

const getAllPosts = errorWrapper( async ( req, res ) => {
	const page = parseInt( req.query.page ) || 1;
	const limit = parseInt( req.query.limit ) || 10;
	const skip = (page - 1) * limit;
	const search = req.query.search || '';
	const filter = search ? {
		$or: [
			{title: {$regex: search, $options: 'i'}},
			{description: {$regex: search, $options: 'i'}},
		],
	} : {};
	
	const posts = await Post.find( filter ).skip( skip ).limit( limit ).sort( {createdAt: -1} );
	res.status( 200 ).json( {
		message: 'all posts fetched',
		posts,
		count: posts.length,
		page,
		limit,
	} );
} );

const getOnePost = errorWrapper( async ( req, res ) => {
	const {id} = req.params;
	const post = await Post.findById( id );
	if (!post) throw new AppError( 'post not found', 404 );
	res.status( 200 ).json( {
		message: 'one post fetched',
		post,
	} );
} );

const updatePost = errorWrapper( async ( req, res ) => {
	const {id} = req.params;
	const data = req.body;
	const post = await Post.findByIdAndUpdate( id, data, {new: true} );
	if (!post) throw new AppError( 'post not found', 404 );
	res.status( 200 ).json( {
		message: 'post updated successfully',
		post,
	} );
} );

const deletePost = errorWrapper( async ( req, res ) => {
	const {id} = req.params;
	const deleted = await Post.findByIdAndDelete( id );
	if (!deleted) throw new AppError( 'post not found', 404 );
	res.status( 200 ).json( {
		message: 'post deleted successfully',
	} );
} );

module.exports = {
	createPost,
	getAllPosts,
	getOnePost,
	updatePost,
	deletePost,
};