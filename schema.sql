DROP DATABASE IF EXISTS EmployeeTracker_DB;
CREATE database EmployeeTracker_DB;

USE EmployeeTracker_DB;

CREATE TABLE Department (
  id INT NOT NULL,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  title VARCHAR(25) NULL,
  department VARCHAR(30) NULL,
  salary INT NOT NULL,
  manager VARCHAR(25) NULL,
  roles VARCHAR(25) NULL,
  PRIMARY KEY (position)
);

CREATE TABLE Employee (
  id INT NOT NULL,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  title VARCHAR(25) NULL,
  department VARCHAR(30) NULL,
  salary INT NOT NULL,
  manager VARCHAR(25) NULL,
  roles VARCHAR(25) NULL,
  PRIMARY KEY (position)
);

CREATE TABLE Roles (
  id INT NOT NULL,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  title VARCHAR(25) NULL,
  department VARCHAR(30) NULL,
  salary INT NOT NULL,
  manager VARCHAR(25) NULL,
  roles VARCHAR(25) NULL,
  PRIMARY KEY (position)
);
SELECT * FROM Department;
select * from Employee;
select * from Roles;