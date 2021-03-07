DROP DATABASE IF EXISTS EmployeeTracker_DB;
CREATE database EmployeeTracker_DB;

USE EmployeeTracker_DB;

CREATE TABLE Department (
  id INT AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE Employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE Roles (
id INT AUTO_INCREMENT,
title VARCHAR(30),
salary INT NOT NULL,
department_id INT NOT NULL,
 PRIMARY KEY (id)
);

SELECT * FROM Department;
select * from Employee;
select * from Roles;