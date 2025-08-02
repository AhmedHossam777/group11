const express = require( 'express' );

const {
	createUser,
	getAllUser,
	getOneUser,
	updateUser,
	deleteUser,
} = require( '../controllers/userController' );

const userRouter = express.Router();

userRouter.route( '/' ).get( getAllUser ).post( createUser );

userRouter.route( '/:id' ).get( getOneUser ).patch( updateUser ).delete( deleteUser );

module.exports = userRouter;