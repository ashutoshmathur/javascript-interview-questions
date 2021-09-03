//* Function Declaration
function add1(x, y) {
    return x + y;
}
console.log(add1(2, 5))

//* Function expression
var add2 = function(x, y) {
    return x + y
}
console.log(add2(2, 6))

//* Lambda 
var add3 = (x, y) => {
    return x + y;
}
console.log(add3(2, 7))

//? Shorthand
var add4 = (x, y) => x + y;
console.log(add4(2, 8))