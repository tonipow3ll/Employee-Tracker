const inquirer = require('inquirer');
const mysql = require('mysql');
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
//     const query = '';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//      res.
//     })
// }