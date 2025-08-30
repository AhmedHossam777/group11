const User = require( './../model/User' );
const {mongoose, Types} = require( 'mongoose' );
const {AppError} = require( '../config/AppError' );
const errorWrapper = require( 'express-async-handler' );
const {generateToken} = require( '../utils/token' );

const signup = errorWrapper( async ( req, res, next ) => {
	const userData = req.body;
	const newUser = await User.create( userData );
	
	if (!newUser) {
		throw new AppError( 'user isn\'t created', 400 );
	}
	
	console.log( newUser );
	
	const token = generateToken( newUser._id, newUser.email );
	
	res.status( 201 ).json( {
		message: 'user created successfully',
		user: newUser,
		token,
	} );
} );

const login = errorWrapper(
	async ( req, res, next ) => {
		const {email, password} = req.body;
		const user = await User.findOne( {email: email} );
		
		if (!user) {
			throw new AppError( 'wrong email or password', 400 );
		}
		
		const isCorrect = await user.comparePassword( password );
		if (!isCorrect) {
			throw new AppError( 'wrong email or password', 400 );
		}
		
		const token = generateToken( user._id, user.email );
		
		res.status( 200 ).json( {
			message: 'users logged in successfully',
			token,
		} );
	},
);

module.exports = {
	signup,
	login,
};