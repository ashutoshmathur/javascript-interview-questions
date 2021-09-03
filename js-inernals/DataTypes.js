//* Smalltalk - Grand-daddy of All OOP
//? 1. Eevrything must be an object
//? 2. Objects should not have public members
//? 3. Obect must communicate using messages

//* Javascript tries to emulate Smalltalk/ original OOP
//? Everything should be an Object

//* JS has some basic Data Types

// Native Data types can act as Object if required (auto boxing)
// for example var num = 1; It's type is number
// console.log(num.toString()) -- here it is acting as an object
// typeof null is object is the design flaw in JS

// 1. number
var num = 12376182736672318723;
console.log(num, typeof num);
var numObj = new Number(1123123);
console.log(numObj, typeof numObj);

// 2. boolean
var bool = true;
console.log(bool, typeof bool);

// 3. String
var name = "Ashutosh Mathur";
console.log(name, typeof name)

// 4. undefined
var noVal = undefined;
console.log(noVal, typeof noVal)

// 5. null
var nullVal = null;
console.log(nullVal, typeof nullVal)