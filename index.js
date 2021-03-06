const inquirer = require('inquirer');
const mysql = require('mysql');
const { allowedNodeEnvironmentFlags } = require('process');
const Employee = require("./lib/employee");

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
              'Add employee',
              'Add department',
              'Add role',
              'Update information',
              'View all departments',
              'Exit'
          ]
        }
    ])
    .then((answers) => {
        switch (answers.directory){
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
            case 'Exit':
                connection.end(console.log("Exiting application, goodbye"));
                break;
        }
    })

    // const allEmployees = () =>{
    //    const query = 'SELECT * FROM Employee';
    //    connection.query(query, (err, res) => {
    //    if (err) throw err;
    //    res.forEach(({ first_name, last_name, department, role}) =>{
    //        console.log(`Employee : ${first_name}${last_name} department: ${department} role: ${role}`)
    //     })
    // }
        
  const allEmployees = () => {
      const query = 'SELECT * FROM Employee';
      connection.query(query, (err, res) => {
          if (err) throw err;
        res.forEach(({ first_name, last_name, department, roles}) => {
            console.log(`Employee Name: ${first_name} ${last_name} || Department: ${department} || Role: ${roles}`)
        })
        initApp();
      })
    }
}

// const addEmployee = () => {
//     const query = 'INSERT INTO Employee';
//     inquirer
//     connection.query(query, (err, res) => {
//         if (err) throw err;
    
//     })
// }

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
        switch (answers.department) {
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
const addEng = (answers) => {
    const query = 'INSERT INTO Employee'(first_name, last_name, answers.department, answers.salary, answers.manager, answers.roles);
    connection.query(query, (err, res) => {
        if (err) throw err;
      res.console.log('employee added')
      })    
      initApp();
    }


const addMgmt = () => {
    console.log("Adding Manager!")
    initApp();
}

const addAcct = () => {
    console.log("Adding accountant!")
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
            switch (answers.exConf){
                case 'Yes, exit':
                    connection.end(console.log("Exiting application, goodbye"));
                break;
                case 'No, Im not done yet':  
                    initApp();
                break;
            }
        })
}