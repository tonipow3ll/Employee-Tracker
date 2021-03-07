const Employee = require("./employee");

class Finance extends Employee {
    // use a constructor instead of this.name = name; this.type = type;, etc. 
    constructor (firstName, lastName, salary, manager) {
        super(firstName,lastName, salary, manager )
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.manager = manager;
        // this.department = department;

     //   console.log("name = " + this.name)
    }
// call your getters
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getDepartment(){
        return this.department;
    }
    getSalary(){
        return this.salary;
    }
 }

// exporting employee class
module.exports = Finance;