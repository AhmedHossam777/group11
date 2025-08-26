const express = require( 'express' );

const {
	createUser,
	getAllUser,
	getOneUser,
	updateUser,
	deleteUser,
	login,
} = require( '../controllers/userController' );

const userRouter = express.Router();

userRouter.route( '/' ).get( getAllUser ).post( createUser );

userRouter.route( '/:id' ).get( getOneUser ).patch( updateUser ).delete( deleteUser );

userRouter.route( '/login' ).post( login );

module.exports = userRouter;