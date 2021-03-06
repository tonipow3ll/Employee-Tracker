DROP DATABASE IF EXISTS EmployeeTracker_DB;

CREATE DATABASE EmployeeTracker_DB;

USE EmployeeTracker_DB;


INSERT INTO Employee (first_name, last_name, title, department, salary, manager, roles)
VALUES ("Jack", "Bauer", "Intern", "Engineering", "20000", "Toni Powell", "Engineer");

-- lather rinse repeat the above for more 'employees' 