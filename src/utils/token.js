const jwt = require( 'jsonwebtoken' );
const {AppError} = require( '../config/AppError' );
require( 'dotenv' ).config();

const generateToken = ( userId , email) => {
	return jwt.sign( {id: userId, email: email}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	} );
};

const verifyToken = (token) => {
	const decoded = jwt.decode(token, process.env.JWT_SECRET)
	if (!decoded){
		throw new AppError('invalid token', 400)
	}
	return decoded
}

module.exports = {
	generateToken,
	verifyToken
};