//* Object.defineProperty
function Person(id, name) {
    //!this.id = id

    //? Use property descriptor
    Object.defineProperty(
        this, //~ the object in which we want to define property
        "id", //~ Name of the property
        {
            value: id,
            writable: false,
            enumerable: true,
            configurable: false
        }
    )

    Object.defineProperty(
        this, //~ the object in which we want to define property
        "name", //~ Name of the property
        {
            value: name,
            writable: false,
            enumerable: true,
            configurable: true
        }
    )
}

let p = new Person(1, "Ashutosh")
Object.defineProperty(
    p, //~ Overriding name property on p
    "name",
    {
        writable: true,
        enumerable: true,
        configurable: true
    }
)

p.id = "new id" //! read only
p.name = "new name"
console.log(p)

//* Object.defineProperties

function Employee(id, name) {
    //!this.id = id
    //!this.name = name

    //? Use property descriptor
    Object.defineProperties(
        this, //~ the object in which we want to define property
        //~ Name of the property
        {
            "id": {
                value: id,
                writable: false,
                enumerable: true,
                configurable: false
            },
            "name": {
                value: name,
                writable: false,
                enumerable: true,
                configurable: true
            }
        }
    )
}

let emp = new Employee(1, "Ashutosh")
Object.defineProperty(
    emp, //~ Overriding name property on p
    "name",
    {
        writable: true,
        enumerable: true,
        configurable: true
    }
)

emp.id = "new id" //! read only
emp.name = "new name"
console.log("emp: ", emp)