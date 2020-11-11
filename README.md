# Content-Management-System

## Table of Contents

- [Objective](#Objective)
- [Installation](#installation)
- [Functionality](#Functionality)
- [Improvements](#Improvements)
- [Screenshots](#Screenshots)

## Objective 

To build an employee management system that can keep track and modify employees, roles, and departments using node.js, inquirer and mySQL

## Installation

Run 'npm install'

## Functionality

After running node server.js the user is brought to a main menu with the following options:

* Add a department
* Add a role
* Add an employee
* View departments
* View roles
* View employees
* Update employee role
* Remove employee
* Remove role
* Remove department

If any of the view options are chosen the user is shown a table with the chosen data. For 'view roles' and 'view employees' there are table joins showing the connected department to the roles and connected role to the employee. For the other options there will be changes to the database based on the users selection.

## Improvements

I really enjoyed doing this but based on having enough time I stopped where I was at. I have the manager table in the database with the employees connected to them but didn't get around to writing another function to show which employees the managers were managing. Also when view employees is shown I wanted to be able to show the role info with the department and their manager all in one table but couldn't figure it out.

## Screenshots

![image](https://user-images.githubusercontent.com/69565347/98765692-8e548300-2393-11eb-90a4-9e8e29d70da2.png)

![image](https://user-images.githubusercontent.com/69565347/98772075-c01d1800-239a-11eb-8999-adaf2e4fbba7.png)
