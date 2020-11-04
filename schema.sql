DROP TABLE IF EXISTS
CREATE DATABASE dbEmployees;
USE dbEmployees;

CREATE TABLE employees (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

CREATE TABLE roles(
	role_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    salary DECIMAL(6),
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments (department_id)
);

CREATE TABLE departments(
	department_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	department VARCHAR(50)
);

CREATE TABLE managers(
	manager_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    salary DECIMAL(6)
);


INSERT INTO departments (title) VALUES ("Sales");
INSERT INTO departments (title) VALUES ("Engineering");
INSERT INTO departments (title) VALUES ("Legal");
INSERT INTO departments (title) VALUES ("Finance");

INSERT INTO roles (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Sales Person", 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Junior Developer", 80000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Lawyer", 190000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 125000, 4);

INSERT INTO managers (first_name, last_name, salary) VALUES ("Ricky", "Bobby", 120000);
INSERT INTO managers (first_name, last_name, salary) VALUES ("Joe", "Bob", 120000);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Ruby", "Wheaton", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Margret", "McCullough", 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Nathan", "Polomark", 5, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Daphne", "Jacobs", 6, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Salma", "Tercero", 8, 2);