const User = require( './../model/User' );
const {mongoose, Types} = require( 'mongoose' );

const createUser = async ( req, res ) => {
	try {
		const userData = req.body;
		const newUser = await User.create( userData );
		
		res.status( 201 ).json( {
			message: 'user created successfully',
			user: newUser,
		} );
	} catch (e) {
		throw new Error( e.message );
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
		throw new Error( e.message );
	}
};
const getOneUser = async ( req, res ) => {
	try {
		const id = req.params.id;
		
		const user = await User.findById( id );
		
		if (!user) {
			res.status( 404 ).json( {
				message: 'user not found',
			} );
		}
		
		res.status( 200 ).json( {
			message: 'one user fetched',
			user,
		} );
		
	} catch (e) {
		throw new Error( e.message );
	}
	
};

const updateUser = async ( req, res ) => {
	try {
		const id = req.params.id;
		const newData = req.body;
		const updatedUser = await User.findByIdAndUpdate( id, newData, {new: true} );
		
		if (!updatedUser) {
			res.status( 404 ).json( {
				message: 'user not found',
			} );
		}
		
		res.status( 200 ).json( {
			message: 'users updated successfully',
			updatedUser,
		} );
	} catch (e) {
		throw new Error( e.message );
	}
};

const deleteUser = async ( req, res ) => {
	try {
		const id = req.params.id;
		const deletedUser = await User.findByIdAndDelete( id );
		
		if (!deletedUser) {
			res.status( 404 ).json( {
				message: 'user not found',
			} );
		}
		
		res.status( 200 ).json( {
			message: 'user deleted successfully',
		} );
	} catch (e) {
		throw new Error( e.message );
	}
};

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	updateUser,
	getOneUser,
};