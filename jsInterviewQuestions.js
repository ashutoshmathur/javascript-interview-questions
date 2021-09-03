
//~ Javascript Interview Questions

//~ ---------------------------------------------------------------
//* Debounce in JS
//? We can use it for triggering auto-save or displaying suggestions
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
function saveInput() {
  console.log('Saving data');
}
const processChange = debounce(() => saveInput());

//* Leading Debounce in JS
//? Ex: We can use it for multiple clicks of a single button. We don’t want to wait for the last click, but rather register the first one and ignore the rest
//? Here we trigger the func() function on the first debounce_leading call caused by the first button click. We schedule the timer destruction for 300 ms. Every subsequent button click within that timeframe will already have the timer defined and will only push the destruction 300 ms to the future.

function debounce_leading(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

//* Debounce with immediate
function debounce(func, wait, immediate) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function () {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this 
    //   function several times, but it will only execute once 
    //   [before or after imposing a delay]. 
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function () {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments 
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func.apply(context, args);
  }
}

// DEMO:

function onMouseMove(e) {
  console.clear();
  console.log(e.x, e.y);
}

// Define the debounced function
var debouncedMouseMove = debounce(onMouseMove, 50);

// Call the debounced function on every mouse move
// window.addEventListener('mousemove', debouncedMouseMove);

//~ ---------------------------------------------------------------
//* Throttling in JS
const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

//~ ---------------------------------------------------------------
//* Currying in JS
//? Currying is a technique of evaluating a function with multiple arguments, into sequence of function with single/multiple argument. In above problem, we simply turn up add(1,2) into add(1)(2).

//~ Variation 1 - add(1)(2) with fixed parameters
function add(x) {
  return function (y) {
    return x + y;
  }
}
//? OR
const add = x => y => x + y;
//~ USAGE
add(1)(2)

//~ Variation 2 - add(1)(2)(3)(4)...(n)

//~ 1. Using valueOf property
function add(x) {
  let sum = x;
  function resultFn(y) {
    sum += y;
    return resultFn;
  }
  resultFn.valueOf = function () {
    return sum;
  };
  return resultFn;
}
//~ USAGE
console.log(5 + add(2)(3)) //output: 10
console.log(add(2)(3)(4) == 9) //output: true
add(3)(4)(5).valueOf() //output: 12
add(3)(4)(5) //return function
console.log(add(3)(4)(5)) // output: function
console.log(add(3)(4)(5) === 12)// output: false


//~ 2. By returning sum as the property of the function
function add(x) {
  let sum = x;
  return function resultFn(y) {
    sum += y;
    resultFn.result = sum;
    return resultFn;
  }
}
//~ USAGE
add(3)(4)(5).result //output: 12
var t = add(3)(4);
t.result //output: 7
t(5).result //output: 12


//~ 3. Explicit call to function with no arguments for final result
function add(x) {
  let sum = x;
  return function resultFn(y) {
    if (arguments.length) { //not relying on falsy value
      sum += y;
      return resultFn;
    }
    return sum;
  }
}
//~ USAGE
add(2)(3)() //output: 5
var t = add(3)(4)(5)
t() //output: 12

//~ mul(1)(2)...(n)
function mul(x) {
  function f(y) {            // the function to return
    x *= y;                // update the value
    return f;              // return the function
  };

  f.toString = function () { // overwrite toString prototype
    return x;               // return value
  };

  return f;                  // return function, enable currying
}

console.log(mul(1)(2)(3));
console.log(mul(1)(2)(3)(4)(5)(6));

//~ ---------------------------------------------------------------
//* Given a multidimensional array with depth of n, flatten it. Once flattened make it available as a method on array instance

//? 1.
let arr = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]]

function flatten(arr) {
  return arr.reduce(function (acc, next) {
    let isArray = Array.isArray(next)
    return acc.concat(isArray ? flatten(next) : next)
  }, [])
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function () {
    return flatten(this)
  }
}
console.log(arr.flatten())
console.log(arr)


//? 2.
function flatten(nestedArray) {
  const newArray = [];

  for (let i = 0; i < nestedArray.length; i++) {
    const thisItem = nestedArray[i];

    if (Array.isArray(thisItem)) {
      const flatItem = flatten(thisItem);

      for (let j = 0; j < flatItem.length; j++) {
        newArray.push(flatItem[j]);
      }
    } else {
      newArray.push(thisItem);
    }
  }

  return newArray;
}

//~ ---------------------------------------------------------------
//* Given a multidimensional object with depth of n, flatten it. Once flattened make it available as a method on array instance

let ob = {
  name: "Ashutosh Mathur",
  Address: "Jaipur",
  contact: "+91-999999999",
  skills: {
    HTML: "Proficient",
    CSS: "Proficient",
    JavaScript: {
      type: "language",
      details: {
        founder: "Brendan Eich",
        date: "1998"
      }
    }
  }
};

function isObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

function flatten(obj) {
  if (isObject(obj)) {
    var result = {}

    for (var key in obj) {
      var item = obj[key]

      if (isObject(item)) {
        var innerItem = flatten(item);
        for (var innerKey in innerItem) {
          result[key + "." + innerKey] = innerItem[innerKey];
        }
      } else {
        result[key] = item
      }

    }

    return result;
  }

  throw (obj + " is not an object")
}

const flatObj = flatten(ob);

console.log(flatObj)
console.log(flatObj["skills.JavaScript.details.founder"])

//~ ---------------------------------------------------------------
//* Implement bind

if (!Function.prototype.bind) {
  Function.prototype.bind = function (...args) {
    const func = this;
    const context = args[0];
    const params = args.slice(1);

    return function (...innerArgs) {
      func.apply(context, [...innerArgs, ...params])
    }
  }
}

//~ ---------------------------------------------------------------
//* Implement reduce

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function () {

    const arr = this;
    let acc = arguments[1];
    const func = arguments[0];
    if (typeof arguments[0] === "function") {
      for (let i = 0; i < arr.length; i++) {
        acc = func(acc, arr[i], i, arr)
      }
      return acc
    }
    throw (func + " is not a function")
  }
}

const arr = [1, 1, 1, 1, 1]

console.log(arr.reduce(function (acc, nextVal, i, arr) {
  console.log(acc, nextVal, i, arr);
  acc = acc + nextVal
  return acc
}, 2))

//~ ---------------------------------------------------------------
//* Check for Object in JS

function isObject(val) {
  return (typeof val === 'object' && val !== null && !Array.isArray(val));
}

//~ ---------------------------------------------------------------
//* Given an array find a pair such that it sums to a given number

let nums = [2, 7, 10, 1, 11, 15, 9]
let target = 11
let numsObj = {}
var result = []

nums.forEach(function (item) {
  var pairItem = target - item;
  numsObj[item] = true;

  if (numsObj[pairItem]) {
    result = [...result, [pairItem, item]]
  }

})

console.log("numsObjnumsObj ", numsObj)
console.log("result ", result)

//~ ---------------------------------------------------------------
//* Find the peak element(local maxima) in the array
function findPeak(arr, n) {

  // first or last element is peak element
  if (n == 1) return 0;
  if (arr[0] >= arr[1]) return 0;
  if (arr[n - 1] >= arr[n - 2]) return n - 1;

  // check for every other element
  for (var i = 1; i < n - 1; i++) {

    // check if the neighbors are smaller
    if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) return i;
  }
}

// Driver Code
var arr = [1, 3, 20, 4, 1, 0];
var n = arr.length;

//~ ---------------------------------------------------------------
//* Memoize a JS function

function memoizer(fun) {
  let cache = {}
  return function (n) {
    if (cache[n] != undefined) {
      return cache[n]
    } else {
      let result = fun(n)
      cache[n] = result
      return result
    }
  }
}