//* 5 ways  to create Object in JS

//~ Object literal
var obj = {firstName: "Ashutosh", lastName: "Mathur"}

//! new Object()
var obj = new Object()

//! Constructor Function

//!Class

//~ Object.create

var bigB = {
    firstName: "Amitabh",
    lastName: "Bachchan"
}
console.log("bigB: ", bigB)

var smallB = Object.create(bigB)
smallB.firstName = "Abhishek"
console.log("smallB: ", smallB)

var babyB = Object.create(smallB)
babyB.firstName = "Aradhya"
console.log("babyB: ", babyB)