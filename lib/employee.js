class Employee {
    // use a constructor instead of this.name = name; this.type = type;, etc. 
    constructor (firstName, lastName, title, salary, manager, department) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.salary = salary;
        this.manager = manager;
        this.department = department;

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
module.exports = Employee;