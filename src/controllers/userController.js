const User = require( './../model/User' );

const createUser = async ( req, res ) => {
	try {
		const data = req.body;
		const newUser = await User.create( data );
		
		res.status( 201 ).json( {
			message: 'user created',
			newUser,
		} );
	} catch (e) {
		throw new Error( e.message );
	}
};

// User.findById()
//  User.findByIdAndUpdate()
const getAllUser = async ( req, res ) => {
	try {
		const users = await User.find();
		res.status( 200 ).json( {
			message: 'all users fetched',
			users,
		} );
		
	} catch (e) {
		throw new Error( e.message );
	}
};
const getOneUser = ( req, res ) => {
	const id = parseInt( req.params.id );
	const user = users.find( ( u ) => u.id === id );
	
	if (!user) {
		res.status( 404 ).json( 'user not found' );
	}
	
	res.status( 200 ).json( ({
		message : "get one user",
		user,
	}) );
};

const updateUser = async ( req, res ) => {
	const id = req.params.id;
	const user = await User.findByIdAndUpdate(id, req.body)
	res.status( 200 ).json( {
		user,
	} );
};

const deleteUser = ( req, res ) => {
	const id = req.params.id;
	const index = users.findIndex( u => u.id === parseInt( id ) );
	
	// console.log( 'array before delete: ', users );
	const deletedUser = users.splice( index, 1 );
	console.log( 'deletedUser : ', deletedUser );
	// console.log( 'array after delete: ', users );
	res.status( 204 ).json( deletedUser[0] );
};

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	updateUser,
	getOneUser,
};