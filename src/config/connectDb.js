const mongoose = require( 'mongoose' );
require( 'dotenv' ).config();

const connectDb = async () => {
	const password = process.env.MONGO_PASSWORD;
	await mongoose.connect( `mongodb+srv://ahmed:${password}@cluster0.eveiwrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` ).then( () => {
		console.log( 'connected to mongodb' );
	} ).catch( err => {
		throw new Error( err );
	} );
};

module.exports = connectDb;