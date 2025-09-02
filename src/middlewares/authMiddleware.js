const {AppError} = require( '../config/AppError' );
const errorWrapper = require( 'express-async-handler' );
const {verifyToken} = require( '../utils/token' );

const auth = errorWrapper( ( req, res, next ) => {
	
	const token = req.header( 'Authorization' )?.split( ' ' )[1];
	if (!token) {
		throw new AppError( 'token is required', 400 );
	}
	const decoded = verifyToken( token ); // {id, email}
	console.log(decoded);
	
	req.user = decoded;
	next();
} );


module.exports = {auth};