const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
	name: {
		type: String,
		required : true
	},
	age: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	job: {
		type: String,
	},
}, {
	versionKey: false,
	validateBeforeSave: true
} );

const User = mongoose.model( 'User', userSchema );

module.exports = User;