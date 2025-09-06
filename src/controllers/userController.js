const User = require( './../model/User' );
const {mongoose, Types} = require( 'mongoose' );
const {AppError} = require( '../config/AppError' );
const errorWrapper = require( 'express-async-handler' );

const createUser = errorWrapper( async ( req, res, next ) => {
	const userData = req.body;
	const newUser = await User.create( userData );
	
	if (!newUser) {
		throw new AppError( 'user isn\'t created', 400 );
	}
	
	res.status( 201 ).json( {
		message: 'user created successfully',
		user: newUser,
	} );
} );

const getAllUser = errorWrapper( async ( req, res ) => {
	const page = parseInt( req.query.page ) || 1;
	const limit = parseInt( req.query.limit ) || 10;
	
	const skip = (page - 1) * limit; // page=2  -> 10
	
	// 21 user -> limit = 10 -> 10 users
	// 21 -> skip = 10 -> (11 -> 20)
	console.log( `page: ${page}, limit:${limit}` );
	const search = req.query.search || "";
	const filter = {
		$or: [
			{
				name: {$regex: search, $options: 'i'}
			},
		],
	};
	// name = hossam
	
	const allUsers = await User.find( filter ).skip( skip ).limit( limit );
	
	res.status( 200 ).json( {
		message: 'all users fetched',
		users: allUsers,
		count: allUsers.length,
		page: page,
		limit: limit,
	} );
} );

// http://localhost:3000/users?page=2
// req.query.page = 2
const getOneUser = errorWrapper( async ( req, res, next ) => {
	const id = req.params.id;
	
	const user = await User.findById( id );
	
	if (!user) {
		throw new AppError( 'user not found', 404 );
	}
	
	//? Middleware : catch any errors in the application
	
	res.status( 200 ).json( {
		message: 'one user fetched',
		user,
	} );
	
} );

const updateUser = errorWrapper( async ( req, res, next ) => {
	const id = req.params.id;
	const data = req.body;
	// const updatedUser = await User.findByIdAndUpdate( id, newData, {new: true} );
	const user = await User.findByIdAndUpdate( id, data );
	
	if (!user) {
		throw new AppError( 'user not found', 404 );
	}
	
	res.status( 200 ).json( {
		message: 'users updated successfully',
		user,
	} );
	
} );

const deleteUser = errorWrapper( async ( req, res, next ) => {
		const id = req.params.id;
		const deletedUser = await User.findByIdAndDelete( id );
		
		if (!deletedUser) {
			throw new AppError( 'user not found', 404 );
		}
		
		res.status( 200 ).json( {
			message: 'user deleted successfully',
		} );
	},
);

const getMyProfile = errorWrapper( async ( req, res, next ) => {
	const userId = req.user.id;
	const user = await User.findById( userId );
	
	res.status( 200 ).json( {
		message: 'get my profile',
		user,
	} );
} );

// products : [userId1, userId2 ......]

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	updateUser,
	getOneUser,
	getMyProfile,
};