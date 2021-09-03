//* C L A S S
function Account(holdersName, balance) {
    this.accountNumber  = Account.lastAccountNumber++;
    this.holdersName = holdersName;
    this.balance = balance;
}

//! S T A T I C
Account.lastAccountNumber = 1;

//? M E M B E R S
Account.prototype.withdraw = function(amount) {
    this.balance -= amount;
}

Account.prototype.print = function() {
    console.log("Acc No: ", this.accountNumber)
    console.log("Acc Holder Name: ", this.holdersName)
    console.log("Acc Balance: ", this.balance)
}

var acc = new Account("Ashutosh Mathur", 1000000)
acc.print()