class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.extra = "extra"
    }

    print() {
        console.log(this.firstName, this.lastName, this.extra)
    }
}

class Employee extends Person {
    constructor(firstName, lastName, id) {
        super(firstName, lastName)
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id
    }

    print() {
        console.log(this.id, this.firstName, this.lastName, this.extra)
    }
}

const emp = new Employee("Ashutosh", "Mathur", 1)

emp.print();