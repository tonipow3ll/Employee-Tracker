const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Bonniethedog',
  database: 'top_songsDB1',
});

connection.connect((err) => {
    if (err) throw err;
    // func to start the app here
  });
