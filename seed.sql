DROP DATABASE IF EXISTS EmployeeTracker_DB;

CREATE DATABASE EmployeeTracker_DB;

USE EmployeeTracker_DB;

INSERT INTO Department (id, dept_name)
VALUES (1, 'Engineering');

INSERT INTO Department (id, dept_name)
VALUES (2, 'Management');

INSERT INTO Department (id, dept_name)
VALUES (3, 'Finance');

INSERT INTO Department (id, dept_name)
VALUES (4, 'Legal');

INSERT INTO Roles (id, title, salary, department_id)
VALUES (1, 'Engineering', 100000, 7);

INSERT INTO Roles (id, title, salary, department_id)
VALUES (2, 'Management', 125000, 3);

INSERT INTO Roles (id, title, salary, department_id)
VALUES (3, 'Finance', 80000, 12);

INSERT INTO Roles (id, title, salary, department_id)
VALUES (4, 'Legal', 100000, 5);


INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (375, 'Jack', 'Bauer', 7, 1);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (1904, 'Theresa', 'Smith', 5, 13);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (338, 'Adele', 'Lawrence', 12, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (135, 'John', 'Jones', 3, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (593, 'Obi', 'Doe', 3, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (438, 'Hank', 'Hill', 3, 17); 

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (754, 'Peggy', 'Cranston', 5, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (127, 'Brian', 'Fraser', 7, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (296, 'Henry', 'Nicholson', 7, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (953, 'Dolores', 'Anderson', 12, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (484, 'Bernard', 'Plourde', 7, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (249, 'Craig', 'Desmarais', 5, 17); 

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (260, 'Steve', 'de Vera', 5, 17); 

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (852, 'Joseph', 'Houser', 5, 17); 

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (284, 'Keith', 'Buckley', 7, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (017, 'Andy', 'Complains', 3, 17); 

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (108, 'Winston', 'McCall', 7, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (892, 'Luke', 'Kilpatrick', 7, 17); 

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (761, 'Russell', 'Ward', 7, 17);

INSERT INTO Employee (id, first_name, last_name, department_id, manager_id)
VALUES (603, 'Nori', 'Wong', 5, 17);