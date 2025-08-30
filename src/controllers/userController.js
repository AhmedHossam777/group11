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

const getMyAccount = errorWrapper( async ( req, res, next ) => {
	console.log(req.user.id);
	const userId = req.user.id;
	
	const user = await User.findById( userId );
	res.status(200).json({
		message: "this is my account" ,
		user
	})
} );

const getAllUser = errorWrapper( async ( req, res ) => {
	console.log( `user that sending request is: ${req.user.id}, ${req.user.email}` );
	const allUsers = await User.find();
	res.status( 200 ).json( {
		message: 'all users fetched',
		users: allUsers,
	} );
	
} );
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

const login = errorWrapper( async ( req, res ) => {
	//? get email and passwor from user
	const {email, password} = req.body;
	
	if (!email || !password) throw new AppError( 'add email and password', 400 );
	console.log( password );
	
	//? find User by Email
	const existedUser = await User.findOne( {email: email} );
	console.log( 'existing user:', existedUser );
	
	//! throw error if no user with that email
	if (!existedUser) {
		throw new AppError( 'wrong email or password', 400 );
	}
	
	//? check if user password is match with the entered password
	const isCorrectPassword = await existedUser.comparePassword( password );
	if (!isCorrectPassword) {
		throw new AppError( 'wrong email or password', 400 );
	}
	console.log( 'is correct password: ', isCorrectPassword );
	
	res.status( 200 ).json( {
		message: 'user logged in successfully',
	} );
} );

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	updateUser,
	getOneUser,
	login,
	getMyAccount
};