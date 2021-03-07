const inquirer = require('inquirer');
const mysql = require('mysql');
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Finance = require("./lib/finance");
const Legal = require("./lib/legal");

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
                    'Add role',
                    'Update information',
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
                case 'Add role':
                    addRole();
                    break;
                case 'Update information':
                    updateInfo();
                    break;
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


let employeeOBJ = {
    employee: []
};
const addEmployee = () => {
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
                name: 'title',
                message: 'Please enter employees title',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter employees salary',
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Please enter employees manager (hit enter to leave blank if n/a)',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Please select a department',
                choices: [
                    'Engineer',
                    'Manager',
                    'Finance',
                    'Exit (changes will NOT be saved)'
                ]
            },
        ])
        .then((answers) => {
            let newEmp = new Employee(answers.firstName, answers.lastName, answers.title, answers.salary, answers.manager, answers.department);
             employeeOBJ.employee.push(newEmp)
            // employeeOBJ.forEach(employee.push(newEmp))
            // console.log(employeeOBJ)
            switch (newEmp.department) {
                case 'Engineer':
                    addEng();
                    break;
                case 'Manager':
                    addMgmt();
                    break;
                case 'Finance':
                    addAcct();
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

// functions for adding employees below
// const addEng = () => {
//     console.log("adding engineer!")
//     console.log(employeeOBJ.employee[0].lastName)
//     const query = `INSERT INTO Employee (id, first_name, last_name, role_id, manager_id) VALUES ${employeeOBJ.employee[0].firstName}, ${employeeOBJ.employee[0].lastName}, 5, ${employeeOBJ.employee[0].manager}`;
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.console.log('employee added')
//     })
//     initApp();
// }

const addEng = () => {
    connection.query(
        'INSERT INTO Employee SET ?',
        {
            first_name: employeeOBJ.employee[0].firstName,
            last_name: employeeOBJ.employee[0].lastName,
            role_id: 5,
            manager_id: employeeOBJ.employee[0].manager
        }, 
        (err) => {
            if (err) throw err;
            console.log("great success")
        }
    )
    initApp();
}


const addMgmt = () => {
    connection.query(
        'INSERT INTO Employee SET ?',
        {
            first_name: employeeOBJ.employee[0].firstName,
            last_name: employeeOBJ.employee[0].lastName,
            role_id: 5,
            manager_id: employeeOBJ.employee[0].manager
        }, 
        (err) => {
            if (err) throw err;
            console.log("great success")
        }
    )
    initApp();
}

const addAcct = () => {
    connection.query(
        'INSERT INTO Employee SET ?',
        {
            first_name: employeeOBJ.employee[0].firstName,
            last_name: employeeOBJ.employee[0].lastName,
            role_id: 5,
            manager_id: employeeOBJ.employee[0].manager
        }, 
        (err) => {
            if (err) throw err;
            console.log("great success")
        }
    )
    initApp();
}

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