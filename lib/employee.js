class Employee {
    // use a constructor instead of this.name = name; this.type = type;, etc. 
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.department = this.department;
        this.salary = salary;

     //   console.log("name = " + this.name)
    }
// call your getters
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getPosition(){
        return Employee.name;
    }
 }

// exporting employee class
module.exports = Employee;