const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const userSchema = new mongoose.Schema( {
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	job: {
		type: String,
	},
}, {
	timestamps: true,
	validateBeforeSave: true,
} );

//////////////////// ------------------ ///////////////////////
userSchema.pre( 'save', async function ( next ) {
	if (!this.isModified("password")) return next()
	
	const salt = await bcrypt.genSalt( 10 );
	console.log("salt: ", salt);
	this.password = await bcrypt.hash( this.password, salt ); // 123456
	console.log('password after hashing',this.password); //  $2b$10$SwOBtz.L8jRO28SNLQ3JKeNen7rZSOeyLOuJITu9tZui0dxMmnwHK
	next();
} );

// userSchema.pre('findOne' , async function (next){
// 	console.log('this is pre hook middleware');
// })

// compare method
userSchema.methods.comparePassword = async function(candidatePassword){
	return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model( 'User', userSchema );

module.exports = User;