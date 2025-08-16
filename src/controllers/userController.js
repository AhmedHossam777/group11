const User = require( './../model/User' );
const {mongoose, Types} = require( 'mongoose' );
const {AppError} = require( '../config/AppError' );
const createUser = async ( req, res, next ) => {
	try {
		const userData = req.body;
		const newUser = await User.create( userData );
		
		if (!newUser) {
			throw new AppError( 'user isn\'t created', 400 );
		}
		
		res.status( 201 ).json( {
			message: 'user created successfully',
			user: newUser,
		} );
	} catch (e) {
		next( e );
	}
};

const getAllUser = async ( req, res ) => {
	try {
		const allUsers = await User.find();
		res.status( 200 ).json( {
			message: 'all users fetched',
			users: allUsers,
		} );
		
	} catch (e) {
		next( e );
	}
};
const getOneUser = async ( req, res, next ) => {
	try {
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
		
	} catch (e) {
		next( e );
	}
	
};

const updateUser = async ( req, res, next ) => {
	try {
		const id = req.params.id;
		const newData = req.body;
		const updatedUser = await User.findByIdAndUpdate( id, newData, {new: true} );
		
		if (!updatedUser) {
			throw new AppError( 'user not found', 404 );
		}
		
		res.status( 200 ).json( {
			message: 'users updated successfully',
			updatedUser,
		} );
	} catch (e) {
		next( e );
	}
};

const deleteUser = async ( req, res, next ) => {
	try {
		const id = req.params.id;
		const deletedUser = await User.findByIdAndDelete( id );
		
		if (!deletedUser) {
			throw new AppError( 'user not found', 404 );
		}
		
		res.status( 200 ).json( {
			message: 'user deleted successfully',
		} );
	} catch (e) {
		next( e );
	}
};

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	updateUser,
	getOneUser,
};