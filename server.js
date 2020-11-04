const mysql = require('mysql')
const inquirer = require('inquirer')
require('console.table')
// const console.table = require('console.table')
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

// at top INIT DB connection
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "<Nathan95>",
    database: "dbEmployees"
});

async function main() {

    menuOptions = await inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            message: 'What would you like to do?',
            choices: [ "Add a department", "Add a role", "Add an employee", "View departments", "View roles", "View employees", "Update employee role" ]
        }
    ])
    choice = menuOptions.options


    if(choice == "Add a department") {
        promptAnswers = await inquirer.prompt([
            {
                name: 'department',
                message: 'What is the name of the new department?'
            }
        ])

        await db.query('INSERT INTO departments (department) VALUES (?)', [promptAnswers.department])

        console.log(`\n Added the new department called: ${promptAnswers.department} \n`)
    }


    if(choice == "Add a role") {
        const showDepartments = await db.query('SELECT department FROM departments')
        
        promptAnswers = await inquirer.prompt([
            {
                name: 'role',
                message: 'What is the new role called?'
            },
            {
                name: 'salary',
                message: 'What is the starting salary of the new role?'
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does the new role belong in?',
                choices: showDepartments.map(departments => departments.department)
            }
        ])
        const departmentId = await db.query('SELECT department_id FROM departments WHERE department = ?', [promptAnswers.department])


        await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [promptAnswers.role, promptAnswers.salary, departmentId[0].department_id])

        console.log(`\n Added the new role with these values: \n Role name: ${promptAnswers.role} \n Salary: ${promptAnswers.salary} \n Department: ${promptAnswers.department} \n`)
    }


    if(choice == "Add an employee") {
        const showManagers = await db.query('SELECT first_name, last_name FROM managers')
        const showRoles = await db.query('SELECT title FROM roles ')

        promptAnswers = await inquirer.prompt([
            {
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                name: 'lastName',
                message: "What is the employee's last name"
            },
            {
                name: 'role',
                type: 'list',
                message: "What will be the employee's role?",
                choices: showRoles.map(roles => roles.title)
            },
            {
                name: 'manager',
                type: 'list',
                message: "Who will manage the employee?",
                choices: showManagers.map(managers => managers.first_name)
            },
        ])

        const roleId = await db.query('SELECT role_id FROM roles WHERE title = ?', [promptAnswers.role])
        const managerId = await db.query('SELECT manager_id FROM managers WHERE first_name = ?', [promptAnswers.manager])

        await db.query( 
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [promptAnswers.firstName, promptAnswers.lastName, roleId[0].role_id, managerId[0].manager_id]
        )

        console.log(`\n Added ${promptAnswers.firstName} ${promptAnswers.lastName} to employee list. \n`)
    }


    if(choice == "View departments") {
        const showDepartments = await db.query('SELECT department FROM departments')
        console.table(showDepartments)
    }


    if(choice == "View roles") {
        const showRoles = await db.query(
            'SELECT roles.title, roles.salary, departments.department FROM roles, departments WHERE roles.department_id = departments.department_id'
            )
        console.table(showRoles)
    }


    if(choice == "View employees") {
        const showEmployees = await db.query(
            'SELECT employees.first_name, employees.last_name, roles.title, roles.salary FROM employees, roles WHERE employees.role_id = roles.role_id'
            )
      
        console.table(showEmployees)
    }


    if(choice == "Update employee role") {
        const showRoles = await db.query('SELECT title FROM roles ')
        const showEmployees = await db.query('SELECT first_name FROM employees')

        promptAnswers = await inquirer.prompt([
            {
                name: 'employeeName',
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: showEmployees.map(employees => employees.first_name)
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is the new role of the employee?', 
                choices: showRoles.map(roles => roles.title)
            }
        ])
        const roleId = await db.query('SELECT role_id FROM roles WHERE title = ?', [promptAnswers.role])

        await db.query('UPDATE employees SET role_id = ? WHERE first_name = ?', [roleId[0].role_id, promptAnswers.employeeName])

        console.log(`\n Updated ${promptAnswers.employeeName}'s role to ${promptAnswers.role}. \n`)
    }
    main()
}
main()