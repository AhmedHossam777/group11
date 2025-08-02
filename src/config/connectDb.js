const mongoose = require( 'mongoose' );

const connectDb = async () => {
	await mongoose.connect( 'mongodb+srv://ahmed:ahmeddada111@cluster0.eveiwrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ).then( () => {
		console.log( 'connected to mongodb' );
	} ).catch( err => {
		throw new Error( err );
	} );
};

module.exports = connectDb;