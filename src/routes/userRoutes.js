const express = require( 'express' );

const {
	createUser,
	getAllUser,
	getOneUser,
	updateUser,
	deleteUser,
	getMyAccount
} = require( '../controllers/userController' );
const {signup,login} = require( '../controllers/authController' );
const {auth} = require( '../middlewares/authMiddleware' );

const userRouter = express.Router();

userRouter.route( '/' ).get( auth,getAllUser ).post( createUser );

userRouter.route('/me').get( getMyAccount)

userRouter.route( '/:id' ).get( auth,getOneUser ).patch( auth,updateUser ).delete( auth,deleteUser );

userRouter.route( '/login' ).post( login );
userRouter.route('/signup').post(signup)

module.exports = userRouter;