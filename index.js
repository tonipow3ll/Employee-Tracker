// TO DO:

// add functionality to see entire budget / spend sum on salarys?
// view employees by manager ID ??
// refactor


const inquirer = require('inquirer');
const mysql = require('mysql');
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
var Table = require('cli-table');
require('dotenv').config();
const connection = mysql.createConnection({
    host: 'localhost',


    port: 3306,


    user: 'root',


    password: 'Bonniethedog',
    database: 'EmployeeTracker_DB',
});


connection.connect((err) => {
    if (err) throw err;
    initApp()
});


let employeeOBJ = {
    engineer: [],
};

initApp = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'directory',
                message: 'What would you like to do?',
                choices: [
                    'View all employees',
                    'View all departments',
                    'View all employee roles',
                    'Update employee information',
                    'Add employee',
                    'Add department',
                    'Add role',
                    'Delete Employee',
                    'Exit'
                ]
            }
        ])
        .then((answers) => {
            switch (answers.directory) {
                case 'View all employees':
                    allEmployees();
                    break;
                case 'Add employee':
                    createEng();
                    break;
                case 'Add department':
                    addDept();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Update employee information':
                    updateInfo();
                    break;
                case 'View all departments':
                    allDepts();
                    break;
                case 'View all employee roles':
                    allRoles();
                    break;
                case 'Delete Employee':
                    deleteInfo();
                    break;
                case 'Exit':
                    connection.end(console.log("Exiting application, goodbye"));
                    break;
            }
        })
}

// =============================
// function to view all EMPLOYEES
// ==============================

const allEmployees = () => {
    const query = 'SELECT Employee.id, Employee.first_name, Employee.last_name, Employee.department_id, Roles.salary, Roles.title FROM ROLES INNER JOIN Employee ON Roles.department_id = Employee.department_id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        let table = new Table({
            head: ['id', 'First Name', 'Last Name', 'Department ID', 'Department', 'Salary'],
        });
        let mappedArr = res.map(({ id, first_name, last_name, department_id, title, salary }) => {
            return [id, first_name, last_name, department_id, title, salary]
        })
        table.push(...mappedArr)
        console.log(table.toString());

        initApp();
    })
}

// ==========================
// function to view all DEPARTMENTS
// ==========================

const allDepts = () => {
    const query = 'SELECT * FROM Department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        let table = new Table({
            head: [ 'Department Name'],
        });
        let mappedArr = res.map(({ dept_name }) => {
            return [ dept_name]
        })
        table.push(...mappedArr)
        console.log(table.toString());
        initApp();
    })
}


// ==========================
// function to view all ROLES
// ==========================


const allRoles = () => {
    const query = `SELECT Roles.id, Roles.title, Roles.salary, Roles.department_id
    FROM Roles`;
    // FROM Roles INNER JOIN Employee ON Employee.id = Roles.id
    connection.query(query, (err, res) => {
        if (err) throw err;
        let table = new Table({
            head: ['Title', 'Salary', 'Department ID'],
        });
        let mappedArr = res.map(({ title, salary, department_id}) => {
            return [ title, salary, department_id]
        })
        table.push(...mappedArr)
        console.log(table.toString());
        initApp();
    })
}



// ====================================================
// functions to create EMPLOYEES, and add to DB
// ====================================================
const createEng = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter employees first name',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter employees last name',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter employees salary',
            },
            {
                type: 'input',
                name: 'deptId',
                message: 'Please enter employees department ID (Engineer - 7, Accountant - 12, Legal - 5)'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Please enter employee managers ID',
            },
        ])
        .then((answers) => {
            let newEng = new Engineer(answers.firstName, answers.lastName, answers.salary, answers.deptId, answers.manager)
            employeeOBJ.engineer.push(newEng)
            // console.log(newEng)
            writeDB();
        })
}


function addEng(newEng) {
    connection.query(
        'INSERT INTO Employee SET ?',
        {
            first_name: newEng.firstName,
            last_name: newEng.lastName,
            department_id: newEng.department,
            manager_id: newEng.manager,
        },
        (err) => {
            if (err) throw err;
            console.log("ruh roh, something went wrong")
        }
    )
    initApp();
}

const writeDB = () => {
    let empCollection = "";
    employeeOBJ.engineer.forEach(engineer => {
        empCollection + addEng(engineer);
    })
    return empCollection;
}



// ====================================================
// function to create DEPARTMENTS, and add to DB
// ====================================================
const addDept = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDept',
                message: 'Please type the name of the department you would like to add'
            }
        ]).then((answers) => {
            connection.query(
                'INSERT INTO Department SET ?',
                {
                    dept_name: answers.newDept,
                },
                (err) => {
                    if (err) throw err;
                }
            )
            console.log("department added successfully")
            initApp()
        })
}


// ====================================================
// function to create ROLES, and add to DB
// ====================================================
const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Please type the title of the Role you would like to add'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the starting salary for this role'
            },
            {
                type: 'input',
                name: 'deptId',
                message: 'Please enter a unique ID for this department'
            },
        ]).then((answers) => {
            connection.query(
                'INSERT INTO Roles SET ?',
                {
                    title: answers.newRole,
                    salary: answers.salary,
                    department_id: answers.deptId,
                },
                (err) => {
                    if (err) throw err;
                }
            )
            console.log("department added successfully")
            initApp()
        })
}

// ====================================================
// function to UPDATE Employee roles and edit DB
// ====================================================

const updateInfo = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you would like to update'
            },
            {
                type: 'input',
                name: 'newDept',
                message: 'Enter employees new department ID (Engineer - 7, Accountant - 12, Legal - 5)'
            },
            {
                type: 'input',
                name: 'newMger',
                message: 'Enter employees new Manager ID'
            },
        ]).then((answers) => {
            connection.query(`UPDATE Employee SET department_id ='${answers.newDept}' , manager_id ='${answers.newMger}' WHERE first_name ='${answers.firstName}'`,
            )
            initApp()
        })
}

// ==============
// Delete Func
// ==============

const deleteInfo = () => {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'empId',
                message: 'Enter the Employees unique ID that you would like to delete from the database'
            }
        ])
        .then((answers) => {
            connection.query(`DELETE FROM Employee WHERE id='${answers.empId}'`,
                (err, res) => {
                    if(err) throw err;
                    console.log(`${answers.empId} Does not exist.`)
                }
            )
            console.log(`Employee deleted`)
            initApp()
        })
}