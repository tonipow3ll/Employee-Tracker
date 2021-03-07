const inquirer = require('inquirer');
const mysql = require('mysql');
const { allowedNodeEnvironmentFlags } = require('process');
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Finance = require("./lib/finance");
const Legal = require("./lib/legal");
const Manager = require("./lib/manager");

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
    manager: [],
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
                    'Add employee',
                    'Add department',
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
                    addEmployee();
                    break;
                case 'Add department':
                    addDept();
                    break;
                // case 'Add role':
                //     addRole();
                //     break;
                // case 'Update information':
                //     updateInfo();
                //     break;
                case 'View all departments':
                    allDepts();
                    break;
                case 'View all employee roles':
                    allRoles();
                    break;
                case 'Exit':
                    connection.end(console.log("Exiting application, goodbye"));
                    break;
            }
        })
    }

    // ==========================
    // function to view all EMPLOYEES
    // ==========================

    const allEmployees = () => {
        const query = 'SELECT * FROM Employee';
        connection.query(query, (err, res) => {
            if (err) throw err;
            res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
                console.log(`Employee Name: ${first_name} ${last_name} || Employee ID: ${id} || Role ID: ${role_id} || Manager ID: ${manager_id}`)
            })
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
        res.forEach(({ id, dept_name }) => {
            console.log(`Department ID: ${id} || Department Name: ${dept_name}`)
        })
        initApp();
    })
}


// ==========================
// function to view all ROLES
// ==========================

//need to join this with employee so it can read 'employee id, employee name'

const allRoles = () => {
    const query = `SELECT Roles.id, Roles.title, Roles.salary, Roles.department_id
    FROM Roles`;
    // FROM Roles INNER JOIN Employee ON Employee.id = Roles.id
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ id, title, salary, department_id }) => {
            console.log(`Employee ID: ${id} ||Title: ${title} || Salary: ${salary} || Department ID: ${department_id}`)
        })
        initApp();
    })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'department',
                message: 'What type of employee would you like to add?',
                choices: [
                    'Engineer',
                    'Manager',
                    'Exit (changes will NOT be saved)'
                ]
            }
        ])
        .then((answers) => {
            switch(answers.department){
                case 'Engineer':
                    createEng();
                    break;
                case 'Manager':
                    createMgmt();
                    break;
                case 'Exit (changes will NOT be saved)':
                confirmExit();
                    break;
                default: 
                    initApp();
                    break;
            }
        })
}

// ====================================================
// functions to create ENGINEERS, and add to DB
// ====================================================
const createEng = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter employees first name',
            },
           { type: 'input',
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
                name: 'manager',
                message: 'Please enter managers ID (ENG = 7, MGMT = 5, LAW = 9, FIN = 3)',
            },
        ])
        .then((answers) => {
            let newEng = new Engineer(answers.firstName, answers.lastName, answers.salary, answers.manager)
            employeeOBJ.engineer.push(newEng)
            // console.log(engineer)
            writeDB();
        })
    }


 function addEng () {
    console.log(employeeOBJ.engineer)
    connection.query(
        'INSERT INTO Employee SET ?',
        {
            first_name: employeeOBJ.engineer.firstName,
            last_name: employeeOBJ.engineer.lastName,
            role_id: 5,
            manager_id: employeeOBJ.engineer.manager
        }, 
        (err) => {
            if (err) throw err;
            console.log("great success")
        }
   )
    initApp();
}

const writeDB = () => {
    let empCollection = "";
    employeeOBJ.engineer.forEach(engineer => {
        empCollection += addEng(engineer);
        })
        return empCollection;
}

// ====================================================
// functions to create MANAGERS, and add to DB
// ====================================================

const createMgmt = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter employees first name',
            },
           { type: 'input',
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
                name: 'manager',
                message: 'Please enter managers ID (ENG = 7, MGMT = 5, LAW = 9, FIN = 3)',
            },
        ])
        .then((answers) => {
            let newMger = new Manager(answers.firstName, answers.lastName, answers.salary, answers.manager)
            employeeOBJ.manager.push(newMger)
            // console.log(employeeOBJ)
            writemgmtDB();
        })
    }

 function addMgmt () {
    console.log(employeeOBJ.manager)
    connection.query(
        'INSERT INTO Employee SET ?',
        {
            first_name: employeeOBJ.manager[0].firstName,
            last_name: employeeOBJ.manager[0].lastName,
            role_id: 5,
            manager_id: employeeOBJ.manager[0].manager
        }, 
        (err) => {
            if (err) throw err;
        }
   )
    initApp();
}



const writemgmtDB = () => {
    let mgmtCollection = "";
    employeeOBJ.manager.forEach(manager => {
        mgmtCollection += addMgmt(manager);
        })
        return mgmtCollection;
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


// confirm exit prompt
const confirmExit = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'exConf',
                message: 'Are you sure you want to exit? Unsaved changes will be discarded',
                choices: ['Yes, exit', 'No, Im not done yet']
            }
        ]).then((answers) => {
            switch (answers.exConf) {
                case 'Yes, exit':
                    connection.end(console.log("Exiting application, goodbye"));
                    break;
                case 'No, Im not done yet':
                    initApp();
                    break;
            }
        })
}