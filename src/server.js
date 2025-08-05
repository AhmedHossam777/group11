const express = require( 'express' );
const userRouter = require( './routes/userRoutes' );
const connectDb = require( './config/connectDb' );

const app = express();

app.use( ( req, res, next ) => {
	console.log( 'hello, in our backend' );
	next();
} );

app.use( express.json() );

app.use( '/users', userRouter );
// app.use('/payment', paymentRouter)

connectDb();
const port = 3000;

app.listen( 3000,  () => {
	console.log( `app is running on port ${port}` );
} );