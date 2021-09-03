//* ES6 Class

class Account {
    //! S T A T I C
    static lastAccountNumber = 1;

    //? F I E L D S
    accountNumber = 0;
    holdersName = "";
    balance = 0.0;

    constructor(holdersName, balance) {
        this.accountNumber += Account.lastAccountNumber;
        this.holdersName = holdersName;
        this.balance = balance;
    }

    //* M E T H O D S
    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        this.balance -= amount;
    }

    print() {
        console.log("Acc No: ", this.accountNumber)
        console.log("Acc Holder Name: ", this.holdersName)
        console.log("Acc Balance: ", this.balance)
    }
}

const acc = new Account("Ashutosh Mathur", 200_000);
acc.print()