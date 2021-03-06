const inquirer = require('inquirer');
const mysql = require('mysql');
const { allowedNodeEnvironmentFlags } = require('process');

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
              'View all departments'
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
        }
    })
}