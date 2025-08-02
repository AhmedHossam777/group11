let users = [{
	id: 1, name: 'ahmed', age: 22,
}, {
	id: 2, name: 'ali', age: 19,
}];

const getAllUser = ( req, res ) => {
	res.status( 200 ).json( users );
};

const createUser = (req,res) => {
	const data = req.body;
	users.push(data)
	res.status(201).json({
		message : "user create successfully",
		users
	})
}

const getOneUser = ( req, res ) => {
	const id = parseInt( req.params.id );
	const user = users.find( ( u ) => u.id === id );
	
	if (!user) {
		res.status( 404 ).json( 'user not found' );
	}
	
	res.status( 200 ).json( ({
		user,
	}) );
}


const updateUser = ( req, res ) => {
	const id = req.params.id;
	console.log( 'id : ', id );
	const {name, age} = req.body;
	
	const user = users.find( u => u.id === parseInt( id ) );
	console.log( 'user before update: ', user );
	user.name = name;
	user.age = age;
	console.log( 'user after update: ', user );
	
	console.log( user );
	res.status( 200 ).json( {
		user,
	} );
}

const deleteUser = ( req, res ) => {
	const id = req.params.id;
	const index = users.findIndex( u => u.id === parseInt( id ) );
	
	// console.log( 'array before delete: ', users );
	const deletedUser = users.splice( index, 1 );
	console.log( 'deletedUser : ', deletedUser );
	// console.log( 'array after delete: ', users );
	res.status( 204 ).json( deletedUser[0] );
}

module.exports = {
	getAllUser,
	createUser,
	deleteUser,
	updateUser,
	getOneUser
}