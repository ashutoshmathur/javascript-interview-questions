//~ Lambdas outside class, methods inside class

const sqrt = x => x * x;

class Sum {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //* Method, goes to class prototype
    add() {
        return this.x + this.y;
    }

    //! lambda inside class - don't do this(lambda attach to the every new object of the Class)
    //! here subtract is field on the class Sum in which we are saving function expression
    subtract = () => {
        return this.x - this.y;
    }

}

const s = new Sum(5, 4);
console.log({s})


//* Every function receives an arguments object
function add(x, y) {
    console.log("arguments: ", arguments);
}

//! Lambdas do not get their own arguments
const sum = (x, y) =>  {
    console.log(this) //? This is whatever is the outer(lexical) scope
    console.log("arguments: ", arguments);
}