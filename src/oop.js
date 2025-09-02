// class User {
// 	constructor( name ) {
// 		this.name = name;
// 		console.log( `running the constructor of user with name : ${name}` );
// 	}
//
// 	logName() {
// 		console.log( `my name is ${this.name}` );
// 	}
// }
//
// class Student extends User {
// 	constructor( name, errorStatusCode ) {
// 		super( name );
// 		this.errorStatusCode = errorStatusCode;
// 	}
//
// 	logStatusCode() {
// 		console.log( this.errorStatusCode );
// 	}
// }
//
//
//
// const student = new Student( 'ibrahim', 400 );
// student.logName()
// student.logStatusCode()

const name = "ahmed hossam"
const nameArr = name.split(' ')[1]
console.log(nameArr);